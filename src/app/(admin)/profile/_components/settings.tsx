"use client";

import React from "react";
import { useTheme } from "next-themes";
import { ISettings } from "@/lib/types";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ShowIf } from "@/components/common/show";
import { ChevronRight, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserSettingsService } from "@/services/user.services";

export const Settings: React.FC<{
    userPreferences: ISettings;
    setOpen: React.Dispatch<React.SetStateAction<"root" | "password">>;
}> = ({ userPreferences, setOpen }) => {
    const { themes, setTheme } = useTheme();
    const [preferences, setPreferences] = React.useState<ISettings>(userPreferences);

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ["user", "settings", "update"],
        mutationFn: () => updateUserSettingsService(preferences),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user", "settings"] });
            toast({ description: "Settings updated successfully" });
        },
        onError: (error) => toast({ description: error.message }),
    });

    const onSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate();
    };

    const handleChanges = (key: string | number | symbol, value: any) =>
        setPreferences((prev) => ({ ...prev, [key]: value }));

    function isChanged(): boolean {
        return JSON.stringify(preferences) !== JSON.stringify(userPreferences);
    }

    return (
        <React.Fragment>
            <h1 className="text-center mt-4 mb-12">User Preferences</h1>
            <form onSubmit={onSave}>
                <div className="flex flex-col border-2 border-separate p-4 rounded-md gap-4">
                    <div className="flex w-full justify-between">
                        <Label htmlFor="theme" className="mr-2">
                            Theme:
                        </Label>
                        <Select
                            name="theme"
                            value={preferences?.theme}
                            onValueChange={(value) => {
                                handleChanges("theme", value);
                                setTheme(value);
                            }}
                        >
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                {themes.map((theme) => (
                                    <SelectItem key={theme} value={theme}>
                                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-full justify-between">
                        <Label htmlFor="language" className="mr-2">
                            Language:
                        </Label>
                        <Select
                            name="language"
                            value={preferences?.language}
                            onValueChange={(value) => handleChanges("language", value)}
                        >
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="es">Spanish</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                                <SelectItem value="de">German</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-full justify-between">
                        <Label htmlFor="app-notifications" className="mr-2">
                            Notifications:
                        </Label>
                        <Switch
                            id="app-notifications"
                            checked={preferences?.notifications}
                            onCheckedChange={(checked) => handleChanges("notifications", checked)}
                        />
                    </div>
                    <div className="flex w-full justify-between">
                        <Label htmlFor="email-notifications" className="mr-2">
                            Notifications via Email:
                        </Label>
                        <Switch
                            id="app-notifications"
                            checked={preferences?.emailNotifications}
                            onCheckedChange={(checked) => handleChanges("emailNotifications", checked)}
                        />
                    </div>
                    <ShowIf when={isChanged()}>
                        <div className="flex justify-end gap-3">
                            <Button type="button" variant="outline" onClick={() => setPreferences(userPreferences)}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                {isPending && <Loader2 className="animate-spin" />}
                                Save Changes
                            </Button>
                        </div>
                    </ShowIf>
                </div>
            </form>

            <div
                className="flex items-center justify-between border-2 border-separate rounded-md p-4 gap-4 my-6 hover:bg-secondary hover:cursor-pointer transition-colors duration-300 delay-100"
                onClick={() => setOpen("password")}
            >
                <div>Change password</div>
                <ChevronRight />
            </div>
        </React.Fragment>
    );
};
