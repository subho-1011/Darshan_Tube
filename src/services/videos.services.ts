import { api, apiErrorHandler, apiHandler } from "@/lib/utils";

import { z } from "zod";
import { TLikedVideo, TVideo, TVideoCard } from "@/lib/types";
import { VideoMetaDataFormSchema, VideoUpdateFormSchema } from "@/lib/validators/videos-validations";
import { MAX_VIDEOS_PER_PAGE } from "@/lib/constant";

/**
 * 1. Upload video - create a draft video data in the database (POST)->/videos/upload
 * 2. Publish draft video by videoId (add video metadata to the database) -> /videos/{videoId}/publish
 * 3. Update video by videoId (add video metadata to the database) -> /videos/{videoId}
 * 4. Upload thumbnail -> /videos/{videoId}/thumbnail
 * 5. Delete video by videoId -> /videos/{videoId}
 * 6. Get video by videoId -> /videos/{videoId}
 * 7. Get draft video of the current user -> /videos/drafts
 * 8. Get all videos -> /videos
 * 9. Toggle public or private status of the video -> /videos/{videoId}/public
 * 10. Get all videos of the current user -> /users/{username}/videos
 */

/**
 * Upload video - create a draft video data in the database
 *
 * @param data - The video data to be uploaded.
 * @returns
 */
export const uploadVideoService = async (data: FormData): Promise<{ video: TVideo }> => {
    try {
        const response = await api.post("/videos/upload", data);

        return response.data.data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};

/**
 * Publish draft video by videoId
 * add video metadata to the database
 *
 * @param videoId - The video id to be published
 * @param data - The video metadata to be published
 * @returns The published video data
 */
export const publishVideoByVideoIdService = async (
    videoId: string,
    data: z.infer<typeof VideoMetaDataFormSchema>
): Promise<{ video: TVideo }> => {
    try {
        const response = await api.post(`/videos/${videoId}/publish`, data);

        return response.data.data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};

/**
 * Update video by videoId
 * add video metadata to the database
 *
 * @param videoId - The video id to be updated
 * @param data - The video metadata to be updated
 * @returns The updated video data
 */
export const updateVideoByVideoIdService = async (
    videoId: string,
    data: z.infer<typeof VideoUpdateFormSchema>
): Promise<{ video: TVideo }> => {
    try {
        const response = await api.patch(`/videos/${videoId}`, data);

        return response.data.data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};

/**
 * Upload thumbnail
 *
 * @param data - The thumbnail data to be uploaded
 * @returns
 */
export const uploadOrUpdateThumbnailService = async (videoId: string, data: FormData): Promise<{ video: TVideo }> => {
    try {
        const response = await api.patch(`/videos/${videoId}/thumbnail`, data);

        return response.data.data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};

/**
 * Delete video by videoId
 *
 * @param videoId - The video id to be deleted
 * @returns
 */
export const deleteVideoByVideoIdService = async (videoId: string): Promise<void> => {
    try {
        await api.delete(`/videos/${videoId}`);
    } catch (error) {
        throw apiErrorHandler(error);
    }
};

/**
 * Post new video
 * complete video metadata and thumbnail, video
 *
 * @param data - The video data to be posted
 * @returns
 */
export const postNewVideoService = async (data: FormData) => {
    try {
        const response = await api.post("/videos", data);

        return response.data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};

/**
 * Get video by video id
 * @param videoId - The video id to be retrieved
 * @returns The video data with the given video id
 */
export const getVideoByIdService = async (videoId: string): Promise<{ video: TVideo }> => {
    try {
        const response = await api.get(`/videos/${videoId}`);

        return response.data.data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};

/**
 * Fetches the draft video of the current user.
 *
 * @returns A promise that resolves to the draft video data.
 * @throws An error if the API request fails.
 */
export const getDraftVideoService = async (): Promise<{ video: TVideo }> => {
    try {
        const response = await api.get("/videos/drafts");

        return response.data.data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};

/**
 * Fetches all videos.
 *
 * @returns A promise that resolves to an array of video data.
 * @throws An error if the API request fails.
 */
export const getAllVideosService = async (): Promise<{ videos: TVideoCard[]; totalVideos: number }> => {
    try {
        const response = await api.get("/videos");

        return response.data.data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};

/**
 * Toggles the publish status of a video.
 *
 * @param videoId - The ID of the video to toggle.
 * @returns A promise that resolves to the updated video data.
 * @throws An error if the API request fails.
 */
export const toggleVisibilityService = async (videoId: string): Promise<{ video: TVideo }> => {
    try {
        const response = await api.patch(`/videos/${videoId}/public`);

        return response.data.data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};

/**
 * Get all videos of the current user
 *
 * @param username - The username of the user
 * @returns The videos of the user
 */
export const getUserVideosService = async (
    username: string,
    page = 1,
    limit = MAX_VIDEOS_PER_PAGE
): Promise<{ videos: TVideo[]; totalVideos: number }> => {
    try {
        const response = await api.get(`/videos/users/${username}?page=${page}&limit=${limit}`);

        return response.data.data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};

/**
 * Get video by slug
 * @param slug - The slug of the video
 * @returns The video data with the given slug
 */
export const getVideoBySlugService = async (slug: string): Promise<{ video: TVideoCard }> => {
    try {
        const response = await api.get(`/videos/slug/${slug}`);

        return response.data.data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};

/**
 * Get all liked videos of the current user
 *
 * @returns The liked videos of the user
 */
export const getUserLikedVideosService = async (page = 1): Promise<{ videos: TLikedVideo[]; totalVideos: number }> => {
    try {
        const response = await api.get(`/videos/liked-videos/@me?page=${page}&limit=${MAX_VIDEOS_PER_PAGE}`);

        return response.data.data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};

interface ISearchVideosResponse {
    videos: TVideoCard[];
    metadata: {
        total: number;
        page: number;
    };
}

export const searchVideosService = async (query: string, page = 1) =>
    apiHandler(async (): Promise<ISearchVideosResponse> => {
        const response = await api.get(`/videos/search?q=${query}&page=${page}`);
        return response.data.data;
    });
