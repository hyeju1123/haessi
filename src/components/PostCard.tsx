import { Post } from "@/services/posts";
import Link from "next/link";
import TagButton from "./TagButton";

type Props = {
  post: Post;
};
export default function PostCard({
  post: { title, date, categories, path },
}: Props) {
  return (
    <Link href={`/posts/${path}`}>
      <article className="mb-10">
        <time className="text-xs font-medium text-text">{date.toString()}</time>
        <h1 className="text-xl font-semibold text-text my-2">{title}</h1>
        {categories.map(tag => (
          <TagButton key={tag} tag={tag} />
        ))}
      </article>
    </Link>
  );
}
