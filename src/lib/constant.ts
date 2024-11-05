/**
 * API URL Constants
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Maximum number of videos per page
 */
export const MAX_VIDEOS_PER_PAGE = (process.env.MAX_VIDEOS_PER_PAGE && parseInt(process.env.MAX_VIDEOS_PER_PAGE)) || 12;

/**
 * Maximum number of comments per video
 */
export const MAX_COMMENTS_PER_CONTENT = process.env.MAX_COMMENTS_PER_CONTENT || 10;

/**
 * Maximum file size allowed for uploaded videos
 */
export const MAX_UPLOAD_VIDEO_SIZE =
    (process.env.MAX_UPLOAD_VIDEO_SIZE && parseInt(process.env.MAX_UPLOAD_VIDEO_SIZE)) || 30;

/**
 * Maximum file size allowed for uploaded images
 */
export const MAX_UPLOAD_IMAGE_SIZE =
    (process.env.MAX_UPLOAD_IMAGE_SIZE && parseInt(process.env.MAX_UPLOAD_IMAGE_SIZE)) || 3;

/**
 * List of video categories
 */
export const VIDEO_CATEGORY_ENUM = {
    ENTERTAINMENT: "Entertainment",
    NEWS: "News",
    GAMEING: "Gameing",
    MOVIES: "Movies",
    BLOGING: "Bloging",
    REVIEWS: "Reviews",
    TECHNOLOGY: "Technology",
    MUSIC: "Music",
    SERIES: "Series",
    TV_SHOWS: "TV Shows",
    ANIME: "Anime",
    ANIME_MOVIE: "Anime Movie",
    ANIME_SERIES: "Anime Series",
};
