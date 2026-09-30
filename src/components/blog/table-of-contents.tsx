"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import type { ProseHeading } from "@/lib/prose-html";
import { cn } from "@/lib/utils";

/**
 * Contents for the current post, built from the headings the article actually
 * contains.
 *
 * Only h2 and h3 appear: one level of nesting, which is enough to show the
 * shape of a post without turning the list into an outline of everything.
 *
 * The entry nearest the top of the viewport is marked current as the reader
 * scrolls, and so is its parent - an active h3 also lights up the h2 it sits
 * under, so the reader can see where they are in the document rather than
 * just which line they are on.
 */

/** How far below the sticky header a heading counts as "at the top". */
const ACTIVE_OFFSET = 96;

type Props = {
  headings: ProseHeading[];
  className?: string;
};

export function TableOfContents({ headings, className }: Props) {
  const listId = useId();
  const [openState, setOpenState] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const frame = useRef(0);

  /** Every heading's ancestors, so the chain can be highlighted in one lookup. */
  const ancestors = useMemo(() => {
    const map = new Map<string, string[]>();
    const trail: ProseHeading[] = [];

    for (const heading of headings) {
      while (
        trail.length > 0 &&
        trail[trail.length - 1].level >= heading.level
      ) {
        trail.pop();
      }
      map.set(
        heading.id,
        trail.map((parent) => parent.id),
      );
      trail.push(heading);
    }
    return map;
  }, [headings]);

  useEffect(() => {
    if (headings.length === 0) return;

    const measure = () => {
      frame.current = 0;

      // The active heading is the last one whose top has passed the offset;
      // before the first one has, nothing is active.
      let current: string | null = null;
      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= ACTIVE_OFFSET) {
          current = heading.id;
        } else {
          break;
        }
      }

      // At the very bottom the last heading wins, even if it never reached
      // the offset, so the list does not appear stuck one entry behind.
      const scrolledToEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (scrolledToEnd) current = headings[headings.length - 1].id;

      setActiveId(current);
    };

    // Frames do not run while the document is hidden, so fall back to a
    // timeout there; otherwise coalesce scroll events into one measurement
    // per frame.
    const schedule = () => {
      if (frame.current !== 0) return;
      frame.current = document.hidden
        ? window.setTimeout(measure, 16)
        : window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame.current) {
        window.cancelAnimationFrame(frame.current);
        window.clearTimeout(frame.current);
      }
    };
  }, [headings]);

  if (headings.length === 0) return null;

  const activeTrail = new Set<string>(
    activeId ? [activeId, ...(ancestors.get(activeId) ?? [])] : [],
  );

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    const element = document.getElementById(id);
    if (!element) return;

    event.preventDefault();
    const top =
      element.getBoundingClientRect().top + window.scrollY - ACTIVE_OFFSET + 8;
    window.scrollTo({ top, behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  return (
    <nav
      aria-label="Table of contents"
      className={cn("bg-[#F4F3EF]", className)}
    >
      <h2>
        <button
          type="button"
          onClick={() => setOpenState((open) => !open)}
          aria-expanded={openState}
          aria-controls={listId}
          className="flex w-full items-center justify-between gap-3 bg-primary px-4 py-3 text-left text-[15px] font-semibold text-primary-foreground"
        >
          Table of Contents
          <ChevronDownIcon
            aria-hidden
            className={cn(
              "size-4 shrink-0 transition-transform duration-200",
              openState && "rotate-180",
            )}
          />
        </button>
      </h2>

      <ol
        id={listId}
        hidden={!openState}
        className="max-h-[70vh] overflow-y-auto px-4 py-3"
      >
        {headings.map((heading) => {
          const active = activeId === heading.id;
          const inTrail = activeTrail.has(heading.id);

          return (
            <li key={heading.id} className={cn(heading.level === 3 && "ml-3")}>
              <a
                href={`#${heading.id}`}
                onClick={(event) => handleClick(event, heading.id)}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "flex items-start gap-2 py-1.5 text-[13.5px] leading-snug transition-colors",
                  inTrail
                    ? "font-medium text-primary"
                    : "text-neutral-700 hover:text-primary",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "mt-[7px] size-1.5 shrink-0 rounded-full transition-colors",
                    inTrail ? "bg-primary" : "bg-primary/40",
                  )}
                />
                <span className={cn(active && "underline underline-offset-2")}>
                  {heading.text}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
