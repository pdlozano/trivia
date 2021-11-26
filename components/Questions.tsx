import type { Question as QuestionData } from "../modules/questions";
import Question from "./Question";
import { useState } from "react";
import Tally from "./Tally";

type QuestionsData = {
    items: Array<QuestionData>;
};

function Questions(props: QuestionsData): JSX.Element {
    const [index, setIndex] = useState<number>(0);
    const [tally, setTally] = useState<boolean[]>([]);

    return (
        <div>
            <h1>Questions</h1>
            <Tally data={tally} length={props.items.length} />
            {!(tally.length === props.items.length) ? (
                // TODO: This component immediately disappears after the last question
                <Question
                    {...props.items[index]}
                    func={(boolean) => {
                        setTally([...tally, boolean]);

                        setTimeout(() => {
                            setIndex(index + 1);
                        }, 2000);
                    }}
                />
            ) : (
                <p>Done!</p>
            )}
        </div>
    );
}

export default Questions;
