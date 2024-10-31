"use client";

import React from "react";

import { useSession } from "@/context/session-provider";
import ContentLoader from "../common/content-lodader";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { isAuthenticated, isSessionLoading } = useSession();

    React.useEffect(() => {
        // Redirect to login if the user is not authenticated
        if (!isSessionLoading && !isAuthenticated) {
            router.push("/auth/login");
        }
    }, [isAuthenticated, isSessionLoading, router]);

    if (isSessionLoading || !isAuthenticated) {
        return <ContentLoader />;
    }

    return <>{children}</>;
}
