import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export const blogPageHref = (page: number) =>
  page <= 1 ? "/blog" : `/blog/page/${page}`;

function pageItems(current: number, total: number): (number | null)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const items = new Set<number>([1, total, current]);
  for (const offset of [-1, 1]) {
    const page = current + offset;
    if (page > 1 && page < total) items.add(page);
  }
  if (current <= 3) for (const page of [2, 3, 4]) items.add(page);
  if (current >= total - 2)
    for (const page of [total - 3, total - 2, total - 1]) items.add(page);

  const sorted = [...items]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const withGaps: (number | null)[] = [];
  let previous = 0;
  for (const page of sorted) {
    if (previous && page - previous > 1) withGaps.push(null);
    withGaps.push(page);
    previous = page;
  }
  return withGaps;
}

const base =
  "inline-flex h-10 min-w-10 items-center justify-center gap-1.5 rounded-full border px-4 font-display text-[14.5px] font-semibold tracking-[-0.01em] transition-colors";
const idle =
  "border-neutral-200 bg-white text-heading hover:border-primary/40 hover:text-brand-deep";
const disabled = "border-neutral-200 bg-white/60 text-neutral-300";

export function BlogPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const previousPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <nav
      aria-label="Blog pages"
      className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-8"
    >
      {previousPage ? (
        <Link
          href={blogPageHref(previousPage)}
          rel="prev"
          className={cn(base, idle)}
        >
          <ChevronLeftIcon aria-hidden className="size-4" />
          Previous
        </Link>
      ) : (
        <span aria-disabled className={cn(base, disabled)}>
          <ChevronLeftIcon aria-hidden className="size-4" />
          Previous
        </span>
      )}

      <ol className="order-last flex w-full flex-wrap items-center justify-center gap-1.5 sm:order-0 sm:w-auto">
        {pageItems(currentPage, totalPages).map((page, index) =>
          page === null ? (
            <li
              key={`gap-${index}`}
              aria-hidden
              className="px-1 text-neutral-400"
            >
              &hellip;
            </li>
          ) : (
            <li key={page}>
              <Link
                href={blogPageHref(page)}
                aria-current={page === currentPage ? "page" : undefined}
                aria-label={`Page ${page}`}
                className={cn(
                  base,
                  page === currentPage
                    ? "border-transparent bg-linear-to-br from-primary to-brand-deep text-white shadow-[0_8px_20px_-10px_rgba(200,70,10,0.8)]"
                    : idle,
                )}
              >
                {page}
              </Link>
            </li>
          ),
        )}
      </ol>

      {nextPage ? (
        <Link
          href={blogPageHref(nextPage)}
          rel="next"
          className={cn(base, idle)}
        >
          Next
          <ChevronRightIcon aria-hidden className="size-4" />
        </Link>
      ) : (
        <span aria-disabled className={cn(base, disabled)}>
          Next
          <ChevronRightIcon aria-hidden className="size-4" />
        </span>
      )}
    </nav>
  );
}
