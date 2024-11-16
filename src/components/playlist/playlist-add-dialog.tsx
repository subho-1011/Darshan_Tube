"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

// playlist add dialog props
export interface IPlaylistAddDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const PlaylistAddDialog: React.FC<IPlaylistAddDialogProps> = ({ open, onOpenChange }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle>Add to playlist</DialogTitle>
                <DialogDescription>Select the playlist you want to add this video to</DialogDescription>

                <p>Coming soon! Please check back later.</p>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="destructive">Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
