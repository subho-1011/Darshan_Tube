import { z } from "zod";
import { api, apiHandler } from "@/lib/utils";
import { THelpAndSupport } from "@/app/(public)/help-and-support/_lib/types";
import { HelpAndSupportFormSchema, AnswerFormSchema } from "@/app/(public)/help-and-support/_lib/schemas";

interface ISupportQuestionResponse {
    supportQuestion: THelpAndSupport;
}

interface IGetPreviousQuestionsResponse {
    supportQuestions: THelpAndSupport[];
    metadata: {
        total: number;
        page: number;
    };
}

const postNewSupportQuestion = async (values: z.infer<typeof HelpAndSupportFormSchema>) =>
    apiHandler(
        async (): Promise<{
            supportQuestion: THelpAndSupport;
        }> => {
            const response = await api.post("/support-questions", values);

            return response.data.data;
        }
    );

const getPreviousQuestions = (page = 1) =>
    apiHandler(async (): Promise<IGetPreviousQuestionsResponse> => {
        const response = await api.get("/support-questions", {
            params: {
                page,
            },
        });

        return response.data.data;
    });

const postNewAnswer = async (questionId: string, values: z.infer<typeof AnswerFormSchema>) =>
    apiHandler(async (): Promise<ISupportQuestionResponse> => {
        const response = await api.post(`/support-questions/${questionId}/answers`, values);

        return response.data.data;
    });

export { postNewSupportQuestion, getPreviousQuestions, postNewAnswer };
