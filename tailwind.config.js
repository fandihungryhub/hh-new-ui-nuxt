module.exports = {
  plugins: [require("daisyui")],
  content: ["components_pages/**/*.vue", "section/**/*.vue"],
  theme: {
    extend: {
      colors: {
        "hh-red": {
          dark: "#df252a",
          pink: "#fcdede",
          light: "#f48285",
        },
        "hh-yellow": "#ffdd46",
      },
      fontSize: {
        "3xs": "0.55rem",
        "2xs": "0.6rem",
      },
    },
  },
};
