"use client";

import * as React from "react";

import { TVideo } from "@/lib/types";
import { useRouter } from "next/navigation";
import { getVideoByIdService } from "@/services/videos.services";
import { VideoEditForm } from "../../_components/video-edit-form";
import { useExtractSearchParams } from "@/hooks/use-extract-search-params";

export default function PublishPage() {
    const router = useRouter();
    const searchParams = useExtractSearchParams({ queryKeys: ["videoId"] });
    const [videoData, setVideoData] = React.useState<TVideo>();

    React.useEffect(() => {
        const id = searchParams.videoId;
        if (searchParams?.videoId) {
            getVideoByIdService(searchParams?.videoId).then((res) => {
                setVideoData(res.video);
            });
            router.replace("/channel/@me/publish");
        } else {
            router.replace("/channel/@me?tab=upload");
        }
    }, []);

    if (!videoData) {
        return null;
    }

    return <VideoEditForm videoData={videoData} formType="Publish" />;
}
