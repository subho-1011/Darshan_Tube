"use client";

import { Loader } from "lucide-react";

export default function ContentLoader() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <Loader className="animate-spin w-20 h-20" />
        </div>
    );
}
