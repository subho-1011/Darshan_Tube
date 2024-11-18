import { TPlaylist } from "@/lib/types";

import {
    fetchUserPlaylists,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    togglePlaylistPrivacy,
} from "../thunk-api/playlist.thunk-api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlaylistState {
    playlists: TPlaylist[];
    errors: { [key: string]: string };
}

const initialState: PlaylistState = {
    playlists: [],
    errors: {},
};

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        addPlaylist: (state, action: PayloadAction<string>) => {
            // state.playlists.push(action.payload);
        },
        removePlaylist: (state, action: PayloadAction<string>) => {
            // state.playlists = state.playlists.filter(playlist => playlist !== action.payload);
        },
    },
    extraReducers: (builder) => {
        // fetch user playlists
        builder
            .addCase(fetchUserPlaylists.pending, (state) => {
                state.errors["fetchUserPlaylists"] = "";
            })
            .addCase(fetchUserPlaylists.fulfilled, (state, action) => {
                state.playlists = action.payload.playlists;
            })
            .addCase(fetchUserPlaylists.rejected, (state, action) => {
                state.errors["fetchUserPlaylists"] = action.error.message || "Failed to fetch user playlists";
            });

        // create playlist
        builder
            .addCase(createPlaylist.pending, (state) => {
                state.errors["createPlaylist"] = "";
            })
            .addCase(createPlaylist.fulfilled, (state, action) => {
                const newPlaylist = action.payload.playlist;
                state.playlists = [newPlaylist, ...state.playlists];
            })
            .addCase(createPlaylist.rejected, (state, action) => {
                state.errors["createPlaylist"] = action.error.message || "Failed to create playlist";
            });

        // update playlist
        builder
            .addCase(updatePlaylist.pending, (state) => {
                state.errors["updatePlaylist"] = "";
            })
            .addCase(updatePlaylist.fulfilled, (state, action) => {
                const updatedPlaylist = action.payload.playlist;
                state.playlists = state.playlists.map((playlist) =>
                    playlist._id === updatedPlaylist._id ? updatedPlaylist : playlist
                );
            })
            .addCase(updatePlaylist.rejected, (state, action) => {
                state.errors["updatePlaylist"] = action.error.message || "Failed to update playlist";
            });

        // delete playlist
        builder
            .addCase(deletePlaylist.pending, (state) => {
                state.errors["deletePlaylist"] = "";
            })
            .addCase(deletePlaylist.fulfilled, (state, action) => {
                state.playlists = state.playlists.filter((playlist) => playlist._id !== action.meta.arg);
            })
            .addCase(deletePlaylist.rejected, (state, action) => {
                state.errors["deletePlaylist"] = action.error.message || "Failed to delete playlist";
            });

        // add video to playlist
        builder
            .addCase(addVideoToPlaylist.pending, (state) => {
                state.errors["addVideoToPlaylist"] = "";
            })
            .addCase(addVideoToPlaylist.fulfilled, (state, action) => {
                const updatedPlaylist = action.payload.playlist;
                state.playlists = state.playlists.map((playlist) =>
                    playlist._id === updatedPlaylist._id ? updatedPlaylist : playlist
                );
            })
            .addCase(addVideoToPlaylist.rejected, (state, action) => {
                state.errors["addVideoToPlaylist"] = action.error.message || "Failed to add video to playlist";
            });

        // remove video from playlist
        builder
            .addCase(removeVideoFromPlaylist.pending, (state) => {
                state.errors["removeVideoFromPlaylist"] = "";
            })
            .addCase(removeVideoFromPlaylist.fulfilled, (state, action) => {
                const { playlistId, videoId } = action.meta.arg;
                state.playlists = state.playlists.map((playlist) => {
                    if (playlist._id === playlistId) {
                        playlist.videos = playlist.videos.filter((video) => video._id !== videoId);
                    }
                    return playlist;
                });
            })
            .addCase(removeVideoFromPlaylist.rejected, (state, action) => {
                state.errors["removeVideoFromPlaylist"] =
                    action.error.message || "Failed to remove video from playlist";
            });

        // toggle playlist privacy
        builder.addCase(togglePlaylistPrivacy.fulfilled, (state) => {
            state.playlists = state.playlists.map((playlist) => {
                playlist.isPublic = !playlist.isPublic;
                return playlist;
            });
        });
    },
});

export const { addPlaylist, removePlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;
