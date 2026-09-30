import type { InferSelectModel } from "drizzle-orm";
import type { blog, pageContent, user, userRoleEnum } from "./schema";

export type UserRoleType = (typeof userRoleEnum.enumValues)[number];
export type UserType = InferSelectModel<typeof user>;
export type BlogType = InferSelectModel<typeof blog>;

export type PageContentType = InferSelectModel<typeof pageContent>;

export type BlogAuthor = Pick<UserType, "id" | "name" | "image">;
