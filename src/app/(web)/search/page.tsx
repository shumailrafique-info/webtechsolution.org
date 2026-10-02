import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/app/(web)/blog/_components/post-card";
import { Accent, Container, Eyebrow } from "@/components/home/primitives";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@/components/icons";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { pageMetadata as buildPageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { getPublishedPage } from "@/server/blog";
import {
  normalizeQuery,
  SEARCH_MIN_LENGTH,
  type SearchSort,
  searchPublishedPosts,
} from "@/server/search";
import { POPULAR_TOPICS, searchHref } from "./_components/data";
import { ResultItem } from "./_components/result-item";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

async function readParams(searchParams: Props["searchParams"]) {
  const params = await searchParams;
  const query = normalizeQuery(first(params.q));
  const sort: SearchSort =
    first(params.sort) === "newest" ? "newest" : "relevance";
  const page = Math.max(1, Number.parseInt(first(params.page) ?? "1", 10) || 1);
  return { query, sort, page };
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { query } = await readParams(searchParams);
  return buildPageMetadata({
    title: query ? `Search results for “${query}”` : "Search",
    description:
      "Search every published article on the WebTech Solutions blog.",
    path: "/search",
    cardTitle: "Search the blog",
    eyebrow: "Search",
    noindex: true,
  });
}

function resultsHref(query: string, sort: SearchSort, page = 1) {
  const params = new URLSearchParams({ q: query });
  if (sort !== "relevance") params.set("sort", sort);
  if (page > 1) params.set("page", String(page));
  return `/search?${params.toString()}`;
}

