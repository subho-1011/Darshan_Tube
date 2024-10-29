'use client';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AuthCardWrapper } from '@/components/auth';
import { EyeIcon, EyeOffIcon, Loader } from 'lucide-react';

import { FormError } from '@/components/common/form-error';
import { FormSuccess } from '@/components/common/form-success';

import { useLoginForm } from '@/hooks/auth';

export const LoginForm = () => {
    const {
        form,
        isPending,
        showPassword,
        togglePassword,
        error,
        success,
        onSubmit,
        callbackUrl,
    } = useLoginForm();

    return (
        <AuthCardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="I didn't have account"
            backButtonHref={`/auth/register?callbackUrl=${callbackUrl}`}
        >
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
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <span className="relative flex items-center">
                                            <Input
                                                {...field}
                                                placeholder={
                                                    showPassword
                                                        ? 'Abcd123!'
                                                        : '********'
                                                }
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                disabled={isPending}
                                            />
                                            <span
                                                className="absolute end-3 cursor-pointer"
                                                onClick={togglePassword}
                                            >
                                                {showPassword ? (
                                                    <EyeIcon className="h-5 w-5" />
                                                ) : (
                                                    <EyeOffIcon className="h-5 w-5" />
                                                )}
                                            </span>
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
                        {isPending && <Loader className="animate-spin mr-3" />}
                        Login
                    </Button>
                </form>
            </Form>
        </AuthCardWrapper>
    );
};
