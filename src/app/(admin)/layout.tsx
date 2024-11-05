import ProtectedLayout from "@/components/layout/proctected-layout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <ProtectedLayout>{children}</ProtectedLayout>;
}
