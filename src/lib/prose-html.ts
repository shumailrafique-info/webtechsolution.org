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

function stripTags(html: string) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
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

      const text = stripTags(inner);
      const base = slugifyHeading(text) || "section";
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      const id = count === 0 ? base : `${base}-${count + 1}`;

      headings.push({ id, text, level: level === "2" ? 2 : 3 });
      return `<h${level}${attrs ?? ""} id="${id}">${inner}</h${level}>`;
    },
  );

  return { html: out, headings };
}
