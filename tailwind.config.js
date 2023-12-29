/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        primary: {
          DEFAULT: "#ff5252",
        },
      },
      fontFamily: {
        chakra: ["Chakra Petch", "sans-serif"],
        glitch: ["Rubik Glitch", "display"],
      },
    },
  },
  plugins: [],
};
