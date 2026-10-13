import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteSchema } from "@/components/seo/site-schema";
import { categoryPath } from "@/lib/blog-path";
import { getNavCategories } from "@/server/blog";

export default async function WebLayout({ children }: LayoutProps<"/">) {
  const categories = await getNavCategories();
  const blogCategories = categories.map((category) => ({
    label: category.name,
    href: categoryPath(category.slug),
  }));

  return (
    <>
      <SiteSchema />
      <SiteHeader blogCategories={blogCategories} />

      <main id="main" className="w-full">
        {children}
      </main>

      <SiteFooter />
    </>
  );
}
