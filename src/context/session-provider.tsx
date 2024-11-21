"use client";

import * as React from "react";
import { TUser } from "@/lib/types";
import { PROTECTED_ROUTES, AUTH_ROUTES } from "@/lib/routes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { refreshTokenService, userLogoutService } from "@/services/auth.services";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface Session {
    user: TUser | null;
    role?: "user" | "admin" | "superadmin" | "guest";
}

interface SessionContextType {
    session: Session | null;
    isSessionLoading: boolean;
    isAuthenticated: boolean;
    status: AuthStatus;
    isLoading: boolean;
    updateSession: (session: Session) => void;
    logout: () => Promise<void>;
}

const SessionContext = React.createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
    const context = React.useContext(SessionContext);
    if (context === undefined) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
};

interface SessionProviderProps {
    children: React.ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [session, setSession] = React.useState<Session | null>({ user: null, role: "guest" });
    const [status, setStatus] = React.useState<AuthStatus>("loading");

    const updateSession = (session: Session) => {
        setStatus("authenticated");
        setSession(session);
    };

    const logout = async () => {
        try {
            await userLogoutService();
            setStatus("unauthenticated");
            setSession({
                user: null,
                role: "guest",
            });

            toast({
                variant: "sky",
                description: "Hope to see you soon! 👋",
            });
        } catch (error) {
            console.log(error);
        }
    };

    const { data, isLoading, isRefetching } = useQuery({
        queryKey: ["session"],
        queryFn: () => refreshTokenService(),
        refetchInterval: 1000 * 60 * 15,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
        staleTime: 1000 * 60 * 15,
        retry: false,
    });

    const isAuthenticated = React.useMemo(() => status === "authenticated", [status]);

    React.useEffect(() => {
        const isAuthRoute = AUTH_ROUTES.includes(pathname);
        const isProtectedRoute = PROTECTED_ROUTES.includes(pathname) || pathname.startsWith("/channel");

        const handleRouteChange = () => {
            if (isAuthenticated && isAuthRoute) {
                const callbackUrl = searchParams.get("callbackUrl") || "/";
                router.replace(callbackUrl);
            } else if (!isAuthenticated && isProtectedRoute) {
                const callbackUrl = pathname;
                const redirectUrl = `/auth/login?callbackUrl=${callbackUrl}`;
                router.replace(redirectUrl);
            }
        };

        handleRouteChange();
    }, [isAuthenticated, pathname, router, searchParams]);

    React.useEffect(() => {
        if (data) {
            setSession({
                user: data?.data?.user,
                role: data?.data?.user?.role || "guest",
            });
            setStatus("authenticated");
        }
    }, [data]);

    const value: SessionContextType = {
        session,
        isSessionLoading: isLoading,
        status: status === "loading" ? "loading" : isAuthenticated ? "authenticated" : "unauthenticated",
        isLoading,
        logout,
        updateSession,
        isAuthenticated,
    };

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};
