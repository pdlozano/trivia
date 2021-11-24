import type { Question as QuestionData } from "../modules/questions";
import { useEffect, useState } from "react";

const _ = require("lodash");

function Question(props: QuestionData): JSX.Element {
    const [questions, setQuestions] = useState<string[]>([]);
    const [correct, setCorrect] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const data = [props.correct_answer, ...props.wrong_answers];
        setQuestions(_.shuffle(data));
    }, [props.correct_answer, props.wrong_answers]);

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

            {questions.map((question) => (
                <button
                    key={question}
                    onClick={(event) => {
                        event.preventDefault();
                        setCorrect(question === props.correct_answer);
                    }}
                    disabled={correct !== undefined}
                >
                    {question}
                </button>
            ))}
        </div>
    );
}

export default Question;
