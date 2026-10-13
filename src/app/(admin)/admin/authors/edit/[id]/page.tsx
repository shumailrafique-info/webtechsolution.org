import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/drizzle/db";
import { user } from "@/drizzle/schema";
import AuthorForm from "../../new/_components/author-form";
import ResetPasswordForm from "./_components/reset-password-form";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const [author] = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      avatar: user.avatar,
    })
    .from(user)
    .where(and(eq(user.id, id), eq(user.role, "author")))
    .limit(1);

  if (!author) {
    return notFound();
  }

  return (
    <>
      <AuthorForm author={author} />
      <ResetPasswordForm authorId={author.id} />
    </>
  );
};

export default Page;
