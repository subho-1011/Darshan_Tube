// This is use for watch page
import { MAX_COMMENTS_PER_CONTENT } from "@/lib/constant";
import { TVideoComment, TVideoData } from "@/lib/types";
import { api, apiHandler } from "@/lib/utils";

/**
 * Fetches video data based on the provided slug.
 * @param slug - The slug of the video to fetch data for.
 * @returns A promise that resolves to the video data.
 */
const getVideoData = (slug: string) =>
    apiHandler(async (): Promise<{ video: TVideoData }> => {
        const response = await api.get(`/videos/slug/${slug}`);

        return response.data.data;
    });

/**
 * Fetches video comments based on the provided video videoId.
 * @param videoId - The videoId of the video to fetch comments for.
 * @param page - The page number of the comments to fetch.
 * @param limit - The number of comments to fetch per page.
 * @returns A promise that resolves to the video comments and total.
 */
const getVideoComments = (videoId: string, page = 1) =>
    apiHandler(async (): Promise<{ comments: TVideoComment[]; totalComments: number }> => {
        const response = await api.get(`/videos/${videoId}/comments?page=${page}&limit=${MAX_COMMENTS_PER_CONTENT}`);

        return response.data.data;
    });

/**
 * Toggle like the video with the provided videoId.
 * @param videoId - The videoId of the video to like
 * @returns A promise that resolves to the updated video data.
 */
const toggleVideoLike = (videoId: string) =>
    apiHandler(async () => {
        await api.post(`/videos/${videoId}/like`);
    });

/**
 * Posts a new comment to the video with the provided videoId.
 * @param videoId - The videoId of the video to post the comment to.
 * @param text - The text of the comment to post.
 * @returns A promise that resolves to the posted comment.
 */
const postComment = (videoId: string, text: string) =>
    apiHandler(async (): Promise<{ comment: TVideoComment }> => {
        const response = await api.post(`/videos/${videoId}/comments`, { text });

        return response.data.data;
    });

/**
 * Update video comment by comment id.
 * @param videoId - The video id of the video that the comment belongs to.
 * @param commentId - The comment id to be updated.
 * @param text - The new text of the comment.
 * @returns A promise that resolves to the updated comment.
 */
const updateComment = (videoId: string, commentId: string, text: string) =>
    apiHandler(async (): Promise<{ comment: TVideoComment }> => {
        const response = await api.patch(`/videos/${videoId}/comments/${commentId}`, { text });

        return response.data.data;
    });

/**
 * Delete video comment by comment id.
 * @param videoId - The video id of the video that the comment belongs to.
 * @param commentId - The comment id to be deleted.
 */
const deleteComment = (videoId: string, commentId: string) =>
    apiHandler(async () => {
        await api.delete(`/videos/${videoId}/comments/${commentId}`);
    });

/**
 * Toggle like the video comment with the provided commentId.
 * @param videoId - The video id of the video that the comment belongs to.
 * @param commentId - The comment id to like.
 * @returns A promise that resolves to the updated comment.
 */
const toggleCommentLike = (videoId: string, commentId: string) =>
    apiHandler(async () => {
        await api.post(`/videos/${videoId}/comments/${commentId}/like`);
    });

export {
    getVideoData,
    getVideoComments,
    postComment,
    updateComment,
    deleteComment,
    toggleCommentLike,
    toggleVideoLike,
};
