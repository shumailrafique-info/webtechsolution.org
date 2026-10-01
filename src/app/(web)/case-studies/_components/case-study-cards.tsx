import Link from "next/link";
import { ArrowLink } from "@/components/home/primitives";
import { cn } from "@/lib/utils";
import { ClientMark, ServicePills } from "./client-mark";
import type { CaseStudy } from "./data";
import { TrendChart } from "./trend-chart";

export const caseStudyHref = (study: CaseStudy) =>
  `/case-studies#${study.slug}`;

export function FeaturedStudy({ study }: { study: CaseStudy }) {
  return (
    <article className="reveal grid overflow-hidden rounded-[28px] border border-neutral-200 bg-white lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col p-7 md:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ClientMark study={study} />
          <span className="rounded-full bg-primary/10 px-3 py-1 text-[12.5px] font-semibold text-brand-deep ring-1 ring-primary/20">
            Featured case study
          </span>
        </div>
        <p className="mt-8 text-[13.5px] font-medium text-neutral-500">
          {study.sector} · {study.duration}
        </p>
        <h3 className="mt-2 font-display text-[28px] leading-[1.08] font-bold tracking-[-0.035em] text-balance text-heading md:text-[34px]">
          {study.title}
        </h3>
        <p className="mt-4 text-[15.5px] leading-[1.65] text-neutral-600">
          {study.summary}
        </p>
        <ServicePills services={study.services} className="mt-6" />
        <ArrowLink href={caseStudyHref(study)} className="mt-auto pt-9">
          Read the case study
        </ArrowLink>
      </div>

      <div className="flex flex-col border-t border-neutral-200 bg-neutral-50 p-5 md:p-8 lg:border-t-0 lg:border-l">
        <TrendChart
          id={`featured-${study.slug}`}
          trend={study.trend}
          label={study.trendLabel}
        />
        <MetricTiles metrics={study.metrics} className="mt-4" />
      </div>
    </article>
  );
}

export function StudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="group relative flex h-full flex-col rounded-[24px] border border-neutral-200 bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-neutral-300 hover:shadow-[0_20px_45px_-30px_rgba(30,20,10,0.3)]">
      <div className="flex h-20 items-center rounded-[14px] bg-neutral-50 px-4 ring-1 ring-neutral-200/70">
        <ClientMark study={study} className="h-10" />
      </div>
      <p className="mt-5 text-[13px] font-medium text-neutral-500">
        {study.sector} · {study.duration}
      </p>
      <h3 className="mt-1.5 font-display text-[20px] leading-[1.15] font-bold tracking-tight text-heading transition-colors group-hover:text-brand-deep">
        <Link
          href={caseStudyHref(study)}
          className="after:absolute after:inset-0"
        >
          {study.title}
        </Link>
      </h3>
      <p className="mt-2.5 text-[14.5px] leading-[1.6] text-neutral-600">
        {study.summary}
      </p>
      <dl className="mt-auto grid grid-cols-2 gap-2 pt-6">
        {study.metrics.slice(0, 2).map((metric) => (
          <div
            key={metric.label}
            className="flex flex-col rounded-[14px] bg-neutral-50 p-3 ring-1 ring-neutral-200/70"
          >
            <dt className="text-[12px] leading-snug text-neutral-500">
              {metric.label}
            </dt>
            <dd className="order-first mb-1 font-display text-[22px] leading-none font-bold tracking-[-0.035em] text-heading">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
      <ServicePills services={study.services} className="mt-4" />
    </article>
  );
}

export function MetricTiles({
  metrics,
  className,
}: {
  metrics: CaseStudy["metrics"];
  className?: string;
}) {
  return (
    <dl className={cn("grid grid-cols-3 gap-2.5", className)}>
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="flex flex-col rounded-[16px] border border-neutral-200 bg-white p-3.5 md:p-4"
        >
          <dt className="text-[12.5px] leading-snug text-neutral-500">
            {metric.label}
          </dt>
          <dd className="order-first mb-1 bg-linear-to-b from-primary to-brand-deep bg-clip-text font-display text-[24px] leading-none font-bold tracking-[-0.04em] text-transparent md:text-[30px]">
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
