"use client";

import { z } from "zod";
import * as React from "react";
import { TPlaylist } from "@/lib/types";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogDescription, DialogHeader } from "../ui/dialog";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditPlaylistSchema, usePlaylistCardActions } from "./playlist-card-context";

interface EditPlaylistDialogProps {
    open: boolean;
    onOpenChange: (arg: boolean) => void;
    data?: Partial<TPlaylist>;
}

export const PlaylistCardEditDialog: React.FC<EditPlaylistDialogProps> = ({ open, onOpenChange, data }) => {
    const { onConfirmEdit } = usePlaylistCardActions();

    const form = useForm({
        resolver: zodResolver(EditPlaylistSchema),
        defaultValues: {
            title: data?.title || "",
            description: data?.description || "",
        },
    });

    const onSubmit = (data: z.infer<typeof EditPlaylistSchema>) => {
        onConfirmEdit(data);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Playlist</DialogTitle>
                </DialogHeader>
                <DialogDescription>Edit the playlist name and description</DialogDescription>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <Input {...form.register("title")} autoFocus />
                    <Textarea {...form.register("description")} />
                    <div className="space-x-3">
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
