import { Container } from "@/components/home/primitives";
import { cn } from "@/lib/utils";
import { MetricTiles } from "./case-study-cards";
import { ClientMark, ServicePills } from "./client-mark";
import type { CaseStudy } from "./data";
import { TrendChart } from "./trend-chart";

export function CaseStudyStory({
  study,
  index,
  total,
}: {
  study: CaseStudy;
  index: number;
  total: number;
}) {
  const tinted = index % 2 === 1;

  return (
    <article
      id={study.slug}
      aria-labelledby={`${study.slug}-title`}
      className={cn(
        "scroll-mt-24 py-14 md:py-20",
        tinted
          ? "border-y border-neutral-200/70 bg-neutral-50"
          : "bg-brand-tint",
      )}
    >
      <Container>
        <header className="reveal">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div
              className={cn(
                "flex h-16 items-center rounded-[16px] px-5 ring-1 ring-neutral-200/80",
                tinted ? "bg-white" : "bg-neutral-50",
              )}
            >
              <ClientMark study={study} className="h-9" />
            </div>
            <span className="font-display text-[15px] font-bold tracking-[-0.02em] text-black">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-8 text-[14px] font-medium text-neutral-500">
            {study.sector} · {study.duration}
          </p>
          <h2
            id={`${study.slug}-title`}
            className="mt-2 max-w-[22ch] font-display text-[32px] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-heading md:text-[44px]"
          >
            {study.title}
          </h2>
          <p className="mt-5 max-w-[62ch] text-[17px] leading-[1.65] text-neutral-600">
            {study.summary}
          </p>
          <ServicePills services={study.services} className="mt-6" />
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-x-12">
          <div className="grid gap-10 lg:col-span-7">
            <section className="reveal">
              <h3 className="font-display text-[22px] font-bold tracking-tight text-heading">
                The challenge
              </h3>
              <p className="mt-3 text-[16px] leading-[1.7] text-neutral-600">
                {study.challenge}
              </p>
            </section>

            <section className="reveal">
              <h3 className="font-display text-[22px] font-bold tracking-tight text-heading">
                What we did
              </h3>
              <ol className="mt-5 grid gap-3">
                {study.approach.map((step, stepIndex) => (
                  <li
                    key={step.title}
                    className={cn(
                      "flex gap-4 rounded-[18px] border border-neutral-200 p-5",
                      tinted ? "bg-white" : "bg-white",
                    )}
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-heading font-display text-[13px] font-bold text-white">
                      {stepIndex + 1}
                    </span>
                    <div>
                      <p className="font-display text-[17px] font-bold tracking-[-0.02em] text-heading">
                        {step.title}
                      </p>
                      <p className="mt-1 text-[15px] leading-[1.6] text-neutral-600">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="reveal">
              <h3 className="font-display text-[22px] font-bold tracking-tight text-heading">
                The result
              </h3>
              <p className="mt-3 text-[16px] leading-[1.7] text-neutral-600">
                {study.outcome}
              </p>
            </section>
          </div>

          <aside className="reveal lg:col-span-5">
            <div className="grid gap-4 lg:sticky lg:top-28">
              <TrendChart
                id={study.slug}
                trend={study.trend}
                label={study.trendLabel}
              />
              <MetricTiles metrics={study.metrics} />
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}
