import type { MetadataRoute } from "next";
import { MANAGED_PAGES } from "@/lib/page-content";
import { absoluteUrl } from "@/lib/seo";
import { getPublishedPage, getPublishedSitemapEntries } from "@/server/blog";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, { totalPages }] = await Promise.all([
    getPublishedSitemapEntries(),
    getPublishedPage(1),
  ]);

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: posts[0]?.published_at ?? now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/our-team"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const listingPages: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, totalPages - 1) },
    (_, index) => ({
      url: absoluteUrl(`/blog/page/${index + 2}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    }),
  );

  const managedPages: MetadataRoute.Sitemap = MANAGED_PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.updated_at ?? post.published_at ?? now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...listingPages, ...managedPages, ...postPages];
}
