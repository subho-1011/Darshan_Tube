import { TWatchHistory } from "@/lib/types";
import { api, apiHandler } from "@/lib/utils";
import { MAX_VIDEOS_PER_PAGE } from "@/lib/constant";

export const getWatchHistoryService = async (page = 1) =>
    apiHandler(async (): Promise<{ watchHistorys: TWatchHistory[]; totalWatchHistory: number }> => {
        const response = await api.get(`/watch-history?page=${page}&limit=${MAX_VIDEOS_PER_PAGE}`);

        return response.data.data;
    });

export const addToWatchHistoryService = async (videoId: string, watchedDuration?: number, timestamp?: number) =>
    apiHandler(async () => {
        await api.post(`/watch-history/${videoId}`, { watchedDuration, timestamp });
    });

export const updateWatchHistoryService = async (videoId: string, watchedDuration: number, timestamp: number) =>
    apiHandler(async () => {
        await api.patch(`/watch-history/${videoId}`, { watchedDuration, timestamp });
    });

export const removeFromWatchHistoryService = async (videoId: string) =>
    apiHandler(async () => {
        await api.delete(`/watch-history/${videoId}`);
    });
