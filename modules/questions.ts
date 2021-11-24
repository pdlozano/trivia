type QuestionProp = {
    amount: number;
    category: string;
    difficulty: string;
    session?: boolean;
};

type Question = {
    type: "Multiple Choice" | "True or False";
    difficulty: "easy" | "medium" | "hard";
    question: string;
    correct_answer: string;
    wrong_answers: string[];
};

class Questions {
    private uri: string;

    constructor(data: QuestionProp) {
        const BASE = "https://opentdb.com/api.php";

        this.uri = `${BASE}?amount=${data.amount}&category=${data.category}&difficulty=${data.difficulty}&encode=url3986`;

        if (data.session) {
            fetch("https://opentdb.com/api_token.php?command=request")
                .then((res) => res.json())
                .then((res) => {
                    this.uri = `${this.uri}&token=${res.token}`;
                });
        }
    }

    getQuestions(): Promise<Question[]> {
        return fetch(this.uri)
            .then((res) => res.json())
            .then((res) => {
                return res.results.map((item: any) => {
                    return {
                        type:
                            item.type === "boolean"
                                ? "True or False"
                                : "Multiple Choice",
                        difficulty: item.difficulty,
                        question: decodeURIComponent(item.question),
                        correct_answer: decodeURIComponent(item.correct_answer),
                        wrong_answers: item.incorrect_answers.map((i) =>
                            decodeURIComponent(i)
                        ),
                    };
                });
            });
    }
}

export { Questions };
export type { Question };
