import type { NextPage } from "next";
import { Question as Q, Questions } from "../modules/questions";
import { useEffect, useState } from "react";
import Question from "../components/Question";

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
            {questions.map((question, index) => {
                return <Question key={index} {...question} />;
            })}
        </div>
    );
};

export default Home;
