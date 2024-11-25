"use client";

import { Loader2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useSupportForm } from "@/app/(public)/help-and-support/_lib/hooks/use-support-form";

export const HelpAndSupportForm = () => {
    const { form, isPending, onSubmit } = useSupportForm();

    return (
        <div className="flex w-full items-center justify-center mb-4">
            <Form {...form}>
                <form
                    className="mt-8 w-full max-w-xl border-2 rounded-md p-4 space-y-3"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="questionBy"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="name">Name*</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Your name"
                                        autoComplete="off"
                                        autoFocus
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="questionByEmail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <FormControl>
                                    <Input {...field} type="email" placeholder="Your email address" />
                                </FormControl>
                                <FormDescription>
                                    If you want to receive a response, please provide your email address.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="question"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="message">Question*</FormLabel>
                                <FormControl>
                                    <Textarea {...field} rows={6} placeholder="Type your question here..." />
                                </FormControl>
                                <FormDescription>
                                    Describe your question or issue in detail. Max 500 characters.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="mt-4">
                        {isPending && <Loader2Icon className="animate-spin" />}
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};
