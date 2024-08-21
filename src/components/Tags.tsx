import TagButton from "./TagButton";
import { getTags } from "@/services/posts";

export default async function Tags() {
  const tags = await getTags();

  return (
    <nav className="fixed hidden 2xl:block max-w-72 ml-10 mt-36">
      <h2 className="text-xl font-semibold text-text">TAGS</h2>
      <div className="my-4">
        {Object.entries(tags).map(([tag, num]) => (
          <TagButton key={tag} tag={tag} num={num} />
        ))}
      </div>
    </nav>
  );
}
