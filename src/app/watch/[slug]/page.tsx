"use client";

import * as React from "react";
import { ContentLoader } from "@/components/common";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/lib/utils";
import { fetchVideoData } from "@/store/thunk-api/videodata.thunk-api";
import { VideoActionsSection, VideoDescription, VideoCommentsSection, VideoPlayer } from "../_components";

const WatchPage: React.FC<{
    params: { slug: string };
}> = ({ params }) => {
    const { slug } = params;
    const dispatch = useAppDispatch();
    const video = useAppSelector((state) => state.videoData.video);

    const { isPending, isError, error } = useSuspenseQuery({
        queryKey: ["video-by-slug", slug],
        queryFn: () => dispatch(fetchVideoData({ slug })).unwrap(),
    });

    if (isError || !video) {
        return (
            <div>
                <h1>{error?.name}</h1>
                <p>{error?.message}</p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col gap-4 w-full lg:w-3/4">
                <React.Suspense fallback={<ContentLoader />}>
                    <VideoPlayer video={video} />
                    <VideoActionsSection video={video} />
                    <VideoDescription video={video} />
                </React.Suspense>
                <VideoCommentsSection videoId={video._id} />
            </div>
            <aside className="w-full lg:w-1/4">{/* Related videos component */}</aside>
        </div>
    );
};

export default WatchPage;
