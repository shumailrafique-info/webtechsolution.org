import "server-only";
import type { Metadata } from "next";
import { pageMetadata as buildPageMetadata } from "@/lib/metadata";
import { pathForSlug } from "@/lib/page-content";
import { SITE_NAME } from "@/lib/seo";
import { getPageContent } from "./page-content";

export { ogImagePath } from "@/lib/metadata";

export async function pageMetadata(slug: string): Promise<Metadata> {
  const content = await getPageContent(slug);

  const name = content?.meta_title || content?.title;
  const title = name ? `${name} - ${SITE_NAME}` : SITE_NAME;
  const description = content?.meta_description || content?.description || "";

  return buildPageMetadata({
    title,
    description,
    path: pathForSlug(slug),
  });
}
