const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    maxWidth: {
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
    },
    fontFamily: {
      header: ["Montserrat", "sans-serif"],
      body: ["Open Sans"],
    },
    extend: {
      colors: {
        winrate: {
          shiggo: "#ff4e50",
          meh: "#fcb1b2",
          okay: colors.gray[900], //"#000",
          good: "#7ea4f4",
          great: "#3273fa",
          volxd: "#ff9b00",
        },
        "ugg-dark": "#0B0B23",
        ugg: "#242949"
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  },
};
