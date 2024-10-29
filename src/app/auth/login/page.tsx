import { LoginForm } from "@/components/auth";
import ContentLoader from "@/components/common/content-lodader";
import { Suspense } from "react";

export default function LoginPage() {
    return (
        <Suspense fallback={<ContentLoader />}>
            <LoginForm />
        </Suspense>
    );
}
