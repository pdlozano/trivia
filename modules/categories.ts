const Category = {
    "General Knowledge": 9,
    Books: 10,
    Film: 11,
    Music: 12,
    "Musicals and Theatre": 13,
    Television: 14,
    "Video Games": 15,
    "Board Games": 16,
    "Science and Nature": 17,
    Computers: 18,
    Mathematics: 19,
    Mythology: 20,
    Sports: 21,
    Geography: 22,
    History: 23,
    Politics: 24,
    Art: 25,
    Celebrities: 26,
    Animals: 27,
    Vehicles: 28,
    Comics: 29,
    Gadgets: 30,
    "Anime and Manga": 31,
    "Cartoon and Animations": 32,
} as const;

type Category = typeof Category[keyof typeof Category];

export { Category };
