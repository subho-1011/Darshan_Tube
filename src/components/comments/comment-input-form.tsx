"use client";

import { z } from "zod";
import React from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Loader2Icon } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentInputSchema } from "@/lib/validators/comments-validations";
import { cn } from "@/lib/utils";

export interface CommentInputFormProps {
    isPending?: boolean;
    isSuccess?: boolean;
    text?: string;
    onSubmit: (data: z.infer<typeof CommentInputSchema>) => void;
    className?: string;
}

export const CommentInputForm: React.FC<CommentInputFormProps> = ({
    isPending = false,
    isSuccess = false,
    text = "",
    onSubmit,
    className,
}) => {
    const form = useForm<z.infer<typeof CommentInputSchema>>({
        resolver: zodResolver(CommentInputSchema),
        defaultValues: { text },
    });

    // clear error after 3 second
    React.useEffect(() => {
        if (!form.watch("text") && form.formState.errors.text) {
            const timeout = setTimeout(() => {
                form.clearErrors("text");
            }, 3000);
            return () => clearTimeout(timeout);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.watch("text"), form.formState.errors.text]);

    // clear form after success
    React.useEffect(() => {
        if (isSuccess) {
            form.reset();
        }
    }, [isSuccess, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("py-3 space-y-3", className)}>
                <FormField
                    name="text"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            {/* <FormLabel htmlFor="text">Comment</FormLabel> */}
                            <FormControl>
                                <Textarea {...field} placeholder="Write a comment..." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={!form.getValues("text") || isPending}>
                    {isPending ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Submit
                </Button>
            </form>
        </Form>
    );
};
