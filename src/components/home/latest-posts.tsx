import { PostCard } from "@/app/(web)/blog/_components/post-card";
import { getPublishedPage } from "@/server/blog";
import {
  Accent,
  Container,
  SecondaryButton,
  SectionHeading,
} from "./primitives";

export async function LatestPosts() {
  const { posts } = await getPublishedPage(1);
  const latest = posts.slice(0, 3);

  if (latest.length === 0) return null;

  return (
    <section
      aria-labelledby="latest-posts-title"
      className="border-t border-neutral-200/70 bg-white py-14 md:py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          id="latest-posts-title"
          eyebrow="From the blog"
          title={
            <>
              Our latest <Accent>insights.</Accent>
            </>
          }
          lede="Expert insights, tips, and trends to grow your business and stay ahead in the digital world."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
          {latest.map((post) => (
            <li key={post.id} className="reveal">
              <PostCard post={post} headingLevel="h3" />
            </li>
          ))}
        </ul>

        <div className="reveal mt-10 flex justify-center">
          <SecondaryButton href="/blog">Read all articles</SecondaryButton>
        </div>
      </Container>
    </section>
  );
}
