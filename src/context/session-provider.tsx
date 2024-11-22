"use client";

import * as React from "react";
import { TUser } from "@/lib/types";

import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { refreshTokenService, userLogoutService } from "@/services/auth.services";
import { PageSkeleton } from "@/components/skeleton";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface Session {
    user: TUser | null;
    role?: "user" | "admin" | "superadmin" | "guest";
}

interface SessionContextType {
    session: Session | null;
    isSessionLoading: boolean;
    isAuthenticated: boolean;
    status: AuthStatus;
    isLoading: boolean;
    isPending: boolean;
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

    const { data, isLoading, isPending, isRefetching } = useQuery({
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
        isPending,
        logout,
        updateSession,
        isAuthenticated,
    };

    return (
        <React.Suspense fallback={<PageSkeleton />}>
            <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
        </React.Suspense>
    );
};
