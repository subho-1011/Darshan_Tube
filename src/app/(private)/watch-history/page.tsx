"use client";

import React from "react";
import { TWatchHistory } from "@/lib/types";
import { useWatchHistory } from "@/hooks/watch-history";
import { WatchHistoryVideoCard } from "@/components/videos";
import { PaginationWrapper } from "@/components/common";
import { VideosSkeleton } from "@/components/skeleton";
import ErrorPage from "@/components/common/error-page";

export default function WatchHistoryPage() {
    const { isLoading, error, watchHistorys, page, totalPage, onChangePage } = useWatchHistory();

    if (isLoading) return <VideosSkeleton />;
    if (error) return <ErrorPage error={error} />;

    return (
        <React.Suspense fallback={<VideosSkeleton />}>
            <PaginationWrapper page={page} totalPage={totalPage} onChange={onChangePage}>
                <WatchHistoryPageContainer watchHistorys={watchHistorys} />
            </PaginationWrapper>
        </React.Suspense>
    );
}

function WatchHistoryPageContainer({ watchHistorys }: { watchHistorys: TWatchHistory[] }) {
    return (
        <div className="w-full container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {watchHistorys.map((watchHistory) => (
                    <WatchHistoryVideoCard
                        key={watchHistory._id}
                        video={watchHistory.video}
                        lastWatchedAt={watchHistory.lastWatchedAt}
                    />
                ))}
            </div>
        </div>
    );
}
