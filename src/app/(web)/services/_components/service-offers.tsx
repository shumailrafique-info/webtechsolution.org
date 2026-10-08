import type { ReactNode } from "react";
import {
  Accent,
  ArrowLink,
  Container,
  Eyebrow,
} from "@/components/home/primitives";
import type { Point } from "./data";

export function ServiceOffers({
  name,
  title,
  intro,
  why,
  offers,
}: {
  name: string;
  title?: ReactNode;
  intro?: string;
  why: string;
  offers: Point[];
}) {
  return (
    <section
      aria-labelledby="offers-title"
      className="border-t border-neutral-200/70 bg-neutral-50 py-14 md:py-20 lg:py-24"
    >
      <Container className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Eyebrow className="reveal">What we offer</Eyebrow>
            <h2
              id="offers-title"
              className="reveal mt-5 font-display text-[34px] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-heading sm:text-[42px]"
            >
              {title ?? (
                <>
                  Our {name} <Accent>services.</Accent>
                </>
              )}
            </h2>
            {intro ? (
              <p className="reveal mt-5 text-[16.5px] leading-[1.65] text-neutral-600">
                {intro}
              </p>
            ) : null}

            <div className="reveal mt-8 rounded-[24px] bg-heading p-7 text-white">
              <p className="font-display text-[20px] font-bold tracking-tight">
                Why choose <span className="text-primary">us</span>
              </p>
              <p className="mt-2.5 text-[15.5px] leading-[1.65] text-neutral-300">
                {why}
              </p>
              <ArrowLink href="/case-studies" tone="dark" className="mt-5">
                See our work
              </ArrowLink>
            </div>
          </div>
        </div>

        <ol className="grid content-start gap-3 lg:col-span-7">
          {offers.map((offer, index) => (
            <li
              key={offer.title}
              className="reveal flex gap-5 rounded-[22px] border border-neutral-200 bg-white p-6"
            >
              <span className="font-display text-[26px] leading-none font-bold tracking-[-0.04em] text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-[19px] leading-snug font-bold tracking-[-0.02em] text-heading">
                  {offer.title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-[1.6] text-neutral-600">
                  {offer.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
