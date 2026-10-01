import { notFound } from "next/navigation";
import {
  Accent,
  Container,
  Eyebrow,
  TrustChip,
} from "@/components/home/primitives";
import { BookOpenIcon, CalendarIcon, FileTextIcon } from "@/components/icons";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import {
  absoluteUrl,
  breadcrumbList,
  graph,
  organizationRef,
  webSiteRef,
} from "@/lib/seo";
import { getPublishedPage, POSTS_PER_PAGE } from "@/server/blog";
import { BlogPagination } from "./blog-pagination";
import { FeaturedPostCard, PostCard } from "./post-card";

export async function BlogIndex({ page }: { page: number }) {
  const { posts, total, totalPages } = await getPublishedPage(page);

  if (posts.length === 0 && page > 1) notFound();

  const from = (page - 1) * POSTS_PER_PAGE + 1;
  const to = Math.min(page * POSTS_PER_PAGE, total);
  const [featured, ...rest] = posts;

  const schema = graph([
    {
      "@type": "Blog",
      "@id": `${absoluteUrl("/blog")}#blog`,
      name: "Blog",
      url: absoluteUrl(page === 1 ? "/blog" : `/blog/page/${page}`),
      isPartOf: webSiteRef,
      publisher: organizationRef,
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        "@id": `${absoluteUrl(`/blog/${post.slug}`)}#post`,
        headline: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
        datePublished: post.published_at?.toISOString(),
      })),
    },
    breadcrumbList(
      page === 1
        ? [
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]
        : [
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: `Page ${page}`, path: `/blog/page/${page}` },
          ],
    ),
  ]);

  return (
    <>
      <JsonLd data={schema} />

      <section
        aria-labelledby="blog-title"
        className="bg-white pt-6 pb-14 md:pb-16"
      >
        <Container>
          <Breadcrumbs
            items={
              page === 1
                ? [{ label: "Home", href: "/" }, { label: "Blog" }]
                : [
                    { label: "Home", href: "/" },
                    { label: "Blog", href: "/blog" },
                    { label: `Page ${page}` },
                  ]
            }
            className="mb-0"
          />

          <div className="mx-auto mt-10 max-w-3xl text-center md:mt-14">
            <Eyebrow className="enter">Blog</Eyebrow>
            <h1
              id="blog-title"
              className="enter mt-6 font-display text-[42px] leading-none font-bold tracking-[-0.045em] text-balance text-heading sm:text-[56px] lg:text-[64px]"
            >
              Insights to help your business get <Accent>found.</Accent>
            </h1>
            <p className="enter mx-auto mt-6 max-w-[56ch] text-[17px] leading-[1.65] text-neutral-600 md:text-[18.5px]">
              Guides, tool reviews and insights on SEO, digital marketing,
              blogging, business and technology &mdash; shared openly, because
              an informed client is a stronger partner.
            </p>
            {total > 0 ? (
              <ul className="enter mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
                <TrustChip icon={BookOpenIcon}>{total} articles</TrustChip>
                <TrustChip icon={FileTextIcon}>
                  Showing {from}&ndash;{to}
                </TrustChip>
                {totalPages > 1 ? (
                  <TrustChip icon={CalendarIcon}>
                    Page {page} of {totalPages}
                  </TrustChip>
                ) : null}
              </ul>
            ) : null}
          </div>
        </Container>
      </section>

      <section
        aria-label="Articles"
        className="border-t border-neutral-200/70 bg-neutral-50 py-14 md:py-20"
      >
        <Container className="grid gap-12">
          {posts.length === 0 ? (
            <p className="rounded-[20px] border border-dashed border-neutral-300 bg-white p-10 text-center text-[15px] text-neutral-500">
              No posts published yet. Check back soon.
            </p>
          ) : (
            <>
              {featured ? (
                <FeaturedPostCard
                  post={featured}
                  label={page === 1 ? "Latest article" : undefined}
                />
              ) : null}
              {rest.length > 0 ? (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <li key={post.id}>
                      <PostCard post={post} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </>
          )}

          <BlogPagination currentPage={page} totalPages={totalPages} />
        </Container>
      </section>
    </>
  );
}
