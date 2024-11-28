"use client";

import React, { useState } from "react";

import { ShowIf } from "@/components/common/show";
import { Settings } from "../_components/settings";
import { UserAccountDelete } from "../_components/user-account-delete";
import { ChangePasswordForm } from "../_components/change-password-form";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserSettinsService } from "@/services/user.services";

const SettingsPage: React.FC = () => {
    const [open, setOpen] = useState<"root" | "password">("root");

    const { data, isPending } = useSuspenseQuery({
        queryKey: ["user", "settings"],
        queryFn: getUserSettinsService,
        refetchOnWindowFocus: false,
    });

    if (isPending) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto max-w-2xl">
            <React.Suspense fallback={<div>Loading...</div>}>
                <ShowIf when={open === "root"}>
                    <Settings userPreferences={data.settings} setOpen={setOpen} />
                    <UserAccountDelete />
                </ShowIf>
                <ShowIf when={open === "password"}>
                    <ChangePasswordForm setOpened={setOpen} />
                </ShowIf>
            </React.Suspense>
        </div>
    );
};

export default SettingsPage;
