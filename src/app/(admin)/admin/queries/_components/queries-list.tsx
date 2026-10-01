"use client";

import { useState } from "react";
import { AdminPagination } from "@/app/(admin)/_components/admin-pagination";
import { CheckIcon, LoaderIcon, MailIcon, TrashIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/toast";
import type { ContactQueryType } from "@/drizzle/types";
import {
  useContactQueries,
  useContactQueryDelete,
  useContactQueryRead,
} from "@/lib/react-query/hooks/use-contact-queries";
import { cn } from "@/lib/utils";
import type { ContactQueryFilter } from "@/server/actions/contact-queries";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function QueriesList() {
  const [filter, setFilter] = useState<ContactQueryFilter>("all");
  const [page, setPage] = useState(1);
  const { data, isPending, error } = useContactQueries(page, filter);
  const markRead = useContactQueryRead();
  const remove = useContactQueryDelete();

  if (isPending) {
    return (
      <div className="grid gap-3">
        {[0, 1, 2].map((row) => (
          <Skeleton key={row} className="h-28 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="rounded-lg border border-destructive/40 p-4 text-sm text-destructive">
        {error.message}
      </p>
    );
  }

  const visible = data?.rows ?? [];
  const unread = data?.unread ?? 0;

  const onToggleRead = (query: ContactQueryType) =>
    markRead.mutate(
      { id: query.id, isRead: !query.is_read },
      {
        onError: (mutationError: Error) =>
          toast.add({ title: mutationError.message }),
      },
    );

  const onDelete = (query: ContactQueryType) =>
    remove.mutate(query.id, {
      onSuccess: () => toast.add({ title: "Query deleted" }),
      onError: (mutationError: Error) =>
        toast.add({ title: mutationError.message }),
    });

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {data?.total ?? 0} {filter === "unread" ? "unread" : "total"}
          {unread > 0 ? (
            <>
              {" · "}
              <span className="font-medium text-foreground">
                {unread} unread
              </span>
            </>
          ) : null}
        </p>

        <div className="flex items-center gap-1 rounded-md border border-border p-0.5">
          {(["all", "unread"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setFilter(value);
                setPage(1);
              }}
              aria-pressed={filter === value}
              className={cn(
                "rounded px-3 py-1.5 text-[13px] font-medium capitalize transition-colors",
                filter === value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          {filter === "unread"
            ? "Nothing unread."
            : "No contact queries have been received yet."}
        </p>
      ) : (
        <ul className="grid gap-3">
          {visible.map((query) => (
            <li
              key={query.id}
              className={cn(
                "rounded-lg border p-4 transition-colors",
                query.is_read
                  ? "border-border bg-card"
                  : "border-primary/40 bg-accent/40",
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-[15px] font-semibold text-foreground">
                    {query.name}
                    {query.is_read ? null : (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-medium text-primary-foreground">
                        New
                      </span>
                    )}
                  </p>
                  <a
                    href={`mailto:${query.email}`}
                    className="mt-0.5 inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-primary"
                  >
                    <MailIcon aria-hidden className="size-3.5" />
                    {query.email}
                  </a>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleRead(query)}
                    disabled={markRead.isPending}
                    title={query.is_read ? "Mark as unread" : "Mark as read"}
                  >
                    <CheckIcon className="size-4" />
                    {query.is_read ? "Unread" : "Read"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(query)}
                    disabled={remove.isPending}
                    title="Delete"
                    className="text-destructive hover:text-destructive"
                  >
                    {remove.isPending ? (
                      <LoaderIcon className="size-4 animate-spin" />
                    ) : (
                      <TrashIcon className="size-4" />
                    )}
                  </Button>
                </div>
              </div>

              <p className="mt-3 text-[14px] leading-relaxed whitespace-pre-line text-foreground/90">
                {query.message}
              </p>

              <footer className="mt-3 text-[12px] text-muted-foreground">
                <time dateTime={query.created_at.toISOString()}>
                  {dateFormatter.format(query.created_at)}
                </time>
              </footer>
            </li>
          ))}
        </ul>
      )}

      {data ? (
        <AdminPagination
          page={data.page}
          totalPages={data.totalPages}
          total={data.total}
          label="queries"
          onPageChange={setPage}
          className="px-0 sm:px-0"
        />
      ) : null}
    </div>
  );
}
