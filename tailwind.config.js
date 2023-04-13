/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    colors: {
      "black-primary": "#181818",
      "black-secondary": "#222222",
      "white-primary": "#ffffff",
      "white-secondary": "#f8f8f8",
      violet: "#7c3aed",
    },
    minHeight: {
      96: "24rem",
    },
    minWidth: {
      96: "24rem",
    },
    extend: {},
  },
  safelist: [".ProseMirror"],
  plugins: [],
};
