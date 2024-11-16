"use client";

import React from "react";

import Comments from "./video-comments";
import { Button } from "@/components/ui/button";
import { ShowIf } from "@/components/common/show";
import { CommentInputForm } from "@/components/comments";

import { MAX_COMMENTS_PER_CONTENT } from "@/lib/constant";
import { useAppDispatch, useAppSelector } from "@/lib/utils";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { fetchVideoComments, postComment } from "@/store/thunk-api/videodata.thunk-api";

export const VideoCommentsSection: React.FC<{ videoId: string }> = ({ videoId }) => {
    const { totalComments } = useAppSelector((state) => state.videoData);

    const dispatch = useAppDispatch();
    const [page, setPage] = React.useState(1);

    // video comments
    const { isPending, isRefetching } = useSuspenseQuery({
        queryKey: ["video-comments", videoId, page],
        queryFn: () => dispatch(fetchVideoComments({ videoId, page })).unwrap(),
        refetchOnWindowFocus: false,
    });

    return (
        <section id="video-comments" className="mt-8 px-2">
            <h3 className="text-xl font-bold mb-4">{totalComments} comments</h3>
            <CommentInput />
            <Comments />
            <ShowIf when={totalComments > page * MAX_COMMENTS_PER_CONTENT}>
                {isRefetching && <Loader2Icon className="animate-spin mr-2" />}
                <Button variant="link" size="sm" className="text-primary" onClick={() => setPage((page) => page + 1)}>
                    Load more comments...
                </Button>
            </ShowIf>
        </section>
    );
};

/**
 * ======================== COMMENT INPUT FORM ========================
 */

import z from "zod";
import { toast } from "@/hooks/use-toast";
import { Loader2Icon } from "lucide-react";
import { CommentInputSchema } from "@/lib/validators/comments-validations";

const CommentInput = () => {
    const dispatch = useAppDispatch();
    const { videoId } = useAppSelector((state) => state.videoData);

    const { isPending, isSuccess, mutate } = useMutation({
        mutationKey: ["post-video-comment"],
        mutationFn: (data: { videoId: string; text: string }) => dispatch(postComment(data)).unwrap(),
        onSuccess: () => {
            toast({ variant: "success", description: "Comment posted successfully" });
        },
        onError: (error) => {
            toast({
                description: error?.message || "Something went wrong!",
                variant: "destructive",
            });
        },
    });

    const onSubmit = (data: z.infer<typeof CommentInputSchema>) => {
        if (!videoId) return;

        mutate({ videoId, text: data.text });
    };

    return <CommentInputForm isPending={isPending} isSuccess={isSuccess} onSubmit={onSubmit} className="mb-6" />;
};
