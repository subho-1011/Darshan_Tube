"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Share2Icon } from "lucide-react";
import { usePathname } from "next/navigation";

export const VideoShareButton = () => {
    const [url, setUrl] = useState<string>("");
    const [copied, setCopied] = useState<boolean>(false);

    const currentUrlRef = useRef<HTMLInputElement>(null);

    const onClick = () => {
        currentUrlRef.current?.select();
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        });
    };

    useEffect(() => {
        setUrl(window.location.href);
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Share2Icon size={16} />
                    <span> | </span>
                    Share
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Share with others</DialogTitle>
                <DialogDescription>Click to copy</DialogDescription>
                <div className="flex gap-2">
                    <Input ref={currentUrlRef} type="text" value={url} readOnly />
                    <Button onClick={onClick}>{copied ? "Copied!" : "Copy"}</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
