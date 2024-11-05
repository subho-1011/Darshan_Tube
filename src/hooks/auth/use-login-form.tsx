"use client";

import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema, TLoginFormSchema } from "@/lib/validators/user-validations";

import { useSession } from "@/context/session-provider";

export const useLoginForm = () => {
    const { login } = useSession();
    const { toast } = useToast();
    const [isPending, setIsPending] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    const callbackUrl = searchParams.get("callbackUrl");

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const togglePassword = () => setShowPassword((prev) => !prev);

    const form = useForm<TLoginFormSchema>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: TLoginFormSchema) => {
        setError("");
        setSuccess("");

        setIsPending(true);

        try {
            await login(data);
            setSuccess("Logged in successfully");

            toast({
                title: "Login successful",
                description: "Redirecting to home page...",
            });

            setTimeout(() => {
                if (callbackUrl && callbackUrl !== "/") {
                    router.push(callbackUrl);
                } else {
                    router.push("/");
                }
            }, 1000);

            localStorage.removeItem("email");
            form.reset();
        } catch (error: any) {
            const errMsg = error?.message ? error.message : "Something went wrong";
            toast({
                title: errMsg,
                variant: "destructive",
            });

            setError(errMsg);
        } finally {
            setIsPending(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("email")) {
            form.setValue("email", localStorage.getItem("email") as string);
        }
    }, []);

    useEffect(() => {
        if (form.watch("password") && form.watch("email")) {
            setError("");
            setSuccess("");
        }
    }, [form, setError, setSuccess]);

    return {
        form,
        isPending,
        showPassword,
        togglePassword,
        error,
        success,
        onSubmit,
        callbackUrl,
    };
};
