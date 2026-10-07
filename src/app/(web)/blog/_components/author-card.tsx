import type { BlogAuthor } from "@/drizzle/types";

export function AuthorCard({ author }: { author: BlogAuthor }) {
  return (
    <aside
      aria-label="About the author"
      className="mt-10 flex flex-col gap-5 rounded-[20px] border border-neutral-200 bg-neutral-50/80 p-6 sm:flex-row sm:items-start sm:p-7"
    >
      {author.image?.url ? (
        <img
          src={author.image.url}
          alt={author.name}
          referrerPolicy="no-referrer"
          width={80}
          height={80}
          className="size-20 shrink-0 rounded-full object-cover ring-4 ring-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
        />
      ) : (
        <span
          aria-hidden
          className="flex size-20 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-brand-deep font-display text-[28px] font-bold text-white ring-4 ring-white"
        >
          {author.name.charAt(0).toUpperCase()}
        </span>
      )}
      <div className="min-w-0">
        <p className="text-[13px] font-medium tracking-wide text-neutral-500 uppercase">
          Written by
        </p>
        <p className="mt-1 font-display text-[22px] leading-tight font-bold tracking-[-0.02em] text-heading">
          {author.name}
        </p>
        {author.bio ? (
          <p className="mt-3 text-[15.5px] leading-[1.7] text-neutral-600">
            {author.bio}
          </p>
        ) : null}
      </div>
    </aside>
  );
}
