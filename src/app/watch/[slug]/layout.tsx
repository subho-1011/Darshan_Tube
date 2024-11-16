import React, { ReactNode } from "react";

import { Metadata } from "next";

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
    return {
        title: `${params.slug}`,
    };
};

const WatchPageLayout: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    return children;
};

export default WatchPageLayout;
