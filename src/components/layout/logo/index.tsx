"use client";

import Link from "next/link";

export const DarshanTubeTextLOGO = () => {
    return (
        <Link href="/">
            <div className="flex items-center justify-center relative">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-orange-500 text-transparent bg-clip-text skew-x-2 skew-y-2 tracking-tighter blur-md select-none">
                    Darshan
                </span>
                <h1 className="absolute left-0 text-2xl font-bold bg-gradient-to-r from-purple-700 to-orange-500 text-transparent bg-clip-text skew-x-2 skew-y-2 tracking-tighter">
                    Darshan
                </h1>
                <span className="absolute right-0 text-2xl font-bold mr-4 bg-gradient-to-r to-purple-500 from-orange-700 text-transparent bg-clip-text -skew-x-2 -skew-y-2 tracking-tighter blur-md select-none">
                    Tube
                </span>
                <h1 className="text-2xl font-bold mr-4 bg-gradient-to-r to-purple-500 from-orange-700 text-transparent bg-clip-text -skew-x-2 -skew-y-2 tracking-tighter">
                    Tube
                </h1>
            </div>
        </Link>
    );
};
