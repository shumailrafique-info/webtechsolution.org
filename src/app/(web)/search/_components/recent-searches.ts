const KEY = "wts-recent-searches";
const LIMIT = 6;

export function readRecentSearches(): string[] {
  try {
    const stored = JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(stored)
      ? stored.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

export function saveRecentSearch(query: string): string[] {
  const term = query.trim();
  if (!term) return readRecentSearches();

  const next = [
    term,
    ...readRecentSearches().filter(
      (item) => item.toLowerCase() !== term.toLowerCase(),
    ),
  ].slice(0, LIMIT);

  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  return next;
}

export function clearRecentSearches() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {}
}
