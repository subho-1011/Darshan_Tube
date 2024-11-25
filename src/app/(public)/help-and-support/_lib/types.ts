export type TSupportAnswer = {
    _id: string;
    answerBy: string;
    answerByEmail?: string;
    answer: string;
    answeredAt: string;
    isEdited?: boolean;
};

export type THelpAndSupport = {
    _id: string;
    questionBy: string;
    questionByEmail?: string;
    question: string;
    isEdited?: boolean;
    isAnswered?: boolean;
    noOfAnswers?: number;
    createdAt: string;
    answers?: TSupportAnswer[];
};
