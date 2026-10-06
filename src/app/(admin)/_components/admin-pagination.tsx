"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function pageItems(current: number, total: number): (number | null)[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const wanted = new Set<number>([1, total, current]);
  for (const offset of [-1, 1]) {
    const page = current + offset;
    if (page > 1 && page < total) wanted.add(page);
  }
  if (current <= 3) for (const page of [2, 3, 4]) wanted.add(page);
  if (current >= total - 2)
    for (const page of [total - 3, total - 2, total - 1]) wanted.add(page);

  const sorted = [...wanted]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);

  const items: (number | null)[] = [];
  let previous = 0;
  for (const page of sorted) {
    if (previous && page - previous > 1) items.push(null);
    items.push(page);
    previous = page;
  }
  return items;
}

export function AdminPagination({
  page,
  totalPages,
  total,
  onPageChange,
  label = "rows",
  className,
}: {
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
  label?: string;
  className?: string;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label={`${label} pages`}
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-4 sm:px-8",
        className,
      )}
    >
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages} · {total} {label}
      </p>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          <ChevronLeftIcon className="size-4" />
          Previous
        </Button>

        <ol className="hidden items-center gap-1 sm:flex">
          {pageItems(page, totalPages).map((item, index) =>
            item === null ? (
              <li
                key={`gap-${index}`}
                aria-hidden
                className="px-1 text-sm text-muted-foreground"
              >
                &hellip;
              </li>
            ) : (
              <li key={item}>
                <Button
                  variant={item === page ? "default" : "ghost"}
                  size="sm"
                  aria-current={item === page ? "page" : undefined}
                  aria-label={`Page ${item}`}
                  onClick={() => onPageChange(item)}
                  className="min-w-9"
                >
                  {item}
                </Button>
              </li>
            ),
          )}
        </ol>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
    </nav>
  );
}
