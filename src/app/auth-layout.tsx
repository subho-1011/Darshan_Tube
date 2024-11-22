"use client";

import * as React from "react";
import { useSession } from "@/context/session-provider";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "@/lib/routes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { PageSkeleton } from "@/components/skeleton";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { isAuthenticated, isPending } = useSession();

    const isAuthRoute = React.useMemo(() => AUTH_ROUTES.includes(pathname), [pathname]);
    const isProtectedRoute = React.useMemo(
        () => PROTECTED_ROUTES.includes(pathname) || pathname.startsWith("/channel") || pathname.startsWith("/profile"),
        [pathname]
    );

    React.useEffect(() => {
        let callbackUrl = searchParams.get("callbackUrl");
        if (callbackUrl === "/") callbackUrl = null;

        if (isAuthRoute && isAuthenticated) {
            router.push(callbackUrl || "/");
        }
        if (isProtectedRoute && !isAuthenticated) {
            router.push(`/auth/login?callbackUrl=${pathname}`);
        }
    }, [isAuthRoute, isProtectedRoute, isAuthenticated, pathname, router, searchParams]);

    if (isPending) {
        return <PageSkeleton />;
    }

    return (
        <React.Suspense fallback={<PageSkeleton />}>
            <div className="w-full">{children}</div>
        </React.Suspense>
    );
}
