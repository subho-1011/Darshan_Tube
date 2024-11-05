import * as z from "zod";

export const VideoFormSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title cannot exceed 100 characters"),
    description: z.string().min(1, "Description is required").max(300, "Description cannot exceed 300 characters"),
    category: z.string().min(1, "Category is required"),
    tags: z.array(z.string()).optional(),
    thumbnail: z.any().optional(),
    video: z.any().optional(),
});

export const VideoMetaDataFormSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title cannot exceed 100 characters"),
    description: z.string().min(1, "Description is required").max(300, "Description cannot exceed 300 characters"),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    isPublished: z.boolean().default(true),
});

export const VideoUpdateFormSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title cannot exceed 100 characters"),
    description: z.string().min(1, "Description is required").max(300, "Description cannot exceed 300 characters"),
    tags: z.array(z.string()).optional(),
});

export type TVideoFormSchema = z.infer<typeof VideoFormSchema>;
