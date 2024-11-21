"use client";

import React from "react";
import { formatDate } from "date-fns";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/common/avatar";
import { Loader2, SendHorizonalIcon, TrashIcon } from "lucide-react";

import { toast } from "@/hooks/use-toast";
import { TCommunityCommentData } from "@/lib/types";
import { useSession } from "@/context/session-provider";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createCommentOfCommunityPost,
    deleteCommentOfCommunityPost,
    getCommentsOfCommunityPost,
} from "@/services/community.services";

interface ICommunityPostCommentsProps {
    postId: string;
}

export const CommunityPostComments: React.FC<ICommunityPostCommentsProps> = ({ postId }) => {
    const { data } = useInfiniteQuery({
        queryKey: ["community-post-comments", postId],
        queryFn: ({ pageParam = 1 }) => getCommentsOfCommunityPost(postId, pageParam),
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.metadata.page < lastPage.metadata.total) {
                return pages.length + 1;
            }
            return undefined;
        },
        retry: false,
        refetchOnWindowFocus: false,
        initialPageParam: 1,
    });

    const comments = data?.pages.flatMap((page) => page.comments) || [];

    return (
        <div>
            <h1 className="text-xl font-semibold">Comments</h1>
            <CommentForm postId={postId} />
            <div className="overflow-y-scroll max-h-[30rem]">
                {comments.map((comment) => (
                    <CommentCard key={comment._id} comment={comment} postId={postId} />
                ))}
            </div>
        </div>
    );
};

/**
 * ====================== CommentForm ======================
 */

const CommentForm: React.FC<{ postId: string }> = ({ postId }) => {
    const [text, setText] = React.useState("");
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationKey: ["create-community-comment"],
        mutationFn: (text: string) => createCommentOfCommunityPost(postId, text),
        onSuccess: () => {
            setText("");
            queryClient.invalidateQueries({ queryKey: ["community-post-comments"] });
            toast({ description: "Comment added successfully", variant: "primary" });
        },
        onError: (error) => {
            toast({ description: error.message, variant: "destructive" });
        },
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text) {
            toast({ description: "Write something to comment!", variant: "destructive" });
            return;
        }

        mutate(text);
    };

    return (
        <div>
            <form className="flex gap-2 my-2" onSubmit={onSubmit}>
                <Input
                    type="text"
                    className="border-0 border-b-2 border-warning"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a comment"
                />
                <Button variant="outline" size="icon" type="submit">
                    <SendHorizonalIcon />
                </Button>
            </form>
        </div>
    );
};

/**
 * ====================== Comment Card ======================
 */
const CommentCard: React.FC<{ comment: TCommunityCommentData; postId: string }> = ({ comment, postId }) => {
    const { session } = useSession();
    const queryClient = useQueryClient();

    const { mutate: deleteComment, isPending } = useMutation({
        mutationKey: ["delete-community-comment", comment._id],
        mutationFn: () => deleteCommentOfCommunityPost(postId, comment._id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["community-post-comments"] });
            toast({ description: "Comment deleted successfully", variant: "primary" });
        },
        onError: (error) => {
            toast({ description: error.message, variant: "destructive" });
        },
    });

    return (
        <div key={comment._id} className="flex flex-col w-full gap-1 p-1 group border-2 rounded-md my-1">
            <div className="flex gap-2 items-center justify-between">
                <div className="flex gap-2 flex-shrink-0">
                    <UserAvatar
                        user={comment.owner}
                        className="ring-1 ring-primary/50 shadow-md shadow-primary/30 w-7 h-7"
                    />
                    <div>
                        <h3 className="text-muted-foreground">{comment.owner.name}</h3>
                        <p className="text-xs text-muted-foreground">
                            {formatDate(comment.createdAt, "hh:mm a, MMM dd yyyy")}
                        </p>
                    </div>
                </div>
                {comment.owner._id === session?.user?._id && (
                    <Button
                        variant="outline"
                        size="icon"
                        type="button"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        onClick={() => deleteComment()}
                    >
                        {isPending ? (
                            <Loader2 className="w-4 h-4" />
                        ) : (
                            <TrashIcon className="w-4 h-4 text-destructive" />
                        )}
                    </Button>
                )}
            </div>
            <p className="pl-8">{comment.text}</p>
        </div>
    );
};
