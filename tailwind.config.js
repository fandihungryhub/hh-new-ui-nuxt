module.exports = {
  plugins: [require("daisyui")],
  content: [
    "components_pages/**/*.vue",
    "section/**/*.vue",
    "components/**/*.vue",
    "partial/**/*.vue",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",

      black: "#000",
      white: "#fff",

      gray: {
        900: "#1D2021",
        800: "#3D4245",
        700: "#656C6F",
        600: "#8C9396",
        500: "#A0A6A9",
        400: "#DEE2E4",
        300: "#E9ECEE",
        200: "#EDF0F2",
        100: "#F4F6F7",
        10: "#FFFFFF",
        light: "#cfcfd2",
        dark: "#707070",
      },
      red: {
        900: "#570002",
        800: "#790003",
        700: "#9B070B",
        600: "#BD1419",
        500: "#DF252A",
        400: "#FF393F",
        300: "#FF666A",
        200: "#FF9295",
        100: "#FFBFC0",
        10: "#FFEBEC",
        dark: "#df252a",
        light: "#f48285",
        pink: "#fcdede",
      },
      orange: {
        900: "#4F1800",
        800: "#712200",
        700: "#932C00",
        600: "#B53B07",
        500: "#D74F15",
        400: "#F96526",
        300: "#FF8957",
        200: "#FFAB88",
        100: "#FFCEB9",
        10: "#FFF0E9",
      },
      green: {
        900: "#0E4E23",
        800: "#1A7036",
        700: "#2A924C",
        600: "#3DB464",
        500: "#53D67E",
        400: "#6EF89B",
        300: "#91FFB4",
        200: "#B1FFCA",
        100: "#D1FFE0",
        10: "#F1FFF5",
      },
      mint: {
        900: "#005951",
        800: "#008177",
        700: "#00AA9C",
        600: "#00D3C2",
        500: "#16FCE9",
        400: "#40FFEF",
        300: "#6AFFF3",
        200: "#94FFF6",
        100: "#BEFFF9",
        10: "#E7FFFD",
      },
      blue: {
        900: "#063358",
        800: "#0E4A7A",
        700: "#1A629C",
        600: "#2A7CBE",
        500: "#3D97E0",
        400: "#53B2FF",
        300: "#79C3FF",
        200: "#A0D4FF",
        100: "#C7E6FF",
        10: "#EEF7FF",
      },
      yellow: {
        900: "#554603",
        800: "#77630A",
        700: "#998114",
        600: "#BB9F21",
        500: "#DDBE32",
        400: "#FFDD46",
        300: "#FFE570",
        200: "#FFEC99",
        100: "#FFF4C3",
        10: "#FFFBEC",
      },
      purple: {
        900: "#371055",
        800: "#4F1B77",
        700: "#692999",
        600: "#833ABB",
        500: "#9F4EDD",
        400: "#BC64FF",
        300: "#CB87FF",
        200: "#DAAAFF",
        100: "#E9CCFF",
        10: "#F8EFFF",
      },
    },
    extend: {
      ringWidth: {
        1: "1px",
      },
      zIndex: {
        "-1": "-1",
        49: "49",
        48: "48",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      fontSize: {
        "3xs": "0.55rem",
        "2xs": "0.6rem",
      },
      lineHeight: {
        2: "0.5rem;",
      },
    },
  },
};
