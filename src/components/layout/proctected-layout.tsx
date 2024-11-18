"use client";

import React from "react";

import { useSession } from "@/context/session-provider";
import ContentLoader from "../common/content-lodader";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { isAuthenticated, isSessionLoading } = useSession();

    React.useEffect(() => {
        if (!isAuthenticated) {
            const callbackUrl = pathname;
            router.push("/auth/login?callbackUrl=" + callbackUrl);
        }
    }, [isAuthenticated, router, pathname]);

    // if session load complete and route is /auth/login then redirect to callback url or home
    // React.useEffect(() => {
    //     if (!isSessionLoading && isAuthenticated && pathname === "/auth/login") {
    //         const callbackUrl = searchParams.get("callbackUrl") || "/";
    //         router.push(callbackUrl);
    //     }
    // }, [isSessionLoading, isAuthenticated, router, pathname, searchParams]);

    if (isSessionLoading || !isAuthenticated) {
        return <ContentLoader />;
    }

    return <>{children}</>;
}
