import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BlogIndex } from "@/app/(web)/blog/_components/blog-index";
import { getPublishedPage } from "@/server/blog";
import { ogImagePath } from "@/server/page-metadata";

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

  const title = `Blog - Page ${page}`;
  const url = `/blog/page/${page}`;

  return {
    title,
    description:
      "Notes on web development, design and the tools we build with.",
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: "Web Tech Solutions",
      title,
      url,
      images: [{ url: ogImagePath("Blog"), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      images: [ogImagePath("Blog")],
    },
  };
}

export default async function Page({ params }: Props) {
  const { page: raw } = await params;
  const page = parsePage(raw);

  if (!page) notFound();
  if (page === 1) redirect("/blog");

  return <BlogIndex page={page} />;
}
