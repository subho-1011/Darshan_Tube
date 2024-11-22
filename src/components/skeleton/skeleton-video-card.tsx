"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";

export const SkeletonVideoCard = () => {
    return (
        <div className="space-y-2 border rounded-md p-2 border-muted border-opacity-50">
            <Skeleton className="w-full aspect-video" />
            <Skeleton className="w-full h-8" />
            <div className="flex gap-2">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="w-full flex flex-col gap-1">
                    <Skeleton className="w-1/2 h-6" />
                    <Skeleton className="w-1/3 h-4" />
                    <div className="flex gap-2">
                        <Skeleton className="w-10 h-3" />
                        <Skeleton className="w-10 h-3" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonVideoCard;
