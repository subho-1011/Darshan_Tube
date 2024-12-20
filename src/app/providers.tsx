"use client";

import { SessionProvider } from "@/context/session-provider";
import { makeStore } from "@/store/store";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import { Provider as ReduxProvider } from "react-redux";
import AuthLayout from "./auth-layout";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
    const store = React.useMemo(() => makeStore(), []);

    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <AuthLayout>
                    <ReduxProvider store={store}>{children}</ReduxProvider>
                </AuthLayout>
            </SessionProvider>
        </QueryClientProvider>
    );
};

export default Providers;
