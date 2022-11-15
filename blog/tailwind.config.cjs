/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      minHeight: {
        20: "5rem",
      },
      colors: {
        secondary: "var(--secondary)",
        "secondary-light": "var(--secondary-light)",
      },
      boxShadow: {
        md: "0 4px 6px -1px rgb(0 0 0 / 0.01), 0 2px 4px -2px rgb(0 0 0 / 0.01);",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
