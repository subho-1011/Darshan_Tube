"use client";

import * as React from "react";
import { usePlaylistCardActions, usePlaylistCardState } from "./playlist-card-context";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRightIcon, Loader2Icon } from "lucide-react";
import { Form, FormField, FormControl, FormMessage, FormItem, FormLabel, FormDescription } from "../ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from "../ui/dialog";

export const AddVideoInPlaylist: React.FC = () => {
    const { addVideoDialog, isAddingNewVideo } = usePlaylistCardState();
    const { onOpenAddVideoDialogChange, onSubmitAddToPlaylist, addVideoForm: form } = usePlaylistCardActions();

    return (
        <Dialog open={addVideoDialog} onOpenChange={onOpenAddVideoDialogChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add video to playlist</DialogTitle>
                    <DialogClose />
                </DialogHeader>
                <DialogDescription>Enter the URL of the video you want to add to this playlist.</DialogDescription>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitAddToPlaylist)}>
                        <FormField
                            control={form.control}
                            name="videoUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Video URL</FormLabel>
                                    <FormControl>
                                        <Input autoFocus placeholder="Video URL" {...field} />
                                    </FormControl>
                                    <FormDescription className="inline-flex items-center space-x-2">
                                        <span>Go to video watch page</span>
                                        <ArrowRightIcon size={16} />
                                        <span>share</span>
                                        <ArrowRightIcon size={16} />
                                        <span>Copy the URL</span>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="mt-4">
                            {isAddingNewVideo && <Loader2Icon className="animate-spin mr-2" />}
                            Add Video
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
