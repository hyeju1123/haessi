"use client";

import { TagsContext } from "@/provider/TagsProvider";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent, useContext } from "react";

type Props = {
  tag: string;
  num?: number;
};

export default function TagButton({ tag, num }: Props) {
  const {
    handleTag,
    handleDrawer,
    showDrawer,
    tag: clickedTag,
  } = useContext(TagsContext);
  const pathname = usePathname();
  const router = useRouter();

  const onTag = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    pathname.startsWith("/posts") && router.push("/");
    handleTag(tag);
    showDrawer && handleDrawer(false);
  };

  return (
    <button
      className={`bg-tagBg hover:bg-hoverTagBg rounded-2xl py-1 px-3 mr-3 my-2 text-xs ${
        clickedTag === tag && num ? "font-semibold" : "font-medium"
      } text-text`}
      onClick={onTag}
    >
      <span>{tag}</span>
      {num && <span className="ml-2">{num}</span>}
    </button>
  );
}
