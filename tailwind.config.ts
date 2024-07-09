import type { Config } from "tailwindcss";
import { theme } from "./colors";

const {
  light: { background, tagBg, hoverTagBg, codeBg, text, textEmph },
} = theme;

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
      background: background,
      tagBg: tagBg,
      hoverTagBg: hoverTagBg,
      codeBg: codeBg,
      text: text,
      textEmph: textEmph,
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: text,
            pre: { background: codeBg },
            a: { color: text },
            h1: { color: text },
            h2: { color: text },
            h3: { color: text },
            strong: { color: text },
            blockquote: { color: text },
            code: { color: text, background: textEmph },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
