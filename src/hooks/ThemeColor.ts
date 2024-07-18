"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { theme as color } from "../../colors";

export default function ThemeColor() {
  const { theme, systemTheme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("light");

  const { text, codeBg } = color[currentTheme];

  useEffect(() => {
    if (theme && theme !== "system") setCurrentTheme(theme);
    if (theme === "system" && systemTheme) setCurrentTheme(systemTheme);
  }, [theme, systemTheme]);

  return { theme: currentTheme, setTheme, text, codeBg };
}
