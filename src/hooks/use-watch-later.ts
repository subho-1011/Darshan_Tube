import { useToast } from "./use-toast";
import { useSession } from "@/context/session-provider";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    getWatchLaterService,
    addToWatchLaterService,
    removeFromWatchLaterService,
} from "@/services/watch-later.services";

export const useWatchLater = () => {
    const { isAuthenticated } = useSession();

    const { data, isPending, error } = useQuery({
        queryKey: ["watch-later"],
        queryFn: () => getWatchLaterService(),
        enabled: isAuthenticated,
    });

    return {
        error,
        isPending,
        videos: data?.videos || [],
    };
};

export const useWatchLaterActions = () => {
    const { isAuthenticated } = useSession();
    const { toast } = useToast();

    const { mutate: addToWatchLaterMutation, isPending: isAddingToWatchLater } = useMutation({
        mutationKey: ["watch-later", "add"],
        mutationFn: (videoId: string) => addToWatchLaterService(videoId),
        onSuccess: () => {
            toast({
                variant: "success",
                description: "Video added to watch later list.",
            });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                description: error.message,
            });
        },
    });

    const { mutate: removeFromWatchLaterMutation, isPending: isRemovingFromWatchLater } = useMutation({
        mutationKey: ["watch-later", "remove"],
        mutationFn: (videoId: string) => removeFromWatchLaterService(videoId),
        onSuccess: () => {
            toast({
                variant: "success",
                description: "Video removed from watch later list.",
            });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                description: error.message,
            });
        },
    });

    const addToWatchLater = (videoId: string) => {
        if (!isAuthenticated) {
            toast({
                variant: "destructive",
                description: "You must be logged in to add videos to your watch later list.",
            });
            return;
        }

        addToWatchLaterMutation(videoId);
    };

    const removeFromWatchLater = (videoId: string) => {
        if (!isAuthenticated) {
            toast({
                variant: "destructive",
                description: "You must be logged in to remove videos from your watch later list.",
            });
            return;
        }

        removeFromWatchLaterMutation(videoId);
    };

    return {
        addToWatchLater,
        isAddingToWatchLater,
        removeFromWatchLater,
        isRemovingFromWatchLater,
    };
};
