'use client';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { ArrowLeft, Loader } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AuthCardWrapper } from '@/components/auth';

import { FormError } from '@/components/common/form-error';
import { FormSuccess } from '@/components/common/form-success';

import { useEmailVerificationForm } from '@/hooks/auth';
import Link from 'next/link';

export const EmailVerificationForm = () => {
    const {
        form,
        isPending,
        error,
        success,
        onSubmit,
        resendEmailVerificationOtp,
    } = useEmailVerificationForm();

    return (
        <AuthCardWrapper headerLabel="Email Verification">
            <>
                <Form {...form}>
                    <form
                        className="space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="mr.chandragupta@gmail.com"
                                                type="email"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="otpCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Otp</FormLabel>
                                        <FormControl>
                                            <span className="relative flex items-center">
                                                <Input
                                                    {...field}
                                                    placeholder="Enter your otp code"
                                                    type="number"
                                                    disabled={isPending}
                                                />
                                            </span>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormError message={error} />
                            <FormSuccess message={success} />
                        </div>
                        <Button
                            className="w-full"
                            size="lg"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending && (
                                <Loader className="animate-spin mr-3" />
                            )}
                            Submit
                        </Button>
                    </form>
                </Form>
                <div className="flex w-full items-end justify-end">
                    <Button
                        className="text-muted-foreground m-0 p-0 mt-1.5"
                        variant="link"
                        onClick={resendEmailVerificationOtp}
                        disabled={isPending}
                    >
                        Resend otp code
                    </Button>
                </div>
                <div className="flex w-full items-center justify-center">
                    <Link href="/auth/login">
                        <Button
                            variant="link"
                            className="text-muted-foreground m-0 p-0 mt-1.5"
                        >
                            <ArrowLeft className="mr-1" />
                            Back to login
                        </Button>
                    </Link>
                </div>
            </>
        </AuthCardWrapper>
    );
};
