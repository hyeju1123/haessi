"use client";

import { TagsContext } from "@/provider/TagsProvider";
import { useContext } from "react";

import CrossIcon from "./icons/CrossIcon";

export default function CloseDrawerButton() {
  const { handleDrawer } = useContext(TagsContext);

  return (
    <button onClick={() => handleDrawer(false)} className="self-end">
      <CrossIcon />
    </button>
  );
}
