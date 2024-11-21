"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const RandomNum = Math.floor(Math.random() * 100);

export const CommunityCardSkeleton: React.FC = () => {
    return (
        <Skeleton className="w-full max-w-xl rounded-xl px-4 py-2 border-2 border-primary/20 shadow-xl shadow-primary/10">
            <div className="flex items-center gap-2 my-2 justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex-shrink-0">
                        <Skeleton className="w-10 h-10 rounded-full" />
                    </div>
                    <div>
                        <Skeleton className="w-28 h-4 mb-1" />
                        <Skeleton className="w-20 h-4" />
                    </div>
                </div>
                <Skeleton className="w-8 h-8 rounded-sm justify-items-end" />
            </div>
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4 my-1" />
            <Skeleton className="w-full h-4" />
            {RandomNum % 3 === 0 && <Skeleton className="w-full aspect-video my-1" />}
        </Skeleton>
    );
};

export const CommunityPageSkeleton: React.FC = () => {
    return (
        <div className="w-full flex flex-col items-center space-y-4 my-4">
            {[...Array(10)].map((_, index) => (
                <CommunityCardSkeleton key={index} />
            ))}
        </div>
    );
};
