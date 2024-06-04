"use client";

import { ALL, TagsContext } from "@/provider/TagsProvider";
import { Post } from "@/services/posts";
import { useContext } from "react";
import PostCard from "./PostCard";

type Props = {
  posts: Post[];
};

export default function PostsList({ posts }: Props) {
  const { tag } = useContext(TagsContext);
  const filtered =
    tag === ALL
      ? posts
      : posts.filter(({ categories }) => categories.includes(tag));

  return (
    <ul className="px-4">
      {filtered.map(post => (
        <PostCard key={post.path} post={post} />
      ))}
    </ul>
  );
}
