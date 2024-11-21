"use client";

import React from "react";
import { TCommunityPostData } from "@/lib/types";

import {
    CommunityCard,
    CommunityForm,
    CommunityPageSkeleton,
    CommunityCardEditForm,
    CommunityCardModel,
} from "./_components";
import { Button } from "@/components/ui/button";
import { ShowIf, ShowIfElse } from "@/components/common/show";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommunityPosts } from "@/services/community.services";
export default function CommunityPostsPage() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useInfiniteQuery({
        queryKey: ["community-posts"],
        queryFn: ({ pageParam = 1 }) => getCommunityPosts(pageParam),
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.metadata.page < lastPage.metadata.total) {
                return pages.length + 1;
            }
            return undefined;
        },
        initialPageParam: 1,
    });

    return (
        <React.Fragment>
            <CommunityForm />
            <React.Suspense fallback={<CommunityPageSkeleton />}>
                <ShowIfElse
                    when={isPending}
                    ifTrue={<CommunityPageSkeleton />}
                    ifFalse={
                        <CommunityPostsContainer
                            posts={data?.pages.flatMap((page) => page.posts) || []}
                            fetchNextPage={fetchNextPage}
                            hasNextPage={hasNextPage}
                            isFetchingNextPage={isFetchingNextPage}
                        />
                    }
                />
            </React.Suspense>
        </React.Fragment>
    );
}

interface ICommunityPostsContainerProps {
    posts: TCommunityPostData[];
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
}

const CommunityPostsContainer: React.FC<ICommunityPostsContainerProps> = ({
    posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
}) => {
    const [editPostId, setEditPostId] = React.useState<string | null>(null);
    const [modalPostId, setModalPostId] = React.useState<string | null>(null);

    const onChangeModal = (postId: string | null) => setModalPostId(postId);

    if (posts.length === 0) {
        return <p className="pt-8 text-muted-foreground">No posts found</p>;
    }

    return (
        <div className="flex flex-col w-full items-center space-y-4 my-4">
            {posts.map((post) => (
                <CommunityCard key={post._id} post={post} onChangeModal={onChangeModal} setEditPostId={setEditPostId} />
            ))}
            <ShowIfElse
                when={hasNextPage}
                ifTrue={
                    <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} variant="link">
                        {isFetchingNextPage ? "Loading more..." : "Load More"}
                    </Button>
                }
                ifFalse={<p className="text-muted-foreground">No more posts</p>}
            />
            <ShowIf when={!!modalPostId}>
                <CommunityCardModel
                    modal={!!modalPostId}
                    post={posts.find((post) => post._id === modalPostId)!}
                    onChangeModal={onChangeModal}
                    setEditPostId={setEditPostId}
                />
            </ShowIf>
            <ShowIf when={!!editPostId}>
                <CommunityCardEditForm
                    post={posts.find((post) => post._id === editPostId)!}
                    editPostId={editPostId}
                    setEditPostId={setEditPostId}
                />
            </ShowIf>
        </div>
    );
};
