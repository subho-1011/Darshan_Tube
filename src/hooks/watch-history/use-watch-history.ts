import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/context/session-provider";
import { getWatchHistoryService } from "@/services/watch-history.services";
import React from "react";
import { MAX_VIDEOS_PER_PAGE } from "@/lib/constant";

export const useWatchHistory = () => {
    const [page, setPage] = React.useState(1);

    const { isAuthenticated } = useSession();

    const onChangePage = (page: number) => setPage(page);

    // get watch history
    const { data, isLoading, error } = useQuery({
        queryKey: ["watch-history", page, isAuthenticated],
        queryFn: () => getWatchHistoryService(page),
        enabled: isAuthenticated,
    });

    return {
        watchHistorys: data?.watchHistorys || [],
        isLoading,
        error,
        page,
        totalPage: Math.ceil((data?.totalWatchHistory || 0) / MAX_VIDEOS_PER_PAGE),
        onChangePage,
    };
};
