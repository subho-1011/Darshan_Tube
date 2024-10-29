'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/lib/utils';
import { getProfile, updateProfile } from '@/store/thunk-api/profile.thunk-api';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Gender } from '@/lib/types';
import {
    EditProfileFormSchema,
    TEditProfileFormSchema,
} from '@/lib/validators/profile-validations';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import {
    setIsEditable,
    toggleEditButton as toggleEdit,
} from '@/store/slices/profile-slice';

export const useProfileData = () => {
    const dispatch = useAppDispatch();
    const { profileData, isEditable } = useAppSelector(
        (state) => state.profile
    );

    const toggleEditButton = () => dispatch(toggleEdit());

    const queryClient = useQueryClient();

    const { isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: () => dispatch(getProfile()).unwrap(),
        refetchOnWindowFocus: false,
    });

    const form = useForm<TEditProfileFormSchema>({
        resolver: zodResolver(EditProfileFormSchema),
        defaultValues: {
            firstName: profileData?.firstName,
            lastName: profileData?.lastName,
            bio: profileData?.bio,
            city: profileData?.city,
            gender: profileData?.gender as Gender,
            birthday: profileData?.birthday
                ? format(profileData?.birthday, 'dd/MM/yyyy')
                : '',
            websites: profileData?.websites,
            socials: profileData?.socials,
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: TEditProfileFormSchema) =>
            dispatch(updateProfile(data)).unwrap(),
        mutationKey: ['profile'],
        onSuccess: () => {
            dispatch(setIsEditable(false));
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            toast({
                title: 'Profile updated',
                description: 'Your profile has been updated successfully.',
            });
        },
        onError: (error) => {
            console.error(error.message);
            toast({
                variant: 'destructive',
                title: 'Error updating profile',
                description:
                    error.message ||
                    'Something went wrong while updating your profile.',
            });
        },
    });

    const websiteInputRef = React.useRef<HTMLInputElement>(null);

    const addWebsite = () => {
        if (!websiteInputRef.current?.value) {
            form.setError('websites', {
                type: 'custom',
                message: 'Website is required',
            });
            return;
        }

        if (
            form.getValues('websites')?.includes(websiteInputRef.current?.value)
        ) {
            form.setError('websites', {
                type: 'custom',
                message: 'Website already exists',
            });
            websiteInputRef.current.value = '';
            return;
        }

        form.setValue('websites', [
            ...(form.getValues('websites') || []),
            websiteInputRef.current?.value,
        ]);

        websiteInputRef.current.value = '';
        form.clearErrors('websites');
    };

    const removeWebsite = (website: string) => {
        form.setValue(
            'websites',
            form.getValues('websites')?.filter((w) => w !== website)
        );
    };

    const onSubmit = async (data: TEditProfileFormSchema) => mutate(data);

    return {
        profileData,
        isLoading,
        isEditable,
        toggleEditButton,
        isPending,
        form,
        onSubmit,
        websiteInputRef,
        addWebsite,
        removeWebsite,
    };
};
