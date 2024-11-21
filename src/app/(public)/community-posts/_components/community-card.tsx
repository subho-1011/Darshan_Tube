"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "date-fns";

import { toast } from "@/hooks/use-toast";
import { cn, formatNumber } from "@/lib/utils";
import { TCommunityPostData } from "@/lib/types";

import {
    CircleAlertIcon,
    Edit3Icon,
    Heart,
    MessageCircleIcon,
    MoreVerticalIcon,
    SendIcon,
    Trash2Icon,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ShowIf } from "@/components/common/show";
import { UserAvatar } from "@/components/common/avatar";

import { useSession } from "@/context/session-provider";
import { likeCommunityPost } from "@/services/community.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const UserInfo: React.FC<{ post: TCommunityPostData }> = ({ post }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="flex-shrink-0">
                <UserAvatar user={post.owner} className="ring-1 ring-primary/50 shadow-md shadow-primary/30" />
            </div>
            <Link href={`@${post.owner.username}`}>
                <h3>
                    {post.owner.name}
                    {post.isEdited && <span className="text-xs text-muted-foreground"> (edited)</span>}
                </h3>
                <p className="text-xs text-muted-foreground">{formatDate(post.createdAt, "hh:mm a, MMM dd yyyy")}</p>
            </Link>
        </div>
    );
};

const CommunityCardHeader: React.FC<{
    post: TCommunityPostData;
    moreHover: boolean;
    setMoreHover: React.Dispatch<React.SetStateAction<boolean>>;
    setEditPostId: React.Dispatch<React.SetStateAction<string | null>>;
    onChangeModal: (postId: string | null) => void;
}> = ({ post, moreHover, setMoreHover, setEditPostId }) => {
    const { session } = useSession();

    return (
        <div className="flex justify-between">
            <UserInfo post={post} />
            <DropdownMenu open={moreHover} onOpenChange={(val) => setMoreHover(val)}>
                <DropdownMenuTrigger>
                    <Button
                        variant="trasparent"
                        size="sm"
                        className={cn(
                            "group-hover:opacity-100 opacity-0 transition-opacity duration-500",
                            moreHover && "opacity-100"
                        )}
                    >
                        <MoreVerticalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <CircleAlertIcon className="mr-2" />
                        <span>Report</span>
                    </DropdownMenuItem>
                    <ShowIf when={session?.user?._id === post.owner._id}>
                        <DropdownMenuItem onClick={() => setEditPostId(post._id)}>
                            <Edit3Icon className="mr-2" />
                            <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Trash2Icon className="mr-2" />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </ShowIf>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

interface ICommunityCardContentProps extends React.HTMLProps<HTMLDivElement> {
    post: TCommunityPostData;
}

const CommunityCardContent: React.FC<ICommunityCardContentProps> = ({ post, ...props }) => {
    return (
        <div {...props}>
            {/* Content */}
            <p className="text-base py-2 px-2">{post.content}</p>
            {/* Image */}
            {post.image && (
                <Image
                    src={post.image.url}
                    alt={post.image.publicId}
                    width={200}
                    height={200}
                    className="w-full max-h-96 rounded-md border-2 border-primary/30 my-2 object-cover bg-primary/10 animate-pulse"
                    onLoadingComplete={(e) => e.classList.remove("animate-pulse")}
                />
            )}
        </div>
    );
};

const CommunityCardFooter: React.FC<{
    post: TCommunityPostData;
    toggleLikeOfPost: () => void;
    openModal: () => void;
}> = ({ post, toggleLikeOfPost, openModal }) => {
    return (
        <div className="px-2 my-2 flex justify-between items-center">
            <div className="items-center flex">
                <Button variant="trasparent" size="sm" type="button" onClick={() => toggleLikeOfPost()}>
                    <Heart className={cn(post.isLiked && "fill-warning text-warning")} />
                </Button>
                <span className="ml-1 text-sm text-primary">{formatNumber(post.likes)}</span>
            </div>
            <div className="items-center flex gap-1">
                <Button variant="trasparent" size="sm" onClick={openModal}>
                    <MessageCircleIcon />
                </Button>
                <span className="text-sm text-primary">{formatNumber(post.comments)}</span>
            </div>
            <Button variant="trasparent" size="sm">
                <SendIcon />
            </Button>
        </div>
    );
};

const CommunityCardDisplay: React.FC<{
    post: TCommunityPostData;
    onChangeModal: (postId: string | null) => void;
    setEditPostId: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ post, onChangeModal, setEditPostId }) => {
    const [moreHover, setMoreHover] = React.useState(false);

    const queryClient = useQueryClient();

    const { mutate: toggleLikeOfPost } = useMutation({
        mutationKey: ["like-community-post", post._id],
        mutationFn: () => likeCommunityPost(post._id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["community-posts"] });
            toast({
                description: post.isLiked ? "Post like removed successfully" : "Post liked successfully",
                variant: "primary",
            });
        },
        onError: (error) => {
            toast({ description: error.message, variant: "destructive" });
        },
    });

    const openModal = () => {
        onChangeModal(post._id);
    };

    return (
        <div className="cursor-pointer group h-fit w-full max-w-xl rounded-xl px-4 py-2 border-2 border-primary/50 dark:border-primary/20 shadow-xl shadow-primary/15 dark:shadow-primary/10">
            <CommunityCardHeader
                post={post}
                moreHover={moreHover}
                setMoreHover={setMoreHover}
                setEditPostId={setEditPostId}
                onChangeModal={onChangeModal}
            />
            <CommunityCardContent post={post} onClick={openModal} />
            <CommunityCardFooter post={post} openModal={openModal} toggleLikeOfPost={toggleLikeOfPost} />
        </div>
    );
};

export { CommunityCardDisplay as CommunityCard };
