import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import type { FaqItem } from "@/lib/validation/zod/page-content.schema";

export const pageContent = pgTable("page_content", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title"),
  description: text("description"),
  meta_title: text("meta_title"),
  meta_description: text("meta_description"),
  html: text("html"),
  faqs: jsonb("faqs").$type<FaqItem[]>(),
  related_slugs: jsonb("related_slugs").$type<string[]>(),
  created_at: timestamp("created_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updated_at: timestamp("updated_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
