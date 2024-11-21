/**
 * Routes for the application
 */

/**
 * Private routes
 */
export const PRIVATE_ROUTES = [
    "/playlists",
    "/watch-history",
    "/liked-videos",
    "/channel",
    "/channel/@me",
    "/channel/@me/videos",
    "/profile",
    "/profile/settings",
    "/notifications",
];

/**
 * Auth routes
 */
export const AUTH_ROUTES = ["/auth/login", "/auth/register", "/auth/verify-email"];

/**
 * Public routes
 */
export const PUBLIC_ROUTES = ["/", "/explore", "/videos", "/search"];

/**
 * Default routes
 */
export const DEFAULT_ROUTE = "/";

/**
 * Routes that require authentication
 */
export const PROTECTED_ROUTES = [...PRIVATE_ROUTES];
