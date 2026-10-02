import Link from "next/link";
import { Container } from "@/components/home/primitives";

export function ServiceCta({
  title,
  accent,
  body = "Tell us where your business is today and where you want it to be.",
}: {
  title: string;
  accent: string;
  body?: string;
}) {
  return (
    <section
      aria-labelledby="service-cta-title"
      className="bg-white pb-12 md:pb-16"
    >
      <Container>
        <div className="reveal flex flex-col items-start justify-between gap-8 rounded-[28px] bg-linear-to-br from-primary to-brand-deep p-6 sm:p-8 text-white md:flex-row md:items-center md:p-12">
          <div>
            <h2
              id="service-cta-title"
              className="font-display text-[30px] leading-[1.05] font-bold tracking-[-0.035em] text-balance md:text-[42px]"
            >
              {title} {accent}
            </h2>
            <p className="mt-3 max-w-[50ch] text-[16.5px] leading-[1.65] text-white/85">
              {body}
            </p>
          </div>
          <div className="flex shrink-0 flex-nowrap items-center gap-2 sm:gap-3">
            <Link
              href="/contact-us#query"
              className="inline-flex shrink-0 items-center rounded-full bg-white px-4 py-3.5 font-display text-[14.5px] whitespace-nowrap max-[359px]:px-3 max-[359px]:text-[13.5px] sm:px-6 sm:text-[16px] leading-none font-semibold tracking-[-0.01em] text-brand-deep shadow-[0_12px_30px_-14px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start a project
            </Link>
            <Link
              href="/pricing"
              className="inline-flex shrink-0 items-center rounded-full border-2 border-white/40 px-4 py-3 font-display text-[14.5px] whitespace-nowrap max-[359px]:px-3 max-[359px]:text-[13.5px] sm:px-6 sm:text-[16px] leading-none font-semibold tracking-[-0.01em] text-white transition-colors hover:border-white"
            >
              See pricing
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
