"use client";

import { ReactNode, createContext, useState } from "react";

type Props = {
  children: ReactNode;
};

type TagsValue = {
  tag: string;
  handleTag: (choosedTag: string) => void;
  showDrawer: boolean;
  handleDrawer: (toggle: boolean) => void;
};

export const ALL = "ALL";
export const TagsContext = createContext<TagsValue>({
  tag: ALL,
  handleTag: () => {},
  showDrawer: false,
  handleDrawer: () => {},
});

export default function TagsProvider({ children }: Props) {
  const [tag, setTag] = useState<string>(ALL);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const handleTag = (choosedTag: string) => {
    setTag(choosedTag);
  };

  const handleDrawer = (toggle: boolean) => {
    setShowDrawer(toggle);
  };

  return (
    <TagsContext.Provider value={{ handleTag, tag, showDrawer, handleDrawer }}>
      {children}
    </TagsContext.Provider>
  );
}
