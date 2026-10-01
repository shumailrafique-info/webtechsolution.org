import Image from "next/image";
import { TrendUpIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { CASE_STUDIES, type CaseStudy, CLIENT_LOGOS } from "./case-studies";
import { FOUNDED, PROJECTS_DELIVERED } from "./data";
import {
  Accent,
  ArrowLink,
  Container,
  SecondaryButton,
  SectionHeading,
} from "./primitives";

export function Clients() {
  const [featured, ...rest] = CASE_STUDIES;

  return (
    <section
      aria-labelledby="clients-title"
      className="bg-white py-20 md:py-28"
    >
      <Container>
        <SectionHeading
          id="clients-title"
          eyebrow="Selected work"
          title={
            <>
              Businesses that came to us to be <Accent>found.</Accent>
            </>
          }
          lede={`A few of the ${PROJECTS_DELIVERED} projects delivered since ${FOUNDED.year}, for publishers and businesses across our four markets.`}
        />

        <div className="mt-14 grid gap-4 md:mt-16">
          {featured ? <FeaturedStudy study={featured} /> : null}

          <ul className="grid gap-4 md:grid-cols-3">
            {rest.map((study) => (
              <li key={study.client} className="reveal">
                <StudyCard study={study} />
              </li>
            ))}
          </ul>
        </div>

        {/* Logos. */}
        <div className="reveal mt-16 md:mt-20">
          <p className="text-center text-[13.5px] font-medium text-neutral-500">
            Clients and partners
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {CLIENT_LOGOS.map((client) => (
              <li
                key={client.name}
                className="group flex h-24 items-center justify-center rounded-[18px] border border-neutral-200 bg-white px-5 transition-[border-color,box-shadow] duration-300 hover:border-neutral-300 hover:shadow-[0_14px_30px_-22px_rgba(30,20,10,0.35)]"
              >
                <Image
                  src={client.logo.src}
                  alt={client.name}
                  width={client.logo.width}
                  height={client.logo.height}
                  sizes="160px"
                  className="h-auto max-h-11 w-auto max-w-full object-contain opacity-80 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal mt-10 flex justify-center">
          <SecondaryButton href="/case-studies">
            Read the case studies
          </SecondaryButton>
        </div>
      </Container>
    </section>
  );
}

function ClientMark({
  study,
  className,
}: {
  study: CaseStudy;
  className?: string;
}) {
  return study.logo ? (
    <Image
      src={study.logo.src}
      alt={study.client}
      width={study.logo.width}
      height={study.logo.height}
      sizes="200px"
      className={cn("h-9 w-auto object-contain object-left", className)}
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

function ServicePills({ services }: { services: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
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

function FeaturedStudy({ study }: { study: CaseStudy }) {
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
        <div className="mt-6">
          <ServicePills services={study.services} />
        </div>
        <ArrowLink
          href={study.href ?? "/case-studies"}
          className="mt-auto pt-9"
        >
          Read the case study
        </ArrowLink>
      </div>

      <div className="flex flex-col border-t border-neutral-200 bg-neutral-50 p-5 md:p-8 lg:border-t-0 lg:border-l">
        {study.trend ? <TrendChart trend={study.trend} /> : null}
        <dl className="mt-4 grid grid-cols-3 gap-2.5">
          {study.metrics.map((metric) => (
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
      </div>
    </article>
  );
}

function TrendChart({ trend }: { trend: number[] }) {
  const width = 480;
  const height = 190;
  const pad = 8;
  const max = Math.max(...trend);
  const min = Math.min(...trend) * 0.6;
  const x = (index: number) =>
    pad + (index / (trend.length - 1)) * (width - pad * 2);
  const y = (value: number) =>
    pad + (1 - (value - min) / (max - min)) * (height - pad * 2);
  const line = trend
    .map((value, index) => `${index ? "L" : "M"}${x(index)},${y(value)}`)
    .join(" ");
  const area = `${line} L${x(trend.length - 1)},${height} L${x(0)},${height} Z`;
  const last = trend.length - 1;

  return (
    <figure
      aria-hidden
      className="relative rounded-[20px] border border-neutral-200 bg-white p-4 md:p-5"
    >
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-heading">
          Organic sessions
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[12px] font-semibold text-brand-deep">
          <TrendUpIcon className="size-3.5" />
          Month on month
        </span>
      </div>
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${width} ${height}`}
        className="mt-4 h-auto w-full overflow-visible"
      >
        <defs>
          <linearGradient id="trend-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((ratio) => (
          <line
            key={ratio}
            x1={0}
            x2={width}
            y1={height * ratio}
            y2={height * ratio}
            stroke="currentColor"
            strokeDasharray="3 5"
            className="text-neutral-200"
          />
        ))}
        <path d={area} fill="url(#trend-fill)" />
        <path
          d={line}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={x(last)}
          cy={y(trend[last])}
          r="6"
          fill="white"
          stroke="var(--primary)"
          strokeWidth="3"
        />
      </svg>
      <div className="mt-2 flex justify-between text-[11.5px] text-neutral-400">
        <span>Start</span>
        <span>Month {trend.length - 1}</span>
      </div>
    </figure>
  );
}

function StudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="flex h-full flex-col rounded-[24px] border border-neutral-200 bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-neutral-300 hover:shadow-[0_20px_45px_-30px_rgba(30,20,10,0.3)]">
      <div className="flex h-20 items-center rounded-[14px] bg-neutral-50 px-4 ring-1 ring-neutral-200/70">
        <ClientMark study={study} className="h-10" />
      </div>
      <p className="mt-5 text-[13px] font-medium text-neutral-500">
        {study.sector} · {study.duration}
      </p>
      <h3 className="mt-1.5 font-display text-[20px] leading-[1.15] font-bold tracking-tight text-heading">
        {study.title}
      </h3>
      <p className="mt-2.5 text-[14.5px] leading-[1.6] text-neutral-600">
        {study.summary}
      </p>
      <dl className="mt-auto grid grid-cols-2 gap-2 pt-6">
        {study.metrics.map((metric) => (
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
      <div className="mt-4">
        <ServicePills services={study.services} />
      </div>
    </article>
  );
}
