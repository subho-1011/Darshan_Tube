"use client";

import { useState } from "react";
import { TPlaylist } from "@/lib/types";
import { MoreButtons } from "@/components/common/more-button";
import { PencilIcon, TrashIcon, PlusIcon, LockIcon } from "lucide-react";
import {
    DropdownMenuCheckboxItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { ThumbnailImage } from "@/components/videos";

export const PlaylistCard: React.FC<{
    playlist: TPlaylist;
}> = ({ playlist }) => {
    const { title, videos } = playlist;

    const thumnails = videos.map((video) => video?.thumbnailUrl);

    const [isPublic, setIsPublic] = useState(false);

    const moreButtons = [
        {
            label: "Edit playlist",
            icon: <PencilIcon className="w-4 h-4" />,
            onClick: () => {},
        },
        {
            label: "Delete playlist",
            icon: <TrashIcon className="w-4 h-4" />,
            onClick: () => {},
        },
        {
            label: "Add video to playlist",
            icon: <PlusIcon className="w-4 h-4" />,
            onClick: () => {},
        },
    ];

    const onClickThumbnail = () => {};

    return (
        <div className="w-full relative group hover:scale-105 hover:opacity-95 pb-2 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 rounded-lg overflow-hidden dark:shadow-primary/40 hover:ring-2 hover:ring-primary/20">
            <div className="w-full group bg-gray-100 rounded-lg">
                <div className="relative w-full aspect-video hover:cursor-pointer">
                    <ThumbnailImage
                        src={thumnails[0] || "/no-thumbnail.png"}
                        alt={title || "Playlist thumbnail"}
                        width={256}
                        height={256}
                        onClick={onClickThumbnail}
                    />
                </div>
            </div>
            <div className="mt-2 px-2">
                <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate line-clamp-2">{title}</h3>
                    <MoreButtons className="static -z-10" buttons={moreButtons}>
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="w-full">
                                <LockIcon className="w-4 h-4 mr-2" />
                                Privacy
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuCheckboxItem checked={isPublic} onCheckedChange={() => setIsPublic(true)}>
                                    Public
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={!isPublic}
                                    onCheckedChange={() => setIsPublic(false)}
                                >
                                    Private
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                    </MoreButtons>
                </div>
                <p className="text-sm text-gray-500">{videos.length} videos</p>
            </div>
        </div>
    );
};

export default PlaylistCard;
