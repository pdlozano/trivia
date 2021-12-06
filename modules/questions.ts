const enum Category {
    GeneralKnowledge = 9,
    Books = 10,
    Film = 11,
    Music = 12,
    MusicalsAndTheatre = 13,
    Television = 14,
    VideoGames = 15,
    BoardGames = 16,
    ScienceAndNature = 17,
    Computers = 18,
    Mathematics = 19,
    Mythology = 20,
    Sports = 21,
    Geography = 22,
    History = 23,
    Politics = 24,
    Art = 25,
    Celebrities = 26,
    Animals = 27,
    Vehicles = 28,
    Comics = 29,
    Gadgets = 30,
    AnimeAndManga = 31,
    CartoonAndAnimations = 32,
}

const enum Difficulty {
    Easy = "easy",
    Medium = "medium",
    Hard = "hard",
}

type QuestionProp = {
    amount: number;
    category: Category;
    difficulty: Difficulty;
    session?: boolean;
};

type Question = {
    type: "Multiple Choice" | "True or False";
    difficulty: Difficulty;
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
                        wrong_answers: item.incorrect_answers.map((i: string) =>
                            decodeURIComponent(i)
                        ),
                    };
                });
            });
    }
}

export { Questions, Category, Difficulty };
export type { Question };
