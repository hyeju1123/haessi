"use client";

import { TagsContext } from "@/provider/TagsProvider";
import { useContext } from "react";

export default function TagsDrawerWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showDrawer, handleDrawer } = useContext(TagsContext);

  const closeDrawer = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleDrawer(false);
  };

  return (
    <section
      onClick={closeDrawer}
      className={`${
        showDrawer ? "block" : "hidden"
      } bg-background/30 fixed z-10 flex justify-end w-full h-screen`}
    >
      {children}
    </section>
  );
}
