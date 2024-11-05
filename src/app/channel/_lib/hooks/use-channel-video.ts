import React from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { deleteVideo, toggleVideoVisibility, uploadOrChangeThumbnail } from "@/store/thunk-api/channel.thunk-api";

export const useChannelVideo = (videoId: string) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const thumbnailInputRef = React.useRef<HTMLInputElement>(null);

    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

    const openDeleteModalHandler = (bool: boolean) => setOpenDeleteModal(bool);

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["delete-video"],
        mutationFn: (videoId: string) => {
            return dispatch(deleteVideo({ videoId })).unwrap();
        },
        onSuccess: () => {
            toast({
                title: "Video deleted",
                description: "Video has been deleted successfully",
            });
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete video",
            });
        },
    });

    const deleteVideoHandler = async () => await mutateAsync(videoId);

    const onClickEdit = () => router.push(`/channel/@me/videos?videoId=${videoId}&edit=true`);

    const onUpdateThumbnail = async () => {
        const file = thumbnailInputRef.current?.files?.[0];
        if (!file) return;

        const data = new FormData();
        data.set("thumbnail", file);

        await dispatch(uploadOrChangeThumbnail({ videoId, data }))
            .unwrap()
            .then(() => {
                toast({
                    title: "Thumbnail updated",
                    description: "Thumbnail has been updated successfully",
                });
            })
            .catch((err) => {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: err.message || "Failed to update thumbnail",
                });
            })
            .finally(() => {
                if (thumbnailInputRef.current?.files) {
                    thumbnailInputRef.current.files = null;
                }
            });
    };

    const onChangePrivacy = () => dispatch(toggleVideoVisibility({ videoId }));

    return {
        deleteVideoHandler,
        isPending,
        openDeleteModal,
        openDeleteModalHandler,
        onClickEdit,
        onChangePrivacy,
        thumbnailInputRef,
        onUpdateThumbnail,
    };
};
