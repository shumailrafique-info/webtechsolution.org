import Link from "next/link";
import { postDate } from "@/app/(web)/blog/_components/post-card";
import { ArrowRightIcon } from "@/components/icons";
import type { BlogCard } from "@/server/blog";
import { Highlight } from "./highlight";

export function ResultItem({ post, query }: { post: BlogCard; query: string }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid gap-4 rounded-[24px] border border-neutral-200 bg-white p-2.5 outline-none transition-[border-color,box-shadow] duration-300 hover:border-neutral-300 hover:shadow-[0_20px_45px_-30px_rgba(30,20,10,0.3)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 sm:grid-cols-[13rem_1fr] sm:items-center"
    >
      <div className="overflow-hidden rounded-[18px] bg-neutral-100 ring-1 ring-neutral-200/70">
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
      <div className="px-2 pb-2 sm:px-1 sm:py-1 sm:pr-4">
        {post.published_at ? (
          <time
            dateTime={post.published_at.toISOString()}
            className="text-[13px] font-medium text-neutral-500"
          >
            {postDate.format(post.published_at)}
          </time>
        ) : null}
        <h2 className="mt-1 font-display text-[19px] leading-[1.2] font-bold tracking-[-0.025em] text-heading transition-colors group-hover:text-brand-deep md:text-[21px]">
          <Highlight text={post.title} query={query} />
        </h2>
        <p className="mt-2 line-clamp-2 text-[14.5px] leading-[1.6] text-neutral-600">
          <Highlight text={post.excerpt} query={query} />
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 font-display text-[14px] font-semibold text-heading transition-colors group-hover:text-brand-deep">
          Read article
          <ArrowRightIcon
            aria-hidden
            className="size-4 text-primary transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
