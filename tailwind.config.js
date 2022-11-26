/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
        xs: "275px",
        'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
        primary: "#eaddcf",
        secondary: "#f5f5f5",
        tertiary: "#f25042",
        accent:"#f1f5f9",
        background: "#ffffff",
        "card-background": "#fffff5",
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
}