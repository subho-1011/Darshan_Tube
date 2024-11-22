export default function ChannelOwnerLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { username: string };
}) {
    if (!params.username) return <div className="flex w-full items-center">You are not authorized</div>;

    return <div className="w-full flex justify-center p-4">{children}</div>;
}
