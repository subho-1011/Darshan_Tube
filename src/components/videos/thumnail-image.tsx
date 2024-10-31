"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface IThumbnailImage extends React.ComponentProps<typeof Image> {
    className?: string;
}

export const ThumbnailImage: React.FC<IThumbnailImage> = ({
    src = "",
    alt = "thumbnail image",
    className,
    width = 256,
    height = 256,
    ...rest
}) => {
    const [imageSrc, setImageSrc] = React.useState(src);

    return (
        <Image
            src={imageSrc || "/no-thumbnail.png"}
            alt={alt}
            className={cn(
                "w-full aspect-video shadow-inner rounded-md border object-cover hover:cursor-pointer duration-300",
                className
            )}
            width={width}
            height={height}
            priority
            onError={() => setImageSrc("/no-thumbnail.png")}
            {...rest}
        />
    );
};
