"use client";

import * as z from "zod";
import * as React from "react";
import { TPlaylist } from "@/lib/types";

import { IMoreButton } from "../common";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";

import {
    addVideoToPlaylist,
    deletePlaylist,
    togglePlaylistPrivacy,
    updatePlaylist,
} from "@/store/thunk-api/playlist.thunk-api";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const EditPlaylistSchema = z.object({
    title: z.string().max(100),
    description: z.string().max(500).optional(),
});

export const AddVideoInPlaylistSchema = z.object({
    videoUrl: z.string().url(),
});

export interface IPlaylistCardStateContext {
    playlist: TPlaylist;
    moreButtons: IMoreButton[];
    openEditDialog: boolean;
    openDeleteDialog: boolean;
    addVideoDialog: boolean;
    isAddingNewVideo?: boolean;
}

export interface IPlaylistCardActionsContext {
    onOpenEditDialogChange: (open: boolean) => void;
    onOpenDeleteDialogChange: (open: boolean) => void;
    onOpenAddVideoDialogChange: (open: boolean) => void;
    onConfirmDelete: () => void;
    onConfirmEdit: (data: z.infer<typeof EditPlaylistSchema>) => void;
    makePlaylistPublic: (isPublic: boolean) => void;
    makePlaylistPrivate: (isPublic: boolean) => void;
    addVideoForm: ReturnType<typeof useForm<z.infer<typeof AddVideoInPlaylistSchema>>>;
    onSubmitAddToPlaylist: (data: z.infer<typeof AddVideoInPlaylistSchema>) => void;
}

const PlaylistCardStateContext = React.createContext<IPlaylistCardStateContext | undefined>(undefined);
const PlaylistCardActionsContext = React.createContext<IPlaylistCardActionsContext | undefined>(undefined);

interface IPlaylistCardProviderProps {
    children: React.ReactNode;
    playlist: TPlaylist;
}

export const PlaylistCardProvider: React.FC<IPlaylistCardProviderProps> = ({ children, playlist }) => {
    const dispatch = useAppDispatch();

    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [addVideoDialog, setAddVideoDialog] = React.useState(false);

    const onOpenEditDialogChange = (open: boolean) => setOpenEditDialog(open);
    const onOpenDeleteDialogChange = (open: boolean) => setOpenDeleteDialog(open);
    const onOpenAddVideoDialogChange = (open: boolean) => setAddVideoDialog(open);

    const queryClient = useQueryClient();

    // Toggle privacy
    const { mutate: togglePrivacy } = useMutation({
        mutationKey: ["toggle-privacy"],
        mutationFn: () => dispatch(togglePlaylistPrivacy(playlist._id)).unwrap(),
        onSuccess: () => {
            toast({ title: `Playlist is now ${playlist.isPublic ? "public" : "private"}` });
        },
        onError: (error) => {
            console.error(error);
            toast({
                title: error.message || "Failed to update playlist privacy, please try again",
                variant: "destructive",
            });
        },
    });

    const makePlaylistPublic = () => {
        if (playlist.isPublic) {
            toast({ title: "Playlist is already public" });
            return;
        }

        togglePrivacy();
    };

    const makePlaylistPrivate = () => {
        if (!playlist.isPublic) {
            toast({ title: "Playlist is already private" });
            return;
        }

        togglePrivacy();
    };

    // Edit playlist
    const { mutate: editPlaylist } = useMutation({
        mutationKey: ["edit-playlist"],
        mutationFn: (data: z.infer<typeof EditPlaylistSchema>) =>
            dispatch(updatePlaylist({ playlistId: playlist._id, playlist: data })).unwrap(),
        onSuccess: () => {
            toast({ title: "Playlist updated successfully" });
            setOpenEditDialog(false);
        },
        onError: (error) => {
            console.error(error);
            toast({ title: error.message || "Failed to update playlist, please try again", variant: "destructive" });
        },
    });

    const onConfirmEdit = (data: z.infer<typeof EditPlaylistSchema>) => editPlaylist(data);

    // Add video to playlist
    const addVideoForm = useForm({
        resolver: zodResolver(AddVideoInPlaylistSchema),
        defaultValues: {
            videoUrl: "",
        },
    });

    const { mutate: addAVideoToPlaylist, isPending: isAddingNewVideo } = useMutation({
        mutationKey: ["add-video-to-playlist"],
        mutationFn: (videoSlug: string) =>
            dispatch(addVideoToPlaylist({ playlistId: playlist._id, videoSlug })).unwrap(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["playlists"] });
            toast({ title: "Video added to playlist successfully" });
            addVideoForm.reset();
        },
        onError: (error) => {
            console.error(error);
            toast({
                title: error.message || "Failed to add video to playlist, please try again",
                variant: "destructive",
            });
        },
    });

    const onSubmitAddToPlaylist = (data: z.infer<typeof AddVideoInPlaylistSchema>) => {
        const videoSlug = data.videoUrl.split("/").pop();
        if (!videoSlug) {
            return;
        }

        addAVideoToPlaylist(videoSlug);
    };

    // Delete playlist
    const { mutate: deleteAPlaylist } = useMutation({
        mutationKey: ["delete-playlist"],
        mutationFn: () => dispatch(deletePlaylist(playlist._id)).unwrap(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["playlists"] });
            toast({ title: "Playlist deleted successfully" });
            setOpenDeleteDialog(false);
        },
        onError: (error) => {
            console.error(error);
            toast({ title: error.message || "Failed to delete playlist, please try again", variant: "destructive" });
        },
    });

    const onConfirmDelete = () => deleteAPlaylist();

    // More buttons
    const moreButtons = [
        {
            label: "Edit playlist",
            icon: <PencilIcon className="w-4 h-4" />,
            onClick: () => onOpenEditDialogChange(true),
        },
        {
            label: "Delete playlist",
            icon: <TrashIcon className="w-4 h-4" />,
            onClick: () => onOpenDeleteDialogChange(true),
        },
        {
            label: "Add video to playlist",
            icon: <PlusIcon className="w-4 h-4" />,
            onClick: () => setAddVideoDialog(true),
        },
    ];

    return (
        <PlaylistCardStateContext.Provider
            value={{ playlist, openEditDialog, openDeleteDialog, moreButtons, addVideoDialog, isAddingNewVideo }}
        >
            <PlaylistCardActionsContext.Provider
                value={{
                    onOpenEditDialogChange,
                    onOpenDeleteDialogChange,
                    onOpenAddVideoDialogChange,
                    onConfirmDelete,
                    onConfirmEdit,
                    addVideoForm,
                    onSubmitAddToPlaylist,
                    makePlaylistPublic,
                    makePlaylistPrivate,
                }}
            >
                {children}
            </PlaylistCardActionsContext.Provider>
        </PlaylistCardStateContext.Provider>
    );
};

export const usePlaylistCardState = () => {
    const context = React.useContext(PlaylistCardStateContext);

    if (context === undefined) {
        throw new Error("usePlaylistCardState must be used within a PlaylistCardProvider");
    }

    return context;
};

export const usePlaylistCardActions = () => {
    const context = React.useContext(PlaylistCardActionsContext);

    if (context === undefined) {
        throw new Error("usePlaylistCardActions must be used within a PlaylistCardProvider");
    }

    return context;
};
