import type { InferSelectModel } from "drizzle-orm";
import type {
  author,
  blog,
  contactQuery,
  idea,
  pageContent,
  user,
  userRoleEnum,
} from "./schema";

export type UserRoleType = (typeof userRoleEnum.enumValues)[number];
export type UserType = InferSelectModel<typeof user>;
export type BlogType = InferSelectModel<typeof blog>;

export type PageContentType = InferSelectModel<typeof pageContent>;

export type IdeaType = InferSelectModel<typeof idea>;

export type ContactQueryType = InferSelectModel<typeof contactQuery>;

export type AuthorType = InferSelectModel<typeof author>;

export type BlogAuthor = Pick<AuthorType, "id" | "name" | "bio" | "image">;
