import { PostCard } from "@/app/(web)/blog/_components/post-card";
import { Accent, ArrowLink, Container } from "@/components/home/primitives";
import { getPublishedPage } from "@/server/blog";
import { searchPublishedPosts } from "@/server/search";

export async function RelatedPosts({
  topic,
  title = "From the",
  accent = "blog.",
}: {
  topic: string;
  title?: string;
  accent?: string;
}) {
  const [{ hits }, latest] = await Promise.all([
    searchPublishedPosts({ query: topic, limit: 3 }),
    getPublishedPage(1),
  ]);
  const posts = [
    ...hits,
    ...latest.posts.filter((post) => !hits.some((hit) => hit.id === post.id)),
  ].slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section
      aria-labelledby="related-title"
      className="bg-white py-12 md:py-16"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="related-title"
            className="font-display text-[30px] leading-tight font-bold tracking-[-0.035em] text-heading md:text-[38px]"
          >
            {title} <Accent>{accent}</Accent>
          </h2>
          <ArrowLink href={`/search?q=${encodeURIComponent(topic)}`}>
            More on {topic}
          </ArrowLink>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.id}>
              <PostCard post={post} headingLevel="h3" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
