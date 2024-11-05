"use client";

import { TVideoCard } from "@/lib/types";
import { HomeVideoCard, VideosContainWrapper } from "@/components/videos";

export default function Home() {
    const videos: TVideoCard[] = [
        {
            _id: "123",
            title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
            slug: "lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit-quisquam-quos-lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit-quisquam-quos",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
            thumbnailUrl:
                "https://images.pexels.com/photos/29087771/pexels-photo-29087771/free-photo-of-stunning-starry-night-over-lake-in-lombardia-italy.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            videoUrls: {
                originalVideoUrl: "https://videos.pexels.com/video-files/8953675/8953675-uhd_1440_2560_30fps.mp4",
            },
            tags: ["test", "video"],
            category: "test",
            views: 0,
            duration: 33.3,
            createdAt: new Date(),
            owner: { _id: "123", name: "Test User", username: "testuser" },
        },
        {
            _id: "1234",
            title: "Lorem1 ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
            slug: "lorem1-ipsum-dolor-sit-amet-consectetur-adipisicing-elit-quisquam-quos-lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit-quisquam-quos",
            description:
                "Lorem1 ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
            thumbnailUrl: "",
            videoUrls: {
                originalVideoUrl: "https://videos.pexels.com/video-files/8953675/8953675-uhd_1440_2560_30fps.mp4",
            },
            tags: ["test", "video"],
            category: "test",
            views: 0,
            duration: 333.3,
            createdAt: new Date(),
            owner: { _id: "123", name: "Test User", username: "testuser" },
        },
    ];

    return <VideosContainWrapper videos={videos} videoCard={(video) => <HomeVideoCard video={video} />} />;
}
