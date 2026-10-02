import { and, desc, eq, ne } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Accent,
  ArrowLink,
  Container,
  Eyebrow,
} from "@/components/home/primitives";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { db } from "@/drizzle/db";
import { blog } from "@/drizzle/schema";
import { BLOG_PROSE } from "@/lib/blogProse";
import { pageMetadata } from "@/lib/metadata";
import { prepareProseHtml } from "@/lib/prose-html";
import {
  absoluteUrl,
  breadcrumbList,
  graph,
  organizationRef,
  webSiteRef,
} from "@/lib/seo";
import { getPublishedPost, getPublishedSitemapEntries } from "@/server/blog";
import { IdeaBox } from "../_components/idea-box";
import { PostCard, postDate } from "../_components/post-card";
import { TableOfContents } from "../_components/table-of-contents";

export async function generateStaticParams() {
  const posts = await getPublishedSitemapEntries();
  return posts.map((post) => ({ slug: post.slug }));
}

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

  return pageMetadata({
    absoluteTitle: title,
    description,
    path: `/blog/${post.slug}`,
    image: post.cover_image?.url
      ? { url: post.cover_image.url, alt: post.image_alt || title }
      : undefined,
    cardTitle: post.title,
    eyebrow: "Blog",
    type: "article",
    publishedTime: post.published_at?.toISOString(),
    modifiedTime: post.updated_at.toISOString(),
    authors: post.author ? [post.author.name] : undefined,
  });
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
      published_at: blog.published_at,
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

  const words = post.html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));

  return (
    <>
      <JsonLd data={schema} />

      <section
        aria-labelledby="post-title"
        className="overflow-hidden bg-white pt-6 pb-12 md:pb-16"
      >
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
            className="mb-0 [&_li:last-child]:max-w-[40ch] [&_li:last-child_span]:truncate"
          />

          <div className="mt-10 grid items-center gap-10 md:mt-12 lg:grid-cols-12 lg:gap-x-12">
            <header
              className={
                post.cover_image?.url ? "lg:col-span-6" : "lg:col-span-9"
              }
            >
              <div className="enter flex flex-wrap items-center gap-x-3 gap-y-2">
                <Eyebrow>Blog</Eyebrow>
                {post.published_at ? (
                  <time
                    dateTime={post.published_at.toISOString()}
                    className="text-[13.5px] font-medium text-neutral-500"
                  >
                    {postDate.format(post.published_at)}
                  </time>
                ) : null}
                <span aria-hidden className="text-neutral-300">
                  ·
                </span>
                <span className="text-[13.5px] font-medium text-neutral-500">
                  {minutes} min read
                </span>
              </div>
              <h1
                id="post-title"
                className="enter mt-5 font-display text-[32px] leading-[1.06] font-bold tracking-[-0.04em] text-balance text-heading sm:text-[42px] lg:text-[48px]"
              >
                {post.title}
              </h1>
              {post.author ? (
                <div className="enter mt-7 flex items-center gap-3">
                  {post.author.image ? (
                    // biome-ignore lint/performance/noImgElement: remote avatar from the identity provider, not a bundled asset
                    <img
                      src={post.author.image}
                      alt=""
                      referrerPolicy="no-referrer"
                      width={40}
                      height={40}
                      className="size-10 rounded-full object-cover ring-2 ring-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="flex size-10 items-center justify-center rounded-full bg-linear-to-br from-primary to-brand-deep font-display text-[15px] font-bold text-white"
                    >
                      {post.author.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className="text-[14.5px] leading-tight text-neutral-500">
                    Written by
                    <span className="block font-display text-[15.5px] font-bold tracking-[-0.01em] text-heading">
                      {post.author.name}
                    </span>
                  </span>
                </div>
              ) : null}
            </header>

            {post.cover_image?.url ? (
              <div className="enter-image lg:col-span-6">
                {/* biome-ignore lint/performance/noImgElement: remote cover served from the media bucket at its stored URL */}
                <img
                  src={post.cover_image.url}
                  alt={post.image_alt}
                  className="aspect-video w-full rounded-[24px] border border-neutral-200 object-cover shadow-[0_30px_70px_-40px_rgba(30,20,10,0.45)]"
                />
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <div className="border-t border-neutral-200/70 bg-neutral-50/70 py-10 md:py-14">
        <Container className="grid grid-cols-1 gap-5 lg:grid-cols-24 lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-8 lg:gap-y-5">
          <TableOfContents
            headings={headings}
            className="lg:sticky lg:top-24 lg:col-span-7 lg:col-start-1 lg:row-start-2"
          />

          <article className="w-full rounded-[24px] border border-neutral-200 bg-white p-5 sm:p-8 md:p-10 lg:col-span-17 lg:col-start-8 lg:row-span-2 lg:row-start-1">
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
        </Container>
      </div>

      {morePosts.length > 0 ? (
        <section
          aria-labelledby="more-title"
          className="bg-white py-12 md:py-16"
        >
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2
                id="more-title"
                className="font-display text-[30px] leading-tight font-bold tracking-[-0.035em] text-heading md:text-[38px]"
              >
                Keep <Accent>reading.</Accent>
              </h2>
              <ArrowLink href="/blog">All articles</ArrowLink>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {morePosts.map((item) => (
                <li key={item.id}>
                  <PostCard post={item} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </>
  );
}
