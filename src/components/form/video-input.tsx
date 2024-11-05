"use client";

import React from "react";

import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const VideoInput = ({
    file,
    onChange,
    onClear,
}: {
    file: File | null;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
}) => {
    const handleClick = () => document.getElementById("video-input")?.click();

    return (
        <>
            {file ? (
                <div className="relative">
                    <video
                        src={URL.createObjectURL(file)}
                        className="w-full aspect-video rounded-md object-cover"
                        controls
                    />
                    <Button
                        type="button"
                        className="absolute top-3 right-3"
                        variant="secondary"
                        size="icon"
                        onClick={onClear}
                    >
                        <X className="h-6 w-6" />
                    </Button>
                </div>
            ) : (
                <>
                    <Input
                        id="video-input"
                        type="file"
                        accept="video/*"
                        placeholder="Video"
                        className="hidden"
                        onChange={onChange}
                    />
                    <Button type="button" className="w-full" onClick={handleClick}>
                        Upload video
                    </Button>
                </>
            )}
        </>
    );
};
