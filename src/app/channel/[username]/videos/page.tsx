"use client";

import React from "react";
import { TVideo } from "@/lib/types";
import { cn, useAppSelector } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { getVideoByIdService } from "@/services/videos.services";

import { ContentLoader } from "@/components/common";
import { VideoEditForm } from "../../_components/video-edit-form";

import { format } from "date-fns";

export default function ChannelVideoPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [videoId, setVideoId] = React.useState<string | null>(searchParams.get("videoId"));

    // set video id
    React.useEffect(() => {
        if (searchParams.get("videoId")) {
            setVideoId(searchParams.get("videoId"));
        } else {
            router.push("/channel/@me");
        }
    }, [searchParams, router]);

    const videoData = useAppSelector((state) => state.channel.videos.find((video) => video._id === videoId));

    // get video data
    const { data, error } = useSuspenseQuery({
        queryKey: ["video", videoId],
        queryFn: () => {
            if (videoId && videoData) {
                return { video: videoData };
            }
            return getVideoByIdService(videoId!);
        },
    });

    if (error) {
        return <div className="w-full">{error.message}</div>;
    }

    if (searchParams.get("edit") === "true" && videoData) {
        return (
            <React.Suspense fallback={<ContentLoader />}>
                <VideoEditForm videoData={data.video} formType="Edit" />
            </React.Suspense>
        );
    }

    return (
        <div className="w-full space-y-6">
            {/* Preview */}
            <React.Suspense fallback={<ContentLoader />}>
                <VideoPreview videoData={data.video} />
            </React.Suspense>
            {/* TODO: Dashboard */}
            <React.Suspense fallback={<ContentLoader />}>
                <VideoDashboard videoId={data.video._id} />
            </React.Suspense>
            {/* TODO: Comments */}
            <React.Suspense fallback={<ContentLoader />}>
                <VideoComments videoId={data.video._id} />
            </React.Suspense>
        </div>
    );
}

function VideoPreview({ videoData }: { videoData: TVideo }) {
    const [isSeenMore, setIsSeenMore] = React.useState(false);

    return (
        <section className="w-full flex border-2 rounded-lg p-4 shadow-lg space-x-4">
            <div className="w-1/2">
                {/* Title */}
                <h1 className="text-xl font-bold mb-4 line-clamp-2">{videoData.title}</h1>
                {/* Date */}
                <p className="text-sm text-muted-foreground">{format(new Date(videoData.createdAt), "dd MMM yyyy")}</p>
                {/* Description */}
                <p
                    className={cn(
                        "text-sm text-opacity-50 mt-4 transition-all duration-500",
                        !isSeenMore && "line-clamp-5"
                    )}
                >
                    {videoData.description}
                </p>
                <button
                    className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
                    onClick={() => setIsSeenMore((prev) => !prev)}
                >
                    {!isSeenMore ? "See more" : "See less"}
                </button>
            </div>
            <div className="w-1/2">
                <video
                    src={videoData.videoUrls.originalVideoUrl}
                    controls
                    className="w-full aspect-video object-cover border-2 rounded-md"
                    poster={videoData.thumbnailUrl}
                >
                    your browser does not support the video tag
                    <source src={videoData.videoUrls.originalVideoUrl} type="video/mp4" />
                </video>
            </div>
        </section>
    );
}

function VideoDashboard({ videoId }: { videoId: string }) {
    return (
        <section className="w-full flex border-2 rounded-lg p-4 shadow-lg space-x-4">
            <h1 className="text-xl font-bold">Dashboard</h1>
        </section>
    );
}

function VideoComments({ videoId }: { videoId: string }) {
    return (
        <section className="w-full flex border-2 rounded-lg p-4 shadow-lg space-x-4">
            <h1 className="text-xl font-bold">Comments</h1>
        </section>
    );
}
