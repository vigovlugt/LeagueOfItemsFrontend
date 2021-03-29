const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
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
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }
};
