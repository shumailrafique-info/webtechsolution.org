"use client";

import { useState } from "react";
import {
  CheckIcon,
  ExternalLinkIcon,
  LoaderIcon,
  MailIcon,
  TrashIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/toast";
import type { IdeaType } from "@/drizzle/types";
import {
  useIdeaDelete,
  useIdeaRead,
  useIdeas,
} from "@/lib/react-query/hooks/use-ideas";
import { cn } from "@/lib/utils";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

type Filter = "all" | "unread";

export function IdeasList() {
  const [filter, setFilter] = useState<Filter>("all");
  const { data, isPending, error } = useIdeas();
  const markRead = useIdeaRead();
  const remove = useIdeaDelete();

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

  const ideas = data ?? [];
  const unread = ideas.filter((idea) => !idea.is_read).length;
  const visible = filter === "unread" ? ideas.filter((i) => !i.is_read) : ideas;

  const onToggleRead = (idea: IdeaType) =>
    markRead.mutate(
      { id: idea.id, isRead: !idea.is_read },
      {
        onError: (mutationError: Error) =>
          toast.add({ title: mutationError.message }),
      },
    );

  const onDelete = (idea: IdeaType) =>
    remove.mutate(idea.id, {
      onSuccess: () => toast.add({ title: "Idea deleted" }),
      onError: (mutationError: Error) =>
        toast.add({ title: mutationError.message }),
    });

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {ideas.length} total
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
              onClick={() => setFilter(value)}
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
            : "No ideas have been submitted yet."}
        </p>
      ) : (
        <ul className="grid gap-3">
          {visible.map((idea) => (
            <li
              key={idea.id}
              className={cn(
                "rounded-lg border p-4 transition-colors",
                idea.is_read
                  ? "border-border bg-card"
                  : "border-primary/40 bg-accent/40",
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-[15px] font-semibold text-foreground">
                    {idea.name}
                    {idea.is_read ? null : (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-medium text-primary-foreground">
                        New
                      </span>
                    )}
                  </p>
                  <a
                    href={`mailto:${idea.email}`}
                    className="mt-0.5 inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-primary"
                  >
                    <MailIcon aria-hidden className="size-3.5" />
                    {idea.email}
                  </a>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleRead(idea)}
                    disabled={markRead.isPending}
                    title={idea.is_read ? "Mark as unread" : "Mark as read"}
                  >
                    <CheckIcon className="size-4" />
                    {idea.is_read ? "Unread" : "Read"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(idea)}
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
                {idea.message}
              </p>

              <footer className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted-foreground">
                <time dateTime={idea.created_at.toISOString()}>
                  {dateFormatter.format(idea.created_at)}
                </time>
                {idea.blog_title ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>
                      on{" "}
                      {idea.blog_slug ? (
                        <a
                          href={`/blog/${idea.blog_slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-foreground transition-colors hover:text-primary"
                        >
                          {idea.blog_title}
                          <ExternalLinkIcon aria-hidden className="size-3" />
                        </a>
                      ) : (
                        <span className="font-medium text-foreground">
                          {idea.blog_title}
                        </span>
                      )}
                    </span>
                  </>
                ) : null}
              </footer>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
