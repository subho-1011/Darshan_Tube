import { z } from "zod";
import {
    deleteVideoByVideoIdService,
    getUserVideosService,
    publishVideoByVideoIdService,
    toggleVisibilityService,
    updateVideoByVideoIdService,
    uploadOrUpdateThumbnailService,
    uploadVideoService,
} from "@/services/videos.services";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { VideoMetaDataFormSchema, VideoUpdateFormSchema } from "@/lib/validators/videos-validations";

// get channel videos
export const getChannelVideos = createAsyncThunk(
    "channel/getChannelVideos",
    async ({ username, page, limit }: { username: string; page?: number; limit?: number }) => {
        return await getUserVideosService(username, page, limit);
    }
);

// upload video
export const uploadVideo = createAsyncThunk("channel/uploadVideo", async (data: FormData) => {
    return await uploadVideoService(data);
});

// publish video
export const publishVideo = createAsyncThunk(
    "channel/publishVideo",
    async (data: { videoId: string; data: z.infer<typeof VideoMetaDataFormSchema> }) => {
        return await publishVideoByVideoIdService(data.videoId, data.data);
    }
);

// toggle video visibility
export const toggleVideoVisibility = createAsyncThunk(
    "channel/toggleVideoVisibility",
    async ({ videoId }: { videoId: string }) => {
        return await toggleVisibilityService(videoId);
    }
);

// upload or change thumbnail
export const uploadOrChangeThumbnail = createAsyncThunk(
    "channel/uploadOrChangeThumbnail",
    async (data: { videoId: string; data: FormData }) => {
        return await uploadOrUpdateThumbnailService(data.videoId, data.data);
    }
);

// change video metadata
export const updateVideoMetadata = createAsyncThunk(
    "channel/changeVideoMetadata",
    async (data: { videoId: string; data: z.infer<typeof VideoUpdateFormSchema> }) => {
        return await updateVideoByVideoIdService(data.videoId, data.data);
    }
);

// delete video
export const deleteVideo = createAsyncThunk("channel/deleteVideo", async ({ videoId }: { videoId: string }) => {
    return await deleteVideoByVideoIdService(videoId);
});
