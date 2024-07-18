import PostContent from "@/components/PostContent";
import { getPostData } from "@/services/posts";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params: { slug } }: Props) {
  const { title, description } = await getPostData(slug);
  return { title, openGraph: { title, description } };
}

export default async function PostPage({ params: { slug } }: Props) {
  const post = await getPostData(slug);
  return (
    <article className="px-4 pb-8">
      <PostContent post={post} />
    </article>
  );
}
