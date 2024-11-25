"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { HelpAndSupportForm, PreviousQuestions } from "@/app/(public)/help-and-support/_components";

export default function HelpAndSupportPage() {
    return (
        <div className="container mx-auto">
            <h1 className="font-semibold text-2xl underline">Help and Support</h1>
            <p className="mt-4">
                If you have any questions or need help, post your question on the help and support forum.
            </p>
            {/* Form */}
            <HelpAndSupportForm />
            <Separator />
            {/* Show previous submit of others */}
            <PreviousQuestions />
        </div>
    );
}
