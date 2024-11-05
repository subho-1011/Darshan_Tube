"use client";

import { z } from "zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VideoMetaDataFormSchema } from "@/lib/validators/videos-validations";

import { TVideo } from "@/lib/types";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { publishVideoByVideoIdService, uploadOrUpdateThumbnailService } from "@/services/videos.services";
import { useAppDispatch } from "@/lib/utils";
import { publishVideo, updateVideoMetadata } from "@/store/thunk-api/channel.thunk-api";

export const useVideoEditForm = (videoData: TVideo, formType: "Edit" | "Publish") => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [tag, setTag] = React.useState<string>("");
    const [thumbnailUrl, setThumbnailUrl] = React.useState<string>(videoData?.thumbnailUrl || "");
    const [isThumbnailUploading, setIsThumbnailUploading] = React.useState<boolean>(false);

    const form = useForm<z.infer<typeof VideoMetaDataFormSchema>>({
        resolver: zodResolver(VideoMetaDataFormSchema),
        defaultValues: {
            title: videoData?.title,
            description: videoData?.description,
            category: videoData?.category,
            tags: videoData?.tags,
            isPublished: true,
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: z.infer<typeof VideoMetaDataFormSchema>) => {
            if (formType === "Publish") {
                return dispatch(publishVideo({ videoId: videoData?._id, data })).unwrap();
            }

            return dispatch(updateVideoMetadata({ videoId: videoData?._id, data: { ...data } })).unwrap();
        },

        mutationKey: ["publish-video"],
        onSuccess: (res) => {
            toast({
                title: "Success",
                description: "Video published successfully",
            });

            // clear the form
            form.reset();

            // push to watch page
            router.push(`/channel/@me`);
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message || "Failed to publish video",
            });
        },
    });

    const onSubmit = (data: z.infer<typeof VideoMetaDataFormSchema>) => {
        mutate(data);
    };

    const onChangeThumbnail = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const thumbnail = event?.target?.files?.[0];

        if (!thumbnail) return;
        setIsThumbnailUploading(true);
        setThumbnailUrl(URL.createObjectURL(thumbnail));

        const formData = new FormData();
        formData.set("thumbnail", thumbnail);

        try {
            const res = await uploadOrUpdateThumbnailService(videoData?._id, formData);

            const newThumbnailUrl = res.video.thumbnailUrl;
            setThumbnailUrl(newThumbnailUrl);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to upload thumbnail",
            });
        } finally {
            setIsThumbnailUploading(false);
        }
    };

    const onTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && tag !== "") {
            e.preventDefault();

            const tags = form.getValues("tags") || [];

            if (tags.includes(tag)) {
                form.setError("tags", {
                    type: "custom",
                    message: "Tag already exists",
                });
                return;
            }

            form.setValue("tags", [...tags, tag]);
            setTag("");
        }
    };

    return {
        form,
        onSubmit,
        onChangeThumbnail,
        onTagInputKeyDown,
        tag,
        setTag,
        thumbnailUrl,
        setThumbnailUrl,
        isThumbnailUploading,
        isPending,
    };
};
