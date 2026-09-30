import type { PageContentType } from "@/drizzle/types";
import {
  type FaqItem,
  faqsSchema,
  relatedSlugsSchema,
} from "@/lib/validation/zod/page-content.schema";
import { PAGES } from "./navigation";

export type ManagedPageKind = "static";

export type ManagedPage = {
  slug: string;
  name: string;
  path: string;
  kind: ManagedPageKind;
  requiresContent?: boolean;
};

export const MANAGED_PAGES: readonly ManagedPage[] = PAGES.map((page) => ({
  ...page,
  kind: "static",
  requiresContent: true,
}));

export function isManagedSlug(slug: string) {
  return MANAGED_PAGES.some((page) => page.slug === slug);
}

export function managedPage(slug: string) {
  return MANAGED_PAGES.find((page) => page.slug === slug);
}

export function pathForSlug(slug: string) {
  return managedPage(slug)?.path ?? `/${slug}`;
}

export function faqHeading(slug: string) {
  const page = managedPage(slug);
  return page ? `FAQs - ${page.name}` : "Frequently Asked Questions";
}

export function parseFaqs(value: unknown): FaqItem[] {
  const parsed = faqsSchema.safeParse(value ?? []);
  return parsed.success ? parsed.data : [];
}

export function parseRelatedSlugs(value: unknown): string[] {
  const parsed = relatedSlugsSchema.safeParse(value ?? []);
  return parsed.success ? parsed.data : [];
}

export function hasPageContent(content: PageContentType | null | undefined) {
  return Boolean(content?.title || content?.description || content?.html);
}

export function normalizeHtml(html: string | null | undefined) {
  if (!html) return null;

  const stripped = html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

  const hasEmbeddedMedia = /<(img|iframe|hr)\b/i.test(html);

  return stripped.length > 0 || hasEmbeddedMedia ? html : null;
}

export function normalizeText(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}
