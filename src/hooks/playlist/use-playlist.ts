import React from "react";
import { toast } from "@/hooks/use-toast";
import { useSession } from "@/context/session-provider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPlaylistService, getUserPlaylistService } from "@/services/playlist.services";

export const usePlaylist = () => {
    const [open, setOpen] = React.useState(false);
    const [newPlaylist, setNewPlaylist] = React.useState("");

    const queryClient = useQueryClient();

    const onOpenChange = (open: boolean) => setOpen(open);

    const { isAuthenticated } = useSession();
    const { data, isPending } = useQuery({
        queryKey: ["playlists"],
        queryFn: getUserPlaylistService,
        enabled: isAuthenticated,
    });

    const playlists = data?.playlists || [];

    const { mutate: createPlaylist, isPending: isCreating } = useMutation({
        mutationKey: ["create-playlist"],
        mutationFn: () => createPlaylistService({ title: newPlaylist }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["playlist"] });
            toast({ title: "Playlist created successfully" });
            setNewPlaylist("");
            onOpenChange(false);
        },
        onError: (error) => {
            console.error(error);
            toast({ title: error.message || "Failed to create playlist, please try again", variant: "destructive" });
        },
    });

    const onCreatePlaylist = (e: React.FormEvent) => {
        e.preventDefault();

        createPlaylist();
    };

    return {
        open,
        setOpen,
        onOpenChange,
        newPlaylist,
        setNewPlaylist,
        playlists,
        isPending,
        isCreating,
        onCreatePlaylist,
    };
};
