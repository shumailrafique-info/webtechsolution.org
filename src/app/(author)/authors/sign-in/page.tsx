import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ensureAuthorAccess } from "@/lib/auth/guards";
import AuthorSignInForm from "./_components/author-sign-in-form";

export const metadata: Metadata = {
  title: "Author sign in",
  robots: { index: false, follow: false },
};

const Page = async () => {
  const guard = await ensureAuthorAccess();
  if (guard.session) redirect("/authors");

  return <AuthorSignInForm />;
};

export default Page;
