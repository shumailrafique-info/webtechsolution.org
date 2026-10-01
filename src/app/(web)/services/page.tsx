import type { Metadata } from "next";
import Image from "next/image";
import { FOUNDED, OFFICES, PROJECTS_DELIVERED } from "@/components/home/data";
import {
  Accent,
  ArrowLink,
  Container,
  Eyebrow,
  Italic,
  PrimaryButton,
  SecondaryButton,
  TrustChip,
} from "@/components/home/primitives";
import { Process } from "@/components/home/process";
import { Stats } from "@/components/home/stats";
import {
  BuildingsIcon,
  CalendarIcon,
  CheckIcon,
  SealCheckIcon,
} from "@/components/icons";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, breadcrumbList, graph, organizationRef } from "@/lib/seo";
import {
  GROUPS,
  OVERVIEW,
  SERVICES,
  type ServiceGroup,
  serviceHref,
  servicesIn,
} from "./_components/data";
import { RelatedPosts } from "./_components/related-posts";
import { ServiceCard } from "./_components/service-card";
import { ServiceCta } from "./_components/service-cta";

const TITLE = "Our Services";
const PATH = "/services";
const DESCRIPTION =
  "WebTech Solutions offers tailored digital marketing solutions, including SEO, PPC, social media, web and app development, and expert online strategies.";

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
    "@type": "ItemList",
    name: "WebTech Solutions services",
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(serviceHref(service.slug)),
      name: service.name,
    })),
  },
  {
    "@type": "OfferCatalog",
    name: "WebTech Solutions services",
    provider: organizationRef,
    itemListElement: SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.summary,
      },
    })),
  },
]);

const ORDER: ServiceGroup[] = ["core", "marketing"];

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />

      <section
        aria-labelledby="services-title"
        className="bg-white pt-6 pb-12 md:pb-16"
      >
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: TITLE }]}
            className="mb-0"
          />

          <div className="mx-auto mt-10 max-w-4xl text-center md:mt-12">
            <Eyebrow className="enter">{OVERVIEW.eyebrow}</Eyebrow>
            <h1
              id="services-title"
              className="enter mt-6 font-display text-[40px] leading-[1.02] font-bold tracking-[-0.045em] text-balance text-heading sm:text-[54px] lg:text-[64px]"
            >
              {OVERVIEW.title} <Accent>{OVERVIEW.accent}</Accent>
            </h1>
            <p className="enter mx-auto mt-6 max-w-[58ch] text-[17px] leading-[1.65] text-neutral-600 md:text-[18.5px]">
              {OVERVIEW.intro}
            </p>
            <div className="enter mt-9 flex flex-wrap items-center justify-center gap-3">
              <PrimaryButton href="/contact-us#query">
                Start a project
              </PrimaryButton>
              <SecondaryButton href="/pricing">See pricing</SecondaryButton>
            </div>
            <ul className="enter mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3">
              <TrustChip icon={CalendarIcon}>Since {FOUNDED.year}</TrustChip>
              <TrustChip icon={SealCheckIcon}>
                {PROJECTS_DELIVERED} projects delivered
              </TrustChip>
              <TrustChip icon={BuildingsIcon}>
                {OFFICES.length} offices
              </TrustChip>
            </ul>
          </div>
        </Container>
      </section>

      {ORDER.map((groupId, index) => {
        const group = GROUPS[groupId];
        const items = servicesIn(groupId);
        return (
          <section
            key={groupId}
            id={groupId}
            aria-labelledby={`${groupId}-title`}
            className={
              index === 0
                ? "scroll-mt-24 border-t border-neutral-200/70 bg-neutral-50 py-14 md:py-20"
                : "scroll-mt-24 bg-white py-14 md:py-20"
            }
          >
            <Container>
              <div className="reveal flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
                <div>
                  <h2
                    id={`${groupId}-title`}
                    className="font-display text-[34px] leading-[1.05] font-bold tracking-[-0.035em] text-heading sm:text-[44px]"
                  >
                    {group.title} <Italic>{group.accent}</Italic>
                  </h2>
                  <p className="mt-3 max-w-[56ch] text-[16.5px] leading-[1.65] text-neutral-600">
                    {group.lede}
                  </p>
                </div>
                {groupId === "marketing" ? (
                  <ArrowLink href={group.href}>
                    About our digital marketing
                  </ArrowLink>
                ) : null}
              </div>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((service) => (
                  <li key={service.slug} className="reveal">
                    <ServiceCard service={service} headingLevel="h3" />
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        );
      })}

      <Stats />

      <section
        aria-labelledby="why-title"
        className="overflow-hidden bg-white py-14 md:py-20 lg:py-24"
      >
        <Container className="grid items-center gap-10 md:gap-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="reveal lg:col-span-6">
            <Eyebrow>{OVERVIEW.why.eyebrow}</Eyebrow>
            <h2
              id="why-title"
              className="mt-5 font-display text-[34px] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-heading sm:text-[44px]"
            >
              {OVERVIEW.why.title} <Accent>{OVERVIEW.why.accent}</Accent>
            </h2>
            <p className="mt-5 text-[17px] leading-[1.7] text-neutral-600">
              {OVERVIEW.why.body}
            </p>
            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {[
                "Tailored strategy for every business",
                "SEO, content, social and PPC under one roof",
                "Measurable results you can follow",
                "Long-term success, not quick wins",
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-[15px] leading-snug text-neutral-700"
                >
                  <span className="mt-px flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-brand-deep">
                    <CheckIcon aria-hidden className="size-3" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <figure className="reveal-image relative mx-auto w-full max-w-md lg:col-span-6 lg:max-w-none">
            <div className="relative aspect-4/3 overflow-hidden rounded-[28px] bg-neutral-200">
              <Image
                src="/images/home/studio.webp"
                alt="Fawad Mohsin, founder of WebTech Solutions, at work with the team"
                fill
                sizes="(min-width: 1024px) 46vw, 90vw"
                className="object-cover object-[50%_30%]"
              />
            </div>
            <figcaption className="absolute bottom-4 left-4 rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-[0_18px_40px_-20px_rgba(30,20,10,0.35)]">
              <span className="block font-display text-[16px] font-bold tracking-[-0.02em] text-heading">
                {OVERVIEW.why.badge}
              </span>
              <span className="text-[13px] text-neutral-500">
                One in-house team since {FOUNDED.year}
              </span>
            </figcaption>
          </figure>
        </Container>
      </section>

      <Process />

      <RelatedPosts topic="digital marketing" />

      <ServiceCta
        title="Not sure which service you need?"
        accent="Ask us."
        body="Tell us about your business and goals — we’ll point you to the services that fit."
      />
    </>
  );
}
