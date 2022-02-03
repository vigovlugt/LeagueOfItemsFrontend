const colors = require("tailwindcss/colors");
const typography = require("@tailwindcss/typography");
const aspectRatio = require("@tailwindcss/aspect-ratio");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    maxWidth: {
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      64: "16rem",
    },
    fontFamily: {
      header: ["Montserrat", "sans-serif"],
      body: ["Open Sans"],
    },
    extend: {
      screens: {
        "2xl": "1535px",
        "3xl": "1700px",
      },
      colors: {
        gray: colors.neutral,
        winrate: {
          shiggo: "#ff4e50",
          meh: "#fcb1b2",
          okay: colors.gray[900], //"#000",
          "okay-dark": colors.gray[50],
          good: "#7ea4f4",
          great: "#3273fa",
          volxd: "#ff9b00",
        },
        patchnotes: {
          updated: "#0BC6E3",
          new: "#4EA64E",
          removed: "#BF302A",
        },
        "ugg-dark": "#0B0B23",
        ugg: "#191937",
        dark: "#121212",
        darker: "#090909",
      },
      typography: {
        lg: {
          css: {
            h1: {
              fontFamily: `"Montserrat", "sans-serif"`,
              fontSize: "2rem",
              marginBottom: "0",
            },
            p: {
              marginTop: "0",
              lineHeight: "1.5",
            },
          },
        },
      },
    },
  },
  plugins: [typography, aspectRatio],
};
