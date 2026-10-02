import Image from "next/image";
import { FOUNDED, PROJECTS_DELIVERED } from "@/components/home/data";
import {
  Accent,
  ArrowLink,
  Container,
  Eyebrow,
  IconBadge,
  PrimaryButton,
  SecondaryButton,
  TrustChip,
} from "@/components/home/primitives";
import {
  CalendarIcon,
  CompassIcon,
  RocketIcon,
  SealCheckIcon,
  StrategyIcon,
  UsersIcon,
  WrenchIcon,
} from "@/components/icons";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, breadcrumbList, graph, organizationRef } from "@/lib/seo";
import { cn } from "@/lib/utils";
import {
  DEFAULT_PILLARS,
  GROUPS,
  imageOf,
  type Service,
  serviceHref,
  servicesIn,
} from "./data";
import { RelatedPosts } from "./related-posts";
import { ServiceCard } from "./service-card";
import { ServiceCta } from "./service-cta";

const PILLAR_ICONS = [CompassIcon, StrategyIcon, RocketIcon, WrenchIcon];

export function ServiceDetail({ service }: { service: Service }) {
  const group = GROUPS[service.group];
  const groupLabel = `${group.title} ${group.accent}`;
  const pillars = service.pillars ?? DEFAULT_PILLARS;
  const siblings = servicesIn(service.group)
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  const path = serviceHref(service.slug);
  const schema = graph([
    breadcrumbList([
      { name: "Home", path: "/" },
      { name: groupLabel, path: group.href },
      { name: service.name, path },
    ]),
    {
      "@type": "Service",
      "@id": `${absoluteUrl(path)}#service`,
      name: service.metaTitle,
      serviceType: service.name,
      description: service.metaDescription,
      url: absoluteUrl(path),
      provider: organizationRef,
      areaServed: ["PK", "GB", "ES", "US"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: service.offersTitle ?? `${service.name} services`,
        itemListElement: service.offers.map((offer) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: offer.title,
            description: offer.body,
          },
        })),
      },
    },
  ]);

  return (
    <>
      <JsonLd data={schema} />

      <section
        aria-labelledby="service-title"
        className="overflow-hidden bg-white pt-6 pb-12 md:pb-16"
      >
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: groupLabel, href: group.href },
              { label: service.name },
            ]}
            className="mb-0"
          />

          <div className="mt-10 grid items-center gap-10 md:mt-12 md:gap-12 lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-7">
              <Eyebrow className="enter">{groupLabel}</Eyebrow>
              <h1
                id="service-title"
                className="enter mt-6 font-display text-[40px] leading-[1.02] font-bold tracking-[-0.045em] text-balance text-heading sm:text-[52px] lg:text-[60px]"
              >
                {service.hero.title} <Accent>{service.hero.accent}</Accent>
              </h1>
              <p className="enter mt-6 max-w-[58ch] text-[17px] leading-[1.7] text-neutral-600 md:text-[18px]">
                {service.hero.intro}
              </p>
              <div className="enter mt-9 flex flex-nowrap items-center gap-2 sm:gap-3">
                <PrimaryButton href="/contact-us#query">
                  Start a project
                </PrimaryButton>
                <SecondaryButton href="/pricing">See pricing</SecondaryButton>
              </div>
              <ul className="enter mt-9 flex flex-wrap gap-x-6 gap-y-3">
                <TrustChip icon={CalendarIcon}>Since {FOUNDED.year}</TrustChip>
                <TrustChip icon={SealCheckIcon}>
                  {PROJECTS_DELIVERED} projects delivered
                </TrustChip>
                <TrustChip icon={UsersIcon}>In-house team</TrustChip>
              </ul>
            </div>

            <figure className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
              <div className="enter-image relative aspect-square overflow-hidden rounded-[32px] border border-primary/10 bg-brand-tint">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_70%)]"
                />
                <Image
                  src={imageOf(service.slug)}
                  alt={`${service.name} services by WebTech Solutions`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 38vw, (min-width: 448px) 28rem, 90vw"
                  className="object-contain p-10 md:p-14"
                />
              </div>
              <div className="enter absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-[0_18px_40px_-20px_rgba(30,20,10,0.35)]">
                <IconBadge icon={service.icon} />
                <span>
                  <span className="block font-display text-[15px] font-bold tracking-[-0.01em] text-heading">
                    {service.name}
                  </span>
                  <span className="text-[12.5px] text-neutral-500">
                    {service.offers.length} services included
                  </span>
                </span>
              </div>
            </figure>
          </div>
        </Container>
      </section>

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
                {service.offersTitle ?? (
                  <>
                    Our {service.name} <Accent>services.</Accent>
                  </>
                )}
              </h2>
              {service.offersIntro ? (
                <p className="reveal mt-5 text-[16.5px] leading-[1.65] text-neutral-600">
                  {service.offersIntro}
                </p>
              ) : null}

              <div className="reveal mt-8 rounded-[24px] bg-heading p-7 text-white">
                <p className="font-display text-[20px] font-bold tracking-tight">
                  Why choose <span className="text-primary">us</span>
                </p>
                <p className="mt-2.5 text-[15.5px] leading-[1.65] text-neutral-300">
                  {service.why}
                </p>
                <ArrowLink href="/case-studies" tone="dark" className="mt-5">
                  See our work
                </ArrowLink>
              </div>
            </div>
          </div>

          <ol className="grid content-start gap-3 lg:col-span-7">
            {service.offers.map((offer, index) => (
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

      <section
        aria-labelledby="pillars-title"
        className="border-y border-primary/10 bg-brand-tint py-14 md:py-20"
      >
        <Container>
          <div className="reveal mx-auto max-w-3xl text-center">
            <h2
              id="pillars-title"
              className="font-display text-[32px] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-heading sm:text-[40px]"
            >
              {service.reasons ? (
                <>
                  Why choose WebTech Solutions for{" "}
                  <Accent>{service.name.toLowerCase()}.</Accent>
                </>
              ) : (
                <>
                  How we <Accent>deliver.</Accent>
                </>
              )}
            </h2>
            {service.reasons ? (
              <p className="mt-5 text-[16.5px] leading-[1.65] text-neutral-600">
                {service.reasons.lede}
              </p>
            ) : null}
          </div>

          {service.reasons ? (
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {service.reasons.items.map((item, index) => (
                <li
                  key={item.title}
                  className={cn(
                    "reveal rounded-[22px] border border-neutral-200 bg-white p-6",
                    index < 2 ? "lg:col-span-3" : "lg:col-span-2",
                    index === 4 && "sm:col-span-2 lg:col-span-2",
                  )}
                >
                  <span className="font-display text-[15px] font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-[19px] leading-snug font-bold tracking-[-0.02em] text-heading">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-neutral-600">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar, index) => (
                <li
                  key={pillar.title}
                  className="reveal rounded-[22px] border border-neutral-200 bg-white p-6"
                >
                  <IconBadge icon={PILLAR_ICONS[index % PILLAR_ICONS.length]} />
                  <h3 className="mt-5 font-display text-[19px] font-bold tracking-[-0.02em] text-heading">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-neutral-600">
                    {pillar.body}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      <section
        aria-labelledby="importance-title"
        className="bg-white pt-14 md:pt-20"
      >
        <Container>
          <div className="reveal grid gap-8 rounded-[28px] bg-heading p-8 text-white md:grid-cols-[1fr_1.5fr] md:items-start md:p-12">
            <h2
              id="importance-title"
              className="font-display text-[30px] leading-[1.05] font-bold tracking-[-0.035em] text-balance md:text-[38px]"
            >
              {service.importance.title}
            </h2>
            <p className="text-[17px] leading-[1.75] text-neutral-300 md:text-[18px]">
              {service.importance.body}
            </p>
          </div>
        </Container>
      </section>

      {siblings.length > 0 ? (
        <section
          aria-labelledby="siblings-title"
          className="bg-white pt-12 md:pt-16"
        >
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2
                id="siblings-title"
                className="font-display text-[30px] leading-tight font-bold tracking-[-0.035em] text-heading md:text-[38px]"
              >
                More in <Accent>{groupLabel.toLowerCase()}.</Accent>
              </h2>
              <ArrowLink href={group.href}>
                All {groupLabel.toLowerCase()}
              </ArrowLink>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((item) => (
                <li key={item.slug}>
                  <ServiceCard service={item} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <RelatedPosts topic={service.topic} />

      <ServiceCta
        title={`Ready to grow with ${service.name}?`}
        accent="Let’s talk."
      />
    </>
  );
}
