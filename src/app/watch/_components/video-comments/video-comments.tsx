"use client";

import { useAppSelector } from "@/lib/utils";
import VideoCommentCard from "./video-comment-card";

const VideoComments: React.FC = () => {
    const { comments } = useAppSelector((state) => state.videoData);

    return (
        <div className="space-y-4">
            {comments && comments.map((comment) => <VideoCommentCard key={comment._id} comment={comment} />)}
        </div>
    );
};

export default VideoComments;
