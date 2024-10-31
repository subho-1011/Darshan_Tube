"use client";

import React from "react";

interface ChannelPageProps {
    params: {
        username: string;
    };
}

const ChannelPage: React.FC<ChannelPageProps> = ({ params }) => {
    return (
        <div>
            <div>
                <h1>{params.username}</h1>
            </div>
        </div>
    );
};

export default ChannelPage;
