import { IProfileData, ISettings } from "@/lib/types";
import { api, apiErrorHandler, apiHandler } from "@/lib/utils";
import { TEditProfileFormSchema } from "@/lib/validators/profile-validations";

interface IProfileDataResponse {
    data: {
        profile: IProfileData;
    };
}

// Get profile data
export const getProfileDataService = async (): Promise<IProfileDataResponse> => {
    try {
        const { data } = await api.get("/users/profile");
        return data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};

// Update profile data
export const updateProfileDataService = async (profileData: TEditProfileFormSchema): Promise<IProfileDataResponse> => {
    try {
        const { data } = await api.patch("/users/profile", profileData);
        return data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};

// Update profile avatar
export const updateProfileAvatarService = async (formData: FormData): Promise<IProfileDataResponse> => {
    try {
        const { data } = await api.patch("/users/profile/avatar", formData);
        return data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};

// Update profile cover image
export const updateProfileCoverImageService = async (formData: FormData): Promise<IProfileDataResponse> => {
    try {
        const { data } = await api.patch("/users/profile/cover-image", formData);
        return data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};

// Delete profile avatar
export const deleteProfileAvatarService = async (): Promise<IProfileDataResponse> => {
    try {
        const { data } = await api.delete("/users/profile/avatar");
        return data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};

// Delete profile cover image
export const deleteProfileCoverImageService = async (): Promise<IProfileDataResponse> => {
    try {
        const { data } = await api.delete("/users/profile/cover-image");
        return data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};

// Get user settings
export const getUserSettinsService = () =>
    apiHandler(
        async (): Promise<{
            settings: ISettings;
        }> => {
            const response = await api.get("/users/settings");
            return response.data.data;
        }
    );

// Update user settings
export const updateUserSettingsService = (values: any) =>
    apiHandler(
        async (): Promise<{
            settings: ISettings;
        }> => {
            const response = await api.patch("/users/settings", values);
            return response.data.data;
        }
    );
