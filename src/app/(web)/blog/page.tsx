import type { Metadata } from "next";
import { ogImagePath } from "@/server/page-metadata";
import { BlogIndex } from "./_components/blog-index";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on web development, design and the tools we build with.",
  alternates: { canonical: "/blog" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Web Tech Solutions",
    title: "Blog",
    url: "/blog",
    images: [{ url: ogImagePath("Blog"), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    images: [ogImagePath("Blog")],
  },
};

export default function Page() {
  return <BlogIndex page={1} />;
}
