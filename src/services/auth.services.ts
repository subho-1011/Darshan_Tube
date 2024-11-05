import { TUser } from "@/lib/types";
import { api, apiErrorHandler } from "@/lib/utils";
import { IApiResponse } from "@/lib/types/api-response";
import { TEmailVerificationFormSchema, TLoginFormSchema, TRegisterFormSchema } from "@/lib/validators/user-validations";

interface IUserResponse extends IApiResponse {
    data: { user: TUser };
}

api.defaults.withCredentials = true;

/**
 * Authentication Services
 *
 * This module provides functions for interacting with the authentication API endpoints.
 */

/**
 * Register a new user.
 * @param {TRegisterFormSchema} credentials - The user's registration information.
 * @returns {Promise<IUserResponse>} The response containing the registered user data.
 * @throws {Error} If the registration fails.
 */
const userRegisterService = async (credentials: TRegisterFormSchema): Promise<IUserResponse> => {
    try {
        const { data } = await api.post<IUserResponse>("/auth/register", credentials);

        return data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};

/** ====================================================================== */

/**
 * Log in a user.
 * @param {TLoginFormSchema} credentials - The user's login credentials.
 * @returns {Promise<IUserResponse>} The response containing the logged-in user data.
 * @throws {Error} If the login fails.
 */
const userLoginService = async (credentials: TLoginFormSchema): Promise<IUserResponse> => {
    try {
        const { data } = await api.post<IUserResponse>("/auth/login", credentials);

        return data;
    } catch (error) {
        throw error;
    }
};

/** ====================================================================== */

/**
 * Log out the current user.
 * @returns {Promise<IApiResponse>}
 * @throws {Error} If the logout fails.
 */
const userLogoutService = async (): Promise<IApiResponse> => {
    try {
        const { data } = await api.post<IApiResponse>("/auth/logout");

        return data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};

/** ====================================================================== */

/**
 * Verify a user's email.
 * @param {TEmailVerificationFormSchema} verificationData - The email verification data.
 * @returns {Promise<IApiResponse>}
 * @throws {Error} If the email verification fails.
 */
const userVerifyEmailService = async (
    verificationData: TEmailVerificationFormSchema
): Promise<IApiResponse | undefined> => {
    try {
        const { data } = await api.post<IApiResponse>("/auth//otp/email-verification/verify", verificationData);

        return data;
    } catch (error) {
        apiErrorHandler(error);
    }
};

/** ====================================================================== */

/**
 * Resend email verification OTP.
 * @param {string} email - The user's email address.
 * @returns {Promise<IApiResponse>}
 * @throws {Error} If sending the OTP fails.
 */
const resendEmailVerificationOtpService = async (email: string): Promise<IApiResponse | undefined> => {
    try {
        const { data } = await api.post("/auth/otp/email-verification/send", {
            email,
        });

        return data;
    } catch (error) {
        apiErrorHandler(error);
    }
};

/** ====================================================================== */

/**
 * Refresh the user's authentication token.
 * @returns {Promise<IUserResponse>} The response containing the refreshed user data.
 * @throws {Error} If the token refresh fails.
 */
const refreshTokenService = async (): Promise<IUserResponse> => {
    try {
        const { data } = await api.post<IUserResponse>("/auth/refresh-token");

        return data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};

export {
    userRegisterService,
    userLoginService,
    userLogoutService,
    userVerifyEmailService,
    refreshTokenService,
    resendEmailVerificationOtpService,
};
