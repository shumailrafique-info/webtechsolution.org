import { type HTMLElement, type Node, NodeType, parse } from "node-html-parser";

/**
 * Converts WordPress (Gutenberg) post HTML into the subset the Tiptap editor
 * understands, so an imported post renders correctly and survives being
 * opened in the dashboard and saved again.
 *
 * The rules are deliberately conservative: anything recognised is rewritten
 * into the editor's own markup, anything unknown is unwrapped so its text
 * survives, and only presentation is discarded. Nothing is dropped outright
 * except scripts, styles and empty paragraphs.
 */

/** Block elements the editor's schema has a node for. */
const BLOCK = new Set([
  "p",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "blockquote",
  "pre",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "hr",
]);

/** Inline marks the editor supports. Others are unwrapped to their text. */
const INLINE: Record<string, string> = {
  a: "a",
  strong: "strong",
  b: "strong",
  em: "em",
  i: "em",
  u: "u",
  s: "s",
  del: "s",
  strike: "s",
  code: "code",
  mark: "mark",
  sub: "sub",
  sup: "sup",
  br: "br",
};

const DROP = new Set(["script", "style", "noscript", "svg", "form", "button"]);

const VOID = new Set(["br", "hr", "img"]);

const escapeAttr = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

function classesOf(el: HTMLElement) {
  return (el.getAttribute("class") ?? "").split(/\s+/).filter(Boolean);
}

const hasClassStarting = (el: HTMLElement, prefix: string) =>
  classesOf(el).some((c) => c.startsWith(prefix));

/** WordPress alignment classes map onto the image node's own attribute. */
function alignOf(el: HTMLElement): "left" | "center" | "right" {
  const classes = classesOf(el).join(" ");
  if (classes.includes("alignright")) return "right";
  if (classes.includes("alignleft")) return "left";
  return "center";
}

/** The editor's image node, written exactly as it serialises one. */
function imageHtml(
  img: HTMLElement,
  align: "left" | "center" | "right",
  caption?: string,
) {
  const src = img.getAttribute("src");
  if (!src) return "";

  const alt = img.getAttribute("alt") ?? "";
  const width = img.getAttribute("width");
  const parts = [
    `src="${escapeAttr(src)}"`,
    `alt="${escapeAttr(alt)}"`,
    width ? `width="${escapeAttr(width)}"` : "",
    caption ? "" : `data-align="${align}"`,
    'loading="lazy"',
    'style="max-width: 100%; height: auto;"',
  ].filter(Boolean);
  const tag = `<img ${parts.join(" ")}>`;

  if (!caption) return tag;
  return `<figure data-align="${align}" class="resizable-image-figure">${tag}<figcaption class="resizable-image-caption" style="text-align:center;">${caption}</figcaption></figure>`;
}

/** YouTube ids, from any of the URL shapes WordPress embeds use. */
export function youtubeId(url: string) {
  const match = url.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=|v\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/,
  );
  return match?.[1] ?? null;
}

const youtubeHtml = (id: string) =>
  `<div data-youtube-video><iframe width="640" height="360" allowfullscreen="true" autoplay="false" disablekbcontrols="false" enableiframeapi="false" endtime="0" ivloadpolicy="0" loop="false" modestbranding="false" origin="" playlist="" src="https://www.youtube-nocookie.com/embed/${id}" start="0"></iframe></div>`;

function attrsFor(tag: string, el: HTMLElement) {
  const keep: string[] = [];
  if (tag === "a") {
    const href = el.getAttribute("href");
    if (!href) return "";
    keep.push(`href="${escapeAttr(href)}"`);
    if (el.getAttribute("target")) keep.push('target="_blank"');
    // Links keep the editor's default relationship, which is dofollow.
    keep.push('rel="noopener noreferrer"');
  }
  if (tag === "th" || tag === "td") {
    for (const name of ["colspan", "rowspan"]) {
      const value = el.getAttribute(name);
      if (value && value !== "1") keep.push(`${name}="${escapeAttr(value)}"`);
    }
  }
  return keep.length > 0 ? ` ${keep.join(" ")}` : "";
}

function children(node: HTMLElement): string {
  return node.childNodes.map(serialize).join("");
}

