import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    getProfileDataService,
    updateProfileDataService,
    updateProfileAvatarService,
    updateProfileCoverImageService,
} from '@/services/user.services';
import { TEditProfileFormSchema } from '@/lib/validators/profile-validations';

const getProfile = createAsyncThunk('profile/getProfile', async () => {
    return await getProfileDataService();
});

const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async (data: TEditProfileFormSchema) => {
        return await updateProfileDataService(data);
    }
);

const updateProfileAvatar = createAsyncThunk(
    'profile/updateProfileAvatar',
    async (data: FormData) => {
        return await updateProfileAvatarService(data);
    }
);

const updateProfileCoverImage = createAsyncThunk(
    'profile/updateProfileCoverImage',
    async (data: FormData) => {
        return await updateProfileCoverImageService(data);
    }
);

export {
    getProfile,
    updateProfile,
    updateProfileAvatar,
    updateProfileCoverImage,
};
