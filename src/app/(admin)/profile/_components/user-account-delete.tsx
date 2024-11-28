"use client";

import { z } from "zod";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "@/context/session-provider";

const DeleteAccountFormSchema = z.object({
    username: z.string(),
    password: z.string(),
});

type IDeleteAccountFormSchema = z.infer<typeof DeleteAccountFormSchema>;

export const UserAccountDelete: React.FC = () => {
    const { session } = useSession();

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm<IDeleteAccountFormSchema>({
        resolver: zodResolver(DeleteAccountFormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = (data: IDeleteAccountFormSchema) => {
        const { username, password } = data;

        // match username
        if (username !== session?.user?.username) {
            setError("username", {
                message: "Username does not match",
                type: "manual",
            });
            return;
        }
    };

    return (
        <section>
            <div className="flex flex-col border-2 border-destructive p-4 rounded-md gap-4">
                <div className="flex w-full justify-between items-center">
                    <Label htmlFor="confirm-delete" className="mr-2 w-full">
                        Delete account
                        <p className="text-muted-foreground text-xs">
                            Deleting your account will permanently remove all your data. This action cannot be undone.
                        </p>
                    </Label>
                </div>
                <div className="flex justify-end">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="destructive">Delete Account</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Delete Account</DialogTitle>
                            <DialogDescription>
                                <p>Are you sure you want to delete your account?</p>
                                <p>This action cannot be undone.</p>
                            </DialogDescription>
                            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="username">
                                            Enter your username{" "}
                                            <Badge variant="outline">{session?.user?.username}</Badge> to confirm
                                            deletion:
                                        </Label>
                                        <Input
                                            id="username"
                                            placeholder="Enter your username"
                                            autoComplete="off"
                                            autoFocus
                                            aria-autocomplete="none"
                                            {...register("username")}
                                        />
                                        {errors.username?.message && (
                                            <p className="text-destructive">{errors.username.message}</p>
                                        )}
                                    </div>
                                    {/* Confirm password */}
                                    <div className="flex flex-col gap-2 my-2">
                                        <Label htmlFor="confirm-delete">Confirm Password:</Label>
                                        <Input
                                            type="password"
                                            id="confirm-delete"
                                            placeholder="Confirm password"
                                            autoComplete="new-password"
                                            {...register("password")}
                                        />
                                        {errors.password?.message && (
                                            <p className="text-destructive">{errors.password.message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 mt-4">
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button
                                        variant="destructive"
                                        type="submit"
                                        disabled={
                                            watch("username") !== session?.user?.username ||
                                            !watch("password") ||
                                            Object.keys(errors).length > 0
                                        }
                                    >
                                        Delete Account
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </section>
    );
};
