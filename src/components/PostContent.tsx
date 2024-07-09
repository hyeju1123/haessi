import TagButton from "./TagButton";
import MarkdownViewer from "./MarkdownViewer";
import { PostData } from "@/services/posts";

type Props = {
  post: PostData;
};

export default function PostContent({ post }: Props) {
  const { title, date, categories, content } = post;
  return (
    <section>
      <h1 className="text-2xl font-semibold text-text mb-2">{title}</h1>
      <time className="text-sm font-medium text-text ml-1">
        {date.toString()}
      </time>
      <div className="mt-1">
        {categories.map(category => (
          <TagButton key={category} tag={category} />
        ))}
      </div>
      <MarkdownViewer content={content} />
    </section>
  );
}