function serialize(node: Node): string {
  if (node.nodeType === NodeType.TEXT_NODE) return node.rawText;
  if (node.nodeType !== NodeType.ELEMENT_NODE) return "";

  const el = node as HTMLElement;
  const tag = el.rawTagName?.toLowerCase();
  if (!tag || DROP.has(tag)) return "";

  /* ---------------------------------------------------- plugin wrappers */

  // AffiliateX "verdict": a heading and a paragraph inside four nested divs.
  if (hasClassStarting(el, "wp-block-affiliatex")) {
    const title = el.querySelector(".verdict-title");
    const body = el.querySelector(".verdict-content");
    const heading = title ? `<h2>${children(title as HTMLElement)}</h2>` : "";
    const text = body ? children(body as HTMLElement).trim() : "";
    return heading + (text ? `<p>${text}</p>` : "");
  }

  // Ultimate Blocks accordion: a question and its answer. The editor has no
  // accordion, so it becomes a heading followed by the answer's content -
  // which is how these read anyway.
  if (hasClassStarting(el, "wp-block-ub-content-toggle-accordion")) {
    const title = el.querySelector(
      ".wp-block-ub-content-toggle-accordion-title",
    );
    const content = el.querySelector(
      ".wp-block-ub-content-toggle-accordion-content-wrap",
    );
    const heading = title
      ? `<h3>${(title as HTMLElement).textContent.trim()}</h3>`
      : "";
    return heading + (content ? children(content as HTMLElement) : "");
  }

  // Button blocks: keep the link, drop the styling.
  if (
    hasClassStarting(el, "ub-button") ||
    hasClassStarting(el, "wp-block-button")
  ) {
    const anchor = el.querySelector("a");
    if (anchor) {
      const inner = children(anchor as HTMLElement).trim();
      const href = (anchor as HTMLElement).getAttribute("href");
      return href && inner
        ? `<p><a href="${escapeAttr(href)}" target="_blank" rel="noopener noreferrer">${inner}</a></p>`
        : "";
    }
    return children(el);
  }

  /* ------------------------------------------------------------- media */

  if (tag === "figure") {
    const img = el.querySelector("img");
    if (img) {
      const caption = el.querySelector("figcaption");
      const text = caption ? children(caption as HTMLElement).trim() : "";
      return imageHtml(img as HTMLElement, alignOf(el), text || undefined);
    }
    const iframe = el.querySelector("iframe");
    if (iframe) return serialize(iframe);
    // An embed with only a link (WordPress renders some that way).
    return children(el);
  }

  if (tag === "img") return imageHtml(el, alignOf(el));

  if (tag === "iframe") {
    const src = el.getAttribute("src") ?? "";
    const id = youtubeId(src);
    return id ? youtubeHtml(id) : "";
  }

  /* ------------------------------------------------------------ blocks */

  // A single <h1> in the body would compete with the page's own title.
  if (tag === "h1") return `<h2>${children(el)}</h2>`;

  if (BLOCK.has(tag)) {
    if (VOID.has(tag)) return `<${tag}>`;
    return `<${tag}${attrsFor(tag, el)}>${children(el)}</${tag}>`;
  }

  const inline = INLINE[tag];
  if (inline) {
    if (inline === "br") return "<br>";
    const inner = children(el);
    if (!inner.trim()) return "";
    const attrs = attrsFor(inline, el);
    if (inline === "a" && !attrs) return inner;
    return `<${inline}${attrs}>${inner}</${inline}>`;
  }

  // Anything else (div, span, section, aside …) is a wrapper: keep what is
  // inside it and discard the box.
  return children(el);
}

/** Paragraphs that hold nothing but whitespace add blank gaps; drop them. */
function tidy(html: string) {
  return (
    html
      .replace(/<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/g, "")
      .replace(/<(h[2-6])>(?:\s|&nbsp;)*<\/\1>/g, "")
      .replace(/<li>(?:\s|&nbsp;)*<\/li>/g, "")
      // Collapse runs of whitespace but keep a single space between blocks:
      // removing it entirely would run the last word of one block into the
      // first of the next for anything reading the text rather than rendering
      // it, such as excerpts and search indexing.
      .replace(/\s+/g, " ")
      .trim()
  );
}

export function convertWpHtml(html: string) {
  const root = parse(html, {
    blockTextElements: { script: false, noscript: false, style: false },
  });
  return tidy(children(root));
}

/** Plain text from a rendered HTML fragment, for excerpts and meta fields. */
export function htmlToText(html: string) {
  return parse(html)
    .textContent.replace(/\s+/g, " ")
    .replace(/&nbsp;/g, " ")
    .trim();
}
