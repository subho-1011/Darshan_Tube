import { TPlaylist } from "@/lib/types";
import {
    getPlaylistService,
    getUserPlaylistService,
    createPlaylistService,
    updatePlaylistService,
    deletePlaylistService,
    addVideoToPlaylistService,
    removeVideoFromPlaylistService,
    togglePlaylistPrivacyService,
} from "@/services/playlist.services";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Create a thunk to fetch user playlists
const fetchUserPlaylists = createAsyncThunk("playlists/fetchUserPlaylists", async () => {
    return await getUserPlaylistService();
});

// Create a thunk to create a playlist
const createPlaylist = createAsyncThunk("playlists/createPlaylist", async (data: Partial<TPlaylist>) => {
    return await createPlaylistService({ ...data });
});

// Create a thunk to update a playlist
const updatePlaylist = createAsyncThunk(
    "playlists/updatePlaylist",
    async ({ playlistId, playlist }: { playlistId: string; playlist: Partial<TPlaylist> }) => {
        return await updatePlaylistService(playlistId, playlist);
    }
);

// Create a thunk to delete a playlist
const deletePlaylist = createAsyncThunk("playlists/deletePlaylist", async (playlistId: string) => {
    return await deletePlaylistService(playlistId);
});

// Create a thunk to add a video to a playlist
const addVideoToPlaylist = createAsyncThunk(
    "playlists/addVideoToPlaylist",
    async ({ playlistId, videoSlug }: { playlistId: string; videoSlug: string }) => {
        return await addVideoToPlaylistService(playlistId, videoSlug);
    }
);

// Create a thunk to remove a video from a playlist
const removeVideoFromPlaylist = createAsyncThunk(
    "playlists/removeVideoFromPlaylist",
    async ({ playlistId, videoId }: { playlistId: string; videoId: string }) => {
        return await removeVideoFromPlaylistService(playlistId, videoId);
    }
);

// Create a thunk to toggle playlist privacy
const togglePlaylistPrivacy = createAsyncThunk("playlists/togglePlaylistPrivacy", async (playlistId: string) => {
    return await togglePlaylistPrivacyService(playlistId);
});

// Create a thunk to fetch a playlist
const fetchPlaylist = createAsyncThunk("playlists/fetchPlaylist", async (playlistId: string) => {
    return await getPlaylistService(playlistId);
});

export {
    fetchUserPlaylists,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    togglePlaylistPrivacy,
    fetchPlaylist,
};
