"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { cn, timeAgo } from "@/lib/utils";
import { TVideoCard } from "@/lib/types";

import { UserAvatar } from "@/components/common/avatar";
import { IMoreButton, MoreButtons } from "@/components/common/more-button";
import { DotIcon } from "lucide-react";
import { ThumbnailImage } from "@/components/videos";

// video card wrapper props
export interface IVideoCardWrapperProps {
    video: TVideoCard;
    children?: React.ReactNode;
    className?: string;
    moreButtons?: IMoreButton[];
}

// video card wrapper
/**
 * @param children - The children to be rendered inside the video card wrapper.
 * @param className - The className to be applied to the video card wrapper.
 * @param video - The video to be displayed in the video card.
 * @param moreButtons - The more buttons to be displayed in the video card.
 * @returns
 *
 * @example
 * <VideoCardWrapper video={video} moreButtons={moreButtons}>
 *      {children}
 * </VideoCardWrapper>
 */
export const VideoCardWrapper: React.FC<IVideoCardWrapperProps> = ({
    children,
    className,
    video,
    moreButtons,
}) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const videoContainerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        let hoverTimer: NodeJS.Timeout;

        if (videoContainerRef.current) {
            videoContainerRef.current.addEventListener("mouseenter", () => {
                hoverTimer = setTimeout(() => setIsHovered(true), 3000);
            });

            videoContainerRef.current.addEventListener("mouseleave", () => {
                clearTimeout(hoverTimer);
                setIsHovered(false);
            });
        }

        return () => {
            if (videoContainerRef.current) {
                videoContainerRef.current.removeEventListener(
                    "mouseenter",
                    () => setIsHovered(true)
                );
                videoContainerRef.current?.removeEventListener(
                    "mouseleave",
                    () => setIsHovered(false)
                );
            }
            clearTimeout(hoverTimer);
        };
    }, []);

    return (
        <div
            className={cn(
                "w-full relative group hover:scale-105 hover:opacity-95 pb-2 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 rounded-lg overflow-hidden dark:shadow-primary/40 hover:ring-2 hover:ring-primary/20",
                className
            )}
            onMouseLeave={() => {
                setIsHovered(false);
            }}
        >
            <VideoContainer
                videoUrl={video?.videoUrls?.originalVideoUrl}
                thumbnailUrl={video?.thumbnailUrl}
                alt={video?.title}
                isHovered={isHovered}
                setIsHovered={setIsHovered}
                videoContainerRef={videoContainerRef}
                duration={video?.duration}
                slug={video?.slug}
            />
            <VideoDetails video={video} moreButtons={moreButtons}>
                {children}
            </VideoDetails>
        </div>
    );
};

// video container props
export interface IVideoContainerProps {
    videoUrl: string;
    thumbnailUrl: string;
    alt: string;
    className?: string;
    duration: string;
    slug: string;
    isHovered: boolean;
    setIsHovered: (isHovered: boolean) => void;
    videoContainerRef: React.RefObject<HTMLDivElement>;
}

/**
 * Video container
 *
 * @param videoUrl - The URL of the video.
 * @param thumbnailUrl - The URL of the thumbnail.
 * @param alt - The alt text of the image.
 * @param className - The className to be applied to the video container.
 * @param duration - The duration of the video.
 * @param slug - The slug of the video.
 * @param isHovered - Whether the video is hovered.
 * @param setIsHovered - The function to set the isHovered state.
 * @param videoContainerRef - The ref of the video container.
 * @returns
 *
 * @example
 * <VideoContainer
 *      videoUrl={video?.videoUrls?.originalVideoUrl}
 *      thumbnailUrl={video?.thumbnailUrl}
 *      alt={video?.title}
 *      duration={video?.duration}
 *      slug={video?.slug}
 *      isHovered={isHovered}
 *      setIsHovered={setIsHovered}
 *      videoContainerRef={videoContainerRef}
 * />
 */
