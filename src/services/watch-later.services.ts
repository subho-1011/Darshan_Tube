import { TVideoCard } from "@/lib/types";
import { api, apiHandler } from "@/lib/utils";

const getWatchLaterService = async (page = 1) =>
    apiHandler(async (): Promise<{ videos: TVideoCard }> => {
        const response = await api.get(`/watch-later?page=${page}`);

        return response.data.data;
    });

const addToWatchLaterService = async (videoId: string) =>
    apiHandler(async (): Promise<{ video: TVideoCard }> => {
        const response = await api.post(`/watch-later/${videoId}`);

        return response.data.data;
    });

const removeFromWatchLaterService = async (videoId: string) =>
    apiHandler(async () => {
        await api.delete(`/watch-later/${videoId}`);
    });

export { getWatchLaterService, addToWatchLaterService, removeFromWatchLaterService };
