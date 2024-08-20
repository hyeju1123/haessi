import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      background: "rgb(var(--background) / <alpha-value>)",
      tagBg: "rgb(var(--tagBg) / <alpha-value>)",
      hoverTagBg: "rgb(var(--hoverTagBg) / <alpha-value>)",
      codeBg: "rgb(var(--codeBg) / <alpha-value>)",
      text: "rgb(var(--text) / <alpha-value>)",
      textEmph: "rgb(var(--textEmph) / <alpha-value>)",
      textEmphBg: "rgb(var(--textEmphBg) / <alpha-value>)",
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "rgb(var(--text))",
            pre: { background: "rgb(var(--codeBg))" },
            a: { color: "rgb(var(--text))" },
            h1: { color: "rgb(var(--text))" },
            h2: { color: "rgb(var(--text))" },
            h3: { color: "rgb(var(--text))" },
            strong: { color: "rgb(var(--text))" },
            blockquote: { color: "rgb(var(--text))" },
            code: {
              color: "rgb(var(--textEmph))",
              background: "rgb(var(--textEmphBg))",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
