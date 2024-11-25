"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { SupportAsnwerCard } from "./support-answer-card";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getPreviousQuestions } from "@/services/support-questions.services";

export const PreviousQuestions = () => {
    const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["help-and-support", "previous-questions"],
        queryFn: async ({ pageParam = 1 }) => getPreviousQuestions(pageParam),
        getNextPageParam: (lastPage, pages) => {
            const lastPageMeta = lastPage.metadata;
            const currentPage = pages.length + 1;

            return lastPageMeta.total >= currentPage ? currentPage : undefined;
        },
        initialPageParam: 1,
        refetchOnWindowFocus: false,
    });

    const questions = data?.pages.flatMap((page) => page.supportQuestions) ?? [];

    return (
        <section className="mt-4">
            <h2 className="font-semibold text-xl">Previous Questions</h2>
            {questions.map((question) => (
                <SupportAsnwerCard key={question._id} question={question} />
            ))}
            {isPending && <p>Loading...</p>}
            <Button variant="link" onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load more" : "No more questions"}
            </Button>
        </section>
    );
};
