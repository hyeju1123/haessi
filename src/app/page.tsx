import PostsList from "@/components/PostsList";
import { getAllPosts } from "@/services/posts";

export default async function MainPage() {
  const posts = await getAllPosts();
  return <PostsList posts={posts} />;
}
