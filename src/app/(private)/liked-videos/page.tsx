"use client";

import React from "react";
import { TLikedVideo } from "@/lib/types";
import { MAX_VIDEOS_PER_PAGE } from "@/lib/constant";

import { LikedVideoCard } from "@/components/videos";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ContentLoader, PaginationWrapper } from "@/components/common";
import { getUserLikedVideosService } from "@/services/videos.services";

export default function LikedVideosPage() {
    const [page, setPage] = React.useState(1);

    const { data } = useSuspenseQuery({
        queryKey: ["liked-videos", page],
        queryFn: () => getUserLikedVideosService(page),
    });

    const likedVideos = data?.videos || [];

    return (
        <React.Suspense fallback={<ContentLoader />}>
            <PaginationWrapper
                page={page}
                totalPage={Math.ceil(data.totalVideos / MAX_VIDEOS_PER_PAGE)}
                onChange={(arg: number) => setPage(arg)}
            >
                <LikedVideosPageCotainer videos={likedVideos} />
            </PaginationWrapper>
        </React.Suspense>
    );
}

function LikedVideosPageCotainer({ videos }: { videos: TLikedVideo[] }) {
    if (!videos || videos.length === 0) {
        return <div className="text-center mt-8">No liked videos</div>;
    }
    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {videos.map((video) => (
                    <LikedVideoCard key={video._id} video={video} likedAt={video.likedAt} />
                ))}
            </div>
        </div>
    );
}
