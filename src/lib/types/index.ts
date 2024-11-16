// user
export type TUser = {
    _id: string;
    name: string;
    username: string;
    avatarUrl?: string;
    role: "user" | "admin" | "superadmin" | "guest";
    createdAt: Date;
};

// session
export type TSession = {
    user: TUser;
    expires: Date;
};

// gender
export type Gender = "male" | "female" | "others" | undefined;

// profile data
export interface IProfileData {
    _id: string;
    username: string;
    firstName: string;
    lastName?: string;
    bio?: string;
    city?: string;
    gender?: Gender;
    birthday?: string;
    websites: string[];
    socials: { [key: string]: string };
    createdAt: Date;
    profileAvatarUrl: string;
    coverImageUrl: string;
    owner: string;
}

// video
export type TVideo = {
    _id: string;
    title: string;
    slug: string;
    description: string;
    thumbnail: { publicId: string; url: string };
    thumbnailUrl: string;
    videoUrls: { originalVideoUrl: string; publicId: string; posterUrl: string };
    tags: string[];
    category: string;
    views: number;
    duration: number;
    status: string;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
};

// video data
export type TVideoData = TVideo & {
    owner: TBasicOwner & {
        subscribers: number;
        isSubscribed: boolean;
    };
    likes: number;
    isLiked: boolean;
    isOwner: boolean;
};

// comment
export type TComment = {
    _id: string;
    text: string;
    isEdited: boolean;
    isLiked: boolean;
    likes: number;
    owner: TBasicOwner;
    createdAt: Date;
    isOwner: boolean;
    noOfReplies?: number;
};

// video comment data
export type TVideoComment = TComment & {
    videoId: string;
    replies: TVideoComment[];
};

// basic owner
export type TBasicOwner = Pick<TUser, "_id" | "name" | "username" | "avatarUrl">;

// video card
export type TVideoCard = Omit<TVideo, "isPublic" | "status" | "updatedAt"> & {
    owner: TBasicOwner;
};

// playlist video
export type TPlaylistVideo = Pick<TVideo, "_id" | "title" | "thumbnailUrl">;

// playlist
export type TPlaylist = {
    _id: string;
    title: string;
    owner: TBasicOwner;
    description?: string;
    videos: TPlaylistVideo[];
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
};

// like video
export type TLikedVideo = TVideoCard & {
    likedAt: Date;
};

// watch history
export type TWatchHistory = {
    _id: string;
    video: TVideoCard;
    lastWatchedAt: Date;
    repeated: number;
};