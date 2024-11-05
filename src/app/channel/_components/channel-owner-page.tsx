"use client";

import * as React from "react";
import { TVideo } from "@/lib/types";
import { useAppSelector } from "@/lib/utils";
import { MAX_VIDEOS_PER_PAGE } from "@/lib/constant";
import { useChannelOwner } from "../_lib/hooks/use-channel-owner";

import { UploadVideoForm } from "./upload-video-form";
import { ChannelVideoCard } from "./channel-video-card";
import ContentLoader from "@/components/common/content-lodader";
import { PaginationWrapper } from "@/components/common/pagination-wrapper";

export default function ChannelOwnerPage() {
    const { isPending, currentPage, onPageChange } = useChannelOwner();
    const { upload, videos, totalVideos } = useAppSelector((state) => state.channel);

    if (upload) {
        return <UploadVideoForm />;
    }

    return (
        <div className="w-full">
            <React.Suspense fallback={<ContentLoader />}>
                <PaginationWrapper
                    page={currentPage}
                    totalPage={Math.ceil(totalVideos / MAX_VIDEOS_PER_PAGE)}
                    onChange={onPageChange}
                >
                    <ChannelUploadContents videos={videos} />
                </PaginationWrapper>
            </React.Suspense>
        </div>
    );
}

const ChannelUploadContents = ({ videos }: { videos: TVideo[] }) => {
    return (
        <section>
            <h1 className="text-2xl font-bold py-2">Uploaded Contents</h1>
            <div className="w-full flex flex-col gap-4">
                {videos.map((video) => (
                    <ChannelVideoCard key={video._id} video={video} />
                ))}
            </div>
        </section>
    );
};
