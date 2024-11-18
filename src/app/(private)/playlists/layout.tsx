import ProtectedLayout from "@/components/layout/proctected-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Playlists",
    description: "Playlists created by the user",
};

export default function PlaylistsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ProtectedLayout>
            <div className="w-full">{children}</div>
        </ProtectedLayout>
    );
}
