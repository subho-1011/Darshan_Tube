"use client";

import React from "react";

import { FaThumbsUp } from "react-icons/fa";
import { Button } from "@/components/ui/button";

import { useAppDispatch } from "@/lib/utils";
import { toggleVideoLike } from "@/store/thunk-api/videodata.thunk-api";
import { MinusIcon, Tally1 } from "lucide-react";
export const VideoLikedButton: React.FC<{
    videoId: string;
    isLiked: boolean;
    likes: number;
}> = ({ videoId, isLiked, likes }) => {
    const dispatch = useAppDispatch();

    const handleVideoLike = () => dispatch(toggleVideoLike({ videoId }));

    return (
        <Button variant={isLiked ? "default" : "outline"} onClick={handleVideoLike}>
            {isLiked ? <FaThumbsUp size={16} className="fill-current" /> : <FaThumbsUp size={16} />}
            <MinusIcon className="w-4 h-4 rotate-90" />
            {isLiked ? "Liked" : "Like"}
            <span className="ml-2">{likes}</span>
        </Button>
    );
};
