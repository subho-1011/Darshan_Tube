import React from "react";
import {
    addToWatchHistoryService,
    updateWatchHistoryService,
    removeFromWatchHistoryService,
} from "@/services/watch-history.services";
import { toast } from "../use-toast";
import { useSession } from "@/context/session-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useWatchHistoryActions = () => {
    const queryClient = useQueryClient();
    const { isAuthenticated } = useSession();

    const { mutate: addToWatchHistoryMutate, isPending: isAdding } = useMutation({
        mutationFn: (data: { videoId: string; watchedDuration?: number; timestamp?: number }) =>
            addToWatchHistoryService(data.videoId, data.watchedDuration, data.timestamp),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["watch-history"] });
            toast({
                variant: "success",
                title: "Added to watch history",
            });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        },
    });

    const addToWatchHistory = React.useCallback(
        (videoId: string, watchedDuration?: number, timestamp?: number) => {
            if (isAuthenticated) {
                addToWatchHistoryMutate({ videoId, watchedDuration, timestamp });
            }
        },
        [addToWatchHistoryMutate, isAuthenticated]
    );

    const { mutate: updateWatchHistoryMutate, isPending: isUpdating } = useMutation({
        mutationFn: (data: { videoId: string; watchedDuration: number; timestamp: number }) =>
            updateWatchHistoryService(data.videoId, data.watchedDuration, data.timestamp),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["watch-history"] });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        },
    });

    const updateWatchHistory = React.useCallback(
        (videoId: string, watchedDuration: number, timestamp: number) => {
            if (isAuthenticated) {
                updateWatchHistoryMutate({ videoId, watchedDuration, timestamp });
            }
        },
        [updateWatchHistoryMutate, isAuthenticated]
    );

    const { mutate: removeFromWatchHistoryMutate, isPending: isDeleteing } = useMutation({
        mutationFn: (videoId: string) => removeFromWatchHistoryService(videoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["watch-history"] });
            toast({
                variant: "success",
                title: "Removed from watch history",
            });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        },
    });

    const removeFromWatchHistory = (videoId: string) => {
        if (isAuthenticated) {
            removeFromWatchHistoryMutate(videoId);
        }
    };

    return {
        isAdding,
        isDeleteing,
        isUpdating,
        updateWatchHistory,
        addToWatchHistory,
        removeFromWatchHistory,
    };
};
