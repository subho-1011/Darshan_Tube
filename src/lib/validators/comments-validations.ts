import z from "zod";

export const CommentInputSchema = z.object({
    text: z.string().min(1, "Please write somthing!"),
});
