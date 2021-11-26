import type { Question as PrevQuestionData } from "../modules/questions";
import { useEffect, useState } from "react";

const _ = require("lodash");

type QuestionData = PrevQuestionData & {
    func: (correct: boolean) => void;
};

function Question(props: QuestionData): JSX.Element {
    const [questions, setQuestions] = useState<string[]>([]);
    const [correct, setCorrect] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const data = [props.correct_answer, ...props.wrong_answers];
        setQuestions(_.shuffle(data));
    }, [props.correct_answer, props.wrong_answers]);

    useEffect(() => {
        setCorrect(undefined);
    }, [props.correct_answer]);

    return (
        <div
            className={
                correct === undefined
                    ? "none"
                    : correct
                    ? "correct"
                    : "incorrect"
            }
        >
            <h1>{props.question}</h1>

            {questions.map((question, i) => (
                <button
                    key={question}
                    onClick={(event) => {
                        event.preventDefault();
                        setCorrect(question === props.correct_answer);
                        props.func(question === props.correct_answer);
                    }}
                    id={"button-" + i}
                    disabled={correct !== undefined}
                >
                    {question}
                </button>
            ))}
        </div>
    );
}

export default Question;
