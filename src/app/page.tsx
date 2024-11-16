"use client";

import React from "react";
import { MAX_VIDEOS_PER_PAGE } from "@/lib/constant";
import { ContentLoader, PaginationWrapper } from "@/components/common";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllVideosService } from "@/services/videos.services";
import { HomeVideoCard, VideosContainWrapper } from "@/components/videos";

export default function Home() {
    const [page, setPage] = React.useState<number>(1);
    const onChangePage = (arg0: number) => setPage(arg0);

    const { data, error, isPending } = useSuspenseQuery({
        queryKey: ["home-video", page],
        queryFn: () => getAllVideosService(),
    });

    if (error) {
        return (
            <div>
                <h1>{error.name}</h1>
                <p>{error.message}</p>
            </div>
        );
    }

    return (
        <React.Suspense fallback={<ContentLoader />}>
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
