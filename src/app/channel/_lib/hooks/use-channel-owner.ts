"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toggleUpload } from "@/store/slices/channel-slice";
import { getChannelVideos } from "@/store/thunk-api/channel.thunk-api";
import { useExtractSearchParams } from "@/hooks/use-extract-search-params";

export const useChannelOwner = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = React.useState<number>(1);

    const onPageChange = (page: number) => setCurrentPage(page);

    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

    const openDeleteModalHandler = (bool: boolean) => setOpenDeleteModal(bool);

    const searchParams = useExtractSearchParams({ queryKeys: ["tab"] });

    const { data, isPending } = useSuspenseQuery({
        queryKey: ["channel-videos", currentPage],
        queryFn: () => dispatch(getChannelVideos({ username: "@me", page: currentPage })).unwrap(),
        refetchOnWindowFocus: false,
    });

    React.useEffect(() => {
        if (searchParams?.tab === "upload") {
            dispatch(toggleUpload(true));
            router.replace("/channel/@me");
        }
    }, [dispatch, searchParams?.tab]);

    return {
        isPending,
        videos: data?.videos || [],
        openDeleteModal,
        setOpenDeleteModal,
        openDeleteModalHandler,
        currentPage,
        onPageChange,
    };
};