export default async function Page({ searchParams }: Props) {
  const { query, sort, page } = await readParams(searchParams);
  const searching = query.length >= SEARCH_MIN_LENGTH;

  const [result, latest] = await Promise.all([
    searching
      ? searchPublishedPosts({ query, page, sort })
      : Promise.resolve(null),
    getPublishedPage(1),
  ]);

  const hasResults = (result?.hits.length ?? 0) > 0;
  const pill =
    "inline-flex h-10 min-w-10 items-center justify-center gap-1.5 rounded-full border px-4 font-display text-[14.5px] font-semibold tracking-[-0.01em] transition-colors";

  return (
    <>
      <section
        aria-labelledby="search-title"
        className="bg-white pt-6 pb-12 md:pb-14"
      >
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: "Search" },
            ]}
            className="mb-0"
          />

          <div className="mx-auto mt-10 max-w-3xl text-center md:mt-12">
            <Eyebrow>Search</Eyebrow>
            <h1
              id="search-title"
              className="mt-6 font-display text-[36px] leading-[1.02] font-bold tracking-[-0.045em] text-balance text-heading sm:text-[48px] lg:text-[56px]"
            >
              {searching ? (
                <>
                  Results for <Accent>&ldquo;{query}&rdquo;</Accent>
                </>
              ) : (
                <>
                  Search the <Accent>blog.</Accent>
                </>
              )}
            </h1>

            <search>
              <form
                action="/search"
                className="mx-auto mt-8 flex max-w-2xl items-center gap-2 rounded-full border border-neutral-200 bg-white p-1.5 pl-5 shadow-[0_20px_45px_-35px_rgba(30,20,10,0.35)] transition-[border-color,box-shadow] focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15"
              >
                <SearchIcon
                  aria-hidden
                  className="size-5 shrink-0 text-neutral-400"
                />
                <label htmlFor="search-page-input" className="sr-only">
                  Search articles
                </label>
                <input
                  id="search-page-input"
                  type="search"
                  name="q"
                  defaultValue={query}
                  placeholder="Search SEO, marketing, tools…"
                  autoComplete="off"
                  minLength={SEARCH_MIN_LENGTH}
                  required
                  className="h-11 w-full min-w-0 bg-transparent text-[16px] text-heading outline-none placeholder:text-neutral-400 [&::-webkit-search-cancel-button]:hidden"
                />
                {sort !== "relevance" ? (
                  <input type="hidden" name="sort" value={sort} />
                ) : null}
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-linear-to-br from-primary to-brand-deep px-5 py-3 font-display text-[15px] leading-none font-semibold text-white"
                >
                  Search
                </button>
              </form>
            </search>
          </div>
        </Container>
      </section>

      <section
        aria-label="Results"
        className="border-t border-neutral-200/70 bg-neutral-50 py-10 md:py-14"
      >
        <Container className="grid gap-10">
          {result && hasResults ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[15px] text-neutral-600" aria-live="polite">
                  <span className="font-display font-bold text-heading">
                    {result.total}
                  </span>{" "}
                  {result.total === 1 ? "result" : "results"} for &ldquo;
                  {query}&rdquo;
                  {result.totalPages > 1
                    ? ` · page ${result.page} of ${result.totalPages}`
                    : null}
                </p>
                <nav
                  aria-label="Sort results"
                  className="flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-1"
                >
                  {(["relevance", "newest"] as const).map((option) => (
                    <Link
                      key={option}
                      href={resultsHref(query, option)}
                      aria-current={sort === option ? "true" : undefined}
                      className={cn(
                        "rounded-full px-4 py-1.5 text-[13.5px] font-semibold capitalize transition-colors",
                        sort === option
                          ? "bg-heading text-white"
                          : "text-neutral-600 hover:text-heading",
                      )}
                    >
                      {option === "relevance" ? "Most relevant" : "Newest"}
                    </Link>
                  ))}
                </nav>
              </div>

              <ul className="grid gap-3">
                {result.hits.map((post) => (
                  <li key={post.id}>
                    <ResultItem post={post} query={query} />
                  </li>
                ))}
              </ul>

              {result.totalPages > 1 ? (
                <nav
                  aria-label="Result pages"
                  className="flex items-center justify-between gap-3 border-t border-neutral-200 pt-8"
                >
                  {result.page > 1 ? (
                    <Link
                      href={resultsHref(query, sort, result.page - 1)}
                      rel="prev"
                      className={cn(
                        pill,
                        "border-neutral-200 bg-white text-heading hover:border-primary/40 hover:text-brand-deep",
                      )}
                    >
                      <ChevronLeftIcon aria-hidden className="size-4" />
                      Previous
                    </Link>
                  ) : (
                    <span />
                  )}
                  <span className="text-[14px] text-neutral-500">
                    Page {result.page} of {result.totalPages}
                  </span>
                  {result.page < result.totalPages ? (
                    <Link
                      href={resultsHref(query, sort, result.page + 1)}
                      rel="next"
                      className={cn(
                        pill,
                        "border-neutral-200 bg-white text-heading hover:border-primary/40 hover:text-brand-deep",
                      )}
                    >
                      Next
                      <ChevronRightIcon aria-hidden className="size-4" />
                    </Link>
                  ) : (
                    <span />
                  )}
                </nav>
              ) : null}
            </>
          ) : (
            <div className="grid gap-12">
              <div className="mx-auto w-full max-w-2xl rounded-[24px] border border-neutral-200 bg-white p-7 text-center md:p-9">
                {searching ? (
                  <>
                    <h2 className="font-display text-[24px] leading-tight font-bold tracking-[-0.03em] text-heading md:text-[28px]">
                      No results for &ldquo;{query}&rdquo;
                    </h2>
                    <p className="mt-2 text-[15.5px] leading-[1.6] text-neutral-600">
                      Check the spelling, try a broader word, or start from one
                      of these topics.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="font-display text-[24px] leading-tight font-bold tracking-[-0.03em] text-heading md:text-[28px]">
                      What are you looking for?
                    </h2>
                    <p className="mt-2 text-[15.5px] leading-[1.6] text-neutral-600">
                      Search every published article, or start from a topic.
                    </p>
                  </>
                )}
                <ul className="mt-6 flex flex-wrap justify-center gap-2">
                  {POPULAR_TOPICS.map((topic) => (
                    <li key={topic}>
                      <Link
                        href={searchHref(topic)}
                        className="inline-flex rounded-full bg-primary/[0.07] px-3.5 py-1.5 text-[14px] font-medium text-brand-deep ring-1 ring-primary/15 transition-colors hover:bg-primary/15"
                      >
                        {topic}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {latest.posts.length > 0 ? (
                <div>
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <h2 className="font-display text-[28px] leading-tight font-bold tracking-[-0.035em] text-heading md:text-[34px]">
                      Latest <Accent>articles.</Accent>
                    </h2>
                    <Link
                      href="/blog"
                      className="font-display text-[15px] font-semibold text-heading hover:text-brand-deep"
                    >
                      All articles &rarr;
                    </Link>
                  </div>
                  <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {latest.posts.slice(0, 6).map((post) => (
                      <li key={post.id}>
                        <PostCard post={post} />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
