"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";

export const NotLoginDialog: React.FC<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    label?: string;
}> = ({ open, onOpenChange, label }) => {
    const router = useRouter();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{label}</DialogTitle>
                </DialogHeader>
                <DialogDescription>You need to be logged in </DialogDescription>
                <div className="flex w-full items-center justify-center">
                    <Button onClick={() => router.push("/auth/login")} variant="link">
                        Click here to login
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
