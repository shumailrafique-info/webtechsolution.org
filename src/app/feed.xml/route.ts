import { absoluteUrl, SITE_NAME, SITE_TAGLINE } from "@/lib/seo";
import { getPublishedPage } from "@/server/blog";

export const revalidate = 3600;

const xmlEscape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function GET() {
  const { posts } = await getPublishedPage(1);
  const blogUrl = absoluteUrl("/blog");

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      return [
        "<item>",
        `<title>${xmlEscape(post.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        `<description>${xmlEscape(post.excerpt)}</description>`,
        post.published_at
          ? `<pubDate>${post.published_at.toUTCString()}</pubDate>`
          : "",
        post.cover_image?.url
          ? `<enclosure url="${xmlEscape(post.cover_image.url)}" type="image/webp" length="0" />`
          : "",
        "</item>",
      ].join("");
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${xmlEscape(`${SITE_NAME} Blog`)}</title>
<link>${blogUrl}</link>
<description>${xmlEscape(SITE_TAGLINE)}</description>
<language>en</language>
<atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
${posts[0]?.published_at ? `<lastBuildDate>${posts[0].published_at.toUTCString()}</lastBuildDate>` : ""}
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
