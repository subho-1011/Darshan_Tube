"use client";

import React from "react";
import { TCommunityPostData } from "@/lib/types";

import { CommunityCard } from "./community-card";
import { CommunityPostComments } from "./community-post-comments";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

interface ICommunityCardModelProps {
    modal: boolean;
    post: TCommunityPostData;
    onChangeModal: (postId: string | null) => void;
    setEditPostId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CommunityCardModel: React.FC<ICommunityCardModelProps> = ({
    modal,
    post,
    onChangeModal,
    setEditPostId,
}) => {
    return (
        <Dialog open={modal} onOpenChange={() => onChangeModal(null)}>
            <DialogContent className="w-full flex flex-col max-w-6xl min-h-96 max-h-[90%] my-4">
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="md:w-1/2 flex flex-grow">
                        <CommunityCard post={post} onChangeModal={onChangeModal} setEditPostId={setEditPostId} />
                    </div>
                    <div className="md:w-1/2 h-full cursor-pointer rounded-xl px-4 py-2 border-2 border-primary/50 dark:border-primary/20 shadow-xl shadow-primary/15 dark:shadow-primary/10 ">
                        <CommunityPostComments postId={post._id} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
