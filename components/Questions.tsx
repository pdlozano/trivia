import type { Question as QuestionData } from "../modules/questions";
import Question from "./Question";
import { useEffect, useState } from "react";

type QuestionsData = {
    items: Array<QuestionData>;
};

function Questions(props: QuestionsData): JSX.Element {
    const [index, setIndex] = useState<number>(0);
    const [max, setMax] = useState<boolean>(false);

    useEffect(() => {
        setMax(index === props.items.length - 1);
    }, [index, props.items.length]);

    return (
        <div>
            <h1>Questions</h1>
            {!max ? <Question {...props.items[index]} /> : <p>Done!</p>}
            <button
                onClick={(event) => {
                    event.preventDefault();
                    setIndex(index + 1);
                }}
                disabled={max}
            >
                Next
            </button>
        </div>
    );
}

export default Questions;
