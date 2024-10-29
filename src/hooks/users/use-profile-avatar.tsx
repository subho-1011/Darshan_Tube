'use client';

import * as React from 'react';
import { toast } from '@/hooks/use-toast';

import { useAppDispatch, useAppSelector } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfileAvatar } from '@/store/thunk-api/profile.thunk-api';

export const useProfileAvatar = () => {
    const dispatch = useAppDispatch();
    const { profileData } = useAppSelector((state) => state.profile);

    const queryClient = useQueryClient();

    const containRef = React.useRef<HTMLDivElement>(null);
    const avatarInputRef = React.useRef<HTMLInputElement>(null);

    const [isEditing, setIsEditing] = React.useState(false);
    const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const { mutate, isPending } = useMutation({
        mutationKey: ['profile'],
        mutationFn: (data: FormData) =>
            dispatch(updateProfileAvatar(data)).unwrap(),
        onSuccess: () => {
            setIsEditing(false);

            toast({
                title: 'Success',
                description: 'Profile avatar updated successfully',
            });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.message || 'Failed to update profile avatar',
            });
            setAvatarUrl(null);
        },
    });

    const onSaveAvatar = () => {
        if (avatarInputRef.current?.files?.[0]) {
            const formData = new FormData();
            formData.append('avatar', avatarInputRef.current?.files?.[0]);

            mutate(formData);
        }
        setIsEditing(false);
    };

    const onCancelAvatar = () => {
        setIsEditing(false);
        setAvatarUrl(null);

        if (avatarInputRef.current?.files) {
            avatarInputRef.current.value = '';
        }

        if (profileData?.profileAvatarUrl) {
            setAvatarUrl(profileData?.profileAvatarUrl);
        }
    };

    const onTakeImage = () => {
        avatarInputRef.current?.click();
        setIsEditing(true);
    };

    const handleClickOutside = React.useCallback(
        (e: MouseEvent) => {
            if (
                containRef.current &&
                !containRef.current.contains(e.target as Node)
            ) {
                if (avatarUrl && avatarUrl !== profileData?.profileAvatarUrl) {
                    setOpenDialog(true);
                } else {
                    setOpenDialog(false);
                    onCancelAvatar();
                }
            }
        },
        [avatarUrl, profileData?.profileAvatarUrl]
    );

    React.useEffect(() => {
        if (isEditing) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditing, handleClickOutside]);

    return {
        isPending,
        containRef,
        avatarInputRef,
        avatarUrl,
        handleAvatarChange,
        onSaveAvatar,
        onCancelAvatar,
        onTakeImage,
        openDialog,
        setOpenDialog,
        isEditing,
    };
};
