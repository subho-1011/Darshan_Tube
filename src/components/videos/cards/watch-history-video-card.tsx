"use client";

import { TVideoCard } from "@/lib/types";
import { VideoCardWrapper } from "@/components/videos/cards";
import { TrashIcon } from "lucide-react";
import { IMoreButton } from "@/components/common/more-button";
import { timeAgo } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useWatchHistoryActions } from "@/hooks/watch-history";
import React from "react";
import { DeleteConfirmationModal } from "@/components/common";

export const WatchHistoryVideoCard: React.FC<{
    video: TVideoCard;
    lastWatchedAt: Date;
}> = ({ video, lastWatchedAt }) => {
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    const { removeFromWatchHistory } = useWatchHistoryActions();
    const moreButtons: IMoreButton[] = [
        {
            label: "Delete from watch history",
            icon: <TrashIcon className="w-4 h-4" />,
            onClick: () => setConfirmDelete(true),
        },
    ];

    return (
        <div>
            <VideoCardWrapper video={video} moreButtons={moreButtons}>
                <Badge variant="outline">Last watched {timeAgo(lastWatchedAt)}</Badge>
            </VideoCardWrapper>
            <DeleteConfirmationModal
                deleteType="watch history"
                open={confirmDelete}
                onOpenChange={(open: boolean) => setConfirmDelete(open)}
                onConfirm={() => removeFromWatchHistory(video._id)}
            />
        </div>
    );
};
