'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { TUser } from '@/lib/types';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
    refreshTokenService,
    userLoginService,
    userLogoutService,
} from '@/services/auth.services';
import { TLoginFormSchema } from '@/lib/validators/user-validations';
import { Loader2 } from 'lucide-react';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface Session {
    user: TUser | null;
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

const SessionContext = React.createContext<SessionContextType | undefined>(
    undefined
);

export const useSession = () => {
    const context = React.useContext(SessionContext);

    if (context === undefined) {
        throw new Error('useSession must be used within a SessionProvider');
    }

    return context;
};

interface SessionProviderProps {
    children: React.ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
    const router = useRouter();

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
                updateSession({ user: res.data.user });
            }

            if (res?.status === 301 || res?.status === 302) {
                router.push("/auth/verify-email");
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                setError(error?.response?.data?.message);

                if (
                    error.response?.status === 301 ||
                    error.response?.status === 302
                ) {
                    router.push("/auth/verify-email");
                }

                if (error.response?.status === 429) {
                    setError("Too many requests");
                    throw new Error(
                        "Too many requests, please try again later"
                    );
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

            updateSession({ user: null });
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
    });

    React.useEffect(() => {
        if (data?.data?.user) {
            updateSession({ user: data?.data?.user });
        }
    }, [data, updateSession]);

    React.useEffect(() => {
        if (isRefetching) {
            updateSession({ user: data?.data?.user || null });
        }
    }, [isRefetching, updateSession, data]);

    const isAuthenticated = React.useMemo(
        () => status === "authenticated",
        [status]
    );

    const value = {
        session,
        isSessionLoading: isPending,
        status,
        error,
        isLoading,
        updateSession,
        login,
        logout,
        isAuthenticated,
    };

    // if (isLoading) {
    //     return (
    //         <div className="flex justify-center items-center min-h-screen relative">
    //             <Loader2 className="w-32 h-32 animate-spin absolute" />
    //         </div>
    //     );
    // }

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
};
