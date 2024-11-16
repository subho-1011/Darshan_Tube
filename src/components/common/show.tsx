"use client";

import React from "react";

export const ShowIf = ({ when, children }: { when: boolean; children: React.ReactNode }) => {
    return when ? <>{children}</> : null;
};

export const ShowIfElse = ({
    when,
    ifTrue,
    ifFalse,
}: {
    when: boolean;
    ifTrue: React.ReactNode;
    ifFalse: React.ReactNode;
}) => {
    if (when) {
        return ifTrue;
    }

    return ifFalse;
};

export const ShowIfNot = ({ when, children }: { when: boolean; children: React.ReactNode }) => {
    return when ? null : <>{children}</>;
};

export const ShowIfNotElse = ({
    when,
    children1,
    children2,
}: {
    when: boolean;
    children1: React.ReactNode;
    children2: React.ReactNode;
}) => {
    return when ? <>{children2}</> : <>{children1}</>;
};