export const VideoContainer: React.FC<IVideoContainerProps> = ({
    videoUrl,
    thumbnailUrl,
    alt,
    className,
    duration,
    slug,
    isHovered,
    setIsHovered,
    videoContainerRef,
}) => {
    const router = useRouter();

    return (
        <div
            ref={videoContainerRef}
            className={cn("relative", isHovered && "cursor-auto")}
            onClick={() => {
                router.push(`/watch/${slug}`);
            }}
        >
            {/* Video image */}
            {isHovered && videoUrl ? (
                <HoveredOnThumbnail
                    videoUrl={videoUrl}
                    isHovered={isHovered}
                    setIsHovered={setIsHovered}
                />
            ) : (
                <>
                    <ThumbnailImage src={thumbnailUrl} alt={alt} />
                    {/* Video duration */}
                    <p className="absolute bg-muted-foreground backdrop-blur-sm px-2 rounded-sm bottom-2 right-2 text-xs text-muted opacity-60">
                        {duration}
                    </p>
                </>
            )}
        </div>
    );
};

// video details props
export interface IVideoDetailsProps {
    video: TVideoCard;
    children?: React.ReactNode;
    className?: string;
    showTimeAgo?: boolean;
    moreButtons?: IMoreButton[];
}

/**
 * Video details
 *
 * @param video - The video to be displayed in the video card.
 * @param children - The children to be rendered inside the video details.
 * @param showTimeAgo - Whether to show the time ago.
 * @param moreButtons - The more buttons to be displayed in the video card.
 * @returns
 *
 * @example
 * <VideoDetails video={video} showTimeAgo={showTimeAgo} moreButtons={moreButtons}>
 *      {children}
 * </VideoDetails>
 */
export const VideoDetails: React.FC<IVideoDetailsProps> = ({
    video,
    showTimeAgo = true,
    moreButtons,
    children,
}) => {
    return (
        <div className="px-2">
            {/* Title */}
            <div className="flex items-center gap-2">
                <Link href={`/watch/${video?.slug}`}>
                    <h1 className="text-base line-clamp-2 font-bold group-hover:text-primary transition-colors duration-300">
                        {video?.title}
                    </h1>
                </Link>
                <MoreButtons
                    className="opacity-0 static group-hover:opacity-100 transition-opacity duration-300"
                    buttons={moreButtons || []}
                />
            </div>
            <div className="flex flex-col gap-2 items-start justify-between mt-1.5">
                <div className="flex gap-2">
                    {/* Avatar */}
                    <UserAvatar user={video?.owner} />
                    <div className="flex flex-col">
                        {/* Name and username */}
                        <Link
                            href={`/@${video?.owner?.username}`}
                            className="w-fit"
                        >
                            <p className="text-sm text-muted-foreground">
                                {video?.owner?.name}
                            </p>
                        </Link>
                        <Link
                            href={`/@${video?.owner?.username}`}
                            className="w-fit"
                        >
                            <p className="text-sm text-muted-foreground opacity-60">
                                @{video?.owner?.username}
                            </p>
                        </Link>
                        <div className="flex items-center gap-2 font-semibold text-xs text-muted-foreground">
                            {/* views */}
                            <p>{video?.views} views</p>
                            <DotIcon className="w-4 h-4" />
                            {/* time ago */}
                            {showTimeAgo && <p>{timeAgo(video?.createdAt)}</p>}
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

// hovered on thumbnail props
export interface IHoveredOnThumbnailProps {
    videoUrl: string;
    isHovered: boolean;
    setIsHovered: (isHovered: boolean) => void;
}

/**
 * Hovered on thumbnail
 *
 * @param videoUrl - The URL of the video.
 * @returns
 *
 * @example
 * <HoveredOnThumbnail videoUrl={videoUrl} />
 */
export const HoveredOnThumbnail: React.FC<IHoveredOnThumbnailProps> = ({
    videoUrl,
}) => {
    return (
        <div className="w-full aspect-video inset-0 flex items-center justify-center">
            <video
                className="w-full h-full object-cover"
                src={videoUrl}
                autoPlay
                muted
            />
        </div>
    );
};
