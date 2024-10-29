import { Suspense } from "react";
import ContentLoader from "@/components/common/content-lodader";
import { EmailVerificationForm } from "@/components/auth/form/emailVerificationForm";

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<ContentLoader />}>
            <EmailVerificationForm />
        </Suspense>
    );
}
