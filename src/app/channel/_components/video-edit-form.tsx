"use client";

import React from "react";
import { TVideo } from "@/lib/types";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ThumbnailImage } from "@/components/videos";
import { Edit3Icon, Loader2Icon, UploadIcon, XIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { VIDEO_CATEGORY_ENUM } from "@/lib/constant";
import { useVideoEditForm } from "../_lib/hooks/use-video-edit-form";

export const VideoEditForm = ({ videoData, formType }: { videoData: TVideo; formType: "Edit" | "Publish" }) => {
    const {
        form,
        onSubmit,
        onChangeThumbnail,
        onTagInputKeyDown,
        tag,
        setTag,
        thumbnailUrl,
        setThumbnailUrl,
        isThumbnailUploading,
        isPending,
    } = useVideoEditForm(videoData, formType);

    return (
        <div className="w-full max-w-3xl px-4 py-2 md:border-2 md:rounded-lg space-y-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Publish Video</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4 my-4">
                        {/* Thumbnail */}
                        <Label htmlFor="thumbnail">Thumbnail</Label>
                        {thumbnailUrl ? (
                            <div className="relative">
                                <ThumbnailImage
                                    src={thumbnailUrl}
                                    alt={videoData?.title}
                                    className={`${isThumbnailUploading && "animate-pulse opacity-50 transition-all duration-500"}`}
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2"
                                    onClick={() => setThumbnailUrl("")}
                                    disabled={isThumbnailUploading}
                                >
                                    <XIcon className="w-5 h-5" />
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Input id="thumbnail" type="file" className="hidden" onChange={onChangeThumbnail} />
                                <div
                                    className="w-full flex items-center justify-center aspect-video shadow-inner rounded-md border object-cover hover:cursor-pointer duration-300"
                                    onClick={() => document.getElementById("thumbnail")?.click()}
                                >
                                    <UploadIcon className="w-10 h-10" />
                                </div>
                            </>
                        )}
                        {/* Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Video Title" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Video Description" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Category */}
                        <FormField
                            control={form.control}
                            name="category"
                            disabled={formType === "Edit"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select
                                            disabled={formType === "Edit"}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.values(VIDEO_CATEGORY_ENUM).map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Tags */}
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <div className="flex flex-wrap space-x-2 space-y-2 items-center rounded-md border px-2">
                                            {field.value &&
                                                field.value?.map((tag) => (
                                                    <Badge key={tag}>
                                                        {tag}
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                field.onChange(field.value?.filter((t) => t !== tag))
                                                            }
                                                        >
                                                            <XIcon className="h-4 w-4 cursor-pointer" />
                                                        </button>
                                                    </Badge>
                                                ))}
                                            <Input
                                                value={tag}
                                                onChange={(e) => setTag(e.target.value)}
                                                onKeyDown={onTagInputKeyDown}
                                                placeholder="Add a tag and press enter"
                                                className="border-0 w-fit hover:ring-0 hover:border-0 focus-visible:ring-0 focus:ring-0 focus:border-0 focus:outline-0"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Video display */}
                        <video className="w-full h-96" controls src={videoData?.videoUrls.originalVideoUrl} />
                        {/* Published */}
                        <FormField
                            control={form.control}
                            name="isPublished"
                            disabled={formType === "Edit"}
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base font-semibold">Published</FormLabel>
                                        <FormDescription>You can publish this video later</FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            disabled={formType === "Edit"}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            aria-readonly
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? (
                            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <>
                                {formType === "Publish" ? (
                                    <UploadIcon className="mr-2 h-4 w-4" />
                                ) : (
                                    <Edit3Icon className="mr-2 h-4 w-4" />
                                )}
                            </>
                        )}
                        {formType === "Publish" ? "Publish" : "Update"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};
