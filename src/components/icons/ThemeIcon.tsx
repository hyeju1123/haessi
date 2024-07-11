"use client";

import Sun from "../../../public/images/sun.svg";
import Moon from "../../../public/images/moon.svg";
import { useTheme } from "next-themes";
import { theme as color } from "../../../colors";

export default function ThemeIcon() {
  const { theme } = useTheme();
  const { text } = color[theme || "light"];

  return theme === "light" ? (
    <Moon width="28" height="28" fill={text} />
  ) : (
    <Sun width="28" height="28" fill={text} />
  );
}
