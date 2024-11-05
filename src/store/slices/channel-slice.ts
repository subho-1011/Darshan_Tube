import { TVideo } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
    getChannelVideos,
    toggleVideoVisibility,
    uploadOrChangeThumbnail,
    deleteVideo,
    publishVideo,
    updateVideoMetadata,
} from "../thunk-api/channel.thunk-api";

export interface IChannelState {
    upload: boolean;
    videos: TVideo[];
    totalVideos: number;
    error: { [key: string]: string | null };
}

const initialState: IChannelState = {
    upload: false,
    totalVideos: 0,
    videos: [],
    error: {},
};

const channelSlice = createSlice({
    name: "channel",
    initialState,
    reducers: {
        toggleUpload: (state, action: PayloadAction<boolean | undefined>) => {
            state.upload = action?.payload ?? !state.upload;
        },

        uploadVideo: (state, action: PayloadAction<{ video: TVideo }>) => {
            state.videos = [action.payload.video, ...state.videos];
            state.totalVideos = state.totalVideos + 1;
        },

        setError: (state, action: PayloadAction<{ key: string; message: string }>) => {
            state.error[action.payload.key] = action.payload.message;
        },

        resetChannelState: (state) => {
            state.upload = false;
            state.videos = [];
            state.error = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChannelVideos.pending, (state) => {
                state.error["videos"] = null;
            })
            .addCase(getChannelVideos.fulfilled, (state, action) => {
                state.videos = action.payload.videos;
                state.totalVideos = action.payload.totalVideos;
            })
            .addCase(getChannelVideos.rejected, (state, action) => {
                state.error["videos"] = action.error.message || null;
            });

        builder
            .addCase(publishVideo.pending, (state) => {
                state.error["publish"] = null;
            })
            .addCase(publishVideo.fulfilled, (state, action) => {
                state.videos = state.videos.map((video) => {
                    if (video._id === action.meta.arg.videoId) {
                        return {
                            ...video,
                            ...action.payload.video,
                        };
                    }
                    return video;
                });
            })
            .addCase(publishVideo.rejected, (state, action) => {
                state.error["publish"] = action.error.message || null;
            });

        builder.addCase(toggleVideoVisibility.fulfilled, (state, action) => {
            state.videos = state.videos.map((video) => {
                if (video._id === action.meta.arg.videoId) {
                    return {
                        ...video,
                        isPublic: !video.isPublic,
                    };
                }
                return video;
            });
        });

        builder
            .addCase(uploadOrChangeThumbnail.pending, (state, action) => {
                state.error["thumbnail"] = null;
            })
            .addCase(uploadOrChangeThumbnail.fulfilled, (state, action) => {
                state.videos = state.videos.map((video) => {
                    if (video._id === action.meta.arg.videoId) {
                        return {
                            ...video,
                            thumbnailUrl: action.payload.video.thumbnailUrl,
                        };
                    }
                    return video;
                });
            })
            .addCase(uploadOrChangeThumbnail.rejected, (state, action) => {
                state.error["thumbnail"] = action.error.message || null;
            });

        builder
            .addCase(updateVideoMetadata.pending, (state, action) => {
                state.error["metadata"] = null;
            })
            .addCase(updateVideoMetadata.fulfilled, (state, action) => {
                state.videos = state.videos.map((video) => {
                    if (video._id === action.meta.arg.videoId) {
                        return {
                            ...video,
                            ...action.payload.video,
                        };
                    }
                    return video;
                });
            })
            .addCase(updateVideoMetadata.rejected, (state, action) => {
                state.error["metadata"] = action.error.message || null;
            });

        builder
            .addCase(deleteVideo.pending, (state, action) => {
                state.error["delete"] = null;
            })
            .addCase(deleteVideo.fulfilled, (state, action) => {
                state.videos = state.videos.filter((video) => video._id !== action.meta.arg.videoId);
                state.totalVideos -= 1;
            })
            .addCase(deleteVideo.rejected, (state, action) => {
                state.error["delete"] = action.error.message || null;
            });
    },
});

export const { toggleUpload, uploadVideo, setError, resetChannelState } = channelSlice.actions;

export default channelSlice.reducer;
