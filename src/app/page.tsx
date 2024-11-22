"use client";

import React from "react";
import { MAX_VIDEOS_PER_PAGE } from "@/lib/constant";

import ErrorPage from "@/components/common/error-page";
import { VideosSkeleton } from "@/components/skeleton";
import { PaginationWrapper } from "@/components/common";
import { VideosContainWrapper } from "@/components/videos";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllVideosService } from "@/services/videos.services";

const HomeVideoCard = React.lazy(() => import("@/components/videos/cards/home-video-card"));

export default function Home() {
    const [page, setPage] = React.useState<number>(1);
    const onChangePage = (arg0: number) => setPage(arg0);

    const { data, error, isPending } = useSuspenseQuery({
        queryKey: ["home-video", page],
        queryFn: () => getAllVideosService(),
    });

    if (isPending) return <VideosSkeleton />;

    if (error) return <ErrorPage error={error} />;

    return (
        <React.Suspense fallback={<VideosSkeleton />}>
            <PaginationWrapper
                page={page}
                totalPage={Math.ceil(data.totalVideos / MAX_VIDEOS_PER_PAGE)}
                onChange={onChangePage}
            >
                <VideosContainWrapper videos={data.videos} videoCard={(video) => <HomeVideoCard video={video} />} />
            </PaginationWrapper>
        </React.Suspense>
    );
}
