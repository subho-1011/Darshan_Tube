"use client";

import React from "react";
import { formatDate } from "date-fns";

import { AnswerForm } from "./answer-form";
import { ShowIf } from "@/components/common/show";

import { THelpAndSupport } from "../_lib/types";
import { motion, useAnimation } from "framer-motion";
import { useSupportAnswerCard } from "../_lib/hooks/use-support-answer-card";

export const SupportAsnwerCard = ({ question }: { question: THelpAndSupport }) => {
    const { answerForm, onAnswerSubmit, isPending, containRef, showAnswerForm, setShowAnswerForm, handleMouseLeave } =
        useSupportAnswerCard(question._id);
    const controls = useAnimation();

    React.useEffect(() => {
        if (showAnswerForm) {
            controls.start({ opacity: 1, height: "auto", scaleY: 1, translateY: 0 });
        } else {
            controls.start({ opacity: 0, height: 0, scaleY: 0, translateY: -10 });
        }

        return () => {
            controls.stop();
        };
    }, [showAnswerForm, controls]);

    return (
        <div
            key={question._id}
            className="border-2 rounded-md p-4 mt-4 group relative"
            ref={containRef}
            onMouseEnter={() => setShowAnswerForm(true)}
            onMouseLeave={handleMouseLeave}
        >
            <h3 className="font-semibold text-lg">{question.question}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
                Asked by {question.questionBy} {question.questionByEmail && `(${question.questionByEmail})`}
                <span className="text-xs">on {formatDate(question.createdAt, "h:mm a d MMM yyyy")}</span>
            </p>
            <DisplayAnswer question={question} />
            <motion.div
                initial={{ opacity: 0, height: 0, scaleY: 0, translateY: -10 }}
                animate={controls}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-4"
            >
                <AnswerForm answerForm={answerForm} onAnswerSubmit={onAnswerSubmit} isPending={isPending} />
            </motion.div>
        </div>
    );
};

/**
 * ====================== Display Answer ======================
 */

const DisplayAnswer = ({ question }: { question: Partial<THelpAndSupport> }) => {
    return (
        <ShowIf when={!!question.answers}>
            <div className="mt-4">
                <h4 className="font-semibold underline">Answers</h4>
                {question?.answers?.map((answer) => (
                    <div key={answer._id} className="border-2 rounded-md p-4 mt-4">
                        <p>{answer.answer}</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Answered by {answer.answerBy} {answer.answerByEmail && `(${answer.answerByEmail})`}
                            <span className="text-xs">on {formatDate(answer.answeredAt, "h:mm a d MMM yyyy")}</span>
                        </p>
                    </div>
                ))}
            </div>
        </ShowIf>
    );
};
