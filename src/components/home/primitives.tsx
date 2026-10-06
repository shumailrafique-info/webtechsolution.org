import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-300 px-4 md:px-8", className)}>
      {children}
    </div>
  );
}

export function Accent({ children }: { children: ReactNode }) {
  return (
    <span className="bg-linear-to-b from-primary to-brand-deep box-decoration-clone bg-clip-text pr-0.5 text-transparent">
      {children}
    </span>
  );
}

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
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[13px] font-bold",
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

export function PrimaryButton({
  href,
  children,
  className,
  icon = true,
  iconclassName,
  textclassName,
}: {
  href: string;
  icon?: boolean;
  children: ReactNode;
  className?: string;
  textclassName?: string;
  iconclassName?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex shrink-0 rounded-full bg-primary/20 p-1 transition-colors duration-300 hover:bg-primary/30 sm:p-1.25",
        className,
      )}
    >
      <span className="flex items-center gap-2 rounded-full bg-linear-to-br from-primary to-brand-deep py-3 pr-2.5 pl-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] max-[359px]:px-3.5 sm:gap-2.5 sm:py-3.5 sm:pr-3.5 sm:pl-6">
        <span
          className={cn(
            "font-display text-[14.5px] leading-none font-semibold tracking-[-0.01em] whitespace-nowrap text-white max-[359px]:text-[13.5px] sm:text-[16px] lg:text-[17px]",
            textclassName,
          )}
        >
          {children}
        </span>
        {icon && (
          <span
            className={cn(
              "flex size-5 items-center justify-center rounded-full bg-white/20 max-[359px]:hidden sm:size-6",
              iconclassName,
            )}
          >
            <ArrowRightIcon
              aria-hidden
              className="size-3.5 text-white transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </span>
        )}
      </span>
    </Link>
  );
}

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
        "inline-flex shrink-0 items-center justify-center rounded-full border-2 border-primary/25 bg-white px-4 py-3.5 font-display text-[14.5px] leading-none font-semibold tracking-[-0.01em] whitespace-nowrap text-brand-deep transition-colors duration-300 hover:border-primary/50 hover:bg-primary/5 max-[359px]:px-3 max-[359px]:text-[13.5px] sm:px-6 sm:text-[16px] lg:text-[17px]",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function ButtonRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("flex flex-nowrap items-center gap-2 sm:gap-3", className)}
    >
      {children}
    </div>
  );
}

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
