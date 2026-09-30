import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  id,
  title,
  description,
  action,
  className,
}: {
  id?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6", className)}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <h2
          id={id}
          className="text-[26px] font-semibold tracking-tight text-foreground"
        >
          {title}
        </h2>
        {action}
      </div>
      {description ? (
        <p className="mt-1.5 max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
