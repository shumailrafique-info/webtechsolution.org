import { notFound, permanentRedirect } from "next/navigation";
import { getPublishedPost } from "@/server/blog";

export default async function LegacyPostRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  permanentRedirect(`/blog/${post.slug}`);
}
