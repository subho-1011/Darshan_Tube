import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Liked Videos',
    description: 'Liked videos by the user',
};

export default function LikedVideosLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="w-full">{children}</div>;
}
