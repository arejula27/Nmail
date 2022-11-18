const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./pages/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        screens: {
            xs: "275px",
            ...defaultTheme.screens,
        },
        colors: {
            primary: "#fffffe",
            secondary: "#eaddcf",
            tertiary: "#f25042",
            background: "#fffffe",
            headline: "#020826",
            paragraph: "#716040",
            "card-background": "#eaddcf",
            stroke: "#020826",

            blue: "#1fb6ff",
            purple: "#7e5bef",
            pink: "#ff49db",
            orange: "#ff7849",
            green: "#13ce66",
            yellow: "#ffc82c",
            "gray-dark": "#273444",
            gray: "#8492a6",
            "gray-light": "#d3dce6",
        },
        extend: {},
    },
    plugins: [],
};