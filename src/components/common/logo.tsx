"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface IDarshanLogo {
    className?: string;
}

export const DarshanLogo: React.FC<IDarshanLogo> = ({ className }) => {
    return (
        <Image
            src="/darshan-logo.png"
            alt="darshan-logo"
            className={cn("h-10 w-auto", className)}
            width={100}
            height={100}
        />
    );
};
