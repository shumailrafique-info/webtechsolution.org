import "server-only";
import type { Metadata } from "next";
import { pageMetadata as buildPageMetadata } from "@/lib/metadata";
import { pathForSlug } from "@/lib/page-content";
import { getPageContent } from "./page-content";

export { ogImagePath } from "@/lib/metadata";

export async function pageMetadata(slug: string): Promise<Metadata> {
  const content = await getPageContent(slug);

  const title = content?.meta_title || content?.title || undefined;
  const description = content?.meta_description || content?.description || "";

  return buildPageMetadata({
    title,
    description,
    path: pathForSlug(slug),
    cardTitle: content?.title ?? title,
  });
}
