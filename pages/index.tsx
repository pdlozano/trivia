import type { NextPage } from "next";
import { Question as Q, Questions } from "../modules/questions";
import { useEffect, useState } from "react";
import { default as QComponent } from "../components/Questions";

const Home: NextPage = () => {
    const [questions, setQuestions] = useState<Q[]>([]);

    useEffect(() => {
        const api = new Questions({
            amount: 10,
            category: "9",
            difficulty: "easy",
        });

        api.getQuestions().then((res) => {
            setQuestions(res);
        });
    }, []);

    return (
        <div>
            {questions.length !== 0 ? (
                <QComponent items={questions} />
            ) : (
                <p>Wait</p>
            )}
        </div>
    );
};

export default Home;
