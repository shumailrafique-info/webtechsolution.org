import { z } from "zod";
import { PAGES } from "@/lib/navigation";

export const MAX_FAQS = 20;
export const MAX_RELATED = 8;

export const faqItemSchema = z.object({
  question: z.string().trim().min(1, "Question is required").max(200),
  answer: z.string().trim().min(1, "Answer is required").max(1000),
});

export const faqsSchema = z.array(faqItemSchema).max(MAX_FAQS);

export const relatedSlugsSchema = z
  .array(z.enum(PAGES.map((page) => page.slug) as [string, ...string[]]))
  .max(MAX_RELATED)
  .refine(
    (slugs) => new Set(slugs).size === slugs.length,
    "The same page cannot be listed twice",
  );

export const pageContentSchema = z.object({
  slug: z.string().min(1, "Page is required"),
  title: z.string().optional(),
  description: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  html: z.string().optional(),
  faqs: faqsSchema.optional(),
  related_slugs: relatedSlugsSchema.optional(),
});

export type FaqItem = z.infer<typeof faqItemSchema>;
export type PageContentSchemaValues = z.infer<typeof pageContentSchema>;
