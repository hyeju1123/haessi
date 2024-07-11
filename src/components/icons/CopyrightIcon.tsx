"use client";

import { useTheme } from "next-themes";
import { theme as color } from "../../../colors";

import Copyright from "../../../public/images/copyright.svg";

export default function CopyrightIcon() {
  const { theme } = useTheme();
  const { text } = color[theme || "light"];

  return <Copyright className="mx-1" width="12" height="12" fill={text} />;
}
