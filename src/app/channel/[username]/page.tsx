"use client";

import React from "react";
import ChannelOwnerPage from "../_components/channel-owner-page";
import { useAppDispatch } from "@/lib/utils";
import { toggleUpload } from "@/store/slices/channel-slice";

interface ChannelPageProps {
    params: {
        username: string;
    };
}

const ChannelPage: React.FC<ChannelPageProps> = ({ params }) => {
    const { username } = params;
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(toggleUpload(false));
    }, [dispatch]);

    if (!username) {
        return <div>No username provided</div>;
    }

    // if username not startwith '@' (%40) then redirect
    if (!username.startsWith("%40")) {
        return <div>This is not a valid username</div>;
    }

    if (username === "%40me") {
        return <ChannelOwnerPage />;
    }

    return (
        <div>
            <div>
                <h1>{username}</h1>
            </div>
        </div>
    );
};

export default ChannelPage;
