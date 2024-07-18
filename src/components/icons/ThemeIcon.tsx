"use client";

import useThemeColor from "@/hooks/ThemeColor";
import Sun from "../../../public/images/sun.svg";
import Moon from "../../../public/images/moon.svg";

export default function ThemeIcon() {
  const { text, theme } = useThemeColor();

  return theme === "light" ? (
    <Moon width="28" height="28" fill={text} />
  ) : (
    <Sun width="28" height="28" fill={text} />
  );
}
