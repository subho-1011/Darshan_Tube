import { TPlaylist } from "@/lib/types";
import { api, apiHandler } from "@/lib/utils";

const getPlaylistsService = async () =>
    apiHandler(async (): Promise<{ playlists: TPlaylist[] }> => {
        const response = await api.get("/playlists");

        return response.data.data;
    });

const getPlaylistService = async (playlistId: string) =>
    apiHandler(async (): Promise<{ playlist: TPlaylist }> => {
        const response = await api.get(`/playlists/${playlistId}`);

        return response.data.data;
    });

const createPlaylistService = async (playlist: Partial<TPlaylist>) =>
    apiHandler(async (): Promise<{ playlist: TPlaylist }> => {
        const response = await api.post("/playlists", { ...playlist });

        return response.data.data;
    });

const updatePlaylistService = async (playlistId: string, playlist: Partial<TPlaylist>) =>
    apiHandler(async (): Promise<{ playlist: TPlaylist }> => {
        const response = await api.patch(`/playlists/${playlistId}`, playlist);

        return response.data.data;
    });

const deletePlaylistService = async (playlistId: string) =>
    apiHandler(async () => {
        await api.delete(`/playlists/${playlistId}`);
    });

const addVideoToPlaylistService = async (playlistId: string, videoSlug: string) =>
    apiHandler(async (): Promise<{ playlist: TPlaylist }> => {
        const response = await api.post(`/playlists/${playlistId}/videos/${videoSlug}`);

        return response.data.data;
    });

const removeVideoFromPlaylistService = async (playlistId: string, videoId: string) =>
    apiHandler(async () => {
        await api.delete(`/playlists/${playlistId}/videos/${videoId}`);
    });

const togglePlaylistPrivacyService = async (playlistId: string) =>
    apiHandler(async (): Promise<{ playlist: TPlaylist }> => {
        const response = await api.post(`/playlists/${playlistId}/privacy`);

        return response.data.data;
    });

const getUserPlaylistService = async () =>
    apiHandler(async (): Promise<{ playlists: TPlaylist[] }> => {
        const response = await api.get("/playlists/users/@me");

        return response.data.data;
    });

const getPlaylistBySlugService = async (slug: string) =>
    apiHandler(async (): Promise<{ playlist: TPlaylist }> => {
        const response = await api.get(`/playlists/slug/${slug}`);

        return response.data.data;
    });

const searchPlaylistsService = async (query: string) =>
    apiHandler(async (): Promise<{ playlists: TPlaylist[] }> => {
        const response = await api.get(`/playlists/search?q=${query}`);

        return response.data.data;
    });

export {
    getPlaylistsService,
    getPlaylistService,
    createPlaylistService,
    updatePlaylistService,
    deletePlaylistService,
    addVideoToPlaylistService,
    removeVideoFromPlaylistService,
    togglePlaylistPrivacyService,
    getUserPlaylistService,
    getPlaylistBySlugService,
    searchPlaylistsService,
};
