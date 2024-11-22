"use client";

import React from "react";
import { useAppDispatch } from "@/lib/utils";

import { ShowIfElse } from "@/components/common/show";
import { useSession } from "@/context/session-provider";
import { toggleUpload } from "@/store/slices/channel-slice";
import ChannelOwnerPage from "../_components/channel-owner-page";
import { UnauthenticatedPage } from "@/components/common/unauthenticated-page";

interface ChannelPageProps {
    params: {
        username: string;
    };
}

const ChannelPage: React.FC<ChannelPageProps> = ({ params }) => {
    const { username } = params;
    const { isAuthenticated } = useSession();

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(toggleUpload(false));
    }, [dispatch]);

    return (
        <React.Fragment>
            <ShowIfElse
                when={isAuthenticated && username === "%40me"}
                ifTrue={<ChannelOwnerPage />}
                ifFalse={<UnauthenticatedPage />}
            />
        </React.Fragment>
    );
};



export default ChannelPage;
