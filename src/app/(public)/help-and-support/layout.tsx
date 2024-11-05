import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Help and Support",
    description: "Help and support for the user",
};

export default function HelpAndSupportLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="w-full">{children}</div>;
}
