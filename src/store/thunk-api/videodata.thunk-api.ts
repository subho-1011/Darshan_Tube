import { createAsyncThunk } from "@reduxjs/toolkit";
import * as videoDataServices from "@/services/video-data.services";
import { toggleSubscription } from "@/services/channel.services";

/**
 * Fetches video data based on the provided slug.
 * @param slug - The slug of the video to fetch data for.
 * @returns A promise that resolves to the video data.
 */
export const fetchVideoData = createAsyncThunk("videodata/fetchVideoData", async ({ slug }: { slug: string }) => {
    return await videoDataServices.getVideoData(slug);
});

/**
 * Fetches video comments based on the provided video videoId.
 * @param videoId - The videoId of the video to fetch comments for.
 * @param page - The page number of the comments to fetch.
 * @param limit - The number of comments to fetch per page.
 * @returns A promise that resolves to the video comments.
 */
export const fetchVideoComments = createAsyncThunk(
    "videodata/fetchVideoComments",
    async ({ videoId, page = 1 }: { videoId: string; page?: number }) => {
        return await videoDataServices.getVideoComments(videoId, page);
    }
);

/**
 * Toggle like the video with the provided videoId.
 * @param videoId - The videoId of the video to like
 * @returns A promise that resolves to the updated video data.
 */

export const toggleVideoLike = createAsyncThunk("videodata/toggleLike", async ({ videoId }: { videoId: string }) => {
    return await videoDataServices.toggleVideoLike(videoId);
});

/**
 * Toggle subscribe to the video owner.
 * @param videoId - The videoId of the video to subscribe to.
 * @returns A promise that resolves to the updated video data.
 */
export const toggleSubscribe = createAsyncThunk(
    "videodata/toggleSubscribe",
    async ({ channelId }: { channelId: string }) => {
        return await toggleSubscription(channelId);
    }
);

/**
 * Posts a new comment to the video with the provided videoId.
 * @param videoId - The videoId of the video to post the comment to.
 * @param text - The text of the comment to post.
 * @returns A promise that resolves to the posted comment.
 */
export const postComment = createAsyncThunk(
    "videodata/postComment",
    async ({ videoId, text }: { videoId: string; text: string }) => {
        return await videoDataServices.postComment(videoId, text);
    }
);

/**
 * Updates video comment with the provided commentId.
 * @param videoId - The videoId of the video to update the comment for.
 * @param commentId - The commentId of the comment to update.
 * @param text - The updated text of the comment.
 * @returns A promise that resolves to the updated comment.
 */
export const updateComment = createAsyncThunk(
    "videodata/updateComment",
    async ({ videoId, commentId, text }: { videoId: string; commentId: string; text: string }) => {
        return await videoDataServices.updateComment(videoId, commentId, text);
    }
);

/**
 * Deletes video comment with the provided commentId.
 * @param videoId - The videoId of the video to delete the comment for.
 * @param commentId - The commentId of the comment to delete.
 * @returns A promise that resolves to the deleted comment.
 */
export const deleteComment = createAsyncThunk(
    "videodata/deleteComment",
    async ({ videoId, commentId }: { videoId: string; commentId: string }) => {
        return await videoDataServices.deleteComment(videoId, commentId);
    }
);

/**
 * Toggle video comment like with the provided commentId.
 * @param videoId - The videoId of the video that the comment belongs to.
 * @param commentId - The commentId of the comment to toggle like.
 * @returns A promise that resolves to the updated comment.
 */
export const toggleCommentLike = createAsyncThunk(
    "videodata/toggleCommentLike",
    async ({ videoId, commentId }: { videoId: string; commentId: string }) => {
        return await videoDataServices.toggleCommentLike(videoId, commentId);
    }
);
