"use client";

import { useTheme } from "next-themes";
import { theme as color } from "../../../colors";

import Envelope from "../../../public/images/envelope.svg";

export default function EnvelopeIcon() {
  const { theme } = useTheme();
  const { text } = color[theme || "light"];

  return <Envelope className="mx-2" width="24" height="26" fill={text} />;
}
