"use client";

import React from "react";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreatePlaylistDialog, PlaylistCard, PlaylistCardProvider } from "@/components/playlist";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/context/session-provider";
import { useAppDispatch, useAppSelector } from "@/lib/utils";
import { fetchUserPlaylists } from "@/store/thunk-api/playlist.thunk-api";

export default function PlaylistsPage() {
    const dispatch = useAppDispatch();
    const [open, setOpen] = React.useState(false);

    const playlists = useAppSelector((state) => state.playlist.playlists);

    const onOpenChange = (open: boolean) => setOpen(open);

    const { isAuthenticated } = useSession();
    const { isPending } = useQuery({
        queryKey: ["playlist"],
        queryFn: () => dispatch(fetchUserPlaylists()).unwrap(),
        enabled: isAuthenticated,
    });

    return (
        <div className="w-full relative container mx-auto">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold">Playlists</h1>
                <Button onClick={() => setOpen(true)}>
                    <PlusIcon className="mr-2" />
                    Create Playlist
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {playlists.map((playlist) => (
                    <PlaylistCardProvider key={playlist._id} playlist={playlist}>
                        <PlaylistCard />
                    </PlaylistCardProvider>
                ))}
            </div>
            <CreatePlaylistDialog open={open} onOpenChange={onOpenChange} />
        </div>
    );
}

