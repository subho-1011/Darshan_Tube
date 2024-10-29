"use client";

import Image from "next/image";
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
import { cn } from "@/lib/utils";

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
        <div className="w-full">
            <div className="w-full group bg-gray-100 rounded-lg">
                <div className="relative w-full aspect-video hover:cursor-pointer">
                    {videos.slice(0, 4).map((video, index) => (
                        <Image
                            key={video?._id}
                            src={video?.thumbnailUrl || "/no-thumbnail.png"}
                            alt={video?.title || "Playlist thumbnail"}
                            width={256}
                            height={256}
                            className={cn(
                                "w-full aspect-video object-cover rounded-lg border-2 border-primary/20 hover:shadow-2xl hover:shadow-primary hover:ring-2 hover:ring-primary transition-all duration-500",
                                `z-0 group-hover:z-[${50 + index * 10}] group-hover:translate-y-${index * 12}`
                            )}
                            fill
                            onClick={onClickThumbnail}
                        />
                    ))}
                </div>
            </div>
            <div className="mt-2 px-2">
                <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate line-clamp-2">
                        {title}
                    </h3>
                    <MoreButtons className="static -z-10" buttons={moreButtons}>
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="w-full">
                                <LockIcon className="w-4 h-4 mr-2" />
                                Privacy
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuCheckboxItem
                                    checked={isPublic}
                                    onCheckedChange={() => setIsPublic(true)}
                                >
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
