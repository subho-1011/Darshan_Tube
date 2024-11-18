import { configureStore } from "@reduxjs/toolkit";

import ProfileSlice from "./slices/profile-slice";
import ChannelSlice from "./slices/channel-slice";
import VideoDataSlice from "./slices/videodata-slice";
import PlaylistSlice from "./slices/playlist-slice";

export const makeStore = () =>
    configureStore({
        reducer: {
            profile: ProfileSlice,
            channel: ChannelSlice,
            videoData: VideoDataSlice,
            playlist: PlaylistSlice,
        },
    });

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
