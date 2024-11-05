"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import ProtectedLayout from "./proctected-layout";
import { useSession } from "@/context/session-provider";

const NotAuthorized = () => {
    const router = useRouter();

    return (
        <div className="container mx-auto flex w-full items-center justify-center">
            <h1>
                <span className="text-destructive">Oops!</span>
                You are not authorized to view this page
            </h1>
            <Button variant="link" onClick={() => router.push("/")}>
                Go back
            </Button>
        </div>
    );
};

export default function AdminLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: { username: string };
}>) {
    const username = params.username;
    const { session } = useSession();

    if (!username) {
        return <NotAuthorized />;
    }

    if (session?.user?.username === username || username === "%40me" || username === "@me") {
        return <ProtectedLayout>{children}</ProtectedLayout>;
    } else {
        return <NotAuthorized />;
    }
}
