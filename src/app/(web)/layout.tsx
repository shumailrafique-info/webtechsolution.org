import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function WebLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />

      <main id="main" className="w-full">
        {children}
      </main>

      <SiteFooter />
    </>
  );
}
