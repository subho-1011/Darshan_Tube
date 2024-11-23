"use client";

import * as React from "react";

import { HistoryIcon, HomeIcon, SearchIcon, UploadIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserButton } from "./userButton";
import { DarshanTubeTextLOGO } from "../logo";
import { VideosSearchForm } from "./search-form";

const Header = () => {
    const router = useRouter();

    const handleUpload = () => {
        router.push("/channel/@me?tab=upload");
    };

    return (
        <>
            <div className="w-full flex items-center justify-between sticky top-0 z-50 bg-background/40 backdrop-blur border-b">
                <div className="flex w-full items-center justify-between md:px-12 px-4 py-2">
                    <DarshanTubeTextLOGO />
                    <VideosSearchForm />
                    <div className="hidden md:flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Upload"
                            onClick={handleUpload}
                            className="border border-warning shadow-lg shadow-warning/40 hover:shadow-warning/60 active:shadow-warning/80 active:scale-95"
                        >
                            <UploadIcon className="h-5 w-5" />
                        </Button>
                        <UserButton />
                    </div>
                </div>
            </div>
            <div className="md:hidden flex justify-around items-center border-t py-1.5 bg-background fixed bottom-0 left-0 right-0 z-50">
                <Button variant="ghost" size="icon" aria-label="Home" onClick={() => router.push("/")}>
                    <HomeIcon className="h-5 w-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Search"
                    onClick={() => document.querySelector<HTMLInputElement>("#search-input")?.focus()}
                >
                    <SearchIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Upload" onClick={handleUpload}>
                    <UploadIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Watch history">
                    <HistoryIcon className="h-5 w-5" />
                </Button>
                <UserButton />
            </div>
        </>
    );
};

export default Header;
