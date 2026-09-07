import Tag from "./Tag";
import "./Tag.css";

/**
 * A collection of [`Tag`]{@link Tag}s
 * @example ["giant", "glowing", "this-could-be-a-tag"]
 */
export default function Tags({
  tags,
  clickable = true,
}: {
  /** The tags to display */
  tags: string[];
  /** Whether links should be clickable to go to a /tag/TAG_NAME page. */
  clickable?: boolean;
}) {
  return (
    <div className="tags">
      {tags.map((tag) => (
        <Tag tag={tag} key={tag} clickable={clickable} />
      ))}
    </div>
  );
}
