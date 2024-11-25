import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { AnswerFormSchema } from "@/app/(public)/help-and-support/_lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postNewAnswer } from "@/services/support-questions.services";

export const useSupportAnswerCard = (questionId: string) => {
    const containRef = React.useRef<HTMLDivElement>(null);
    const [showAnswerForm, setShowAnswerForm] = React.useState(false);

    const answerForm = useForm<z.infer<typeof AnswerFormSchema>>({
        resolver: zodResolver(AnswerFormSchema),
        defaultValues: {
            answer: "",
            answerBy: "",
            answerByEmail: "",
        },
    });

    const queryClient = useQueryClient();

    const { isPending, mutate } = useMutation({
        mutationKey: ["help-and-support", "submit-answer"],
        mutationFn: async (values: z.infer<typeof AnswerFormSchema>) => postNewAnswer(questionId, values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["help-and-support", "previous-questions"] });
            answerForm.reset();
            setShowAnswerForm(true);
        },
        onError: () => {
            // Do something on error
            setShowAnswerForm(true);
        },
    });

    const onAnswerSubmit = (values: z.infer<typeof AnswerFormSchema>) => mutate(values);

    const handleMouseLeave = () => !answerForm.getValues("answer") && setShowAnswerForm(false);

    return { answerForm, onAnswerSubmit, isPending, containRef, showAnswerForm, setShowAnswerForm, handleMouseLeave };
};
