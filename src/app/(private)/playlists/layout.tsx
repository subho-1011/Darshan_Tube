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
    return <div className="w-full">{children}</div>;
}
