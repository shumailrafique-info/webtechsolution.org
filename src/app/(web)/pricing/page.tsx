import type { Metadata } from "next";
import Link from "next/link";
import { LogoWall } from "@/app/(web)/case-studies/_components/logo-wall";
import { FOUNDED, PROJECTS_DELIVERED } from "@/components/home/data";
import {
  Accent,
  Container,
  Eyebrow,
  Italic,
  PrimaryButton,
  TrustChip,
} from "@/components/home/primitives";
import {
  CalendarIcon,
  LifebuoyIcon,
  PlusIcon,
  SealCheckIcon,
} from "@/components/icons";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbList, graph, organizationRef } from "@/lib/seo";
import { ComparisonTable } from "./_components/comparison-table";
import { PARTNERS, PLANS, PRICING_FAQS, planHref } from "./_components/data";
import { PlanCard } from "./_components/plan-card";

const TITLE = "Pricing";
const PATH = "/pricing";
const DESCRIPTION = `WebTech Solutions pricing: ${PLANS.map((plan) => `${plan.name} ${plan.price}${plan.unit}`).join(", ")}. Choose the plan that fits your business growth.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH },
};

const schema = graph([
  breadcrumbList([
    { name: "Home", path: "/" },
    { name: TITLE, path: PATH },
  ]),
  {
    "@type": "OfferCatalog",
    name: "WebTech Solutions plans",
    provider: organizationRef,
    itemListElement: PLANS.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: plan.summary,
      price: plan.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
    })),
  },
  {
    "@type": "FAQPage",
    mainEntity: PRICING_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />

      <section
        aria-labelledby="pricing-title"
        className="bg-white pt-6 pb-14 md:pb-20 lg:pb-24"
      >
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: TITLE }]}
            className="mb-0"
          />

          <div className="mx-auto mt-10 max-w-3xl text-center md:mt-12">
            <Eyebrow className="enter">Our pricing plans</Eyebrow>
            <h1
              id="pricing-title"
              className="enter mt-6 font-display text-[42px] leading-none font-bold tracking-[-0.045em] text-balance text-heading sm:text-[56px] lg:text-[64px]"
            >
              Pricing plans built for your <Accent>business.</Accent>
            </h1>
            <p className="enter mx-auto mt-6 max-w-[56ch] text-[17px] leading-[1.65] text-neutral-600 md:text-[18.5px]">
              Choose the perfect plan for your business growth &mdash; from a
              one-to-one consultation to a full website launch and long-term
              SEO.
            </p>
            <ul className="enter mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
              <TrustChip icon={CalendarIcon}>Since {FOUNDED.year}</TrustChip>
              <TrustChip icon={SealCheckIcon}>
                {PROJECTS_DELIVERED} projects delivered
              </TrustChip>
              <TrustChip icon={LifebuoyIcon}>
                Premium support on website plans
              </TrustChip>
            </ul>
          </div>

          <ul className="mt-10 grid items-stretch gap-4 md:mt-12 lg:grid-cols-3">
            {PLANS.map((plan, index) => (
              <li key={plan.id} className="enter">
                <PlanCard plan={plan} featured={index === 1} />
              </li>
            ))}
          </ul>
          <p className="enter mt-6 text-center text-[13.5px] text-neutral-500">
            Prices in US dollars. Every plan starts with a conversation, so the
            details are confirmed with you before any work begins.
          </p>
        </Container>
      </section>

      <section
        aria-labelledby="compare-title"
        className="border-t border-neutral-200/70 bg-neutral-50 py-14 md:py-20 lg:py-24"
      >
        <Container>
          <div className="reveal mx-auto max-w-3xl text-center">
            <Eyebrow>Side by side</Eyebrow>
            <h2
              id="compare-title"
              className="mt-5 font-display text-[34px] leading-[1.05] font-bold tracking-[-0.035em] text-heading sm:text-[42px] lg:text-[50px]"
            >
              Compare the <Accent>plans.</Accent>
            </h2>
          </div>
          <div className="mt-12">
            <ComparisonTable />
          </div>

          <div className="reveal mt-6 flex flex-col items-start justify-between gap-6 rounded-[24px] bg-heading p-7 text-white md:flex-row md:items-center md:p-9">
            <div>
              <h3 className="font-display text-[24px] leading-tight font-bold tracking-[-0.03em] md:text-[28px]">
                Not sure which plan{" "}
                <Italic className="text-primary">fits?</Italic>
              </h3>
              <p className="mt-2 max-w-[56ch] text-[15.5px] leading-[1.6] text-neutral-400">
                Start with a one-to-one {PLANS[0].name}. You will leave with a
                personalized SEO strategy and a clear idea of what to do next.
              </p>
            </div>
            <PrimaryButton href={planHref("consultation")}>
              Book a consultation
            </PrimaryButton>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="partners-title"
        className="border-y border-primary/10 bg-brand-tint py-12 md:py-16"
      >
        <Container>
          <div className="reveal text-center">
            <h2
              id="partners-title"
              className="font-display text-[26px] font-bold tracking-[-0.03em] text-heading md:text-[32px]"
            >
              {PARTNERS.title} <Italic>{PARTNERS.accent}</Italic>
            </h2>
            <p className="mt-2 text-[15.5px] text-neutral-600">
              {PARTNERS.lede}
            </p>
          </div>
          <LogoWall className="reveal mt-9" />
        </Container>
      </section>

      <section
        id="faq"
        aria-labelledby="pricing-faq-title"
        className="scroll-mt-24 bg-white py-14 md:py-20 lg:py-24"
      >
        <Container className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="reveal lg:col-span-5">
            <Eyebrow>FAQ</Eyebrow>
            <h2
              id="pricing-faq-title"
              className="mt-5 font-display text-[34px] leading-[1.05] font-bold tracking-[-0.035em] text-heading sm:text-[42px] lg:text-[50px]"
            >
              Pricing <Accent>questions.</Accent>
            </h2>
            <p className="mt-5 max-w-[40ch] text-[16.5px] leading-[1.65] text-neutral-600">
              More answers on the{" "}
              <Link
                href="/faqs"
                className="font-semibold text-brand-deep underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
              >
                FAQs page
              </Link>
              .
            </p>
          </div>
          <div className="lg:col-span-7">
            {PRICING_FAQS.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="reveal group border-b border-neutral-200 first:border-t"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-[19px] leading-snug font-bold tracking-[-0.02em] text-heading md:text-[21px]">
                    {faq.question}
                  </h3>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-[transform,background-color,color,border-color] duration-300 group-open:rotate-45 group-open:border-transparent group-open:bg-primary group-open:text-white">
                    <PlusIcon aria-hidden className="size-4" />
                  </span>
                </summary>
                <p className="-mt-1 pb-7 text-[16px] leading-[1.7] text-neutral-600 md:pr-14">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
