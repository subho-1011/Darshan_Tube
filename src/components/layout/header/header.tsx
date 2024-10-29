'use client';

import * as React from 'react';
import Link from 'next/link';

import {
    HistoryIcon,
    HomeIcon,
    SearchIcon,
    UploadIcon,
    UserIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { UserButton } from './userButton';

const Header = () => {
    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const router = useRouter();

    // TODO: Add search functionality UPLOAD button
    const handleUpload = () => {
        router.push('channel/@me/upload');
    };

    return (
        <>
            <div className="w-full flex items-center justify-between sticky top-0 z-50 bg-background/40 backdrop-blur border-b">
                <div className="flex w-full items-center justify-between md:px-12 px-4 py-2">
                    <div className="flex items-center">
                        <Link href="/">
                            <h1 className="text-2xl font-bold mr-4">
                                DarshanTube
                            </h1>
                        </Link>
                    </div>
                    <div className="flex flex-grow max-w-sm items-center relative mx-4">
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search..."
                            className="w-full px-4 py-1.5 pr-12 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full absolute right-0 rounded-l-none"
                        >
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </Button>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Upload"
                            onClick={handleUpload}
                        >
                            <UploadIcon className="h-5 w-5" />
                        </Button>
                        <UserButton />
                    </div>
                </div>
            </div>
            <div className="md:hidden flex justify-around items-center border-t py-1.5 bg-background fixed bottom-0 left-0 right-0 z-50">
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Home"
                    onClick={() => router.push('/')}
                >
                    <HomeIcon className="h-5 w-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Search"
                    onClick={() => searchInputRef.current?.focus()}
                >
                    <SearchIcon className="h-5 w-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Upload"
                    onClick={handleUpload}
                >
                    <UploadIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Watch history">
                    <HistoryIcon className="h-5 w-5" />
                </Button>
                <UserButton />
            </div>
        </>
    );
};

export default Header;
