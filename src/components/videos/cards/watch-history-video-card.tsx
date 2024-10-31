"use client";

import { TVideoCard } from "@/lib/types";
import { VideoCardWrapper } from "@/components/videos/cards";
import { ClockIcon, PlusIcon, TrashIcon } from "lucide-react";
import { IMoreButton } from "@/components/common/more-button";

export const WatchHistoryVideoCard: React.FC<{
    video: TVideoCard;
}> = ({ video }) => {
    const moreButtons: IMoreButton[] = [
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
        {
            label: "Delete from watch history",
            icon: <TrashIcon className="w-4 h-4" />,
            onClick: () => {},
        },
    ];

    return (
        <div>
            <VideoCardWrapper video={video} moreButtons={moreButtons} />
        </div>
    );
};
