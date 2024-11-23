"use client";

import * as React from "react";
import { Skeleton } from "../ui/skeleton";

export const SearchVideoSkeletonCard = () => {
    return (
        <div className="flex max-w-2xl border rounded-md p-2 border-muted">
            <div className="basis-1/2">
                <Skeleton className="w-full aspect-video" />
            </div>
            <div className="basis-1/2 pl-4">
                <Skeleton className="h-1/6 mb-2" />
                <Skeleton className="h-[12%] w-2/3 mb-2" />
                <Skeleton className="h-[12%] w-1/2 mb-2" />
                <div className="flex w-full py-2 gap-4">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-5 w-1/3" />
                </div>
            </div>
        </div>
    );
};

export const SearchVideosSkeleton = () => {
    return (
        <div className="w-full py-4 px-2 flex flex-col gap-3 md:gap-6">
            {[...Array(5)].map((_, index) => (
                <SearchVideoSkeletonCard key={index} />
            ))}
        </div>
    );
};
