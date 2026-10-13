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
import type { BlogCategoryRef } from "@/drizzle/types";
import { categoryPath, postPath } from "@/lib/blog-path";
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

export async function BlogIndex({
  page,
  category,
}: {
  page: number;
  category?: BlogCategoryRef;
}) {
  const { posts, total, totalPages } = await getPublishedPage(
    page,
    category?.id,
  );
  const basePath = category ? categoryPath(category.slug) : "/blog";
  const pagePath = category
    ? categoryPath(category.slug, page)
    : page === 1
      ? "/blog"
      : `/blog/page/${page}`;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    ...(category ? [{ name: category.name, path: basePath }] : []),
    ...(page > 1 ? [{ name: `Page ${page}`, path: pagePath }] : []),
  ];

  if (posts.length === 0 && page > 1) notFound();

  const from = (page - 1) * POSTS_PER_PAGE + 1;
  const to = Math.min(page * POSTS_PER_PAGE, total);
  const [featured, ...rest] = posts;

  const schema = graph([
    {
      "@type": "Blog",
      "@id": `${absoluteUrl(basePath)}#blog`,
      name: category ? `${category.name} articles` : "Blog",
      url: absoluteUrl(pagePath),
      isPartOf: webSiteRef,
      publisher: organizationRef,
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        "@id": `${absoluteUrl(postPath(post.slug))}#post`,
        headline: post.title,
        url: absoluteUrl(postPath(post.slug)),
        datePublished: post.published_at?.toISOString(),
      })),
    },
    breadcrumbList(trail),
  ]);

  return (
    <>
      <JsonLd data={schema} />

      <section
        aria-labelledby="blog-title"
        className="bg-white pt-6 pb-10 md:pb-14"
      >
        <Container>
          <Breadcrumbs
            items={trail.map((crumb, index) =>
              index === trail.length - 1
                ? { label: crumb.name }
                : { label: crumb.name, href: crumb.path },
            )}
            className="mb-0"
          />

          <div className="mx-auto mt-10 max-w-3xl text-center md:mt-12">
            <Eyebrow className="enter">
              {category ? "Blog category" : "Blog"}
            </Eyebrow>
            <h1
              id="blog-title"
              className="enter mt-6 font-display text-[42px] leading-none font-bold tracking-[-0.045em] text-balance text-heading sm:text-[56px] lg:text-[64px]"
            >
              {category ? (
                <Accent>{category.name}</Accent>
              ) : (
                <>
                  Insights to help your business get <Accent>found.</Accent>
                </>
              )}
            </h1>
            <p className="enter mx-auto mt-6 max-w-[56ch] text-[17px] leading-[1.65] text-neutral-600 md:text-[18.5px]">
              {category ? (
                <>
                  Every WebTech Solutions article filed under {category.name}{" "}
                  &mdash; guides, reviews and practical advice from our team.
                </>
              ) : (
                <>
                  Guides, tool reviews and insights on SEO, digital marketing,
                  blogging, business and technology &mdash; shared openly,
                  because an informed client is a stronger partner.
                </>
              )}
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
        className="border-t border-neutral-200/70 bg-neutral-50 py-12 md:py-16"
      >
        <Container className="grid gap-12">
          {posts.length === 0 ? (
            <p className="rounded-[20px] border border-dashed border-neutral-300 bg-white p-10 text-center text-[15px] text-neutral-500">
              {category
                ? "No posts in this category yet. Check back soon."
                : "No posts published yet. Check back soon."}
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

          <BlogPagination
            currentPage={page}
            totalPages={totalPages}
            basePath={basePath}
          />
        </Container>
      </section>
    </>
  );
}
