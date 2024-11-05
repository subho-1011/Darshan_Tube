"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function ChannelPage() {
    const router = useRouter();

    React.useEffect(() => {
        router.push("/channel/@me");
    }, [router]);

    return <div>ChannelPage</div>;
}
