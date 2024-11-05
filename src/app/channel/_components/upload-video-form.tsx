"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, UploadIcon, VideoIcon, X } from "lucide-react";
import { useVideoUploadForm } from "../_lib/hooks/use-video-upload-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch } from "@/lib/utils";
import { toggleUpload } from "@/store/slices/channel-slice";
import { Slider } from "@/components/ui/slider";

export const UploadVideoForm = () => {
    const dispatch = useAppDispatch();
    const {
        videoUploadContainerRef,
        videoInputRef,
        videoInput,
        progress,
        setVideoInput,
        onSelectVideo,
        onSubmit,
        isPending,
        onResetSelectedVideo,
    } = useVideoUploadForm();

    return (
        <Card className="w-full max-w-3xl mx-auto relative" ref={videoUploadContainerRef}>
            <CardHeader>
                <CardTitle>Upload Video</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 flex flex-col justify-between">
                <CardDescription>Upload your video here.</CardDescription>
                <form onSubmit={onSubmit} className="flex flex-col items-center justify-between space-y-2">
                    {!videoInput && (
                        <div
                            className="w-full aspect-video border-dashed border-2 border-muted rounded-md flex items-center justify-center"
                            onContextMenu={(e) => e.preventDefault()}
                        >
                            <Button onClick={onSelectVideo} type="button" variant="outline">
                                <VideoIcon className="w-4 h-4 mr-2" />
                                select video
                            </Button>
                        </div>
                    )}
                    <Input
                        ref={videoInputRef}
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => e.target.files && setVideoInput(e.target.files[0])}
                    />
                    {videoInput && (
                        <>
                            <video
                                src={URL.createObjectURL(videoInput)}
                                className="w-full aspect-video rounded-md object-cover ring-2 ring-primary shadow-lg shadow-primary/40"
                                controls
                            />
                            <div className="flex items-center space-x-2 bg-muted p-0.5 pl-2 rounded-md">
                                <p className="text-start">{videoInput.name}</p>
                                <Button type="button" onClick={onResetSelectedVideo} variant="ghost" size="icon">
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                            <Button type="submit">
                                {isPending ? (
                                    <Loader2 className="w-4 h-4 mr-2" />
                                ) : (
                                    <UploadIcon className="w-4 h-4 mr-2" />
                                )}
                                upload
                            </Button>
                        </>
                    )}
                </form>
                {isPending && <Slider value={[progress]} max={100} />}
                <Button
                    onClick={() => dispatch(toggleUpload())}
                    variant="ghost"
                    size="icon"
                    disabled={isPending}
                    className="absolute top-3 right-3"
                >
                    <X className="w-4 h-4" />
                </Button>
            </CardContent>
        </Card>
    );
};
