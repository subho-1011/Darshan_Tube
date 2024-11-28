"use client";

import React from "react";

import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOff } from "lucide-react";

export const PasswordInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className="relative">
            <Input {...props} type={showPassword ? "text" : "password"} className="pr-10" />
            <Button
                variant="trasparent"
                size="icon"
                type="button"
                className="absolute inset-y-0 right-0 flex items-center p-2"
                onClick={() => setShowPassword((prev) => !prev)}
            >
                {showPassword ? <EyeOff /> : <EyeIcon />}
            </Button>
        </div>
    );
};
