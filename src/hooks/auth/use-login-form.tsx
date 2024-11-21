"use client";

import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema, TLoginFormSchema } from "@/lib/validators/user-validations";

import { useSession } from "@/context/session-provider";
import { userLoginService } from "@/services/auth.services";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useLoginForm = () => {
    const { updateSession } = useSession();
    const { toast } = useToast();

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

    const {
        mutate: userLogin,
        isPending,
        error: err,
    } = useMutation({
        mutationKey: ["login"],
        mutationFn: (credentials: TLoginFormSchema) => userLoginService(credentials),
        onSuccess: (data) => {
            updateSession({
                user: data?.data?.user,
                role: data?.data?.user?.role || "guest",
            });

            toast({
                variant: "sky",
                description: `Welcome back, ${data?.data?.user?.name}`,
            });
        },
        onError: (error: AxiosError) => {
            if (error.status === 301 || error.status === 302) {
                router.push("/auth/verify-email");
            }
            const errMsg = (error?.response?.data as { message: string })?.message;
            setError(errMsg);
            if (error.status === 429) {
                setError("Too many requests");
            }
        },
    });

    const onSubmit = (credentials: TLoginFormSchema) => {
        userLogin(credentials);
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
