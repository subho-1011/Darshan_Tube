"use client";

import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { AnswerFormSchema } from "../_lib/schemas";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

export const AnswerForm = ({
    answerForm,
    onAnswerSubmit,
    isPending,
}: {
    isPending: boolean;
    onAnswerSubmit: (data: z.infer<typeof AnswerFormSchema>) => void;
    answerForm: ReturnType<typeof useForm<z.infer<typeof AnswerFormSchema>>>;
}) => {
    return (
        <Form {...answerForm}>
            <form
                className="w-full border-2 rounded-md p-3 space-y-3"
                onSubmit={answerForm.handleSubmit(onAnswerSubmit)}
            >
                <FormField
                    control={answerForm.control}
                    name="answer"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea {...field} placeholder="Your answer" autoFocus autoComplete="off" rows={3} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div
                    className={`${!answerForm.getValues("answer") ? "hidden" : "md:flex"} w-full space-y-3 md:space-y-0 gap-3`}
                >
                    <FormField
                        control={answerForm.control}
                        name="answerBy"
                        render={({ field }) => (
                            <FormItem className="md:basis-1/2">
                                <FormControl>
                                    <Input {...field} type="text" placeholder="Your name" autoComplete="off" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={answerForm.control}
                        name="answerByEmail"
                        render={({ field }) => (
                            <FormItem className="md:basis-1/2">
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Your email (optional)"
                                        autoComplete="off"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </Form>
    );
};
