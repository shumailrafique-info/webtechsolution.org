import type { Metadata } from "next";
import Image from "next/image";
import { FOUNDED, PROJECTS_DELIVERED } from "@/components/home/data";
import {
  Accent,
  Container,
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  TrustChip,
} from "@/components/home/primitives";
import { CalendarIcon, SealCheckIcon, UsersIcon } from "@/components/icons";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, breadcrumbList, graph, organizationRef } from "@/lib/seo";
import { imageOf, serviceHref, servicesIn } from "../_components/data";
import { RelatedPosts } from "../_components/related-posts";
import { ServiceCard } from "../_components/service-card";
import { ServiceCta } from "../_components/service-cta";
import { ServicePillars } from "../_components/service-pillars";

const HOW_WE_DELIVER = [
  {
    title: "Discover",
    body: "Business goals, audience, competitors and budget mapped.",
  },
  {
    title: "Strategy",
    body: "Channel mix and 90-day roadmap approved by you.",
  },
  {
    title: "Execute",
    body: "Campaigns run across SEO, ads, social and email as one plan.",
  },
  {
    title: "Report",
    body: "One dashboard: spend, traffic, leads and ROI, monthly.",
  },
];

const PATH = "/services/digital-marketing";

export const metadata: Metadata = pageMetadata({
  title: "Digital Marketing Solutions Provider - WebTech Solutions",
  description:
    "WebTech Solutions offers tailored digital marketing solutions, and we create custom strategies for each of our clients based on their goals.",
  path: "/services/digital-marketing",
});

const marketing = servicesIn("marketing");

const schema = graph([
  breadcrumbList([
    { name: "Home", path: "/" },
    { name: "Our Services", path: "/services" },
    { name: "Digital Marketing", path: PATH },
  ]),
  {
    "@type": "Service",
    "@id": `${absoluteUrl(PATH)}#service`,
    name: "Digital Marketing Services",
    serviceType: "Digital marketing",
    description:
      "WebTech Solutions offers tailored digital marketing solutions, creating custom strategies for each client based on their goals.",
    url: absoluteUrl(PATH),
    provider: organizationRef,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital marketing services",
      itemListElement: marketing.map((service) => ({
        "@type": "Offer",
        url: absoluteUrl(serviceHref(service.slug)),
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.summary,
        },
      })),
    },
  },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />

      <section
        aria-labelledby="dm-title"
        className="overflow-hidden bg-white pt-6 pb-12 md:pb-16"
      >
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Our Services", href: "/services" },
              { label: "Digital Marketing" },
            ]}
            className="mb-0"
          />

          <div className="mt-10 grid items-center gap-10 md:mt-12 md:gap-12 lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-7">
              <Eyebrow className="enter">Our Services</Eyebrow>
              <h1
                id="dm-title"
                className="enter mt-6 font-display text-[40px] leading-[1.02] font-bold tracking-[-0.045em] text-balance text-heading sm:text-[52px] lg:text-[60px]"
              >
                Digital marketing solutions built around your{" "}
                <Accent>goals.</Accent>
              </h1>
              <p className="enter mt-6 max-w-[56ch] text-[17px] leading-[1.7] text-neutral-600 md:text-[18px]">
                We offer tailored digital marketing solutions, creating a custom
                strategy for each client based on their goals — then running the
                campaigns that reach the right people.
              </p>
              <div className="enter mt-9 flex flex-nowrap items-center gap-2 sm:gap-3">
                <PrimaryButton href="/contact-us#query">
                  Start a campaign
                </PrimaryButton>
                <SecondaryButton href="#channels">See channels</SecondaryButton>
              </div>
              <ul className="enter mt-9 flex flex-wrap gap-x-6 gap-y-3">
                <TrustChip icon={CalendarIcon}>Since {FOUNDED.year}</TrustChip>
                <TrustChip icon={SealCheckIcon}>
                  {PROJECTS_DELIVERED} projects delivered
                </TrustChip>
                <TrustChip icon={UsersIcon}>
                  {marketing.length} marketing channels
                </TrustChip>
              </ul>
            </div>

            <div
              aria-hidden
              className="enter-image relative grid aspect-square grid-cols-2 gap-3 rounded-[32px] border border-primary/10 bg-brand-tint p-5 lg:col-span-5"
            >
              {marketing.slice(0, 4).map((service) => (
                <div
                  key={service.slug}
                  className="relative overflow-hidden rounded-[22px] bg-white/70"
                >
                  <Image
                    src={imageOf(service.slug)}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 18vw, 40vw"
                    className="object-contain p-5"
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section
        id="channels"
        aria-labelledby="channels-title"
        className="scroll-mt-24 border-t border-neutral-200/70 bg-neutral-50 py-14 md:py-20"
      >
        <Container>
          <div className="reveal mx-auto max-w-3xl text-center">
            <Eyebrow>Channels</Eyebrow>
            <h2
              id="channels-title"
              className="mt-5 font-display text-[34px] leading-[1.05] font-bold tracking-[-0.035em] text-heading sm:text-[44px]"
            >
              Our digital marketing <Accent>services.</Accent>
            </h2>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {marketing.map((service) => (
              <li key={service.slug} className="reveal">
                <ServiceCard service={service} headingLevel="h3" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ServicePillars pillars={HOW_WE_DELIVER} />

      <section
        aria-labelledby="dm-why-title"
        className="bg-white pt-14 md:pt-20 lg:pt-24"
      >
        <Container className="grid gap-5 lg:grid-cols-2">
          <div className="reveal rounded-[28px] border border-neutral-200 bg-white p-8 md:p-10">
            <Eyebrow>Why choose us?</Eyebrow>
            <h2
              id="dm-why-title"
              className="mt-5 font-display text-[30px] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-heading md:text-[38px]"
            >
              Why choose WebTech Solutions for your <Accent>startup!</Accent>
            </h2>
            <p className="mt-5 text-[16.5px] leading-[1.7] text-neutral-600">
              We specialize in tailored digital marketing strategies that drive
              growth. Our expertise in SEO, social media, content marketing, and
              PPC ensures measurable results, helping your business stand out,
              engage customers, and achieve long-term success online.
            </p>
          </div>
          <div className="reveal flex flex-col justify-between rounded-[28px] bg-heading p-8 text-white md:p-10">
            <h2 className="font-display text-[30px] leading-[1.05] font-bold tracking-[-0.035em] md:text-[38px]">
              Digital marketing with strategic{" "}
              <span className="text-primary">depth</span>
            </h2>
            <p className="mt-6 text-[17px] leading-[1.7] text-neutral-300">
              Relevance over visibility. We learn the business economics,
              audience, and competition before choosing channels and messaging —
              and keep every effort tied to measurable progress.
            </p>
            <p className="mt-8 text-[14px] font-medium text-neutral-400">
              Trusted and reliable!
            </p>
          </div>
        </Container>
      </section>

      <RelatedPosts topic="digital marketing" />

      <ServiceCta
        title="Ready to reach the right audience?"
        accent="Let’s plan your campaign."
        body="Book a free strategy call — we'll map your 90-day channel plan."
      />
    </>
  );
}
