export const POPULAR_TOPICS = [
  "SEO",
  "Digital marketing",
  "Link building",
  "Content marketing",
  "Social media",
  "Blogging",
  "WordPress",
  "Email marketing",
];

export const searchHref = (query: string) =>
  `/search?q=${encodeURIComponent(query.trim())}`;

export function queryTerms(query: string): string[] {
  return [
    ...new Set(
      query
        .replace(/"/g, " ")
        .split(/\s+/)
        .filter((word) => !word.startsWith("-"))
        .map((word) => word.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase())
        .filter((word) => word.length >= 2 && word !== "or"),
    ),
  ];
}
