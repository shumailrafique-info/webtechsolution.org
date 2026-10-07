import "server-only";
import { revalidatePath } from "next/cache";

export function revalidateBlogContent(...slugs: string[]) {
  for (const slug of new Set(slugs)) revalidatePath(`/blog/${slug}`);

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/(web)/blog/page/[page]", "page");
  revalidatePath("/services");
  revalidatePath("/services/digital-marketing");
  revalidatePath("/(web)/services/[slug]", "page");
  revalidatePath("/sitemap.xml");
  revalidatePath("/feed.xml");
  revalidatePath("/admin/blogs");
}

export function revalidateAuthorPosts(slugs: string[]) {
  for (const slug of new Set(slugs)) revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/authors");
}
