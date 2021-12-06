import type { NextPage } from "next";
import { Question as Q, Questions } from "../modules/questions";
import { Category } from "../modules/categories";
import { Difficulty } from "../modules/difficulty";
import { useEffect, useState } from "react";
import { default as QComponent } from "../components/Questions";

const Home: NextPage = () => {
    const [questions, setQuestions] = useState<Q[]>([]);
    const [start, setStart] = useState<boolean>(false);
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
    const [category, setCategory] = useState<Category>(
        Category["General Knowledge"]
    );

    useEffect(() => {
        if (start) {
            const api = new Questions({
                amount: 10,
                category: category,
                difficulty: difficulty,
            });

            api.getQuestions().then((res) => {
                setQuestions(res);
            });
        }
    }, [start, category, difficulty]);

    return (
        <div>
            {!start ? (
                <div>
                    <h2>Difficulty</h2>
                    {Object.keys(Difficulty).map((value) => (
                        <button
                            key={value}
                            className={
                                Difficulty[value as keyof typeof Difficulty] ===
                                difficulty
                                    ? "bg-red-400"
                                    : ""
                            }
                            onClick={(event) => {
                                event.preventDefault();
                                setDifficulty(
                                    Difficulty[value as keyof typeof Difficulty]
                                );
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
                                Category[value as keyof typeof Category] ===
                                category
                                    ? "bg-red-400"
                                    : ""
                            }
                            onClick={(event) => {
                                event.preventDefault();
                                setCategory(
                                    Category[value as keyof typeof Category]
                                );
                            }}
                        >
                            {value}
                        </button>
                    ))}

                    <br />

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
