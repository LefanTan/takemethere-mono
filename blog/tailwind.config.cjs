/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "secondary-light": "var(--secondary-light)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
