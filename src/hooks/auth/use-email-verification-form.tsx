import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailVerificationFormSchema, TEmailVerificationFormSchema } from "@/lib/validators/user-validations";

import { userVerifyEmailService, resendEmailVerificationOtpService } from "@/services/auth.services";

export const useEmailVerificationForm = () => {
    const { toast } = useToast();

    const router = useRouter();
    const searchParams = useSearchParams();

    const callbackUrl = searchParams.get("callbackUrl");

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<TEmailVerificationFormSchema>({
        resolver: zodResolver(EmailVerificationFormSchema),
        defaultValues: {
            email: localStorage.getItem("email") || "",
            otpCode: "",
        },
    });

    const onSubmit = async (data: TEmailVerificationFormSchema) => {
        setError("");
        setSuccess("");
        setIsPending(true);
        localStorage.setItem("email", data.email);

        try {
            await userVerifyEmailService(data);
            setSuccess("Email verified successfully");

            toast({
                title: "Email verified successfully",
                description: "Redirecting to login page...",
                duration: 5000,
            });

            // redirect to
            setTimeout(() => {
                if (callbackUrl && callbackUrl !== "/") {
                    router.push(`/auth/login?callbackUrl=${callbackUrl}`);
                } else {
                    router.push("/auth/login");
                }
            }, 1000);
        } catch (error) {
            const errMsg = (error as string) || "Something went wrong";
            setError(errMsg);
        } finally {
            setIsPending(false);
        }
    };

    const resendEmailVerificationOtp = async () => {
        form.clearErrors();
        try {
            const email = form.getValues("email");

            if (!email) {
                form.setError("email", {
                    type: "required",
                    message: "Email is required",
                });
                return;
            }

            await resendEmailVerificationOtpService(email);
            toast({
                title: "Resend OTP sent successfully",
                description: "Check your email for verification",
                duration: 5000,
            });
        } catch (error) {
            const errMsg = (error as string) || "Something went wrong";
            setError(errMsg);
        }
    };

    return {
        form,
        isPending,
        error,
        success,
        onSubmit,
        resendEmailVerificationOtp,
    };
};
