import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CHAPTERS } from "./data";

export function Chapter({
  id,
  title,
  accent,
  lead,
  children,
  className,
}: {
  id: (typeof CHAPTERS)[number]["id"];
  title: string;
  accent: string;
  lead?: string;
  children: ReactNode;
  className?: string;
}) {
  const index = CHAPTERS.findIndex((chapter) => chapter.id === id);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        "scroll-mt-28 border-t border-neutral-200 pt-10 first:border-t-0 first:pt-0 md:pt-12",
        className,
      )}
    >
      <p className="reveal font-display text-[14px] font-bold tracking-[-0.01em] text-primary">
        Chapter {String(index + 1).padStart(2, "0")}
      </p>
      <h2
        id={`${id}-title`}
        className="reveal mt-3 font-display text-[30px] leading-[1.06] font-bold tracking-[-0.035em] text-balance text-heading md:text-[40px]"
      >
        {title} {accent}
      </h2>
      {lead ? (
        <p className="reveal mt-4 text-[18px] leading-normal font-medium text-neutral-500 md:text-[19px]">
          {lead}
        </p>
      ) : null}
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function ChapterNav() {
  return (
    <nav aria-label="Chapters" className="lg:sticky lg:top-28">
      <p className="text-[13px] font-semibold text-neutral-500">
        In this story
      </p>
      <ol className="mt-4 grid gap-1 border-l border-neutral-200">
        {CHAPTERS.map((chapter, index) => (
          <li key={chapter.id}>
            <Link
              href={`#${chapter.id}`}
              className="-ml-px flex gap-3 border-l-2 border-transparent py-1.5 pl-4 text-[14.5px] text-neutral-600 transition-colors hover:border-primary hover:text-heading"
            >
              <span className="w-5 font-display font-bold text-neutral-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              {chapter.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
