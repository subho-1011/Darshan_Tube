"use client";

import React from "react";
import { TPlaylist } from "@/lib/types";
import { PlaylistCard } from "@/components/videos";

export default function PlaylistsPage() {
    const playlists: TPlaylist[] = [
        {
            _id: "123",
            title: "Test Playlist",
            owner: {
                _id: "123",
                name: "Test User",
                username: "testuser",
                avatarUrl: "",
            },
            description: "Test Description",
            videos: [
                { _id: "123", title: "Test Video 1", thumbnailUrl: "" },
                { _id: "124", title: "Test Video 2", thumbnailUrl: "" },
                { _id: "125", title: "Test Video 3", thumbnailUrl: "" },
                { _id: "126", title: "Test Video 4", thumbnailUrl: "" },
            ],
            isPublic: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            _id: "123",
            title: "Test Playlist",
            owner: {
                _id: "123",
                name: "Test User",
                username: "testuser",
                avatarUrl: "",
            },
            description: "Test Description",
            videos: [
                { _id: "123", title: "Test Video 1", thumbnailUrl: "" },
                { _id: "124", title: "Test Video 2", thumbnailUrl: "" },
                { _id: "125", title: "Test Video 3", thumbnailUrl: "" },
            ],
            isPublic: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    return (
        <div className="w-full relative container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {playlists.map((playlist) => (
                    <PlaylistCard key={playlist._id} playlist={playlist} />
                ))}
            </div>
        </div>
    );
}
