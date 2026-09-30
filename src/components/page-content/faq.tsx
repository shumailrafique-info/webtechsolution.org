import type { ReactNode } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { SectionHeading } from "./section-heading";

export function FaqEntry({
  question,
  children,
}: {
  question: string;
  children: ReactNode;
}) {
  return (
    <details className="group rounded-xl border border-border bg-card open:border-primary/30 open:shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 text-[16px] font-medium text-foreground transition-colors hover:text-primary">
        <span>{question}</span>
        <ChevronDownIcon
          aria-hidden
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <div className="max-w-[66ch] px-5 pb-5 text-[15px] leading-[1.75] text-muted-foreground">
        {children}
      </div>
    </details>
  );
}

export function Faq({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby="faq-heading">
      <SectionHeading id="faq-heading" title={title} />
      <div className="grid gap-3">{children}</div>
    </section>
  );
}
