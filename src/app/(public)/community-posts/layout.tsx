import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Community Posts",
    description: "This is a community posts page.",
};

const CommunityPostsLayout: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    return (
        <div className="container w-full mx-auto">
            <div className="w-full flex flex-col justify-center items-center">{children}</div>
        </div>
    );
};

export default CommunityPostsLayout;
