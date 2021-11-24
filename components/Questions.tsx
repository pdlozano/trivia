import type { Question as QuestionData } from "../modules/questions";
import Question from "./Question";
import { useEffect, useState } from "react";
import Tally from "./Tally";

type QuestionsData = {
    items: Array<QuestionData>;
};

function Questions(props: QuestionsData): JSX.Element {
    const [index, setIndex] = useState<number>(0);
    const [max, setMax] = useState<boolean>(false);
    const [tally, setTally] = useState<boolean[]>([]);

    useEffect(() => {
        setMax(tally.length === props.items.length);
    }, [tally.length, props.items.length]);

    return (
        <div>
            <h1>Questions</h1>
            <Tally data={tally} length={props.items.length} />
            {!max ? (
                <Question
                    {...props.items[index]}
                    func={(boolean) => {
                        setTally([...tally, boolean]);
                    }}
                />
            ) : (
                <p>Done!</p>
            )}
            <button
                onClick={(event) => {
                    event.preventDefault();
                    setIndex(index + 1);
                }}
                disabled={max || index === tally.length}
            >
                Next
            </button>
        </div>
    );
}

export default Questions;
