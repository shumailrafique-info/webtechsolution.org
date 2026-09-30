import "server-only";
import { count, desc, sql } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { blog, idea, pageContent, user } from "@/drizzle/schema";
import { MANAGED_PAGES, parseFaqs } from "@/lib/page-content";

export type AdminStats = {
  blogs: { total: number; published: number; drafts: number };
  pages: { managed: number; configured: number; empty: string[] };
  faqs: { total: number; pagesWithFaqs: number; pagesWithRelated: number };
  users: { total: number; admins: number };
  ideas: { total: number; unread: number };
  recentPosts: {
    id: string;
    title: string;
    slug: string;
    status: "DRAFT" | "PUBLISHED";
    updated_at: Date;
  }[];
};

export async function getAdminStats(): Promise<AdminStats> {
  const [blogCounts, userCounts, pageRows, recentPosts, ideaCounts] =
    await Promise.all([
      db
        .select({
          total: count(),
          published: sql<number>`count(*) filter (where ${blog.status} = 'PUBLISHED')::int`,
        })
        .from(blog),

      db
        .select({
          total: count(),
          admins: sql<number>`count(*) filter (where ${user.role} = 'admin')::int`,
        })
        .from(user),

      db
        .select({
          slug: pageContent.slug,
          faqs: pageContent.faqs,
          related: pageContent.related_slugs,
        })
        .from(pageContent),

      db
        .select({
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
          status: blog.status,
          updated_at: blog.updated_at,
        })
        .from(blog)
        .orderBy(desc(blog.updated_at))
        .limit(5),

      db
        .select({
          total: count(),
          unread: sql<number>`count(*) filter (where ${idea.is_read} = false)::int`,
        })
        .from(idea),
    ]);

  const blogTotal = blogCounts[0]?.total ?? 0;
  const blogPublished = Number(blogCounts[0]?.published ?? 0);

  const configuredSlugs = new Set(pageRows.map((row) => row.slug));
  const empty = MANAGED_PAGES.filter(
    (page) => !configuredSlugs.has(page.slug),
  ).map((page) => page.name);

  let faqTotal = 0;
  let pagesWithFaqs = 0;
  let pagesWithRelated = 0;

  for (const row of pageRows) {
    const faqs = parseFaqs(row.faqs);
    if (faqs.length > 0) {
      faqTotal += faqs.length;
      pagesWithFaqs++;
    }
    if (Array.isArray(row.related) && row.related.length > 0) {
      pagesWithRelated++;
    }
  }

  return {
    blogs: {
      total: blogTotal,
      published: blogPublished,
      drafts: blogTotal - blogPublished,
    },
    pages: {
      managed: MANAGED_PAGES.length,
      configured: configuredSlugs.size,
      empty,
    },
    faqs: { total: faqTotal, pagesWithFaqs, pagesWithRelated },
    ideas: {
      total: ideaCounts[0]?.total ?? 0,
      unread: Number(ideaCounts[0]?.unread ?? 0),
    },
    users: {
      total: userCounts[0]?.total ?? 0,
      admins: Number(userCounts[0]?.admins ?? 0),
    },
    recentPosts,
  };
}
