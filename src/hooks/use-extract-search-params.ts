"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useExtractSearchParams = ({ queryKeys }: { queryKeys: string[] }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParamsOfUrl = useSearchParams();

    const searchParams = React.useMemo(() => {
        return queryKeys.reduce(
            (acc, key) => {
                const value = searchParamsOfUrl.get(key);

                if (value) {
                    acc[key] = value;
                }

                return acc;
            },
            {} as Record<string, string | null>
        );
    }, [queryKeys, searchParamsOfUrl]);

    // clear search params
    React.useEffect(() => {
        searchParamsOfUrl.forEach((value, key) => {
            if (!queryKeys.includes(key)) {
                router.replace(pathname);
            }
        });
    }, [pathname, queryKeys, router, searchParamsOfUrl]);

    return searchParams;
};
