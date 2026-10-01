"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import type { ProseHeading } from "@/lib/prose-html";
import { cn } from "@/lib/utils";

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

      const scrolledToEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (scrolledToEnd) current = headings[headings.length - 1].id;

      setActiveId(current);
    };

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
      className={cn(
        "overflow-hidden rounded-[20px] border border-neutral-200 bg-white",
        className,
      )}
    >
      <h2>
        <button
          type="button"
          onClick={() => setOpenState((open) => !open)}
          aria-expanded={openState}
          aria-controls={listId}
          className="flex w-full items-center justify-between gap-3 border-b border-neutral-100 px-5 py-4 text-left font-display text-[16px] font-bold tracking-[-0.02em] text-heading"
        >
          <span className="flex items-center gap-2">
            <span aria-hidden className="size-1.5 rounded-full bg-primary" />
            Table of Contents
          </span>
          <span className="flex size-7 items-center justify-center rounded-full border border-neutral-200 text-neutral-500">
            <ChevronDownIcon
              aria-hidden
              className={cn(
                "size-3.5 shrink-0 transition-transform duration-200",
                openState && "rotate-180",
              )}
            />
          </span>
        </button>
      </h2>

      <ol
        id={listId}
        hidden={!openState}
        className="max-h-[70vh] overflow-y-auto px-3 py-3"
      >
        {headings.map((heading) => {
          const active = activeId === heading.id;
          const inTrail = activeTrail.has(heading.id);

          return (
            <li key={heading.id} className={cn(heading.level === 3 && "ml-4")}>
              <a
                href={`#${heading.id}`}
                onClick={(event) => handleClick(event, heading.id)}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "flex items-start gap-2.5 rounded-[10px] px-2 py-1.5 text-[14px] leading-snug transition-colors",
                  active && "bg-primary/[0.07]",
                  inTrail
                    ? "font-semibold text-brand-deep"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-heading",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "mt-1.75 size-1.5 shrink-0 rounded-full transition-colors",
                    inTrail ? "bg-primary" : "bg-neutral-300",
                  )}
                />
                <span>{heading.text}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
