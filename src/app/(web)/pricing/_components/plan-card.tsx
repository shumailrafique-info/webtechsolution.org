import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { type Plan, planHref } from "./data";

export function PlanCard({
  plan,
  featured = false,
}: {
  plan: Plan;
  featured?: boolean;
}) {
  return (
    <article
      aria-labelledby={`${plan.id}-name`}
      className={cn(
        "flex h-full flex-col rounded-[28px] p-7 md:p-8",
        featured
          ? "bg-linear-to-br from-primary to-brand-deep text-white shadow-[0_40px_80px_-40px_rgba(180,60,10,0.7)]"
          : "border border-neutral-200 bg-white",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "rounded-full px-3 py-1 text-[12.5px] font-semibold",
            featured
              ? "bg-white/15 text-white ring-1 ring-white/25"
              : "bg-primary/10 text-brand-deep ring-1 ring-primary/20",
          )}
        >
          {plan.tagline}
        </span>
        <span
          className={cn(
            "text-[13px] font-medium",
            featured ? "text-white/75" : "text-neutral-500",
          )}
        >
          {plan.billing}
        </span>
      </div>

      <h3
        id={`${plan.id}-name`}
        className={cn(
          "mt-6 font-display text-[22px] leading-tight font-bold tracking-tight",
          !featured && "text-heading",
        )}
      >
        {plan.name}
      </h3>
      <p className="mt-4 flex items-baseline gap-1">
        <span
          className={cn(
            "font-display text-[52px] leading-none font-bold tracking-tighter",
            !featured && "text-heading",
          )}
        >
          {plan.price}
        </span>
        <span
          className={cn(
            "text-[16px] font-medium",
            featured ? "text-white/75" : "text-neutral-500",
          )}
        >
          {plan.unit}
        </span>
      </p>
      <p
        className={cn(
          "mt-4 text-[15px] leading-[1.6]",
          featured ? "text-white/85" : "text-neutral-600",
        )}
      >
        {plan.summary}
      </p>

      <ul
        className={cn(
          "mt-7 grid gap-2.5 border-t pt-7",
          featured ? "border-white/20" : "border-neutral-200",
        )}
      >
        {plan.features.map((feature) => (
          <li
            key={feature}
            className={cn(
              "flex items-start gap-2.5 text-[15px] leading-snug",
              featured ? "text-white" : "text-neutral-700",
            )}
          >
            <span
              className={cn(
                "mt-px flex size-5 shrink-0 items-center justify-center rounded-full",
                featured
                  ? "bg-white text-brand-deep"
                  : "bg-primary/10 text-brand-deep",
              )}
            >
              <CheckIcon aria-hidden className="size-3" />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <Link
          href={planHref(plan.id)}
          className={cn(
            "group flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display text-[16px] leading-none font-semibold tracking-[-0.01em] transition-[background-color,transform] duration-300 hover:-translate-y-0.5",
            featured
              ? "bg-white text-brand-deep shadow-[0_12px_30px_-14px_rgba(0,0,0,0.5)]"
              : "bg-heading text-white hover:bg-brand-deep",
          )}
        >
          {plan.cta}
          <ArrowRightIcon
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
