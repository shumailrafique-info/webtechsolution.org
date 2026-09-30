import Link from "next/link";
import { cn } from "@/lib/utils";

export function Brand({
  className,
  size = "md",
}: {
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      aria-label="Web Tech Solutions home"
    >
      <span
        aria-hidden
        className={cn(
          "grid shrink-0 place-items-center rounded-lg bg-primary font-semibold text-primary-foreground leading-none",
          size === "lg" ? "size-10 text-[20px]" : "size-8 text-[16px]",
        )}
      >
        W
      </span>
      <span
        className={cn(
          "font-semibold tracking-tight text-foreground leading-none",
          size === "lg" ? "text-[22px]" : "text-[18px]",
        )}
      >
        Web Tech <span className="text-primary">Solutions</span>
      </span>
    </Link>
  );
}
