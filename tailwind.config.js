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
            primary: "#eaddcf",
            secondary: "#f5f5f5",
            tertiary: "#f25042",
            accent:"#f1f5f9",
            background: "#f5f5f5",
            headline: "#020826",
            paragraph: "#716040",
            stroke: "#020826",
            hover:"#f6f1eb",

            blue: "#1fb6ff",
            purple: "#7e5bef",
            pink: "#ff49db",
            orange: "#ff7849",
            green: "#13ce66",
            yellow: "#ffc82c",
            "gray-dark": "#273444",
            gray: "#8492a6",
            "gray-light": "#f1f5f9",
        },
        extend: {},
    },
    plugins: [],
};