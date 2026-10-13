import { and, eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import BlogForm from "@/app/(admin)/admin/blogs/new/_components/blog-form";
import { db } from "@/drizzle/db";
import { blog } from "@/drizzle/schema";
import { ensureAuthorAccess } from "@/lib/auth/guards";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const guard = await ensureAuthorAccess();
  if (!guard.session) redirect("/authors/sign-in");

  const { id } = await params;
  const post = await db.query.blog.findFirst({
    where: and(eq(blog.id, id), eq(blog.author_id, guard.session.user.id)),
  });

  if (!post) {
    return notFound();
  }

  return <BlogForm blog={post} scope="author" />;
};

export default Page;
