"use client";

import { TVideoCard } from "@/lib/types";
import { VideoCardWrapper } from "@/components/videos";
import { IMoreButton } from "@/components/common/more-button";

export const HomeVideoCard: React.FC<{
    video: TVideoCard;
}> = ({ video }) => {
    const moreButtons: IMoreButton[] = [];

    return (
        <div>
            <VideoCardWrapper video={video} moreButtons={moreButtons} />
        </div>
    );
};
