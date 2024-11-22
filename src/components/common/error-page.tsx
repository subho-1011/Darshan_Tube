"use client";

import React from "react";

export default function ErrorPage({ error }: { error?: Error }) {
    const message = error?.message || "An error occurred! Please try again.";

    return (
        <div className="container mx-auto">
            <h1 className="">Something went wrong!</h1>
            <p>{message}</p>
            <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
    );
}
