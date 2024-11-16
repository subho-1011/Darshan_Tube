import { TVideoComment, TVideoData } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    fetchVideoComments,
    fetchVideoData,
    toggleVideoLike,
    toggleSubscribe,
    postComment,
    updateComment,
    deleteComment,
    toggleCommentLike,
} from "../thunk-api/videodata.thunk-api";

interface VideoState {
    videoId: string | null;
    video: TVideoData | null;
    comments: TVideoComment[] | null;
    totalComments: number;
    error: string | null;
    errors: { [key: string]: string } | null;
}

const initialState: VideoState = {
    videoId: null,
    video: null,
    comments: null,
    totalComments: 0,
    error: null,
    errors: null,
};

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        // add reducers here
        resetVideoData(state) {
            state.videoId = null;
            state.video = null;
            state.comments = null;
            state.totalComments = 0;
            state.error = null;
            state.errors = null;
        },
    },
    extraReducers: (builder) => {
        // fetchVideoData
        builder
            .addCase(fetchVideoData.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchVideoData.fulfilled, (state, action: PayloadAction<{ video: TVideoData }>) => {
                state.videoId = action.payload.video._id;
                state.video = action.payload.video;
            })
            .addCase(fetchVideoData.rejected, (state, action) => {
                const message = action.error.message || "An error occurred while fetching the video data.";
                state.error = message;
                state.errors = { fetchVideoData: message };
            });

        // fetchVideoComments
        builder
            .addCase(fetchVideoComments.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchVideoComments.fulfilled, (state, action) => {
                state.totalComments = action.payload.totalComments;
                const newComments = action.payload.comments;
                const currPage = action.meta.arg.page;
                if (currPage === 1) {
                    state.comments = newComments;
                } else {
                    state.comments = [...(state.comments || []), ...newComments];
                }
            })
            .addCase(fetchVideoComments.rejected, (state, action) => {
                const message = action.error.message || "An error occurred while fetching the video comments.";
                state.error = message;
                state.errors = { fetchVideoComments: message };
            });

        // toggleVideoLike
        builder
            .addCase(toggleVideoLike.pending, (state) => {
                state.error = null;
                if (state.video) {
                    state.video.isLiked = !state.video.isLiked;
                    state.video.likes = state.video.isLiked ? state.video.likes + 1 : state.video.likes - 1;
                }
            })
            .addCase(toggleVideoLike.rejected, (state, action) => {
                if (state.video) {
                    state.video.isLiked = !state.video.isLiked;
                    state.video.likes = state.video.isLiked ? state.video.likes + 1 : state.video.likes - 1;
                }
                const message = action.error.message || "An error occurred while toggling the like.";
                state.error = message;
                state.errors = { toggleVideoLike: message };
            });

        // toggleSubscribe
        builder
            .addCase(toggleSubscribe.pending, (state) => {
                state.error = null;
                if (state.video) {
                    state.video.owner.isSubscribed = !state.video.owner.isSubscribed;
                    state.video.owner.subscribers = state.video.owner.isSubscribed
                        ? state.video.owner.subscribers + 1
                        : state.video.owner.subscribers - 1;
                }
            })
            .addCase(toggleSubscribe.rejected, (state, action) => {
                if (!state.video) return;
                state.video.owner.isSubscribed = !state.video.owner.isSubscribed;
                state.video.owner.subscribers = state.video.owner.isSubscribed
                    ? state.video.owner.subscribers + 1
                    : state.video.owner.subscribers - 1;

                const message = action.error.message || "An error occurred while toggling the subscribe.";
                state.error = message;
                state.errors = { toggleSubscribe: message };
            });

        // postComment
        builder
            .addCase(postComment.pending, (state) => {
                state.error = null;
            })
            .addCase(postComment.fulfilled, (state, action: PayloadAction<{ comment: TVideoComment }>) => {
                if (state.comments) {
                    const newComment = { ...action.payload.comment, isLiked: false, likes: 0, isOwner: true };
                    state.comments.unshift(newComment);
                    state.totalComments += 1;
                }
            })
            .addCase(postComment.rejected, (state, action) => {
                const message = action.error.message || "An error occurred while posting the comment.";
                state.error = message;
                state.errors = { postComment: message };
            });

        // updateComment
        builder.addCase(updateComment.fulfilled, (state, action) => {
            if (state.comments) {
                const updatedComment = action.payload.comment;
                state.comments = state.comments.map((comment) =>
                    comment._id === updatedComment._id
                        ? {
                              ...comment,
                              text: updatedComment.text,
                              isEdited: true,
                          }
                        : comment
                );
            }
        });

        // deleteComment
        builder.addCase(deleteComment.fulfilled, (state, action) => {
            const deletedCommentId = action.meta.arg.commentId;
            if (state.comments) {
                state.comments = state.comments.filter((comment) => comment._id !== deletedCommentId);
                state.totalComments -= 1;
            }
        });

        // toggleLikeComment
        builder
            .addCase(toggleCommentLike.pending, (state, action) => {
                if (!state.comments) return;

                const commentId = action.meta.arg.commentId;
                const comment = state.comments.find((comment) => comment._id === commentId);
                if (comment) {
                    comment.isLiked = !comment.isLiked;
                    comment.likes = comment.isLiked ? comment.likes + 1 : comment.likes - 1;
                }
            })
            .addCase(toggleCommentLike.rejected, (state, action) => {
                if (!state.comments) return;

                const commentId = action.meta.arg.commentId;
                const comment = state.comments.find((comment) => comment._id === commentId);
                if (comment) {
                    comment.isLiked = !comment.isLiked;
                    comment.likes = comment.isLiked ? comment.likes + 1 : comment.likes - 1;
                }
            });
    },
});

export const { resetVideoData } = videoSlice.actions;

export default videoSlice.reducer;
