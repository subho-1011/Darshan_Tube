"use client";

import * as React from "react";
import Image from "next/image";
import { TVideoCard } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShowIfElse } from "@/components/common/show";
import ErrorPage from "@/components/common/error-page";
import { SearchVideosSkeleton } from "@/components/skeleton";

import { durationDisplay, timeAgo } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchVideosService } from "@/services/videos.services";

const SearchPage = () => {
    const searchQuery = useSearchParams();

    const query = searchQuery.get("q");

    const { data, isPending, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, error } = useInfiniteQuery({
        queryKey: ["videos", { search: query }],
        queryFn: ({ pageParam = 1 }) => searchVideosService(query ?? "", pageParam),
        getNextPageParam: (lastPage) => {
            if (lastPage.metadata.page * 10 < lastPage.metadata.total) {
                return lastPage.metadata.page + 1;
            }
            return undefined;
        },
        initialPageParam: 1,
        enabled: query !== null && query.length >= 3,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    const videos = data?.pages.flatMap((page) => page.videos) ?? [];

    if (isLoading) {
        return <SearchVideosSkeleton />;
    }

    if (error) {
        return <ErrorPage error={error || new Error("An error occurred while fetching videos")} />;
    }

    if (!videos.length) {
        return (
            <SearchVideosContainer query={query}>
                <div className="w-full flex items-center justify-center">
                    <p className="text-muted-foreground">Try searching for something else, or check back later.</p>
                    <p>
                        <Button
                            variant="link"
                            onClick={() => document.querySelector<HTMLInputElement>("#search-input")?.focus()}
                        >
                            click here
                        </Button>
                        to search again.
                    </p>
                </div>
            </SearchVideosContainer>
        );
    }

    return (
        <SearchVideosContainer query={query}>
            <React.Fragment>
                <div className="w-full py-4 px-2 flex flex-col gap-3 md:gap-6">
                    {videos.map((video) => (
                        <SearchVideoCard key={video._id} video={video} />
                    ))}
                </div>
                <ShowIfElse
                    when={hasNextPage}
                    ifTrue={
                        <div className="flex justify-center my-4">
                            <Button variant="link" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                                {isFetchingNextPage ? "Loading..." : "Load More"}
                            </Button>
                        </div>
                    }
                    ifFalse={<div className="flex justify-center my-4 text-muted-foreground">No more videos</div>}
                />
            </React.Fragment>
        </SearchVideosContainer>
    );
};

const SearchVideosContainer: React.FC<{ query: string | null; children?: React.ReactNode }> = ({ query, children }) => {
    return (
        <div className="container w-full mx-auto">
            <ShowIfElse
                when={!!query}
                ifTrue={<h1 className="text-3xl font-bold my-4">Search results for &quot;{query}&quot;</h1>}
                ifFalse={<h1 className="text-3xl font-bold my-4">Search results</h1>}
            />
            <React.Suspense fallback={<SearchVideosSkeleton />}>{children}</React.Suspense>
        </div>
    );
};

const SearchVideoCard: React.FC<{ video: TVideoCard }> = ({ video }) => {
    const router = useRouter();

    return (
        <div
            key={video._id}
            className="flex w-full max-w-2xl bg-background/60 rounded-lg overflow-hidden shadow-lg border hover:shadow-xl transition-all duration-500 ease-in-out cursor-pointer relative opacity-90 hover:opacity-100 group"
            onClick={() => router.push(`/watch/${video.slug}`)}
            onContextMenu={(e) => e.preventDefault()}
        >
            <Image
                className="w-1/2 aspect-video "
                src={video?.thumbnail?.url ?? "/no-thumbnail.png"}
                alt={video.title}
                width={256}
                height={144}
            />
            <Badge
                variant="secondary"
                className="absolute right-[52%] bottom-3 opacity-0 transition-opacity ease-linear duration-500 group-hover:opacity-100"
            >
                {durationDisplay(video.duration)}
            </Badge>
            <div className="px-6 py-4 space-y-2">
                <div className="font-bold text-lg mb-2 line-clamp-2">{video.title}</div>
                <p className="text-muted-foreground line-clamp-2">{video.description}</p>
                <Badge variant="outline">{video.category}</Badge>
                <p className="text-xs text-muted-foreground">
                    {video.views} views • {timeAgo(video.createdAt)}
                </p>
            </div>
        </div>
    );
};

export default SearchPage;
