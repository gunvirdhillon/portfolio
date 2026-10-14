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
        /* Light body */
        paper: "#F5F6F3",
        surface: "#FFFFFF",
        ink: "#172230",
        muted: "#4C5866",
        subtle: "#5F6B78",
        rule: "#D3D7DB",
        /* Dark band (hero, contact, footer) */
        band: "#18283A",
        "band-ink": "#EEF1F4",
        "band-muted": "#B3BFCB",
        "band-rule": "#33465B",
        /* The one accent: marigold on the band, deepened to ochre on paper */
        accent: "#E3B341",
        "accent-deep": "#8F6300",
      },
      fontFamily: {
        sans: [
          "var(--font-body-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          '"Segoe UI"',
          "Roboto",
          "Arial",
          "sans-serif",
        ],
        serif: [
          "var(--font-display-serif)",
          "Georgia",
          '"Times New Roman"',
          "serif",
        ],
      },
      maxWidth: {
        measure: "65ch",
      },
    },
  },
  plugins: [],
};
export default config;
