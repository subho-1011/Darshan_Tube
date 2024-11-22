"use client";

import React from "react";

const SkeletonVideoCard = React.lazy(() => import("./skeleton-video-card"));

export const VideosSkeleton = () => {
    const [noOfSkeletons, setNoOfSkeletons] = React.useState<number>(16);

    React.useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth < 768) setNoOfSkeletons(8);
            else setNoOfSkeletons(16);
        });
    }, []);

    return (
        <div className="w-full container mx-auto">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(noOfSkeletons)].map((_, index) => (
                    <SkeletonVideoCard key={index} />
                ))}
            </div>
        </div>
    );
};
