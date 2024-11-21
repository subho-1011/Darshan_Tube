"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TUser } from "@/lib/types";
import { UserIcon } from "lucide-react";
import { useSession } from "@/context/session-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

// Logged in user avatar
export const OwnerAvatar: React.FC<{ className?: string }> = ({ className }) => {
    const { session } = useSession();

    return (
        <Avatar className={className}>
            <AvatarImage src={session?.user?.avatarUrl} />
            <AvatarFallback>
                <UserIcon className="w-4 h-4" />
            </AvatarFallback>
        </Avatar>
    );
};

export const ChannelAvatar: React.FC<{ className?: string }> = ({ className }) => {
    return <OwnerAvatar className={className} />;
};

type TUserAvatar = Pick<TUser, "_id" | "avatarUrl" | "username" | "name">;

// Other user avatar
export const UserAvatar: React.FC<{
    className?: string;
    user: TUserAvatar | null;
}> = ({ className, user }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/@${user?.username}`);
    };

    return (
        <Avatar
            className={cn("cursor-pointer hover:opacity-80 transition-opacity duration-300", className)}
            onClick={handleClick}
        >
            <AvatarImage src={user?.avatarUrl} />
            <AvatarFallback>
                <UserIcon className="w-4 h-4" />
            </AvatarFallback>
        </Avatar>
    );
};

// Guest avatar
export const GuestAvatar: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <Avatar className={className}>
            <AvatarFallback>
                <UserIcon className="w-4 h-4" />
            </AvatarFallback>
        </Avatar>
    );
};