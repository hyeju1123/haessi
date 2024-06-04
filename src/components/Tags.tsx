import { getTags } from "@/services/posts";
import TagButton from "./TagButton";

export default async function Tags() {
  const tags = await getTags();

  return (
    <>
      <h2 className="text-xl font-semibold text-text">TAGS</h2>
      <ul className="my-4">
        {Object.entries(tags).map(([tag, num]) => (
          <TagButton key={tag} tag={tag} num={num} />
        ))}
      </ul>
    </>
  );
}
