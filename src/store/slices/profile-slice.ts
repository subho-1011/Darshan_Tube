import { IProfileData } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    getProfile,
    updateProfile,
    updateProfileAvatar,
    updateProfileCoverImage,
} from "../thunk-api/profile.thunk-api";

interface IProfileState {
    profileData: IProfileData | null;
    isEditable: boolean;
    isLoading: boolean;
    isUpdating: boolean;
    isUpdatingAvatar: boolean;
    isUpdatingCoverImage: boolean;
    error: string | null;
    errorUpdating: string | null;
    errorUpdatingAvatar: string | null;
    errorUpdatingCoverImage: string | null;
}

const initialState: IProfileState = {
    profileData: null,
    isEditable: false,
    isLoading: false,
    isUpdating: false,
    isUpdatingAvatar: false,
    isUpdatingCoverImage: false,
    error: null,
    errorUpdating: null,
    errorUpdatingAvatar: null,
    errorUpdatingCoverImage: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<Partial<IProfileState>>) => {
            return { ...state, ...action.payload };
        },
        setIsEditable: (state, action: PayloadAction<boolean>) => {
            state.isEditable = action.payload;
        },

        toggleEditButton: (state) => {
            state.isEditable = !state.isEditable;
        },

        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profileData = action.payload.data.profile;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.profileData = null;
                state.error = action.error.message || null;
            });

        builder
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profileData = action.payload.data.profile;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.errorUpdating = action.error.message || null;
            });

        builder
            .addCase(updateProfileAvatar.pending, (state) => {
                state.isUpdatingAvatar = true;
                state.errorUpdatingAvatar = null;
            })
            .addCase(updateProfileAvatar.fulfilled, (state, action) => {
                state.isUpdatingAvatar = false;
                state.profileData = action.payload.data.profile;
            })
            .addCase(updateProfileAvatar.rejected, (state, action) => {
                state.isUpdatingAvatar = false;
                state.errorUpdatingAvatar = action.error.message || null;
            });

        builder
            .addCase(updateProfileCoverImage.pending, (state) => {
                state.isUpdatingCoverImage = true;
                state.errorUpdatingCoverImage = null;
            })
            .addCase(updateProfileCoverImage.fulfilled, (state, action) => {
                state.isUpdatingCoverImage = false;
                state.profileData = action.payload.data.profile;
            })
            .addCase(updateProfileCoverImage.rejected, (state, action) => {
                state.isUpdatingCoverImage = false;
                state.errorUpdatingCoverImage = action.error.message || null;
            });
    },
});

export const { setProfile, setIsEditable, toggleEditButton, setIsLoading, setError } = profileSlice.actions;

export default profileSlice.reducer;
