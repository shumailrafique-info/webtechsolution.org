import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPagination } from "@/components/blog/blog-pagination";
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

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export async function BlogIndex({ page }: { page: number }) {
  const { posts, total, totalPages } = await getPublishedPage(page);

  if (posts.length === 0 && page > 1) notFound();

  const from = (page - 1) * POSTS_PER_PAGE + 1;
  const to = Math.min(page * POSTS_PER_PAGE, total);

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
    <div className="w-full mx-auto pt-0 pb-10">
      <JsonLd data={schema} />
      <div className="w-full bg-[#F4F3EF]">
        <header className="w-full max-w-5xl px-4 mx-auto py-8 md:py-14">
          <h1 className="text-[22px] leading-[1.2] font-semibold tracking-tight text-neutral-900 sm:text-[30px]">
            Blog
          </h1>
          <p className="mt-2.5 max-w-[62ch] text-[15px] leading-relaxed text-neutral-600">
            Notes on web development, design and the tools we build with.
          </p>
          {total > 0 ? (
            <p className="mt-3 text-[13px] text-neutral-600">
              Showing {from}&ndash;{to} of {total} articles
              {totalPages > 1 ? ` · page ${page} of ${totalPages}` : null}
            </p>
          ) : null}
        </header>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 space-y-8">
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
          className="w-full m-0! py-5!"
        />

        {posts.length === 0 ? (
          <p className="border-l-2 border-primary py-1 pl-3 text-[15px] text-muted-foreground">
            No posts published yet. Check back soon.
          </p>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                >
                  {post.cover_image?.url ? (
                    // biome-ignore lint/performance/noImgElement: remote cover served from the media bucket at its stored URL
                    <img
                      src={post.cover_image.url}
                      alt={post.image_alt}
                      loading="lazy"
                      className="aspect-video w-full rounded-lg border border-border object-cover transition-colors group-hover:border-primary"
                    />
                  ) : (
                    <div className="aspect-video w-full rounded-lg border border-dashed border-border bg-muted" />
                  )}

                  <div className="flex flex-1 flex-col">
                    {post.published_at ? (
                      <time
                        dateTime={post.published_at.toISOString()}
                        className="text-[13px] text-muted-foreground"
                      >
                        {dateFormatter.format(post.published_at)}
                      </time>
                    ) : null}

                    <h2 className="mt-1 text-[17px] leading-snug line-clamp-2 font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>

                    <p className="mt-2 line-clamp-3 text-[15px] leading-[1.7] text-muted-foreground">
                      {post.excerpt}
                    </p>

                    <span className="mt-3 text-[13px] font-medium text-primary transition-colors group-hover:text-primary">
                      Read article &rarr;
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <BlogPagination currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  );
}
