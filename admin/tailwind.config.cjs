/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  // Prefix to gain specficity over Quasar utility classes
  important: "#body",
  theme: {
    extend: {},
  },
  plugins: [],
};
