/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        "bg-cycle": {
          "0%, 100%": { "background-position": "left top" },
          "50%": { "background-position": "right bottom" },
        },
      },
      animation: {
        "bg-cycle": "bg-cycle 15s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
