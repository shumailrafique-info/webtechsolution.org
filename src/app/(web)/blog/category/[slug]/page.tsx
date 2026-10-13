import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/app/(web)/blog/_components/blog-index";
import { categoryPath } from "@/lib/blog-path";
import { pageMetadata } from "@/lib/metadata";
import { getCategoryBySlug, getNavCategories } from "@/server/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const categories = await getNavCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { robots: { index: false, follow: false } };

  return pageMetadata({
    title: `${category.name} Articles - WebTech Solutions Blog`,
    description: `Read WebTech Solutions articles on ${category.name}: guides, reviews and practical advice from our team.`,
    path: categoryPath(category.slug),
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) notFound();

  return <BlogIndex page={1} category={category} />;
}
