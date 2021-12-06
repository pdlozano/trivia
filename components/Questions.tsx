import type { Question as QuestionData } from "../modules/questions";
import Question from "./Question";
import { useState } from "react";
import Tally from "./Tally";
import Link from "next/link";

type QuestionsData = {
    items: Array<QuestionData>;
};

function Questions(props: QuestionsData): JSX.Element {
    const [index, setIndex] = useState<number>(0);
    const [tally, setTally] = useState<boolean[]>([]);

    return (
        <div>
            <Tally data={tally} length={props.items.length} />
            {!(tally.length === props.items.length) ? (
                <Question
                    {...props.items[index]}
                    func={(boolean) => {
                        setTally([...tally, boolean]);
                        setIndex(index + 1);
                    }}
                />
            ) : (
                <div className="py-8 text-center">
                    <p>
                        Done! You got{" "}
                        {tally.reduce((a, b) => a + (b ? 1 : 0), 0)} items
                        correct
                    </p>
                    <p>
                        <Link href="/" prefetch={false}>
                            One More Round
                        </Link>
                    </p>
                </div>
            )}
        </div>
    );
}

export default Questions;
