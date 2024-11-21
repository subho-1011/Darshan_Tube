import z from "zod";

export const CommunityFormSchema = z.object({
    content: z.string().min(1).max(255),
});

export type TCommunityFormInput = z.infer<typeof CommunityFormSchema>;
