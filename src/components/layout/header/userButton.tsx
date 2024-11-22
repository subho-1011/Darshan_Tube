"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeSubMenu from "@/components/theme/theme-sub-menu";
import { User, Settings, LogOut, BellIcon, LogInIcon, Tv2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/context/session-provider";
import { OwnerAvatar } from "@/components/common/avatar";
import { ShowIfElse } from "@/components/common/show";

const UserButton: React.FC = ({}) => {
    const router = useRouter();
    const pathaname = usePathname();

    const { isAuthenticated, logout, session } = useSession();

    const handleLogIn = () => {
        let callbackUrl = pathaname;

        if (callbackUrl) {
            callbackUrl = callbackUrl.replace("/auth/login", "");
            router.push(`/auth/login?callbackUrl=${callbackUrl}`);
        } else {
            router.push("/auth/login");
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full ring-1 ring-primary shadow-md shadow-primary/50"
                >
                    <ShowIfElse
                        when={!!session?.user?.avatarUrl}
                        ifTrue={<OwnerAvatar />}
                        ifFalse={<User className="h-5 w-5" />}
                    />
                    <span className="sr-only">User menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated ? (
                    <>
                        <DropdownMenuItem onClick={() => router.push("/profile")}>
                            <User className="mr-2 h-4 w-4" />
                            <span>My profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/channel/@me`)}>
                            <Tv2Icon className="mr-2 h-4 w-4" />
                            <span>My channel</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/profile/settings")}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/notifications")}>
                            <BellIcon className="mr-2 h-4 w-4" />
                            <span>Notifications</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                ) : null}
                <ThemeSubMenu />
                <DropdownMenuSeparator />
                {isAuthenticated ? (
                    <DropdownMenuItem className="space-x-2" onClick={async () => await logout()}>
                        <LogOut className="h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem className="space-x-2" onClick={handleLogIn}>
                        <LogInIcon className="h-4 w-4" />
                        <span>Log in</span>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export { UserButton };
