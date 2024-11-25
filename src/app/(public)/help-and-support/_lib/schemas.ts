import { z } from "zod";

export const HelpAndSupportFormSchema = z.object({
    questionBy: z.string().min(5, "Name must be at least 5 characters long"),
    questionByEmail: z.string().max(0, "Invalid email address").or(z.string().email("Invalid email address")),
    question: z
        .string()
        .min(10, "Message must be at least 10 characters long")
        .max(500, "Message must be at most 500 characters long"),
});

export const AnswerFormSchema = z.object({
    answer: z.string().min(20, "Answer must be at least 20 characters"),
    answerBy: z.string().min(5, "Name must be at least 5 characters long"),
    answerByEmail: z.string().max(0, "Invalid email address").or(z.string().email("Invalid email address")),
});
