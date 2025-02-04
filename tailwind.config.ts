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
          default: "var(--color-primary-default)",
          light: "var(--color-primary-light)",
          dark: "var(--color-primary-dark)",
        },
        gray: {
          100: "var(--color-gray-100)",
          200: "var(--color-gray-200)",
          300: "var(--color-gray-300)",
          400: "var(--color-gray-400)",
          500: "var(--color-gray-500)",
          600: "var(--color-gray-600)",
          700: "var(--color-gray-700)",
          800: "var(--color-gray-800)",
          900: "var(--color-gray-900)",
          950: "var(--color-gray-950)",
        },
        red: {
          default: "var(--color-red-default)",
          light: "var(--color-red-light)",
          dark: "var(--color-red-dark)",
        },
        white: "#ffffff",
        black: "#000000",
      },
      screens: {
        xsm: "500px",
        base: "900px",
      },
    },
  },
  plugins: [],
} satisfies Config;
