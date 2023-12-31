/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#121212",
          light: "#222222",
          light2: "#323232",
        },
        primary: {
          DEFAULT: "#ff5252",
          light: "#ff9c9c",
        },
        text: {
          DEFAULT: "#ffffff",
          light: "#cccccc",
        },
      },
      fontFamily: {
        chakra: ["Chakra Petch", "sans-serif"],
        glitch: ["Rubik Glitch", "display"],
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
