"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/context/session-provider";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    const { session } = useSession();

    return (
        <div className="container mx-auto flex w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-2">
                {session?.user ? (
                    <h1 className="text-4xl font-bold text-destructive">Hey, {session.user?.name}!</h1>
                ) : (
                    <h1 className="text-4xl font-bold text-destructive">Hey, Buddy!</h1>
                )}
                <h2 className="text-xl font-bold text-destructive">Something went wrong!</h2>
                <p className="text-muted-foreground">We couldn&apos;t find what you were looking for.</p>
                <p className="text-muted-foreground pb-0 -mb-10">You can </p>
                <div className="flex items-center">
                    <Button onClick={() => router.push("/")} variant="link">
                        go to home
                    </Button>
                    <span className="text-muted-foreground">or</span>
                    <Button onClick={() => router.back()} variant="link">
                        go back
                    </Button>
                </div>
            </div>
        </div>
    );
}
