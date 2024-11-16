import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

import { useDispatch, useSelector, useStore } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, AppStore, RootState } from "@/store/store";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { API_URL } from "./constant";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;

export const api = axios.create({
    baseURL: `${API_URL}/api/v1`,
    withCredentials: true,
});

export function apiErrorHandler(error: unknown) {
    if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message);
        const errMsg = error.response?.data?.message || "Something went wrong";
        throw errMsg;
    }

    if (error instanceof Error) {
        console.log(error.message);
        throw error.message;
    }

    console.log(error);
    throw "Something went wrong";
}

/**
 * Handles API calls and error handling.
 * @param apiCall - The API call to be made.
 * @param args - The arguments to be passed to the API call.
 * @returns A promise that resolves to the API response.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiHandler = async <T>(apiCall: (...args: any[]) => Promise<T>, ...args: any[]): Promise<T> => {
    try {
        return await apiCall(...args);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data.message);
            const errMsg = error.response?.data?.message || "Something went wrong";
            throw new Error(errMsg);
        }

        if (error instanceof Error) {
            console.log(error.message);
            throw error;
        }

        console.log(error);
        throw new Error("Something went wrong");
    }
};

// time ago
export function timeAgo(date: Date) {
    return formatDistanceToNow(date, { addSuffix: true });
}

// views
export function viewsDisplay(views: number) {
    if (views > 1000000) {
        return `${(views / 1000000).toFixed(1)}M`;
    } else if (views > 1000) {
        return `${(views / 1000).toFixed(1)}K`;
    } else {
        return views;
    }
}

// duration
export function durationDisplay(duration: number) {
    const minutes = Math.floor(duration / 60);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else {
        return `${duration.toFixed(2)} seconds`;
    }
}

// format time
export function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// format number
export function formatNumber(num: number) {
    if (num >= 1000_00_00) {
        return `${(num / 1000_00_00).toFixed(2)} Cr`;
    } else if (num >= 1000_00) {
        return `${(num / 1000_00).toFixed(2)} L`;
    } else if (num >= 1000) {
        return `${(num / 1000).toFixed(2)} K`;
    } else {
        return num.toString();
    }
}
