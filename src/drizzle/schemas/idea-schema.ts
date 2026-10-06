import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { blog } from "./blog-schema";

export const idea = pgTable(
  "ideas",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    message: text("message").notNull(),
    blog_id: uuid("blog_id").references(() => blog.id, {
      onDelete: "set null",
    }),
    blog_title: text("blog_title"),
    blog_slug: text("blog_slug"),
    is_read: boolean("is_read").notNull().default(false),
    created_at: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("ideas_created_at_idx").on(table.created_at.desc()),
    index("ideas_is_read_idx").on(table.is_read),
  ],
);

export const ideaRelations = relations(idea, ({ one }) => ({
  blog: one(blog, {
    fields: [idea.blog_id],
    references: [blog.id],
  }),
}));
