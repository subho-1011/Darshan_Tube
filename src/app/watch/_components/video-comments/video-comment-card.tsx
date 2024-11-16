"use client";

import React from "react";
import { TVideoComment } from "@/lib/types";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/common/avatar";
import { CommentInputForm } from "@/components/comments";
import { ShowIf, ShowIfNot } from "@/components/common/show";
import { DeleteConfirmationModal } from "@/components/common";
import { Edit3Icon, Heart, LucideTrash2, MoreVerticalIcon } from "lucide-react";

import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "@/context/session-provider";
import { cn, timeAgo, useAppDispatch, useAppSelector } from "@/lib/utils";
import { deleteComment, toggleCommentLike, updateComment } from "@/store/thunk-api/videodata.thunk-api";

const VideoCommentCard: React.FC<{ comment: TVideoComment }> = ({ comment }) => {
    const dispatch = useAppDispatch();

    const { session } = useSession();
    const { videoId } = useAppSelector((state) => state.videoData);
    const isVideoOwner = useAppSelector((state) => state.videoData.video?.owner._id === session?.user?._id);

    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

    const { mutate, isPending, isSuccess } = useMutation({
        mutationKey: ["edit-video-comment"],
        mutationFn: (data: { videoId: string; commentId: string; text: string }) =>
            dispatch(updateComment(data)).unwrap(),
        onSuccess: () => {
            toast({ variant: "success", description: "Comment updated successfully" });
            setIsEditing(false);
        },
        onError: (error) => {
            toast({ variant: "destructive", description: error.message });
        },
    });

    const handleEdit = (data: { text: string }) => {
        if (data.text === comment.text) {
            setIsEditing(false);
            return;
        }

        if (!videoId) return;

        mutate({ videoId, commentId: comment._id, text: data.text });
    };

    const handleLike = () => {
        if (!videoId) return;

        dispatch(toggleCommentLike({ videoId, commentId: comment._id }));
    };

    const { mutate: deleteCommentMutate } = useMutation({
        mutationKey: ["delete-video-comment"],
        mutationFn: (data: { videoId: string; commentId: string }) => dispatch(deleteComment(data)).unwrap(),
        onSuccess: () => {
            toast({ variant: "success", description: "Comment deleted successfully" });
        },
        onError: (error) => {
            toast({ variant: "destructive", description: error.message });
        },
    });

    const handleDelete = () => {
        if (!videoId) return;

        deleteCommentMutate({ videoId, commentId: comment._id });
    };

    return (
        <div className="flex justify-between gap-4 group">
            <div className="flex w-full gap-2">
                <UserAvatar user={comment.owner} />
                <div className="w-full">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-base text-muted-foreground">@{comment.owner.username}</span>
                        {comment.isEdited && <span className="text-xs text-muted-foreground">(edited)</span>}
                        <span className="text-xs text-muted-foreground/50">{timeAgo(comment.createdAt)}</span>
                    </div>
                    <ShowIf when={isEditing}>
                        <CommentInputForm
                            isPending={isPending}
                            isSuccess={isSuccess}
                            text={comment.text}
                            onSubmit={handleEdit}
                        />
                    </ShowIf>
                    <ShowIfNot when={isEditing}>
                        <p>{comment.text}</p>
                    </ShowIfNot>
                    <div className="flex justify-start items-center space-x-2 mt-3">
                        <span className="text-sm">{comment.likes}</span>
                        <Button variant="trasparent" size="icon" className="border-none p-0" onClick={handleLike}>
                            <Heart
                                className={cn(comment.isLiked && "fill-primary text-primary shadow-2xl shadow-primary")}
                            />
                        </Button>
                        <Button variant="link">
                            <span className="text-sm">reply</span>
                        </Button>
                    </div>
                </div>
            </div>
            <ShowIf when={isVideoOwner || comment.isOwner}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        >
                            <MoreVerticalIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setIsEditing(true)}>
                            <Edit3Icon className="mr-2" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsDeleting(true)}>
                            <LucideTrash2 className="mr-2" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </ShowIf>
            <DeleteConfirmationModal
                open={isDeleting}
                onOpenChange={setIsDeleting}
                deleteType="comment"
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default VideoCommentCard;
