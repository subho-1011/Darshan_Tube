import { api, apiHandler } from "@/lib/utils";
import { TCommunityCommentData, TCommunityPost, TCommunityPostData } from "@/lib/types";

interface IGetCommunityPostsResponse {
    posts: TCommunityPostData[];
    metadata: {
        total: number;
        page: number;
    };
}

interface IGetCommentOfPostResponse {
    comments: TCommunityCommentData[];
    metadata: {
        total: number;
        page: number;
    };
}

const getCommunityPosts = async (pageParam: number) => {
    return await apiHandler(async (): Promise<IGetCommunityPostsResponse> => {
        const response = await api.get("/community-posts?page=" + pageParam);
        return response.data.data;
    });
};

const getUserCommunityPosts = async (userId: string) => {
    return await apiHandler(async (): Promise<{ posts: TCommunityPostData[] }> => {
        const response = await api.get(`/community-posts/users/${userId}`);
        return response.data.data;
    });
};

const getCommunityPost = async (postId: string) => {
    return await apiHandler(async (): Promise<{ post: TCommunityPost }> => {
        const response = await api.get(`/community-posts/${postId}`);
        return response.data.data;
    });
};

const createCommunityPost = async (formData: FormData) => {
    return await apiHandler(async (): Promise<{ post: TCommunityPostData }> => {
        const response = await api.post("/community-posts", formData);
        return response.data.data;
    });
};

const updateCommunityPost = async (postId: string, content: string) => {
    return await apiHandler(async (): Promise<{ post: TCommunityPostData }> => {
        const response = await api.patch(`/community-posts/${postId}`, { content });
        return response.data.data;
    });
};

const deleteCommunityPost = async (postId: string) => {
    return await apiHandler(async (): Promise<{ post: TCommunityPostData }> => {
        const response = await api.delete(`/community-posts/${postId}`);
        return response.data.data;
    });
};

const likeCommunityPost = async (postId: string) => {
    return await apiHandler(async (): Promise<{ post: TCommunityPostData }> => {
        const response = await api.post(`/community-posts/${postId}/like`);
        return response.data.data;
    });
};

const getCommentsOfCommunityPost = async (postId: string, pageParam: number) => {
    return await apiHandler(async (): Promise<IGetCommentOfPostResponse> => {
        const response = await api.get(`/community-posts/${postId}/comments?page=${pageParam}`);
        return response.data.data;
    });
};

const createCommentOfCommunityPost = async (postId: string, text: string) => {
    return await apiHandler(async (): Promise<{ comment: TCommunityCommentData }> => {
        const response = await api.post(`/community-posts/${postId}/comments`, { text });
        return response.data.data;
    });
};

const deleteCommentOfCommunityPost = async (postId: string, commentId: string) => {
    return await apiHandler(async (): Promise<{ comment: TCommunityCommentData }> => {
        const response = await api.delete(`/community-posts/${postId}/comments/${commentId}`);
        return response.data.data;
    });
};

export {
    getCommunityPosts,
    getUserCommunityPosts,
    getCommunityPost,
    createCommunityPost,
    updateCommunityPost,
    deleteCommunityPost,
    likeCommunityPost,
    getCommentsOfCommunityPost,
    createCommentOfCommunityPost,
    deleteCommentOfCommunityPost,
};
