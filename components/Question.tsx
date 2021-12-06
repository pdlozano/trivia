import type { Question as PrevQuestionData } from "../modules/questions";
import { useEffect, useState } from "react";
import Answer from "./Answer";

const _ = require("lodash");

type QuestionData = PrevQuestionData & {
    func: (correct: boolean) => void;
};

function Question(props: QuestionData): JSX.Element {
    const [answers, setAnswers] = useState<string[]>([]);
    const [correct, setCorrect] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const data = [props.correct_answer, ...props.wrong_answers];
        setAnswers(_.shuffle(data));
    }, [props.correct_answer, props.wrong_answers]);

    useEffect(() => {
        setCorrect(undefined);
    }, [props.correct_answer, props.question]);

    return (
        <div
            className={
                "p-10 mt-10 " +
                (correct === undefined
                    ? "none"
                    : correct
                    ? "correct"
                    : "incorrect")
            }
        >
            <h2 className="text-center font-bold">{props.question}</h2>

            <div className="flex flex-col md:flex-row justify-evenly my-5">
                {answers.map((answer, i) => (
                    <Answer
                        key={answer}
                        click={() => {
                            setCorrect(answer === props.correct_answer);
                            setTimeout(() => {
                                props.func(answer === props.correct_answer);
                            }, 2000);
                        }}
                        length={answers.length}
                        buttonNumber={i}
                        disabled={correct !== undefined}
                        text={answer}
                        question={props.question}
                        item={i}
                    />
                ))}
            </div>

            <p className="text-center italic none md:block">
                The text below the answer are keyboard shortcuts.
            </p>
        </div>
    );
}

export default Question;
