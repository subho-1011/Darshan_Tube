"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";
import { VideosSkeleton } from "./videos-skeleton";

export const PageSkeleton = () => {
    return (
        <div className="page-skeleton">
            <header className="header-skeleton">
                <div className="h-16 mb-4 flex items-center justify-between px-12 border-b">
                    <Skeleton className="h-12 w-40" />
                    <Skeleton className="max-w-md w-full h-12 rounded-3xl mx-4" />
                    <div className="gap-3 hidden md:flex">
                        <Skeleton className="h-12 w-12" />
                        <Skeleton className="h-12 w-12 rounded-full" />
                    </div>
                </div>
            </header>
            <main className="main-skeleton flex">
                <div className="sidebar-skeleton hidden md:block mr-4 border-r space-y-3 px-2">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-auto w-64" />
                </div>
                <VideosSkeleton />
            </main>
        </div>
    );
};
