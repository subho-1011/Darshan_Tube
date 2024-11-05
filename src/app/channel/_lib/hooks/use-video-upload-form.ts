"use client";

import * as React from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { MAX_UPLOAD_VIDEO_SIZE } from "@/lib/constant";
import { toggleUpload, uploadVideo } from "@/store/slices/channel-slice";
import { getDraftVideoService } from "@/services/videos.services";
import { api, useAppDispatch, useAppSelector } from "@/lib/utils";

export const useVideoUploadForm = () => {
    const router = useRouter();

    const dispatch = useAppDispatch();

    const videoUploadContainerRef = React.useRef<HTMLDivElement>(null);
    const videoInputRef = React.useRef<HTMLInputElement>(null);
    const [videoInput, setVideoInput] = React.useState<File | null>(null);
    const [progress, setProgress] = React.useState(0);

    const onSelectVideo = () => {
        if (videoInputRef.current?.files) {
            videoInputRef.current.files = null;
            setVideoInput(null);
        }

        videoInputRef.current?.click();
    };

    const { mutate, isPending } = useMutation({
        mutationKey: ["upload-video"],
        mutationFn: async (formData: FormData) => {
            const response = await api.post("/videos/upload", formData, {
                onUploadProgress: (e) => {
                    const total = e.total || e.lengthComputable ? e.total : videoInput?.size;
                    const percent = total && Math.round((e.loaded * 100) / total);
                    setProgress(percent || 0);
                },
            });

            return response.data;
        },

        onSuccess: (res) => {
            setProgress(0);
            toast({
                title: "Video uploaded",
                description: "Your video has been uploaded successfully.",
            });

            dispatch(uploadVideo(res.data));
            dispatch(toggleUpload());

            // push to the publish page
            router.push(`/channel/@me/publish?videoId=${res.data.video._id}`);
        },

        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Failed to upload video",
                description: error.message || "Something went wrong. Please try again.",
            });
        },
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!videoInput) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Please select a video to upload.",
            });
            return;
        }

        if (videoInput.size > MAX_UPLOAD_VIDEO_SIZE * 1024 * 1024) {
            toast({
                variant: "destructive",
                title: "Error",
                description: `Video size must be less than ${MAX_UPLOAD_VIDEO_SIZE}MB.`,
            });
            return;
        }

        const formData = new FormData();
        formData.set("video", videoInput);

        mutate(formData);
    };

    const cancelUpload = () => dispatch(toggleUpload());

    const onResetSelectedVideo = () => {
        if (videoInputRef.current?.files) {
            videoInputRef.current.files = null;
            setVideoInput(null);
        }
    };

    /**
     * user any video which is already uploaded and status is "draft"
     * then get the videoId
     * and then redirect to /channel/@me/publish?videoId=videoId
     */
    const getDraftVideo = React.useCallback(async () => {
        const res = await getDraftVideoService();

        if (res && res.video) {
            router.push(`/channel/@me/publish?videoId=${res.video._id}`);
        }
    }, [router]);

    React.useEffect(() => {
        getDraftVideo();
    }, [getDraftVideo]);

    React.useEffect(() => {
        // if click outside of container
        window.addEventListener("mousedown", (e) => {
            if (
                videoUploadContainerRef.current &&
                !videoUploadContainerRef.current.contains(e.target as Node) &&
                !isPending
            ) {
                dispatch(toggleUpload());
            }
        });
    }, []);

    return {
        videoUploadContainerRef,
        videoInputRef,
        videoInput,
        progress,
        setVideoInput,
        onSelectVideo,
        onSubmit,
        isPending,
        cancelUpload,
        onResetSelectedVideo,
    };
};
