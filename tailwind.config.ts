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
      background: "var(--background)",
      tagBg: "var(--tagBg)",
      hoverTagBg: "var(--hoverTagBg)",
      codeBg: "var(--codeBg)",
      text: "var(--text)",
      textEmph: "var(--textEmph)",
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "var(--text)",
            pre: { background: "var(--codeBg)" },
            a: { color: "var(--text)" },
            h1: { color: "var(--text)" },
            h2: { color: "var(--text)" },
            h3: { color: "var(--text)" },
            strong: { color: "var(--text)" },
            blockquote: { color: "var(--text)" },
            code: { color: "var(--text)", background: "var(--textEmph)" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
