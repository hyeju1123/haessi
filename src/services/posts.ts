import path from "path";
import { readFile } from "fs/promises";

export type Post = {
  title: string;
  date: Date;
  categories: string[];
  path: string;
};

export type Tag = {
  [index: string]: number;
};

export async function getAllPosts(): Promise<Post[]> {
  const filePath = path.join(process.cwd(), "data", "posts.json");
  return readFile(filePath, "utf-8")
    .then<Post[]>(JSON.parse)
    .then(posts => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
}

export async function getTags(): Promise<Tag> {
  const tags: Tag = { ALL: 0 };
  const posts = await getAllPosts();
  posts.map(({ categories }) => {
    tags["ALL"]++;
    categories.map(category => {
      tags[category] = Object.hasOwn(tags, category) ? tags[category] + 1 : 1;
    });
  });

  return tags;
}
