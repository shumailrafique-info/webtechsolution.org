import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BlogIndex } from "@/app/(web)/blog/_components/blog-index";
import { pageMetadata } from "@/lib/metadata";
import { getPublishedPage } from "@/server/blog";

type Props = { params: Promise<{ page: string }> };

function parsePage(value: string) {
  if (!/^[1-9][0-9]*$/.test(value)) return null;
  return Number(value);
}

export async function generateStaticParams() {
  const { totalPages } = await getPublishedPage(1);
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page: raw } = await params;
  const page = parsePage(raw);
  if (!page) return { robots: { index: false, follow: false } };

  return pageMetadata({
    title: `WebTech Solutions: SEO & Digital Marketing Blog - Page ${page}`,
    description:
      "The latest SEO, web development and digital marketing insights from WebTech Solutions. Stay updated with our experts’ opinions and advice.",
    path: `/blog/page/${page}`,
  });
}

export default async function Page({ params }: Props) {
  const { page: raw } = await params;
  const page = parsePage(raw);

  if (!page) notFound();
  if (page === 1) redirect("/blog");

  return <BlogIndex page={page} />;
}
