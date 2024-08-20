"use client";

import useThemeColor from "@/hooks/ThemeColor";
import Bars from "../../../public/images/bars.svg";

export default function BarsIcon() {
  const { text } = useThemeColor();
  return <Bars className="mx-1" width="24" height="24" fill={text} />;
}
