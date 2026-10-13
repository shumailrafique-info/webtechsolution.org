import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/layout/mode-toggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ensureAuthorAccess } from "@/lib/auth/guards";
import { AuthorSidebar } from "./_components/author-sidebar";

export const metadata: Metadata = {
  title: "Author dashboard",
  robots: { index: false, follow: false },
};

export default async function AuthorDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const guard = await ensureAuthorAccess();

  if (!guard.session) {
    redirect("/authors/sign-in");
  }

  return (
    <SidebarProvider>
      <AuthorSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="ml-auto">
            <ModeToggle />
          </div>
        </header>
        <div className="grid w-full border-t">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
