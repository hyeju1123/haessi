"use client";

import { useTheme } from "next-themes";
import { theme as color } from "../../../colors";

import Github from "../../../public/images/github.svg";

export default function GithubIcon() {
  const { theme } = useTheme();
  const { text } = color[theme || "light"];

  return <Github className="mx-2" width="26" height="26" fill={text} />;
}
