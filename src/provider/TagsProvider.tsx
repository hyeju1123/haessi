"use client";

import { ReactNode, createContext, useState } from "react";

type Props = {
  children: ReactNode;
};

type TagsValue = {
  tag: string;
  handleTag: (choosedTag: string) => void;
};

export const ALL = "ALL";
export const TagsContext = createContext<TagsValue>({
  tag: ALL,
  handleTag: () => {},
});

export default function TagsProvider({ children }: Props) {
  const [tag, setTag] = useState<string>(ALL);

  const handleTag = (choosedTag: string) => {
    setTag(choosedTag);
  };

  return (
    <TagsContext.Provider value={{ handleTag, tag }}>
      {children}
    </TagsContext.Provider>
  );
}
