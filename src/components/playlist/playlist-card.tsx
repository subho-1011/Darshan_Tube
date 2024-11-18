"use client";

import React from "react";
import {
    DropdownMenuCheckboxItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { LockIcon } from "lucide-react";
import { DeleteConfirmationModal } from "../common";
import { ThumbnailImage } from "@/components/videos";
import { MoreButtons } from "@/components/common/more-button";
import { PlaylistCardEditDialog } from "@/components/playlist";
import { usePlaylistCardActions, usePlaylistCardState } from "./playlist-card-context";
import { AddVideoInPlaylist } from "./add-video-in-playlist";
import { useRouter } from "next/navigation";

export const PlaylistCard: React.FC = () => {
    const router = useRouter();
    const { playlist, openEditDialog, openDeleteDialog, moreButtons } = usePlaylistCardState();
    const {
        onOpenEditDialogChange,
        onOpenDeleteDialogChange,
        onConfirmDelete,
        makePlaylistPublic,
        makePlaylistPrivate,
    } = usePlaylistCardActions();

    const playVideo = () => {
        router.push(`/watch/${playlist.videos[0].slug}?list=${playlist._id}&index=0`);
    };

    return (
        <div className="w-full relative group hover:scale-105 hover:opacity-95 pb-2 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 rounded-lg overflow-hidden dark:shadow-primary/40 hover:ring-2 hover:ring-primary/20">
            <div className="w-full group bg-gray-100 rounded-lg">
                <div className="relative w-full aspect-video hover:cursor-pointer">
                    <ThumbnailImage
                        src={playlist.posterUrl || "/no-thumbnail.png"}
                        alt={playlist.title || "Playlist thumbnail"}
                        width={256}
                        height={256}
                        onClick={playVideo}
                    />
                </div>
            </div>
            <div className="mt-2 px-2">
                <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate line-clamp-2 cursor-pointer" onClick={playVideo}>
                        {playlist.title}
                    </h3>
                    <MoreButtons className="static z-10" buttons={moreButtons}>
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="w-full">
                                <LockIcon className="w-4 h-4 mr-2" />
                                Privacy
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuCheckboxItem
                                    checked={playlist.isPublic}
                                    onCheckedChange={makePlaylistPublic}
                                >
                                    Public
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={!playlist.isPublic}
                                    onCheckedChange={makePlaylistPrivate}
                                >
                                    Private
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                    </MoreButtons>
                </div>
                <p className="text-sm text-gray-500">{playlist.videos.length} videos</p>
            </div>
            <PlaylistCardEditDialog open={openEditDialog} onOpenChange={onOpenEditDialogChange} data={playlist} />
            <DeleteConfirmationModal
                deleteType="Playlist"
                open={openDeleteDialog}
                onOpenChange={onOpenDeleteDialogChange}
                onConfirm={onConfirmDelete}
            />
            <AddVideoInPlaylist />
        </div>
    );
};

export default PlaylistCard;
