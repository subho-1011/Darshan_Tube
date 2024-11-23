"use client";

import * as React from "react";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShowIf } from "@/components/common/show";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { searchVideosService } from "@/services/videos.services";

export const VideosSearchForm = () => {
    const router = useRouter();
    const [showResult, setShowResult] = React.useState(true);
    const [searchQuery, setSearchQuery] = React.useState("");
    const searchInputRef = React.useRef<HTMLInputElement>(null);

    const { data, isLoading, error } = useQuery({
        queryKey: ["videos", null],
        queryFn: () => searchVideosService(searchQuery),
        enabled: searchQuery.length > 2,
    });

    const onGoToSearchPage = () => {
        router.push(`/search?q=${searchQuery}`);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onGoToSearchPage();
        setShowResult(false);
        searchInputRef.current?.blur();
        setSearchQuery("");
    };

    const searchVideos = data?.videos ?? [];

    // outside click
    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchInputRef.current && !searchInputRef.current.contains(e.target as Node)) {
                setShowResult(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchInputRef]);

    return (
        <div className="flex flex-grow w-full max-w-sm items-center relative mx-4">
            <form onSubmit={onSubmit} className="w-full">
                <Input
                    ref={searchInputRef}
                    value={searchQuery ?? ""}
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowResult(true)}
                    className="w-full relative"
                    aria-label="Search"
                    id="search-input"
                />
                <ShowIf when={!!searchQuery}>
                    <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        className="absolute right-0 top-0 rounded-l-none"
                        onClick={() => setSearchQuery("")}
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </ShowIf>
            </form>
            <div
                className={cn(
                    "absolute top-full left-0 w-full bg-background/60 backdrop-blur py-0.5 px-1 rounded-lg shadow-xl transition-opacity duration-500 opacity-0",
                    searchVideos.length > 0 && showResult && searchQuery.length > 3 && "opacity-100"
                )}
            >
                {searchVideos.map((video) => (
                    <div
                        key={video._id}
                        className="w-full hover:bg-background/40 py-1 px-2 rounded-md line-clamp-1 cursor-pointer active:bg-background/50 hover:shadow-lg"
                        onClick={onGoToSearchPage}
                    >
                        {video.title}
                    </div>
                ))}
            </div>
        </div>
    );
};
