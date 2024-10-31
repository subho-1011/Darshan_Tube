"use client";

import { TVideoCard } from "@/lib/types";
import { VideoCardWrapper } from "@/components/videos";
import { ClockIcon, PlusIcon } from "lucide-react";
import { IMoreButton } from "@/components/common/more-button";

export const HomeVideoCard: React.FC<{
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
    ];

    return (
        <div>
            <VideoCardWrapper video={video} moreButtons={moreButtons} />
        </div>
    );
};
