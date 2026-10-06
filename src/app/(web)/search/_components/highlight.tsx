import { queryTerms } from "./data";

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

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
