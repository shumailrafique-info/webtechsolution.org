import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/drizzle/db";
import { blogCategory } from "@/drizzle/schema";
import CategoryForm from "../../new/_components/category-form";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const category = await db.query.blogCategory.findFirst({
    where: eq(blogCategory.id, id),
  });
  if (!category) {
    return notFound();
  }
  return <CategoryForm category={category} />;
};

export default Page;
