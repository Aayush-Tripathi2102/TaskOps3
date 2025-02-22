/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        accent: "#43FFFF",
        secondary: "#00849B",
        tertiary: "#002135",
        light: "#FFFFFF",
      },
      fontFamily: {
        joffrey: ["Joffrey"], // Add custom font
      },
    },
  },
  plugins: [],
};
