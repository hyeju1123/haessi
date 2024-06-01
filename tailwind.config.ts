import type { Config } from "tailwindcss";
import { theme } from "./colors";

const {
  light: { background, tagBg, codeBg, text, textEmph },
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
      codeBg: codeBg,
      text: text,
      textEmph: textEmph,
    },
    extend: {},
  },
  plugins: [],
};
export default config;
