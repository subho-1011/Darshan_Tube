"use client";

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuSub,
    ContextMenuCheckboxItem,
    ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import { ThumbnailImage } from "@/components/videos";
import { DeleteConfirmationModal } from "@/components/common";
import {
    Dot,
    Edit3Icon,
    EyeIcon,
    GalleryThumbnailsIcon,
    LockKeyholeIcon,
    LockOpenIcon,
    LogsIcon,
    Trash2Icon,
} from "lucide-react";

import { TVideo } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useChannelVideo } from "../_lib/hooks/use-channel-video";
import { cn, durationDisplay, timeAgo, viewsDisplay } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ShowIfElse } from "@/components/common/show";
import { Button } from "@/components/ui/button";
import React from "react";

interface ChannelVideoCardProps {
    video: TVideo;
}

interface ChannelVideoCardContentProps extends ChannelVideoCardProps {
    isPending?: boolean;
}

export const ChannelVideoCard: React.FC<ChannelVideoCardProps> = ({ video }) => {
    const {
        openDeleteModal,
        openDeleteModalHandler,
        deleteVideoHandler,
        onClickEdit,
        onChangePrivacy,
        onUpdateThumbnail,
        thumbnailInputRef,
        isPending,
    } = useChannelVideo(video._id);

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <ChannelVideoCardContent video={video} isPending={isPending} />
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
                <ContextMenuItem onClick={() => thumbnailInputRef.current?.click()}>
                    <GalleryThumbnailsIcon className="h-4 w-4 mr-2" aria-hidden="true" /> Change thumbnail
                </ContextMenuItem>
                <ContextMenuSub>
                    <ContextMenuSubTrigger>
                        <LockKeyholeIcon className="h-4 w-4 mr-2" aria-hidden="true" /> Privacy
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent>
                        <ContextMenuCheckboxItem onClick={onChangePrivacy} checked={video.isPublic}>
                            Public
                        </ContextMenuCheckboxItem>
                        <ContextMenuCheckboxItem onClick={onChangePrivacy} checked={!video.isPublic}>
                            Private
                        </ContextMenuCheckboxItem>
                    </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSub>
                    <ContextMenuSubTrigger>
                        <EyeIcon className="h-4 w-4 mr-2" aria-hidden="true" /> Status
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent>
                        <ContextMenuCheckboxItem onClick={() => {}} checked={video.status === "published"}>
                            Published
                        </ContextMenuCheckboxItem>
                        <ContextMenuCheckboxItem onClick={() => {}} checked={video.status === "draft"}>
                            Draft
                        </ContextMenuCheckboxItem>
                        <ContextMenuCheckboxItem
                            onClick={onChangePrivacy}
                            disabled
                            checked={video.status === "unpublished"}
                        >
                            Unpublished
                        </ContextMenuCheckboxItem>
                    </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={onClickEdit}>
                    <Edit3Icon className="h-4 w-4 mr-2" aria-hidden="true" /> Edit
                </ContextMenuItem>
                <ContextMenuItem onClick={() => openDeleteModalHandler(true)}>
                    <Trash2Icon className="h-4 w-4 mr-2" aria-hidden="true" />
                    Delete
                </ContextMenuItem>
            </ContextMenuContent>
            <DeleteConfirmationModal
                open={openDeleteModal}
                onOpenChange={openDeleteModalHandler}
                deleteType="video"
                onConfirm={deleteVideoHandler}
            />
            <Input
                type="file"
                accept="image/*"
                ref={thumbnailInputRef}
                className="hidden"
                onChange={onUpdateThumbnail}
            />
        </ContextMenu>
    );
};

const ChannelVideoCardContent: React.FC<ChannelVideoCardContentProps> = ({ video, isPending }) => {
    const router = useRouter();

    return (
        <div
            className={cn(
                "w-full group flex flex-col justify-between border rounded-md p-4 hover:border-primary hover:shadow-lg hover:shadow-primary/25 hover:bg-primary/20 hover:cursor-pointer transition-all duration-500 delay-200",
                isPending && "animate-pulse-slow"
            )}
            onClick={() => router.push(`/channel/@me/videos?videoId=${video._id}`)}
            id={video._id}
        >
            <div className="flex justify-between">
                <div className="w-3/6 space-y-2">
                    <h1 className="truncate line-clamp-1" aria-label={video.title} id="video-title">
                        {video.title}
                    </h1>
                    <span className="text-xs text-muted-foreground inline-flex items-center">
                        <ShowIfElse
                            when={video.isPublic}
                            ifTrue={
                                <Badge variant="success">
                                    <LockOpenIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                                    Public
                                </Badge>
                            }
                            ifFalse={
                                <Badge variant="error">
                                    <LockKeyholeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                                    Private
                                </Badge>
                            }
                        />
                        <Dot />
                        <ShowIfElse
                            when={video.status === "published"}
                            ifTrue={<Badge variant="success">Published</Badge>}
                            ifFalse={
                                <Badge variant="error">
                                    {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                                </Badge>
                            }
                        />
                    </span>
                    <div className="text-xs text-muted-foreground">{timeAgo(video.createdAt)}</div>
                </div>
                <ThumbnailImage
                    className="w-1/6 border border-secondary-foreground"
                    src={video.thumbnail?.url}
                    alt={video.title}
                />
                <div className="text-sm flex flex-col gap-1">
                    <span>{viewsDisplay(video.views)} views</span>
                    <span>{durationDisplay(video.duration)}</span>
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150"
                    id="video-context-menu-button"
                    aria-label="video context menu"
                    onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById(video._id)?.dispatchEvent(
                            new MouseEvent("contextmenu", {
                                bubbles: true,
                                cancelable: true,
                                view: window,

                                clientX: e.clientX,
                                clientY: e.clientY,
                            })
                        );
                    }}
                >
                    <LogsIcon className="h-4 w-4" aria-hidden="true" />
                </Button>
            </div>
        </div>
    );
};
