import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteSchema } from "@/components/seo/site-schema";

export default function WebLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteSchema />
      <SiteHeader />

      <main id="main" className="w-full">
        {children}
      </main>

      <SiteFooter />
    </>
  );
}
