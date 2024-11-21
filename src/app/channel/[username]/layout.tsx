export default function ChannelOwnerLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { username: string };
}) {
    // TODO: Add when production

    if (!params.username) return <div>You are not authorized</div>;

    if (!params.username.startsWith("%40")) {
        return <div>This is not a valid username</div>;
    }

    return <div className="w-full flex justify-center p-4">{children}</div>;
}
