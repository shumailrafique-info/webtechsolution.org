import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/drizzle/db";
import { author } from "@/drizzle/schema";
import AuthorForm from "../../new/_components/author-form";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const authorR = await db.query.author.findFirst({
    where: eq(author.id, id),
  });
  if (!authorR) {
    return notFound();
  }
  return <AuthorForm author={authorR} />;
};

export default Page;
