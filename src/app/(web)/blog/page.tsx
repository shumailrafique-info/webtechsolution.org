import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { BlogIndex } from "./_components/blog-index";

export const metadata: Metadata = pageMetadata({
  title: "WebTech Solutions: SEO & Digital Marketing Blog",
  description:
    "The latest SEO, web development and digital marketing insights from WebTech Solutions. Stay updated with our experts’ opinions and advice.",
  path: "/blog",
});

export default function Page() {
  return <BlogIndex page={1} />;
}
