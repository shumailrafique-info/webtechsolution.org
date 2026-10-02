export type ProseHeading = { id: string; text: string; level: 2 | 3 };

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/&[a-z]+;|&#\d+;/g, " ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

const NAMED_ENTITIES: Record<string, string> = {
  nbsp: " ",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  copy: "©",
  reg: "®",
  trade: "™",
};

function decodeEntities(text: string) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_m, hex: string) =>
      String.fromCodePoint(Number.parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_m, dec: string) =>
      String.fromCodePoint(Number(dec)),
    )
    .replace(/&([a-z]+);/gi, (m, name: string) => NAMED_ENTITIES[name] ?? m)
    .replace(/&amp;/g, "&");
}

function stripTags(html: string) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function prepareProseHtml(html: string): {
  html: string;
  headings: ProseHeading[];
} {
  const headings: ProseHeading[] = [];
  const seen = new Map<string, number>();

  let out = html
    .replace(/<div class="tableWrapper">\s*/g, "")
    .replace(/<\/table>\s*<\/div>/g, "</table>")
    .replace(
      /<table\b[\s\S]*?<\/table>/g,
      (table) => `<div class="table-scroll">${table}</div>`,
    );

  out = out.replace(
    /<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/g,
    (_m, level: string, attrs: string | undefined, inner: string) => {
      if (attrs && /\sid="/.test(attrs)) return _m;

      const raw = stripTags(inner);
      const text = decodeEntities(raw).replace(/\s+/g, " ").trim();
      const base = slugifyHeading(raw) || "section";
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      const id = count === 0 ? base : `${base}-${count + 1}`;

      headings.push({ id, text, level: level === "2" ? 2 : 3 });
      return `<h${level}${attrs ?? ""} id="${id}">${inner}</h${level}>`;
    },
  );

  return { html: out, headings };
}
