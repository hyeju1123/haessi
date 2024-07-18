"use client";

import useThemeColor from "@/hooks/ThemeColor";
import Copyright from "../../../public/images/copyright.svg";

export default function CopyrightIcon() {
  const { text } = useThemeColor();
  return <Copyright className="mx-1" width="12" height="12" fill={text} />;
}
