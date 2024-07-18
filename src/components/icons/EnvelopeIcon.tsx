"use client";

import useThemeColor from "@/hooks/ThemeColor";
import Envelope from "../../../public/images/envelope.svg";

export default function EnvelopeIcon() {
  const { text } = useThemeColor();
  return <Envelope className="mx-2" width="24" height="26" fill={text} />;
}
