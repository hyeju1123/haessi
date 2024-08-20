"use client";

import useColorTheme from "@/hooks/ThemeColor";
import Cross from "../../../public/images/cross.svg";

export default function CrossIcon() {
  const { text } = useColorTheme();

  return <Cross width="26" height="26" fill={text} />;
}
