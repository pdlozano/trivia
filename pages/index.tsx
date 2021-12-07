import type { NextPage } from "next";
import { Question as Q, Questions } from "../modules/questions";
import { Category } from "../modules/categories";
import { Difficulty } from "../modules/difficulty";
import { useEffect, useState } from "react";
import { default as QComponent } from "../components/Questions";
import Head from "next/head";
import Header from "../components/Header";
import Wait from "../components/Wait";

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
                session: true,
            });

            api.getQuestions().then((res) => {
                setQuestions(res);
            });
        }
    }, [start, category, difficulty]);

    return (
        <div>
            <Head>
                <title>Trivia App</title>
                <meta charSet="utf-8" />
                <meta
                    name="description"
                    content="Trivia App from the Open Trivia Database API"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Heebo:wght@800&family=Ubuntu+Mono&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Header />

            <main className="w-11/12 md:w-10/12 mx-auto">
                {!start ? (
                    <div>
                        <h2>Difficulty</h2>
                        {Object.keys(Difficulty).map((value) => (
                            <button
                                key={value}
                                className={
                                    Difficulty[
                                        value as keyof typeof Difficulty
                                    ] === difficulty
                                        ? "chosen"
                                        : ""
                                }
                                onClick={(event) => {
                                    event.preventDefault();
                                    setDifficulty(
                                        Difficulty[
                                            value as keyof typeof Difficulty
                                        ]
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
                                        ? "chosen"
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

                        <button
                            className="block mt-5 mx-auto w-1/2 uppercase font-bold"
                            onClick={(event) => {
                                event.preventDefault();
                                setStart(true);
                            }}
                        >
                            Start
                        </button>
                    </div>
                ) : questions.length !== 0 ? (
                    <QComponent items={questions} func={() => {
                       api.getQuestions().then((res) => {
                           setQuestions(res);
                       });
                    }} />
                ) : (
                    <Wait />
                )}
            </main>
        </div>
    );
};

export default Home;
