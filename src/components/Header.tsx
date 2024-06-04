"use client";

import { Roboto_Slab } from "next/font/google";
import Link from "next/link";
import Moon from "../../public/images/moon.svg";
import { theme } from "../../colors";
import { useContext } from "react";
import { ALL, TagsContext } from "@/provider/TagsProvider";

const roboto = Roboto_Slab({ subsets: ["latin"] });
const {
  light: { text },
} = theme;

export default function Header() {
  const { handleTag } = useContext(TagsContext);
  return (
    <header className="flex justify-between px-4 py-12">
      <Link href={"/"} onClick={() => handleTag(ALL)}>
        <h1 className={`${roboto.className} text-2xl font-medium text-text`}>
          23haessi
        </h1>
      </Link>
      <Moon width="28" height="28" fill={text} />
    </header>
  );
}
