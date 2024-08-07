"use client";

import { useContext } from "react";

import Link from "next/link";
import ThemeIcon from "./icons/ThemeIcon";
import useColorTheme from "@/hooks/ThemeColor";
import { Roboto_Slab } from "next/font/google";
import { ALL, TagsContext } from "@/provider/TagsProvider";

const roboto = Roboto_Slab({ subsets: ["latin"] });

export default function Header() {
  const { theme, setTheme } = useColorTheme();
  const { handleTag } = useContext(TagsContext);

  return (
    <header className="flex justify-between px-4 py-12">
      <Link href={"/"} onClick={() => handleTag(ALL)}>
        <h1 className={`${roboto.className} text-2xl font-medium text-text`}>
          23haessi
        </h1>
      </Link>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        <ThemeIcon />
      </button>
    </header>
  );
}
