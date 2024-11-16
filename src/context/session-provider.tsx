"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";

import { TUser } from "@/lib/types";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import ContentLoader from "@/components/common/content-lodader";
import { TLoginFormSchema } from "@/lib/validators/user-validations";
import { refreshTokenService, userLoginService, userLogoutService } from "@/services/auth.services";

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
    error: string | null;
    isLoading: boolean;
    updateSession: (session: Session) => void;
    login: (credentials: TLoginFormSchema) => Promise<void>;
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

    const [session, setSession] = React.useState<Session | null>(null);
    const [status, setStatus] = React.useState<AuthStatus>("loading");
    const [error, setError] = React.useState<string | null>(null);

    const updateSession = React.useCallback((session: Session) => {
        setSession(session);
        setStatus(session.user ? "authenticated" : "unauthenticated");
    }, []);

    const login = async (credentials: TLoginFormSchema) => {
        try {
            const res = await userLoginService(credentials);

            if (res?.status === 200 && res?.data?.user) {
                updateSession({ user: res.data.user, role: res.data.user.role });
            }

            if (res?.status === 301 || res?.status === 302) {
                router.push("/auth/verify-email");
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                setError(error?.response?.data?.message);

                if (error.response?.status === 301 || error.response?.status === 302) {
                    router.push("/auth/verify-email");
                }

                if (error.response?.status === 429) {
                    setError("Too many requests");
                    throw new Error("Too many requests, please try again later");
                }

                throw error.response?.data;
            }

            if (error instanceof Error) {
                setError(error.message);
                throw error;
            }

            const errMsg = error ? (error as string) : "Something went wrong";
            setError(errMsg);
            throw new Error(errMsg);
        } finally {
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
    };

    const logout = async () => {
        try {
            await userLogoutService();

            updateSession({ user: null, role: "guest" });
        } catch (error) {
            console.log(error);
        }
    };

    const { data, isLoading, isPending, isRefetching, isError } = useQuery({
        queryKey: ["session"],
        queryFn: () => refreshTokenService(),
        refetchInterval: 1000 * 60 * 15,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
        staleTime: 1000 * 60 * 15,
    });

    React.useEffect(() => {
        if (data?.data?.user) {
            updateSession({ user: data?.data?.user, role: data?.data?.user.role });
        } else {
            updateSession({ user: null, role: "guest" });
        }
    }, [data, updateSession]);

    React.useEffect(() => {
        if (isRefetching) {
            updateSession({ user: data?.data?.user || null });
        }
    }, [isRefetching, updateSession, data]);

    const isAuthenticated = React.useMemo(() => status === "authenticated", [status]);

    const value = {
        session,
        isSessionLoading: isLoading,
        status,
        error,
        isLoading,
        updateSession,
        login,
        logout,
        isAuthenticated,
    };

    if (isAuthenticated && pathname === "/auth/login") {
        router.replace("/");
    }

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <ContentLoader />
            </div>
        );
    }

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};
