"use client";

import React from "react";
import { TWatchHistory } from "@/lib/types";
import { useWatchHistory } from "@/hooks/watch-history";
import { WatchHistoryVideoCard } from "@/components/videos";
import { ContentLoader, PaginationWrapper } from "@/components/common";

export default function WatchHistoryPage() {
    const { watchHistorys, page, totalPage, onChangePage } = useWatchHistory();

    return (
        <React.Suspense fallback={<ContentLoader />}>
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
