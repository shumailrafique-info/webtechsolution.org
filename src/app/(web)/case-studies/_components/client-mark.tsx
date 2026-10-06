import Image from "next/image";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "./data";

export function ClientMark({
  study,
  className,
}: {
  study: Pick<CaseStudy, "client" | "logo">;
  className?: string;
}) {
  return study.logo ? (
    <Image
      src={study.logo.src}
      alt={study.client}
      width={study.logo.width}
      height={study.logo.height}
      sizes="240px"
      className={cn(
        "h-9 w-auto max-w-60 object-contain object-left",
        className,
      )}
    />
  ) : (
    <span
      className={cn(
        "inline-flex h-9 items-center gap-2 font-display text-[22px] font-bold tracking-[-0.03em] text-heading",
        className,
      )}
    >
      <span
        aria-hidden
        className="size-2.5 rounded-full bg-linear-to-br from-primary to-brand-deep"
      />
      {study.client}
    </span>
  );
}

export function ServicePills({
  services,
  className,
}: {
  services: string[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {services.map((service) => (
        <li
          key={service}
          className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-[12.5px] font-medium text-neutral-600"
        >
          {service}
        </li>
      ))}
    </ul>
  );
}
