import { and, desc, eq, ne } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IdeaBox } from "@/components/blog/idea-box";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { db } from "@/drizzle/db";
import { blog } from "@/drizzle/schema";
import { BLOG_PROSE } from "@/lib/blogProse";
import { prepareProseHtml } from "@/lib/prose-html";
import {
  absoluteUrl,
  breadcrumbList,
  graph,
  organizationRef,
  webSiteRef,
} from "@/lib/seo";
import { getPublishedPost } from "@/server/blog";
import { ogImagePath } from "@/server/page-metadata";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    return { robots: { index: false, follow: false } };
  }

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt;
  const url = `/blog/${post.slug}`;

  const image = post.cover_image?.url ?? ogImagePath(title, description);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      siteName: "Web Tech Solutions",
      title,
      description,
      url,
      publishedTime: post.published_at?.toISOString(),
      modifiedTime: post.updated_at.toISOString(),
      images: [{ url: image, alt: post.image_alt || title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPublishedPost(slug);

  if (!post) {
    notFound();
  }

  const morePosts = await db
    .select({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      cover_image: blog.cover_image,
      image_alt: blog.image_alt,
    })
    .from(blog)
    .where(and(eq(blog.status, "PUBLISHED"), ne(blog.id, post.id)))
    .orderBy(desc(blog.published_at))
    .limit(3);

  const url = `/blog/${post.slug}`;

  const schema = graph([
    {
      "@type": "BlogPosting",
      "@id": `${absoluteUrl(url)}#post`,
      headline: post.title,
      description: post.excerpt,
      url: absoluteUrl(url),
      mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(url) },
      image: post.cover_image?.url ? [post.cover_image.url] : undefined,
      datePublished: post.published_at?.toISOString(),
      dateModified: post.updated_at.toISOString(),
      author: post.author
        ? {
            "@type": "Person",
            name: post.author.name,
            image: post.author.image ?? undefined,
          }
        : organizationRef,
      publisher: organizationRef,
      isPartOf: webSiteRef,
    },
    breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: url },
    ]),
  ]);

  const { html: content, headings } = prepareProseHtml(post.html);

  return (
    <div className="w-full mx-auto pt-0 pb-10">
      <JsonLd data={schema} />
      <div className="w-full bg-[#F4F3EF]">
        <div className="w-full max-w-6xl px-4 mx-auto flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-14">
          <header className="md:flex-1">
            <div className="flex items-center justify-start">
              {post.published_at ? (
                <time
                  dateTime={post.published_at.toISOString()}
                  className="text-[13px] text-neutral-600"
                >
                  {dateFormatter.format(post.published_at)}
                </time>
              ) : null}
            </div>
            <h1 className="text-[22px] leading-[1.2] mt-1 font-semibold tracking-tight text-neutral-900 sm:text-[35px]">
              {post.title}
            </h1>
            {post.author ? (
              <div className="flex mt-2 items-center gap-2.5">
                {post.author.image ? (
                  // biome-ignore lint/performance/noImgElement: remote avatar from the identity provider, not a bundled asset
                  <img
                    src={post.author.image}
                    alt=""
                    width={32}
                    height={32}
                    className="size-8 rounded-full border border-neutral-300 object-cover"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="flex size-8 items-center justify-center rounded-full border border-neutral-300 bg-white text-[13px] font-semibold text-primary"
                  >
                    {post.author.name.charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="text-[14px] text-neutral-600">
                  By{" "}
                  <span className="font-medium text-neutral-900">
                    {post.author.name}
                  </span>
                </span>
              </div>
            ) : null}
          </header>
          <div className="md:flex-1">
            {post.cover_image?.url ? (
              // biome-ignore lint/performance/noImgElement: remote cover served from the media bucket at its stored URL
              <img
                src={post.cover_image.url}
                alt={post.image_alt}
                className="aspect-video w-full rounded-lg border border-border object-cover"
              />
            ) : null}
          </div>
        </div>
      </div>
      {/* actual content  */}
      <div className="w-full max-w-6xl mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
          className="w-full m-0! pt-5!"
        />
        <div className="w-full grid grid-cols-1 gap-5 mt-6 lg:grid-cols-24 lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-4 lg:gap-y-5">
          <TableOfContents
            headings={headings}
            className="lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:sticky lg:top-18"
          />

          <article className="w-full pb-4 lg:col-span-17 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:pb-10">
            <div
              className={BLOG_PROSE}
              // biome-ignore lint/security/noDangerouslySetInnerHtml: stored HTML from the admin editor
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </article>

          <IdeaBox
            blogId={post.id}
            className="lg:col-span-7 lg:col-start-1 lg:row-start-1"
          />
        </div>

        {morePosts.length > 0 ? (
          <section className="border-t border-border pt-8">
            <h2 className="mb-6 border-l-2 border-primary pl-3 text-[17px] font-semibold tracking-tight text-primary">
              Related Content
            </h2>

            <ul className="grid gap-4 sm:grid-cols-3">
              {morePosts.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="group block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                  >
                    {item.cover_image?.url ? (
                      // biome-ignore lint/performance/noImgElement: <explanation
                      <img
                        src={item.cover_image.url}
                        alt={item.image_alt}
                        className="aspect-video w-full rounded-lg border border-border object-cover"
                      />
                    ) : null}
                    <h3 className="text-[15px] mt-2 leading-snug line-clamp-2 font-semibold text-foreground transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[14px] leading-[1.7] text-muted-foreground">
                      {item.excerpt}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
