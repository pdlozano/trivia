module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "media",
    theme: {
        fontFamily: {
            header: ['"Heebo"', "sans-serif"],
            body: ['"Ubuntu Mono"', "monospace"],
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
