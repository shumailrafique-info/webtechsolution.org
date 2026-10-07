import { relations } from "drizzle-orm";
import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import type { UploadedFile } from "@/components/shared/image-upader";
import { blog } from "./blog-schema";

export const author = pgTable("authors", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  bio: text("bio").notNull().default(""),
  image: jsonb("image").$type<UploadedFile>(),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const authorRelations = relations(author, ({ many }) => ({
  posts: many(blog),
}));
