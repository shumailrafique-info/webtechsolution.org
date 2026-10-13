import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BlogIndex } from "@/app/(web)/blog/_components/blog-index";
import { categoryPath } from "@/lib/blog-path";
import { pageMetadata } from "@/lib/metadata";
import {
  getCategoryBySlug,
  getNavCategories,
  POSTS_PER_PAGE,
} from "@/server/blog";

type Props = { params: Promise<{ slug: string; page: string }> };

function parsePage(value: string) {
  if (!/^[1-9][0-9]*$/.test(value)) return null;
  return Number(value);
}

export async function generateStaticParams() {
  const categories = await getNavCategories();
  return categories.flatMap((category) => {
    const totalPages = Math.ceil(category.posts / POSTS_PER_PAGE);
    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
      slug: category.slug,
      page: String(i + 2),
    }));
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, page: raw } = await params;
  const page = parsePage(raw);
  const category = await getCategoryBySlug(slug);
  if (!page || !category) return { robots: { index: false, follow: false } };

  return pageMetadata({
    title: `${category.name} Articles - WebTech Solutions Blog - Page ${page}`,
    description: `Read WebTech Solutions articles on ${category.name}: guides, reviews and practical advice from our team.`,
    path: categoryPath(category.slug, page),
  });
}

export default async function Page({ params }: Props) {
  const { slug, page: raw } = await params;
  const page = parsePage(raw);
  const category = await getCategoryBySlug(slug);

  if (!page || !category) notFound();
  if (page === 1) redirect(categoryPath(category.slug));

  return <BlogIndex page={page} category={category} />;
}
