import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * The homepage's building blocks.
 *
 * Headlines are set in Bricolage Grotesque, tight and heavy; the one phrase
 * that carries the point is picked out in the orange gradient (`Accent`) or,
 * in smaller titles, in Playfair italic (`Italic`). Body copy stays in Inter.
 */

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1200px] px-4 md:px-8", className)}
    >
      {children}
    </div>
  );
}

/** The orange gradient phrase inside a headline. */
export function Accent({ children }: { children: ReactNode }) {
  return (
    <span className="bg-linear-to-b from-primary to-brand-deep box-decoration-clone bg-clip-text pr-0.5 text-transparent">
      {children}
    </span>
  );
}

/** The serif italic word inside a card title. */
export function Italic({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <em className={cn("font-serif font-semibold italic", className)}>
      {children}
    </em>
  );
}

/** A small pill that names the section above its headline. */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[13px] font-medium",
        tone === "light"
          ? "border-neutral-200 bg-white text-neutral-600"
          : "border-white/15 bg-white/5 text-neutral-300",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-primary" />
      {children}
    </p>
  );
}

/** Eyebrow, headline and lede, centred over the section they open. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lede,
  align = "center",
  className,
}: {
  id: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "reveal",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        id={id}
        className={cn(
          "font-display text-[34px] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-heading sm:text-[42px] lg:text-[50px]",
          eyebrow && "mt-5",
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "mt-5 text-[16.5px] leading-[1.65] text-neutral-600 md:text-[17.5px]",
            align === "center" && "mx-auto max-w-[56ch]",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/**
 * The primary call to action: a gradient pill inside a soft orange ring,
 * with the arrow in its own small disc.
 */
export function PrimaryButton({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex rounded-full bg-primary/20 p-[5px] transition-colors duration-300 hover:bg-primary/30",
        className,
      )}
    >
      <span className="flex items-center gap-2.5 rounded-full bg-linear-to-br from-primary to-brand-deep py-3 pr-3.5 pl-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] sm:py-3.5">
        <span className="font-display text-[16px] leading-none font-semibold tracking-[-0.01em] text-white lg:text-[17px]">
          {children}
        </span>
        <span className="flex size-6 items-center justify-center rounded-full bg-white/20">
          <ArrowRightIcon
            aria-hidden
            className="size-3.5 text-white transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </span>
      </span>
    </Link>
  );
}

/** The quieter alternative to `PrimaryButton`. */
export function SecondaryButton({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center rounded-full border-2 border-primary/25 bg-white px-6 py-3 font-display text-[16px] leading-none font-semibold tracking-[-0.01em] text-brand-deep transition-colors duration-300 hover:border-primary/50 hover:bg-primary/5 sm:py-3.5 lg:text-[17px]",
        className,
      )}
    >
      {children}
    </Link>
  );
}

/** A text link with an arrow that leans in on hover. */
export function ArrowLink({
  href,
  children,
  tone = "light",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 font-display text-[15.5px] font-semibold tracking-[-0.01em] transition-colors",
        tone === "light"
          ? "text-heading hover:text-brand-deep"
          : "text-white hover:text-primary",
        className,
      )}
    >
      {children}
      <ArrowRightIcon
        aria-hidden
        className={cn(
          "size-4 transition-transform duration-300 group-hover:translate-x-1",
          tone === "light" ? "text-primary" : "text-white",
        )}
      />
    </Link>
  );
}

/** An icon in a small square tile, followed by a short fact. */
export function TrustChip({
  icon: Icon,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <li className="flex items-center gap-2.5 text-[14.5px] text-neutral-600">
      <span className="flex size-8 items-center justify-center rounded-lg border border-neutral-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <Icon aria-hidden className="size-4 text-neutral-700" />
      </span>
      {children}
    </li>
  );
}

/** The round icon badge that heads a card, with the small orange tick. */
export function IconBadge({
  icon: Icon,
  tone = "light",
}: {
  icon: ComponentType<{ className?: string }>;
  tone?: "light" | "dark";
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative flex size-11 items-center justify-center rounded-full border",
        tone === "light"
          ? "border-neutral-200 bg-white text-heading"
          : "border-white/25 bg-white/10 text-white",
      )}
    >
      <Icon className="size-5" />
      <span
        className={cn(
          "absolute -right-0.5 -bottom-0.5 flex size-4 items-center justify-center rounded-full ring-2",
          tone === "light"
            ? "bg-primary ring-white"
            : "bg-white ring-brand-deep",
        )}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className={cn(
            "size-2.5",
            tone === "light" ? "text-white" : "text-brand-deep",
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 6.2 5 8.5l4.5-5" />
        </svg>
      </span>
    </span>
  );
}
