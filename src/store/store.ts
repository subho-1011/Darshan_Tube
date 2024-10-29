import { configureStore } from '@reduxjs/toolkit';

import ProfileSlice from './slices/profile-slice';

export const makeStore = () =>
    configureStore({
        reducer: {
            profile: ProfileSlice,
        },
    });

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
