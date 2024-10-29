// user
export type TUser = {
    _id: string;
    name: string;
    username: string;
    avatarUrl?: string;
    role: string;
    createdAt: Date;
};

// session
export type TSession = {
    user: TUser;
    expires: Date;
};

// gender
export type Gender = 'male' | 'female' | 'others' | undefined;

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
    thumbnailUrl: string;
    videoUrls: { originalVideoUrl: string };
    tags: string[];
    category: string;
    views: number;
    duration: string;
    createdAt: Date;
};

// basic owner
export type TBasicOwner = Pick<
    TUser,
    '_id' | 'name' | 'username' | 'avatarUrl'
>;

// video card
export type TVideoCard = TVideo & {
    owner: TBasicOwner;
};

// playlist video
export type TPlaylistVideo = Pick<TVideo, '_id' | 'title' | 'thumbnailUrl'>;

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
