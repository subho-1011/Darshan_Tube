import AdminLayout from "@/components/layout/owner-layout";

export default function ChannelOwnerLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { username: string };
}) {
    return <AdminLayout params={params}>{children}</AdminLayout>;
}
