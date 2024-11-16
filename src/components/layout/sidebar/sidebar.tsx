"use client";

import * as React from "react";
import Link from "next/link";
import useMobile from "@/hooks/use-mobile";

import { Button } from "@/components/ui/button";
import { RiMenuFold3Line, RiMenuUnfold3Line } from "react-icons/ri";
import { Separator } from "@/components/ui/separator";
import {
    HomeIcon,
    Users2Icon,
    PlaySquareIcon,
    ClockIcon,
    ThumbsUpIcon,
    Tv2Icon,
    UserIcon,
    XIcon,
    SettingsIcon,
    LogOutIcon,
    HelpCircleIcon,
} from "lucide-react";
import { useSession } from "@/context/session-provider";

import { cn } from "@/lib/utils";

interface SidebarContextType {
    isOpen: boolean;
    toggleSidebar: () => void;
    changeOpenStatus: (open: boolean) => void;
}

export const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

export const SideBarProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const changeOpenStatus = React.useCallback((action: boolean) => {
        setIsOpen(action);
    }, []);

    React.useEffect(() => {
        if (window.innerWidth > 768) {
            setIsOpen(true);
        }
    }, []);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <SidebarContext.Provider value={{ isOpen, changeOpenStatus, toggleSidebar }}>
            <div className={cn("transition-all duration-300 ease-in-out", isOpen ? "md:ml-64" : "md:ml-0")}>
                {children}
            </div>
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = React.useContext(SidebarContext);

    if (context === undefined) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }

    return context;
};

export const Sidebar = () => {
    const isMobile = useMobile();
    const { isAuthenticated, logout } = useSession();

    const { isOpen, changeOpenStatus, toggleSidebar } = useSidebar();

    const asideRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        let touchStartX = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.touches[0].clientX;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchDiff = touchEndX - touchStartX;
            if (isMobile && touchDiff > 50 && touchStartX < 50) {
                changeOpenStatus(true);
            }
        };

        document.addEventListener("touchstart", handleTouchStart);
        document.addEventListener("touchend", handleTouchEnd);
        return () => {
            document.removeEventListener("touchstart", handleTouchStart);
            document.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isMobile, changeOpenStatus]);

    React.useEffect(() => {
        if (!isMobile) {
            return;
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (asideRef.current && !asideRef.current.contains(event.target as Node)) {
                if (isMobile) {
                    changeOpenStatus(false);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobile, changeOpenStatus]);

    return (
        <>
            {!isOpen && (
                <Button
                    variant="secondary"
                    size="icon"
                    className="md:hidden fixed -left-4 flex z-[60]"
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    <RiMenuUnfold3Line className="h-6 w-6" />
                </Button>
            )}
            <aside
                ref={asideRef}
                className={`flex fixed top-0 left-0 z-[60] md:z-40 h-screen
                    transition-transform duration-300 ease-in-out
                    bg-background border-r group
                    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                    md:w-64 w-full max-w-64`}
            >
                {isOpen ? (
                    <Button
                        variant="secondary"
                        size="icon"
                        className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-16 -right-6 z-[61]"
                        onClick={toggleSidebar}
                        aria-label="Toggle sidebar"
                    >
                        <RiMenuFold3Line className="h-6 w-6" />
                    </Button>
                ) : (
                    <Button
                        variant="secondary"
                        size="icon"
                        className="hidden md:flex absolute top-16 -right-6 z-[61]"
                        onClick={toggleSidebar}
                        aria-label="Toggle sidebar"
                    >
                        <RiMenuUnfold3Line className="h-6 w-6" />
                    </Button>
                )}

                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden fixed top-4 right-4 z-[60]"
                    onClick={() => changeOpenStatus(false)}
                    aria-label="Toggle sidebar"
                >
                    <XIcon className="h-6 w-6" />
                </Button>
                <div className="flex flex-col h-full py-4">
                    <h1 className="sm:text-2xl px-4 mb-4 text-base font-bold md:hidden">DarshanTube</h1>
                    <div className="flex-grow">
                        <nav className="space-y-2 md:mt-12 ml-4">
                            <SidebarItem href="/" label="Home">
                                <HomeIcon className="mr-2 h-5 w-5" />
                            </SidebarItem>
                            <SidebarItem href="/community-posts" label="Community">
                                <Users2Icon className="mr-2 h-5 w-5" />
                            </SidebarItem>

                            <Separator className="my-2" />
                            <SidebarItem href="/playlists" label="Playlists">
                                <PlaySquareIcon className="mr-2 h-5 w-5" />
                            </SidebarItem>
                            <SidebarItem href="/watch-history" label="Watch History">
                                <ClockIcon className="mr-2 h-5 w-5" />
                            </SidebarItem>
                            <SidebarItem href="/liked-videos" label="Liked Videos">
                                <ThumbsUpIcon className="mr-2 h-5 w-5" />
                            </SidebarItem>
                            <SidebarItem href="/channel/@me" label="Dashboard">
                                <Tv2Icon className="mr-2 h-5 w-5" />
                            </SidebarItem>

                            <Separator className="my-2" />
                            <SidebarItem href="/profile" label="Profile" disabled={!isAuthenticated}>
                                <UserIcon className="mr-2 h-5 w-5" />
                            </SidebarItem>
                            <SidebarItem href="/profile/settings" label="Settings" disabled={!isAuthenticated}>
                                <SettingsIcon className="mr-2 h-5 w-5" />
                            </SidebarItem>
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-left"
                                disabled={!isAuthenticated}
                                onClick={async () => await logout()}
                            >
                                <LogOutIcon className="mr-2 h-5 w-5" />
                                <span>Logout</span>
                            </Button>
                        </nav>
                    </div>
                    {/* Help and Support at the bottom */}
                    <div className="mt-4 ml-4">
                        <Link href="/help-and-support">
                            <Button variant="link" className="w-full justify-start text-left">
                                <HelpCircleIcon className="mr-2 h-5 w-5" />
                                Help and Support
                            </Button>
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
};

const SidebarItem = ({
    children,
    href,
    label,
    disabled = false,
}: {
    children: React.ReactNode;
    href: string;
    label: string;
    disabled?: boolean;
}) => {
    return (
        <Link href={href}>
            <Button variant="ghost" className="w-full justify-start text-left" disabled={disabled}>
                {children}
                <span>{label}</span>
            </Button>
        </Link>
    );
};
