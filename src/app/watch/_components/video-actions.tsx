"use client";

import React from "react";
import { TVideoData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { MoreButtons } from "@/components/common";
import { ClockIcon, PlusIcon } from "lucide-react";
import { UserAvatar } from "@/components/common/avatar";
import { SubscribeButton, VideoLikedButton, VideoShareButton } from "./buttons";

const VideoActionsSection: React.FC<{
    video: TVideoData;
}> = ({ video }) => {
    return (
        <React.Fragment>
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-2">{video?.title}</h1>
                <MoreButtons
                    className="static"
                    buttons={[
                        {
                            label: "Add to playlist",
                            icon: <PlusIcon className="w-4 h-4" />,
                            onClick: () => {},
                        },
                        {
                            label: "Add to watch later",
                            icon: <ClockIcon className="w-4 h-4" />,
                            onClick: () => {},
                        },
                    ]}
                />
            </div>
            <div className="flex items-center justify-between mb-4">
                <div className="flex gap-3">
                    <ChannelInfo video={video} />
                    <SubscribeButton channelId={video?.owner._id} isSubscribed={video?.owner.isSubscribed} />
                </div>
                <div className="flex gap-3">
                    <VideoLikedButton videoId={video?._id} isLiked={video.isLiked} likes={video.likes} />
                    <VideoShareButton />
                </div>
            </div>
        </React.Fragment>
    );
};

const ChannelInfo: React.FC<{
    video: TVideoData;
}> = ({ video }) => {
    const owner = video?.owner;

    return (
        <div className="flex items-center gap-2">
            <UserAvatar user={owner} />
            <div>
                <h3 className="text-sm font-medium">{owner?.name}</h3>
                <p className="text-xs text-muted-foreground">{formatNumber(owner.subscribers)} subscribers</p>
            </div>
        </div>
    );
};

export { VideoActionsSection };
