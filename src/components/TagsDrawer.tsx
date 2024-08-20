import { getTags } from "@/services/posts";
import TagButton from "./TagButton";

import CloseDrawerButton from "./CloseDrawerButton";

export default async function TagsDrawer() {
  const tags = await getTags();

  return (
    <nav className="bg-background w-80 min-h-screen p-12 flex flex-col shadow-md">
      <CloseDrawerButton />
      <h2 className="text-xl font-semibold text-text my-8">TAGS</h2>
      <ul>
        {Object.entries(tags).map(([tag, num]) => (
          <TagButton key={tag} tag={tag} num={num} />
        ))}
      </ul>
    </nav>
  );
}
