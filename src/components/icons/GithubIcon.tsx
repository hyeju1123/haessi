"use client";

import useColorTheme from "@/hooks/ThemeColor";
import Github from "../../../public/images/github.svg";

export default function GithubIcon() {
  const { text } = useColorTheme();

  return <Github className="mx-2" width="26" height="26" fill={text} />;
}
