import { queryTerms } from "./data";

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * The text with every word that starts with a search term marked, so
 * "market" also lights up "marketing", the way the search itself matched.
 */
export function Highlight({ text, query }: { text: string; query: string }) {
  const terms = queryTerms(query).sort((a, b) => b.length - a.length);
  if (terms.length === 0) return text;

  const pattern = new RegExp(
    `(\\b(?:${terms.map(escapeRegExp).join("|")})[\\p{L}\\p{N}]*)`,
    "giu",
  );
  const parts = text.split(pattern);

  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <mark
        // biome-ignore lint/suspicious/noArrayIndexKey: parts have no identity beyond their position
        key={index}
        className="rounded-[4px] bg-primary/15 px-0.5 text-inherit"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}
