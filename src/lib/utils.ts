import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

import { useDispatch, useSelector, useStore } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, AppStore, RootState } from '@/store/store';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;

const API_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "https://darhan-tube-backend.vercel.app";

export const api = axios.create({
    baseURL: `${API_URL}/api/v1/`,
});

export function apiErrorHandler(error: unknown) {
    if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message);
        const errMsg = error.response?.data?.message || 'Something went wrong';
        throw errMsg;
    }

    if (error instanceof Error) {
        console.log(error.message);
        throw error.message;
    }

    console.log(error);
    throw 'Something went wrong';
}

// time ago
export function timeAgo(date: Date) {
    return formatDistanceToNow(date, { addSuffix: true });
}
