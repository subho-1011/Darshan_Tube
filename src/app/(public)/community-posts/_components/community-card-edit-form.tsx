"use client";

import React from "react";
import { TCommunityPostData } from "@/lib/types";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Dialog, DialogDescription, DialogTitle, DialogContent, DialogClose } from "@/components/ui/dialog";

import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCommunityPost } from "@/services/community.services";

export const CommunityCardEditForm: React.FC<{
    post: TCommunityPostData;
    editPostId: string | null;
    setEditPostId: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ post, editPostId, setEditPostId }) => {
    const editForm = useForm({ defaultValues: { content: post.content } });
    const queryClient = useQueryClient();

    const { mutate: updatePost, isPending } = useMutation({
        mutationKey: ["edut-community-post", post._id],
        mutationFn: (content: string) => updateCommunityPost(post._id, content),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["community-posts"] });
            toast({
                title: "Community post updated successfully",
                variant: "sky",
            });
            editForm.reset();
            setEditPostId(null);
        },
        onError: (error) => {
            toast({
                title: error.message || "Failed to update community post",
                variant: "destructive",
            });
        },
    });

    const onSubmitEditForm = async (data: { content: string }) => {
        updatePost(data.content);

        if (data.content === post.content) {
            setEditPostId(null);
        }
    };

    return (
        <Dialog open={!!editPostId} onOpenChange={(val) => setEditPostId(null)}>
            <DialogContent>
                <DialogTitle>Edit Post</DialogTitle>
                <DialogDescription></DialogDescription>
                <Form {...editForm}>
                    <form onSubmit={editForm.handleSubmit(onSubmitEditForm)}>
                        <FormField
                            control={editForm.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="What's on your mind?"
                                            rows={4}
                                            className="w-full"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end gap-2 mt-2">
                            <DialogClose asChild>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit">
                                {isPending && <Loader2 className="w-6 h-6" />}
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
