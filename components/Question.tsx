import type { Question as PrevQuestionData } from "../modules/questions";
import { useEffect, useState } from "react";
import Answer from "./Answer";

const _ = require("lodash");

type QuestionData = PrevQuestionData & {
    func: (correct: boolean) => void;
};

function Question(props: QuestionData): JSX.Element {
    const [questions, setQuestions] = useState<string[]>([]);
    const [correct, setCorrect] = useState<boolean | undefined>(undefined);
    // TODO: Show a way to see which button you pressed

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
                "p-10 mt-10 " +
                (correct === undefined
                    ? "none"
                    : correct
                    ? "correct"
                    : "incorrect")
            }
        >
            <h1>{props.question}</h1>

            <div className="flex justify-evenly my-5">
                {questions.map((question, i) => (
                    <Answer
                        key={question}
                        click={() => {
                            setCorrect(question === props.correct_answer);
                            props.func(question === props.correct_answer);
                        }}
                        length={questions.length}
                        buttonNumber={i}
                        disabled={correct !== undefined}
                        text={question}
                    />
                ))}
            </div>
        </div>
    );
}

export default Question;
