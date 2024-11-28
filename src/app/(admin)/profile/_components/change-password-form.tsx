"use client";

import { z } from "zod";
import React from "react";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/common/form-error";
import { PasswordInput } from "@/components/ui2/password-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordService } from "@/services/auth.services";
import { ChangePasswordFormSchema } from "@/lib/validators/user-validations";

type TChangePasswordFormSchema = z.infer<typeof ChangePasswordFormSchema>;

export const ChangePasswordForm: React.FC<{
    setOpened: React.Dispatch<React.SetStateAction<"root" | "password">>;
}> = ({ setOpened }) => {
    const form = useForm<TChangePasswordFormSchema>({
        resolver: zodResolver(ChangePasswordFormSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const { mutate, isPending, error } = useMutation({
        mutationKey: ["change-password"],
        mutationFn: async (data: TChangePasswordFormSchema) => changePasswordService(data),
        onSuccess: () => {
            toast({ title: "Password Changed", description: "Your password has been successfully changed." });
            form.reset();
            setOpened("root");
        },
        onError: (error) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        },
    });

    return (
        <section>
            <h2 className="text-2xl font-bold my-4">Change Password</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => mutate(data))}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="oldPassword">Old Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="newPassword">New Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormError message={error?.message} />
                        <div className="flex justify-end gap-4">
                            <Button type="button" variant="outline" onClick={() => setOpened("root")}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={!form.getValues("oldPassword") || isPending}>
                                {isPending && <Loader2 className="animate-spin" />}
                                Change Password
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </section>
    );
};
