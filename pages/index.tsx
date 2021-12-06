import type { NextPage } from "next";
import { Question as Q, Questions } from "../modules/questions";
import { Category } from "../modules/categories";
import { Difficulty } from "../modules/difficulty";
import { useEffect, useState } from "react";
import { default as QComponent } from "../components/Questions";
import Choices from "../components/Choices";

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
                    <Choices title="Difficulty" setFunction={setDifficulty} items={Difficulty} default={difficulty} />
                    <Choices title="Category" setFunction={setCategory} items={Category} default={category} />

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
