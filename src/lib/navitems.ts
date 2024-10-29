import {
    HomeIcon,
    Users2Icon,
    PlaySquareIcon,
    ClockIcon,
    ThumbsUpIcon,
    Tv2Icon,
    UserIcon,
} from 'lucide-react';

export const NavItems = [
    {
        label: 'Home',
        href: '/',
        icon: HomeIcon,
    },
    {
        label: 'Community',
        href: '/community-posts',
        icon: Users2Icon,
    },
    {
        label: 'Playlists',
        href: '/playlists',
        icon: PlaySquareIcon,
    },
    {
        label: 'Watch History',
        href: '/watch-history',
        icon: ClockIcon,
    },
    {
        label: 'Liked Videos',
        href: '/liked-videos',
        icon: ThumbsUpIcon,
    },
    {
        label: 'Dashboard',
        href: '/channel/@me',
        icon: Tv2Icon,
    },
    {
        label: 'Profile',
        href: '/profile',
        icon: UserIcon,
    },
];
