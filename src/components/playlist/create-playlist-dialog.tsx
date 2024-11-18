"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusSquareIcon, Loader2Icon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "@/lib/utils";
import { createPlaylist } from "@/store/thunk-api/playlist.thunk-api";

export const CreatePlaylistDialog: React.FC<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
}> = ({ open, onOpenChange }) => {
    const dispatch = useAppDispatch();
    const [newPlaylist, setNewPlaylist] = React.useState("");

    const { mutate: createAPlaylist, isPending } = useMutation({
        mutationKey: ["create-playlist"],
        mutationFn: () => dispatch(createPlaylist({ title: newPlaylist })).unwrap(),
        onSuccess: () => {
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

        createAPlaylist();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle>Create Playlist</DialogTitle>
                <DialogDescription>Enter the title of the playlist you want to create</DialogDescription>
                <form onSubmit={onCreatePlaylist}>
                    <Input
                        type="text"
                        value={newPlaylist}
                        onChange={(e) => setNewPlaylist(e.target.value)}
                        placeholder="Playlist title"
                        required
                    />
                    <div className="flex justify-end mt-4">
                        <Button type="submit" disabled={isPending}>
                            {isPending ? <Loader2Icon className="animate-spin" /> : <PlusSquareIcon />}
                            <span className="ml-2">{isPending ? "Creating Playlist" : "Create Playlist"}</span>
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
