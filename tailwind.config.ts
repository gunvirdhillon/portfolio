import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#efe9e0",
        ink: "#12100e",
        muted: "#5c5650",
        subtle: "#847d76",
        rule: "#b8b0a6",
        surface: "#f5f1ea",
        accent: "#6b5d4f",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        serif: [
          "var(--font-display-serif)",
          "Georgia",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
