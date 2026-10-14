import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      /* Values live in globals.css as custom properties so the dark scheme can swap them. */
      colors: {
        paper: "var(--paper)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        rule: "var(--rule)",
        /* The one secondary colour: link underlines and the focus outline. */
        green: "var(--green)",
      },
      fontFamily: {
        serif: ["var(--font-newsreader)", "Georgia", '"Times New Roman"', "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
