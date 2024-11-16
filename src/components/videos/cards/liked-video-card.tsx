"use client";

import { TVideoCard } from "@/lib/types";
import { VideoCardWrapper } from "@/components/videos";
import { TrashIcon } from "lucide-react";
import { IMoreButton } from "@/components/common/more-button";
import { timeAgo } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const LikedVideoCard: React.FC<{
    video: TVideoCard;
    likedAt: Date;
}> = ({ video, likedAt }) => {
    const moreButtons: IMoreButton[] = [
        {
            label: "Delete from liked videos",
            icon: <TrashIcon className="w-4 h-4" />,
            onClick: () => {},
        },
    ];

    return (
        <div>
            <VideoCardWrapper video={video} moreButtons={moreButtons}>
                <Badge variant="outline">Liked {timeAgo(likedAt)}</Badge>
            </VideoCardWrapper>
        </div>
    );
};
