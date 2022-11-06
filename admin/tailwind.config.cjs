/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  // Prefix to gain specficity over Quasar utility classes
  important: "#body",
  theme: {
    extend: {
      screens: {
        md: "824px",
      },
      spacing: {
        22: "5.5rem",
      },
      colors: {
        "secondary-light": "var(--secondary-light)",
      },
      boxShadow: {
        md: "0 0px 6px -1px rgb(0 0 0 / 0.1)",
        lg: "0 0px 15px -3px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [],
};
