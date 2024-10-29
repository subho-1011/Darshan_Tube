'use client';

import { TVideoCard } from '@/lib/types';
import { VideoCardWrapper } from './video-card-wrapper';
import { ClockIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { IMoreButton } from '../common/more-button';

export const LikedVideoCard: React.FC<{
    video: TVideoCard;
}> = ({ video }) => {
    const moreButtons: IMoreButton[] = [
        {
            label: 'Add to playlist',
            icon: <PlusIcon className="w-4 h-4" />,
            onClick: () => {},
        },
        {
            label: 'Add to watch later',
            icon: <ClockIcon className="w-4 h-4" />,
            onClick: () => {},
        },
        {
            label: 'Delete from liked videos',
            icon: <TrashIcon className="w-4 h-4" />,
            onClick: () => {},
        },
    ];

    return (
        <div>
            <VideoCardWrapper video={video} moreButtons={moreButtons} />
        </div>
    );
};
