"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowRightIcon,
  ClockIcon,
  SearchIcon,
  XIcon,
} from "@/components/icons";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchSuggestions } from "@/lib/react-query/hooks/use-search";
import { cn } from "@/lib/utils";
import { POPULAR_TOPICS, searchHref } from "./data";
import { Highlight } from "./highlight";
import {
  clearRecentSearches,
  readRecentSearches,
  saveRecentSearch,
} from "./recent-searches";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function useDebouncedValue<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

function isEditable(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  );
}

export function SearchDrawer({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);

  const debounced = useDebouncedValue(query, 220);
  const term = debounced.trim();
  const { data, isFetching, error } = useSearchSuggestions(debounced);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const shortcut =
        (event.key === "k" && (event.metaKey || event.ctrlKey)) ||
        (event.key === "/" && !isEditable(event.target));
      if (!shortcut) return;
      event.preventDefault();
      setOpen(true);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: runs on route change only
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) setRecent(readRecentSearches());
  };

  const goToResults = (value: string) => {
    const trimmed = value.trim();
    if (trimmed.length < 2) return;
    setRecent(saveRecentSearch(trimmed));
    setOpen(false);
    router.push(searchHref(trimmed));
  };

  const showSuggestions = term.length >= 2;
  const hits = data?.hits ?? [];
  const waiting =
    showSuggestions && (isFetching || debounced !== query) && !data;

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      swipeDirection="up"
      showSwipeHandle
    >
      <button
        type="button"
        onClick={() => onOpenChange(true)}
        aria-label="Search the blog"
        title="Search (Ctrl + K)"
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-full   text-heading transition-colors  hover:text-brand-deep",
          className,
        )}
      >
        <SearchIcon aria-hidden className="size-4.5" />
      </button>

      <DrawerContent
        initialFocus={inputRef}
        className="rounded-[28px] border-neutral-200 bg-white shadow-[0_40px_80px_-40px_rgba(30,20,10,0.45)]"
      >
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="mx-auto w-full max-w-3xl px-4 pt-5 pb-4 md:px-6 md:pt-7 md:pb-6">
            <div className="flex items-center justify-between gap-3">
              <DrawerTitle className="font-display text-[15px] font-bold tracking-[-0.01em] text-heading">
                Search the blog
              </DrawerTitle>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-2.5 py-1 text-[12.5px] font-medium text-neutral-500 transition-colors hover:text-heading"
              >
                <kbd className="font-sans">Esc</kbd>
                <XIcon aria-hidden className="size-3.5" />
                <span className="sr-only">Close search</span>
              </button>
            </div>
            <DrawerDescription className="sr-only">
              Type to see matching articles. Press Enter to see all results.
            </DrawerDescription>

            <search>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  goToResults(query);
                }}
                className="mt-4"
              >
                <label htmlFor={inputId} className="sr-only">
                  Search articles
                </label>
                <div className="flex items-center gap-3 rounded-[18px] border border-neutral-200 bg-neutral-50/70 px-4 transition-[border-color,box-shadow,background-color] focus-within:border-primary focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/15">
                  <SearchIcon
                    aria-hidden
                    className="size-5 shrink-0 text-neutral-400"
                  />
                  <input
                    ref={inputRef}
                    id={inputId}
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search SEO, marketing, tools…"
                    autoComplete="off"
                    enterKeyHint="search"
                    className="h-12 w-full bg-transparent font-display text-[18px] font-medium tracking-[-0.01em] text-heading outline-none placeholder:text-neutral-400  md:text-[18px] [&::-webkit-search-cancel-button]:hidden"
                  />
                  {query ? (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        inputRef.current?.focus();
                      }}
                      className="rounded-full p-1 text-neutral-400 transition-colors hover:text-heading"
                    >
                      <XIcon aria-hidden className="size-4" />
                      <span className="sr-only">Clear search</span>
                    </button>
                  ) : null}
                </div>
              </form>
            </search>

            {showSuggestions ? (
              <div className="mt-5" aria-live="polite">
                {error ? (
                  <p className="rounded-[16px] border border-dashed border-neutral-300 p-5 text-center text-[14.5px] text-neutral-500">
                    {error.message}
                  </p>
                ) : waiting ? (
                  <ul className="grid gap-2">
                    {[0, 1, 2].map((row) => (
                      <li key={row} className="flex items-center gap-3 p-2">
                        <Skeleton className="h-12 w-20 shrink-0 rounded-[10px]" />
                        <div className="grid flex-1 gap-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/4" />
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : hits.length === 0 ? (
                  <div className="rounded-[18px] border border-dashed border-neutral-300 p-6 text-center">
                    <p className="font-display text-[17px] font-bold tracking-[-0.02em] text-heading">
                      No matches for &ldquo;{term}&rdquo;
                    </p>
                    <p className="mt-1 text-[14px] text-neutral-500">
                      Try another word, or check the spelling.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="px-2 text-[12.5px] font-semibold text-neutral-500">
                      Top matches
                    </p>
                    <ul
                      className={cn(
                        "mt-2 grid gap-1 transition-opacity",
                        isFetching && "opacity-60",
                      )}
                    >
                      {hits.map((hit) => (
                        <li key={hit.id}>
                          <Link
                            href={`/blog/${hit.slug}`}
                            onClick={() => {
                              setRecent(saveRecentSearch(term));
                              setOpen(false);
                            }}
                            className="group flex items-center gap-3 rounded-[16px] p-2 transition-colors hover:bg-neutral-50 focus-visible:bg-neutral-50 focus-visible:outline-none"
                          >
                            <span className="relative h-12 w-20 shrink-0 overflow-hidden rounded-[10px] bg-neutral-100 ring-1 ring-neutral-200/70">
                              {hit.cover_image?.url ? (
                                // biome-ignore lint/performance/noImgElement: remote cover served from the media bucket at its stored URL
                                <img
                                  src={hit.cover_image.url}
                                  alt=""
                                  loading="lazy"
                                  className="size-full object-cover"
                                />
                              ) : null}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="line-clamp-1 font-display text-[15.5px] font-bold tracking-[-0.015em] text-heading group-hover:text-brand-deep">
                                <Highlight text={hit.title} query={term} />
                              </span>
                              {hit.published_at ? (
                                <span className="mt-0.5 block text-[12.5px] text-neutral-500">
                                  {dateFormatter.format(
                                    new Date(hit.published_at),
                                  )}
                                </span>
                              ) : null}
                            </span>
                            <ArrowRightIcon
                              aria-hidden
                              className="size-4 shrink-0 text-neutral-300 transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-primary"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => goToResults(term)}
                      className="group mt-3 flex w-full items-center justify-between gap-3 rounded-[16px] bg-heading px-5 py-3.5 text-left font-display text-[15px] font-semibold text-white transition-colors hover:bg-brand-deep"
                    >
                      <span>
                        See all {data?.total ?? hits.length} results for &ldquo;
                        {term}&rdquo;
                      </span>
                      <ArrowRightIcon
                        aria-hidden
                        className="size-4 transition-transform group-hover:translate-x-1"
                      />
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="mt-6 grid gap-6">
                {recent.length > 0 ? (
                  <section aria-label="Recent searches">
                    <div className="flex items-center justify-between">
                      <p className="text-[12.5px] font-semibold text-neutral-500">
                        Recent searches
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          clearRecentSearches();
                          setRecent([]);
                        }}
                        className="text-[12.5px] font-medium text-neutral-500 underline-offset-4 hover:text-heading hover:underline"
                      >
                        Clear
                      </button>
                    </div>
                    <ul className="mt-2.5 flex flex-wrap gap-2">
                      {recent.map((item) => (
                        <li key={item}>
                          <button
                            type="button"
                            onClick={() => goToResults(item)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-[14px] font-medium text-neutral-700 transition-colors hover:border-primary/40 hover:text-brand-deep"
                          >
                            <ClockIcon
                              aria-hidden
                              className="size-3.5 text-neutral-400"
                            />
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                <section aria-label="Popular topics">
                  <p className="text-[12.5px] font-semibold text-neutral-500">
                    Popular topics
                  </p>
                  <ul className="mt-2.5 flex flex-wrap gap-2">
                    {POPULAR_TOPICS.map((topic) => (
                      <li key={topic}>
                        <button
                          type="button"
                          onClick={() => setQuery(topic)}
                          className="inline-flex rounded-full bg-primary/[0.07] px-3.5 py-1.5 text-[14px] font-medium text-brand-deep ring-1 ring-primary/15 transition-colors hover:bg-primary/15"
                        >
                          {topic}
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>

                <p className="hidden text-[12.5px] text-neutral-400 md:block">
                  Tip: press{" "}
                  <kbd className="rounded border border-neutral-200 px-1.5 py-0.5 font-sans">
                    /
                  </kbd>{" "}
                  or{" "}
                  <kbd className="rounded border border-neutral-200 px-1.5 py-0.5 font-sans">
                    Ctrl K
                  </kbd>{" "}
                  anywhere to search.
                </p>
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
