import "server-only";
import { revalidatePath } from "next/cache";
import { SERVICES, serviceHref } from "@/app/(web)/services/_components/data";
import { categoryPath } from "@/lib/blog-path";

function revalidateCategoryPages() {
  revalidatePath("/(web)/blog/category/[slug]", "page");
  revalidatePath("/(web)/blog/category/[slug]/page/[page]", "page");
  revalidatePath("/(web)", "layout");
}

export function revalidateBlogContent(...slugs: string[]) {
  for (const slug of new Set(slugs)) {
    revalidatePath(`/${slug}`);
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/(web)/blog/page/[page]", "page");
  revalidatePath("/services");
  revalidatePath("/services/digital-marketing");
  for (const service of SERVICES) revalidatePath(serviceHref(service.slug));
  revalidatePath("/sitemap.xml");
  revalidatePath("/feed.xml");
  revalidatePath("/admin/blogs");
  revalidateCategoryPages();
}

export function revalidateAuthorPosts(slugs: string[]) {
  for (const slug of new Set(slugs)) {
    revalidatePath(`/${slug}`);
  }
  revalidatePath("/admin/authors");
}

export function revalidateCategoryContent(
  categorySlugs: string[],
  postSlugs: string[],
) {
  for (const slug of new Set(categorySlugs)) revalidatePath(categoryPath(slug));
  for (const slug of new Set(postSlugs)) revalidatePath(`/${slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/blogs");
  revalidateCategoryPages();
}
