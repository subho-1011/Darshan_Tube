"use client";

import * as React from "react";

import Link from "next/link";

export const UnauthenticatedPage = () => {
    return (
        <div className="w-full my-4">
            <div className="text-2xl text-center">
                This is the channel admin page. You are not authorized to view this page.
            </div>
            <div className="text-xl text-center my-4">
                If you want to view your own channel,
                <Link href={`/channel/@me`} className="text-blue-500 hover:text-blue-600 hover:underline">
                    click here
                </Link>
            </div>
        </div>
    );
};
