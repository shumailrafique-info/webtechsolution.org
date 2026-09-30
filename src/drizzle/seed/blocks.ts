/**
 * The seed content's building blocks.
 *
 * Every helper here emits the markup the Tiptap editor itself writes, so a
 * seeded post can be opened in the dashboard, edited and saved without the
 * HTML changing shape. Posts live in their own files under `posts/` and
 * import from here; this module imports nothing of theirs, which keeps the
 * two sides free of a cycle.
 */

export type BlogSeed = {
  slug: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  imageAlt: string;
  status: "PUBLISHED" | "DRAFT";
  /** Days before now, used for `published_at` and `created_at`. */
  daysAgo: number;
  /** [ink, paper] for the generated cover. */
  cover: [string, string];
  /** Body HTML, assembled from the block helpers below. */
  html: string;
};

export const MEDIA_BASE =
  "https://emojilibrary-org.s3.eu-north-1.amazonaws.com";
const asset = (name: string) => `${MEDIA_BASE}/webtechsolution/blog/${name}`;

/* ------------------------------------------------------------- helpers */

/** A resizable-image node exactly as the editor serialises one. */
export function image(
  name: string,
  alt: string,
  { width = 900, align = "center" }: { width?: number; align?: string } = {},
) {
  return `<img src="${asset(name)}" alt="${alt}" width="${width}" data-align="${align}" loading="lazy" style="max-width: 100%; height: auto;">`;
}

/** The same, with the caption the editor renders as a <figure>. */
export function figure(
  name: string,
  alt: string,
  caption: string,
  width = 900,
) {
  return `<figure data-align="center" class="resizable-image-figure"><img src="${asset(name)}" alt="${alt}" width="${width}" loading="lazy" style="max-width: 100%; height: auto;"><figcaption class="resizable-image-caption" style="text-align:center;">${caption}</figcaption></figure>`;
}

/**
 * A table, written the way the editor writes one.
 *
 * Column widths are left unset so the table fills the content column - that is
 * the default the CSS now gives every table. Pass `widths` only when a column
 * genuinely needs a fixed size.
 */
export function table(
  head: string[],
  rows: string[][],
  widths?: (number | null)[],
) {
  const colgroup = widths
    ? `<colgroup>${widths
        .map((w) => (w ? `<col style="width: ${w}px">` : "<col>"))
        .join("")}</colgroup>`
    : "";
  const cell = (tag: "th" | "td", value: string) =>
    `<${tag} colspan="1" rowspan="1"><p>${value}</p></${tag}>`;
  const headRow = `<tr>${head.map((h) => cell("th", h)).join("")}</tr>`;
  const bodyRows = rows
    .map((row) => `<tr>${row.map((c) => cell("td", c)).join("")}</tr>`)
    .join("");
  return `<table>${colgroup}<tbody>${headRow}${bodyRows}</tbody></table>`;
}

/** A task list; `true` marks an item done. */
export function taskList(items: [done: boolean, text: string][]) {
  return `<ul data-type="taskList">${items
    .map(
      ([done, text]) =>
        `<li data-checked="${done}" data-type="taskItem"><label><input type="checkbox"${
          done ? ' checked="checked"' : ""
        }><span></span></label><div><p>${text}</p></div></li>`,
    )
    .join("")}</ul>`;
}

export const ul = (items: string[]) =>
  `<ul>${items.map((i) => `<li><p>${i}</p></li>`).join("")}</ul>`;

export const ol = (items: string[]) =>
  `<ol>${items.map((i) => `<li><p>${i}</p></li>`).join("")}</ol>`;

export const quote = (text: string) =>
  `<blockquote><p>${text}</p></blockquote>`;

export const code = (source: string) =>
  `<pre><code>${source
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")}</code></pre>`;

export const youtube = (id: string) =>
  `<div data-youtube-video><iframe width="640" height="360" allowfullscreen="true" autoplay="false" disablekbcontrols="false" enableiframeapi="false" endtime="0" ivloadpolicy="0" loop="false" modestbranding="false" origin="" playlist="" src="https://www.youtube-nocookie.com/embed/${id}" start="0"></iframe></div>`;

export const link = (href: string, text: string) =>
  `<a target="_blank" rel="noopener noreferrer" href="${href}">${text}</a>`;
