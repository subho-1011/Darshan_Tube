import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Watch History',
    description: 'Watch history of the user',
};

export default function WatchHistoryLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="w-full">{children}</div>;
}
