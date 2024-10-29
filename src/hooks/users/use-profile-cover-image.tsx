'use client';

import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/utils';
import { updateProfileCoverImage } from '@/store/thunk-api/profile.thunk-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

export const useProfileCoverImage = () => {
    const dispatch = useAppDispatch();
    const { profileData } = useAppSelector((state) => state.profile);

    const queryClient = useQueryClient();

    const containRef = React.useRef<HTMLDivElement>(null);
    const coverImageInputRef = React.useRef<HTMLInputElement>(null);

    const [isEditable, setIsEditable] = React.useState(false);
    const [coverImageUrl, setCoverImageUrl] = React.useState<string | null>(
        null
    );
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCoverImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const { mutate, isPending } = useMutation({
        mutationKey: ['profile'],
        mutationFn: (data: FormData) =>
            dispatch(updateProfileCoverImage(data)).unwrap(),
        onSuccess: () => {
            setIsEditable(false);
            toast({
                title: 'Cover image updated',
                description:
                    'Your profile cover image has been updated successfully',
            });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Error',
                description:
                    error.message || 'Failed to update profile cover image',
            });
            setCoverImageUrl(null);
        },
    });

    const onSaveCoverImage = () => {
        if (coverImageInputRef.current?.files?.[0]) {
            const formData = new FormData();
            formData.append(
                'coverImage',
                coverImageInputRef.current?.files?.[0]
            );

            mutate(formData);
        }
        setIsEditable(false);
    };

    const onCancelCoverImage = React.useCallback(() => {
        setCoverImageUrl(null);
        setIsEditable(false);

        if (coverImageInputRef.current?.files) {
            coverImageInputRef.current.value = '';
        }

        if (profileData?.coverImageUrl) {
            setCoverImageUrl(profileData?.coverImageUrl);
        }
    }, []);

    const handleClickOutside = React.useCallback(
        (event: MouseEvent) => {
            if (
                containRef.current &&
                !containRef.current.contains(event.target as Node)
            ) {
                if (
                    coverImageUrl &&
                    coverImageUrl !== profileData?.coverImageUrl
                ) {
                    setOpenDialog(true);
                } else {
                    setOpenDialog(false);
                    onCancelCoverImage();
                }
            }
        },
        [coverImageUrl, profileData?.coverImageUrl]
    );

    React.useEffect(() => {
        if (isEditable) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditable, handleClickOutside]);

    return {
        coverImageUrl,
        handleCoverImageChange,
        onSaveCoverImage,
        onCancelCoverImage,
        isEditable,
        setIsEditable,
        containRef,
        coverImageInputRef,
        openDialog,
        setOpenDialog,
        isPending,
    };
};
