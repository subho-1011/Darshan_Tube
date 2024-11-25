import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postNewSupportQuestion } from "@/services/support-questions.services";
import { HelpAndSupportFormSchema } from "@/app/(public)/help-and-support/_lib/schemas";

export const useSupportForm = () => {
    const form = useForm<z.infer<typeof HelpAndSupportFormSchema>>({
        resolver: zodResolver(HelpAndSupportFormSchema),
        defaultValues: {
            questionBy: "",
            questionByEmail: "",
            question: "",
        },
    });

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ["help-and-support", "submit"],
        mutationFn: async (values: z.infer<typeof HelpAndSupportFormSchema>) => postNewSupportQuestion(values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["help-and-support", "previous-questions"] });
            form.reset();
            window.scrollTo(0, 0);
        },
    });

    const onSubmit = (values: z.infer<typeof HelpAndSupportFormSchema>) => mutate(values);

    return { form, isPending, onSubmit };
};
