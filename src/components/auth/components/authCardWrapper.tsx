'use client';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';

import { AuthCardBackButton as BackButton } from './authCardBackButton';
import { AuthCardHeader as Header } from './authCardHeader';
import { AuthCardSocial as Social } from './authCardSocial';

export const AuthCardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial,
}: {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel?: string;
    backButtonHref?: string;
    showSocial?: boolean;
}) => {
    return (
        <Card className="w-full m-10 sm:w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                {backButtonLabel && backButtonHref && (
                    <BackButton label={backButtonLabel} href={backButtonHref} />
                )}
            </CardFooter>
        </Card>
    );
};
