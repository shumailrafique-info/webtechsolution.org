import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export function PlaceholderPage({
  title,
  path,
  parent,
}: {
  title: string;
  path: string;
  parent?: { label: string; href: string };
}) {
  return (
    <div className="w-full mx-auto pt-0 pb-10">
      <div className="w-full bg-[#F4F3EF]">
        <header className="w-full max-w-5xl px-4 mx-auto py-8 md:py-14">
          <h1 className="text-[22px] leading-[1.2] font-semibold tracking-tight text-neutral-900 sm:text-[30px]">
            {title}
          </h1>
          <p className="mt-2.5 max-w-[62ch] text-[15px] leading-relaxed text-neutral-600">
            This page is part of the new site and has not been built yet.
          </p>
        </header>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            ...(parent ? [parent] : []),
            { label: title },
          ]}
          className="w-full m-0! pt-5!"
        />

        <div className="mt-8 rounded-lg border border-dashed border-border p-8">
          <p className="text-[15px] text-muted-foreground">
            <code className="rounded bg-muted px-1.5 py-0.5 text-[13px]">
              {path}
            </code>{" "}
            is reserved and routable. Content comes next.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-[14px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Back home
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-md border border-border px-4 py-2 text-[14px] font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Read the blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
