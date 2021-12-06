const Difficulty = {
    Easy: "easy",
    Medium: "medium",
    Hard: "hard",
} as const;

type Difficulty = typeof Difficulty[keyof typeof Difficulty];

export { Difficulty };
