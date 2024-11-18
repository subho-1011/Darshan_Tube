"use client";

import React from "react";
import { TPlaylist } from "@/lib/types";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ShowIf } from "../common/show";
import { Checkbox } from "../ui/checkbox";
import { NotLoginDialog } from "../common/not-login-dialog";
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog";

import { toast } from "@/hooks/use-toast";
import { Loader2, PlusSquare, X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createPlaylistService,
    getUserPlaylistService,
    addVideoToPlaylistService,
    searchPlaylistsService,
} from "@/services/playlist.services";
import { useSession } from "@/context/session-provider";

interface IDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export interface IPlaylistAddDialogProps extends IDialogProps {
    videoId: string;
}

export const PlaylistAddDialog: React.FC<IPlaylistAddDialogProps> = ({ open, onOpenChange, videoId }) => {
    const [search, setSearch] = React.useState<string>("");
    const [addNewDialog, setAddNewDialog] = React.useState<boolean>(false);
    const searchInputRef = React.useRef<HTMLInputElement>(null);

    const { isAuthenticated } = useSession();

    const { data, isPending } = useQuery({
        queryKey: ["user-playlist"],
        queryFn: getUserPlaylistService,
        enabled: open,
        refetchOnWindowFocus: false,
    });

    const { data: searchData, isPending: isSearchPending } = useQuery({
        queryKey: ["search-playlist", search],
        queryFn: () => searchPlaylistsService(search),
        enabled: search.length > 2,
        refetchOnWindowFocus: false,
        retry: false,
    });

    const filteredPlaylists = React.useMemo(() => {
        const playlists: TPlaylist[] = data?.playlists || [];
        return search ? searchData?.playlists || [] : playlists;
    }, [search, searchData, data]);

    const clearSearch = () => {
        setSearch("");
        if (searchInputRef.current?.value) {
            searchInputRef.current.value = "";
        }
        searchInputRef.current?.focus();
    };

    const queryClient = useQueryClient();

    const { mutate: addVideoToPlaylist } = useMutation({
        mutationKey: ["add-video-to-playlist"],
        mutationFn: (playlistId: string) => addVideoToPlaylistService(playlistId, videoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-playlist"] });
            toast({ title: "Video added to playlist successfully" });
            onOpenChange(false);
        },
        onError: (error) => {
            console.error(error);
            toast({
                title: error.message || "Failed to add video to playlist, please try again",
                variant: "destructive",
            });
        },
    });

    if (!isAuthenticated) {
        return <NotLoginDialog open={open} onOpenChange={onOpenChange} label="Add to Playlist" />;
    }

    return (
        <React.Fragment>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add to playlist</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>Select the playlist you want to add this video to</DialogDescription>
                    <div className="relative">
                        <Input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search playlist"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <ShowIf when={!!search}>
                            <Button className="absolute right-0 top-0" variant="trasparent" onClick={clearSearch}>
                                <X />
                            </Button>
                        </ShowIf>
                    </div>
                    {isPending && <Loader2 className="animate-spin" />}
                    <div className="mt-4 space-y-2">
                        {filteredPlaylists.map((playlist) => (
                            <div
                                key={playlist._id}
                                className="cursor-pointer flex justify-between items-center border px-3 py-1 rounded-md"
                            >
                                <h3>{playlist.title}</h3>
                                <Checkbox
                                    className="rounded-none"
                                    onCheckedChange={() => addVideoToPlaylist(playlist._id)}
                                    checked={playlist.videos.some((video) => video._id === videoId)}
                                />
                            </div>
                        ))}
                    </div>
                    {/* Add new playlist */}
                    <div className="flex w-full max-w-3/4 justify-center">
                        <Button onClick={() => setAddNewDialog(true)} type="button">
                            <PlusSquare className="mr-2" />
                            Add new playlist
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            <CreatePlaylistDialog open={addNewDialog} onOpenChange={setAddNewDialog} videoId={videoId} />
        </React.Fragment>
    );
};

const CreatePlaylistDialog: React.FC<IPlaylistAddDialogProps> = ({ open, onOpenChange, videoId }) => {
    const [newPlaylist, setNewPlaylist] = React.useState<string>("");

    const queryClient = useQueryClient();

    const { mutate: createPlaylist, isPending } = useMutation({
        mutationKey: ["create-playlist"],
        mutationFn: () => createPlaylistService({ title: newPlaylist }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["user-playlist"] });
            toast({ title: "Playlist created successfully" });
            setNewPlaylist("");
            onOpenChange(false);
            addVideoToPlaylist(data.playlist._id);
        },
        onError: (error) => {
            console.error(error);
            toast({ title: error.message || "Failed to create playlist, please try again", variant: "destructive" });
        },
    });

    const { mutate: addVideoToPlaylist } = useMutation({
        mutationKey: ["add-video-to-playlist"],
        mutationFn: (playlistId: string) => addVideoToPlaylistService(playlistId, videoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-playlist"] });
            toast({ title: "Video added to playlist successfully" });
        },
        onError: (error) => {
            console.error(error);
            toast({
                title: error.message || "Failed to add video to playlist, please try again",
                variant: "destructive",
            });
        },
    });

    const onCreatePlaylist = (e: React.FormEvent) => {
        e.preventDefault();

        createPlaylist();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Playlist</DialogTitle>
                </DialogHeader>
                <DialogDescription>Enter the title of the playlist you want to create</DialogDescription>
                <form onSubmit={onCreatePlaylist}>
                    <Input
                        type="text"
                        placeholder="Enter playlist title"
                        value={newPlaylist}
                        onChange={(e) => setNewPlaylist(e.target.value)}
                    />
                    <Button type="submit" className="mt-4" disabled={isPending}>
                        {isPending ? <Loader2 className="animate-spin" /> : "Create Playlist"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
