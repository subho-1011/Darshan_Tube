import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Profile',
    description: 'Profile of the user',
};

export default function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="w-full">{children}</div>;
}
