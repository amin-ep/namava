import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#1993ff",
          light: "#6eb8ff",
          dark: "#158bf3",
        },
        gray: {
          100: "#f2f2f2",
          200: "#e5e5e5",
          300: "#d1d5db",
          400: "#aaaaaa",
          500: "#666666",
          600: "#4b5563",
          700: "#37383e",
          800: "#1a1a1a",
          900: "#222327",
          950: "#121212",
        },
        red: {
          default: "#d95c5c",
          light: "#ff6b6b",
          dark: "#b04141",
        },
        white: "#ffffff",
        black: "#000000",
        success: "#99c14d",
      },
      screens: {
        xsm: "500px",
        base: "900px",
      },
    },
  },
  plugins: [],
} satisfies Config;
