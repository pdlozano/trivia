import type { NextPage } from "next";
import {
    Category,
    Difficulty,
    Question as Q,
    Questions,
} from "../modules/questions";
import { useEffect, useState } from "react";
import { default as QComponent } from "../components/Questions";

const Home: NextPage = () => {
    const [questions, setQuestions] = useState<Q[]>([]);
    const [start, setStart] = useState<boolean>(false);
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
    const [category, setCategory] = useState<Category>(
        Category.GeneralKnowledge
    );

    useEffect(() => {
        if (start) {
            const api = new Questions({
                amount: 10,
                category: category,
                difficulty: difficulty,
            });
            console.log(category, difficulty);

            api.getQuestions().then((res) => {
                setQuestions(res);
            });
        }
    }, [start]);

    return (
        <div>
            {!start ? (
                <div>
                    <h2>Difficulty</h2>
                    {Object.keys(Difficulty).map((value) => (
                        <button
                            key={value}
                            className={
                                Difficulty[value] === difficulty
                                    ? "bg-red-400"
                                    : ""
                            }
                            onClick={(event) => {
                                event.preventDefault();
                                console.log(Difficulty[value]);
                                setDifficulty(Difficulty[value]);
                            }}
                        >
                            {value}
                        </button>
                    ))}

                    <h2>Categories</h2>
                    {Object.keys(Category).map((value) => (
                        <button
                            key={value}
                            className={
                                Category[value] === category ? "bg-red-400" : ""
                            }
                            onClick={(event) => {
                                event.preventDefault();
                                console.log(Category[value]);
                                setCategory(Category[value]);
                            }}
                        >
                            {value}
                        </button>
                    ))}

                    <button
                        onClick={(event) => {
                            event.preventDefault();
                            setStart(true);
                        }}
                    >
                        Start
                    </button>
                </div>
            ) : questions.length !== 0 ? (
                <QComponent items={questions} />
            ) : (
                <p>Wait</p>
            )}
        </div>
    );
};

export default Home;
