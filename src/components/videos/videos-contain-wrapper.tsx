"use client";

import { cn } from "@/lib/utils";
import { TVideoCard } from "@/lib/types";

interface TVideosContainWrapper {
    children?: React.ReactNode;
    className?: string;
    gridClassName?: string;
    videos: TVideoCard[];
    videoCard: (video: TVideoCard) => React.ReactNode;
}

export const VideosContainWrapper: React.FC<TVideosContainWrapper> = ({
    className,
    videos,
    videoCard,
    gridClassName,
}) => {
    return (
        <div className={cn("w-full", className)}>
            <div className="w-full container mx-auto">
                <div
                    className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", gridClassName)}
                >
                    {videos.map((video) => (
                        <span key={video._id}>{videoCard(video)}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};
