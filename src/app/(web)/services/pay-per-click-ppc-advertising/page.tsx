import type { Metadata } from "next";
import { CursorClickIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";
import { MoreServices } from "../_components/more-services";
import { RelatedPosts } from "../_components/related-posts";
import { ServiceCta } from "../_components/service-cta";
import { ServiceHero } from "../_components/service-hero";
import { ServiceImportance } from "../_components/service-importance";
import { ServiceOffers } from "../_components/service-offers";
import { ServicePillars } from "../_components/service-pillars";
import { ServiceSchema } from "../_components/service-schema";

const SLUG = "pay-per-click-ppc-advertising";
const NAME = "Pay-Per-Click (PPC)";
const GROUP = "marketing";

const META_TITLE = "Pay-Per-Click (PPC) Advertising - WebTech Solutions";
const META_DESCRIPTION =
  "WebTech Solutions designs PPC campaigns that maximize results while minimizing costs through keyword research and ad optimization.";

const HERO = {
  title: "Pay-per-click (PPC)",
  accent: "advertising",
  intro:
    "We design PPC campaigns that reach the right audience at the right time. Every click is optimized to deliver measurable returns and drive business growth.",
};

const WHY =
  "We combine creativity, expertise, and results-driven strategies to deliver solutions that truly make a difference.";

const OFFERS_INTRO =
  "From the first keyword to the final report, every part of the campaign is planned, managed, and measured.";

const OFFERS = [
  {
    title: "Keyword Research & Strategy",
    body: "Find the searches your customers use and build campaigns around the ones that convert.",
  },
  {
    title: "Ad Copy & Creative",
    body: "Clear, compelling ads that earn the click and match the page they lead to.",
  },
  {
    title: "Campaign Setup & Management",
    body: "Structure campaigns, ad groups, and targeting, then manage them day to day.",
  },
  {
    title: "Bid & Budget Optimization",
    body: "Adjust bids and budgets so spend goes to the clicks that deliver returns.",
  },
  {
    title: "Conversion Tracking & Reporting",
    body: "Track leads and sales from every click and report results in plain language.",
  },
];

const PILLARS = [
  {
    title: "Innovations",
    body: "We bring fresh, creative innovations to every project we take on.",
  },
  {
    title: "Action Plans",
    body: "Our clear, strategic action plans turn ideas into impactful results.",
  },
  {
    title: "Big Projects",
    body: "We confidently handle big projects with precision and expertise.",
  },
  {
    title: "Great Tests",
    body: "Every solution we deliver passes great tests of quality and performance.",
  },
];

const IMPORTANCE = {
  title: "Importance of PPC Advertising",
  body: "PPC advertising delivers instant visibility, driving qualified traffic and measurable results with precision targeting. With PPC, every click is an opportunity — turning ad spend into leads, sales, and growth.",
};

const BLOG_TOPIC = "PPC";

export const metadata: Metadata = pageMetadata({
  absoluteTitle: META_TITLE,
  description: META_DESCRIPTION,
  path: `/services/${SLUG}`,
  cardTitle: `${HERO.title} ${HERO.accent}`,
  eyebrow: "Digital marketing",
});

export default function Page() {
  return (
    <>
      <ServiceSchema
        slug={SLUG}
        name={NAME}
        group={GROUP}
        metaTitle={META_TITLE}
        metaDescription={META_DESCRIPTION}
        offers={OFFERS}
      />
      <ServiceHero
        slug={SLUG}
        name={NAME}
        group={GROUP}
        icon={CursorClickIcon}
        title={HERO.title}
        accent={HERO.accent}
        intro={HERO.intro}
        offersCount={OFFERS.length}
      />
      <ServiceOffers
        name={NAME}
        intro={OFFERS_INTRO}
        why={WHY}
        offers={OFFERS}
      />
      <ServicePillars pillars={PILLARS} />
      <ServiceImportance title={IMPORTANCE.title} body={IMPORTANCE.body} />
      <MoreServices group={GROUP} current={SLUG} />
      <RelatedPosts topic={BLOG_TOPIC} />
      <ServiceCta title={`Ready to grow with ${NAME}?`} accent="Let’s talk." />
    </>
  );
}
