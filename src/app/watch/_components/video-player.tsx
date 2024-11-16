"use client";

import React from "react";

import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

import { TVideoData } from "@/lib/types";
import { NO_THUMBNAIL_URL } from "@/lib/constant";
import { useWatchHistoryActions } from "@/hooks/watch-history";

export const VideoPlayer: React.FC<{
    video: TVideoData;
}> = ({ video }) => {
    const videoId = video._id;

    const lastUpdateTimeRef = React.useRef<number>(0);
    const playDurationRef = React.useRef<number>(0);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    const { addToWatchHistory, updateWatchHistory } = useWatchHistoryActions();

    React.useEffect(() => {
        const videoElement = videoRef.current;
        const interval = setInterval(() => {
            if (videoElement && !videoElement.paused) {
                const currentTime = videoElement.currentTime;
                playDurationRef.current = currentTime - lastUpdateTimeRef.current;
                const watchedDuration = playDurationRef.current;
                if (videoElement.ended) {
                    clearInterval(interval);
                }

                if (videoElement.paused) {
                    clearInterval(interval);
                }

                // if play duration is greater than 5 seconds
                if (watchedDuration > 5) {
                    updateWatchHistory(videoId, watchedDuration, currentTime);
                    lastUpdateTimeRef.current = currentTime;
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [updateWatchHistory, videoId]);

    React.useEffect(() => {
        addToWatchHistory(videoId);
    }, []);

    return (
        <div id="video-container" className="w-full aspect-video">
            <CldVideoPlayer
                className="rounded-xl border-2 border-primary/20"
                src={video.videoUrls.publicId || video.videoUrls.originalVideoUrl}
                poster={video?.thumbnail?.publicId || video?.thumbnail?.url || video.thumbnailUrl}
                controls
                width="1920"
                height="1080"
                videoRef={videoRef}
                onMetadataLoad={({ player }: { player: any }) => {
                    lastUpdateTimeRef.current = player.currentTime();
                }}
                onPlay={({ player }: { player: any }) => {}}
                onPause={({ player }: { player: any }) => {}}
                onEnded={({ player }: { player: any }) => {
                    const currentTime = player.currentTime();
                    playDurationRef.current = currentTime - lastUpdateTimeRef.current;
                    lastUpdateTimeRef.current = currentTime;
                    updateWatchHistory(video._id, playDurationRef.current, currentTime);
                }}
                logo={{
                    logo: true,
                    imageUrl: `${video.owner.avatarUrl || NO_THUMBNAIL_URL}`,
                    onClickUrl: `/@${video.owner.username}`,
                }}
            />
        </div>
    );
};
