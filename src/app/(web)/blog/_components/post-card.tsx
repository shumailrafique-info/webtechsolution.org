import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export type PostCardData = {
  slug: string;
  title: string;
  excerpt: string;
  cover_image: { url?: string | null } | null;
  image_alt: string;
  published_at?: Date | null;
};

export const postDate = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function Cover({
  post,
  className,
}: {
  post: PostCardData;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[18px] bg-neutral-100 ring-1 ring-neutral-200/70",
        className,
      )}
    >
      {post.cover_image?.url ? (
        // biome-ignore lint/performance/noImgElement: remote cover served from the media bucket at its stored URL
        <img
          src={post.cover_image.url}
          alt={post.image_alt}
          loading="lazy"
          className="aspect-video size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="aspect-video size-full bg-linear-to-br from-primary/15 to-primary/5" />
      )}
    </div>
  );
}

function ReadMore() {
  return (
    <span className="inline-flex items-center gap-1.5 font-display text-[14.5px] font-semibold tracking-[-0.01em] text-heading transition-colors group-hover:text-brand-deep">
      Read article
      <ArrowRightIcon
        aria-hidden
        className="size-4 text-primary transition-transform duration-300 group-hover:translate-x-1"
      />
    </span>
  );
}

export function PostCard({
  post,
  headingLevel: Heading = "h2",
}: {
  post: PostCardData;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-[24px] border border-neutral-200 bg-white p-2.5 outline-none transition-[border-color,box-shadow] duration-300 hover:border-neutral-300 hover:shadow-[0_20px_45px_-30px_rgba(30,20,10,0.3)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
    >
      <Cover post={post} />
      <div className="flex flex-1 flex-col px-3 pt-4 pb-3">
        {post.published_at ? (
          <time
            dateTime={post.published_at.toISOString()}
            className="text-[13px] font-medium text-neutral-500"
          >
            {postDate.format(post.published_at)}
          </time>
        ) : null}
        <Heading className="mt-1.5 line-clamp-2 font-display text-[19px] leading-[1.2] font-bold tracking-tight text-heading transition-colors group-hover:text-brand-deep">
          {post.title}
        </Heading>
        <p className="mt-2.5 line-clamp-3 text-[14.5px] leading-[1.6] text-neutral-600">
          {post.excerpt}
        </p>
        <span className="mt-auto pt-5">
          <ReadMore />
        </span>
      </div>
    </Link>
  );
}

export function FeaturedPostCard({
  post,
  label,
}: {
  post: PostCardData;
  label?: string;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid overflow-hidden rounded-[28px] border border-neutral-200 bg-white outline-none transition-[border-color,box-shadow] duration-300 hover:border-neutral-300 hover:shadow-[0_30px_60px_-40px_rgba(30,20,10,0.35)] focus-visible:ring-2 focus-visible:ring-ring gap-6 p-4 focus-visible:ring-offset-4 md:grid-cols-[1.15fr_1fr] md:items-center"
    >
      <Cover post={post} className="rounded-[20px]" />
      <div className="flex flex-col ">
        <div className="flex flex-wrap items-center gap-3">
          {label ? (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-[12.5px] font-semibold text-brand-deep ring-1 ring-primary/20">
              {label}
            </span>
          ) : null}
          {post.published_at ? (
            <time
              dateTime={post.published_at.toISOString()}
              className="text-[13px] font-medium text-neutral-500"
            >
              {postDate.format(post.published_at)}
            </time>
          ) : null}
        </div>
        <h2 className="mt-4 font-display text-[26px] leading-[1.1] font-bold tracking-[-0.035em] text-balance text-heading transition-colors group-hover:text-brand-deep md:text-[34px]">
          {post.title}
        </h2>
        <p className="mt-4 line-clamp-4 text-[16px] leading-[1.65] text-neutral-600">
          {post.excerpt}
        </p>
        <span className="mt-7">
          <ReadMore />
        </span>
      </div>
    </Link>
  );
}
