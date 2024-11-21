"use client";

import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommunityFormSchema, TCommunityFormInput } from "@/lib/validators/community-form";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShowIf } from "@/components/common/show";
import { Textarea } from "@/components/ui/textarea";
import { CameraIcon, Loader2, XIcon } from "lucide-react";
import { GuestAvatar, OwnerAvatar } from "@/components/common/avatar";

import { toast } from "@/hooks/use-toast";
import { MAX_UPLOAD_IMAGE_SIZE } from "@/lib/constant";
import { useSession } from "@/context/session-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommunityPost } from "@/services/community.services";

export const CommunityForm: React.FC = () => {
    const { session } = useSession();
    const [localImage, setLocalImage] = React.useState<File | null>(null);

    const clickToInputImage = () => {
        document.getElementById("community-input-image")?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e?.target?.files?.[0];

        if (!image) return;
        form.clearErrors("root");

        const allowedTypes = ["image/jpeg", "image/png"];
        if (!allowedTypes.includes(image.type)) {
            form.setError("root", {
                type: "manual",
                message: "Only images are allowed (jpeg, png)",
            });
            toast({
                description: "Only images are allowed (jpeg, png)",
                variant: "destructive",
            });

            setTimeout(() => clickToInputImage(), 1000);
            return;
        }

        // size in bytes
        if (image.size > 1024 * 1024 * MAX_UPLOAD_IMAGE_SIZE) {
            form.setError("root", {
                type: "manual",
                message: `Image size should be less than ${MAX_UPLOAD_IMAGE_SIZE}MB`,
            });
            toast({
                description: `Image size should be less than ${MAX_UPLOAD_IMAGE_SIZE}MB`,
                variant: "destructive",
            });
            return;
        }
        setLocalImage(image);
    };

    const form = useForm<TCommunityFormInput>({
        resolver: zodResolver(CommunityFormSchema),
        defaultValues: {
            content: "",
        },
        disabled: session?.role === "guest",
    });

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ["create-community-post"],
        mutationFn: (formData: FormData) => createCommunityPost(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["community-posts"] });
            form.reset();
            setLocalImage(null);
            toast({
                description: "Your post has been created successfully.",
                variant: "sky",
            });
        },
        onError: (error) => {
            toast({
                description: error.message,
                variant: "destructive",
            });
            form.setFocus("content");
        },
    });

    const onSubmit = (data: TCommunityFormInput) => {
        const formData = new FormData();

        formData.append("content", data.content);
        if (localImage) {
            formData.append("image", localImage);
        }

        mutate(formData);
    };

    const error = form.formState.errors.content?.message || form.formState.errors.root?.message;

    return (
        <div className="flex flex-col gap-2 w-full max-w-xl rounded-xl px-4 py-2 border-2 border-warning/60 shadow-md shadow-warning/50">
            {session?.role === "guest" ? (
                <div className="flex space-x-2">
                    <GuestAvatar className="ring-2" />
                    <div className="flex flex-col flex-1 text-muted-foreground">
                        <span className="font-semibold space-x-1">
                            <span>Chandra Gupta</span>
                            <Badge variant="outline">Guest</Badge>
                        </span>
                        <span className="text-xs">@gupta </span>
                    </div>
                </div>
            ) : (
                <div className="flex space-x-2">
                    <OwnerAvatar className="ring-1 ring-warning/50 shadow-md shadow-warning/50" />
                    <div className="flex flex-col flex-1 text-muted-foreground">
                        <span className="font-semibold space-x-1">
                            <span>{session?.user?.name}</span>
                        </span>
                        <span className="text-xs">@{session?.user?.username}</span>
                    </div>
                </div>
            )}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <Textarea
                    {...form.register("content")}
                    placeholder={session?.role === "guest" ? "Please login to post" : "What's on your mind?"}
                    className="focus-visible:ring-warning/50"
                />
                <ShowIf when={!!localImage}>
                    <Image
                        src={localImage ? URL.createObjectURL(localImage) : ""}
                        alt="Image preview"
                        width={500}
                        height={500}
                        layout="responsive"
                        className="w-full rounded-md border-2 border-orange-200 object-cover"
                    />
                </ShowIf>
                <ShowIf when={!!error}>
                    <p className="text-sm text-destructive">{error}</p>
                </ShowIf>
                <div className="flex justify-between">
                    <Input
                        id="community-input-image"
                        type="file"
                        accept="image/*"
                        multiple={false}
                        className="hidden"
                        onChange={handleImageChange}
                        disabled={session?.role === "guest"}
                    />
                    {!localImage ? (
                        <Button
                            type="button"
                            onClick={() => document.getElementById("community-input-image")?.click()}
                            variant="outline"
                            size="icon"
                            disabled={session?.role === "guest"}
                        >
                            <CameraIcon className="w-4 h-4" />
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            onClick={() => setLocalImage(null)}
                            variant="outline"
                            size="icon"
                            disabled={session?.role === "guest"}
                        >
                            <XIcon className="w-4 h-4" />
                        </Button>
                    )}
                    <Button
                        type="submit"
                        className="bg-warning hover:bg-warning/90"
                        disabled={isPending || session?.role === "guest"}
                    >
                        {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};
