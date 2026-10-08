import type { Metadata } from "next";
import { HandshakeIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";
import { MoreServices } from "../_components/more-services";
import { RelatedPosts } from "../_components/related-posts";
import { ServiceCta } from "../_components/service-cta";
import { ServiceHero } from "../_components/service-hero";
import { ServiceImportance } from "../_components/service-importance";
import { ServiceOffers } from "../_components/service-offers";
import { ServicePillars } from "../_components/service-pillars";
import { ServiceSchema } from "../_components/service-schema";

const SLUG = "affiliate-marketing";
const NAME = "Affiliate Marketing";
const GROUP = "marketing";

const META_TITLE = "Affiliate Marketing Services - WebTech Solutions";
const META_DESCRIPTION =
  "WebTech Solutions designs and manages high-converting affiliate marketing programs tailored to your business to drive sustainable growth.";

const HERO = {
  title: "Affiliate",
  accent: "marketing",
  intro:
    "We design and manage affiliate programs that reward partners for performance — from setup and recruitment to tracking and commissions — so your reach grows while costs stay under control.",
};

const WHY =
  "We combine creativity, expertise, and results-driven strategies to deliver solutions that truly make a difference.";

const OFFERS_INTRO =
  "Discover our range of professional services designed to elevate your brand, boost engagement, and drive business growth.";

const OFFERS = [
  {
    title: "Affiliate Program Setup",
    body: "Develop and launch a structured affiliate marketing strategy.",
  },
  {
    title: "Partner Recruitment",
    body: "Identify and onboard high-performing affiliates.",
  },
  {
    title: "Performance Tracking",
    body: "Monitor and analyze affiliate-generated traffic and sales.",
  },
  {
    title: "Commission Management",
    body: "Set up fair and effective commission structures.",
  },
  {
    title: "Content and Link Placement",
    body: "Optimize affiliate links for higher conversion rates.",
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
  title: "Importance of Affiliate Marketing",
  body: "Affiliate marketing turns partnerships into profits. With the right affiliates, your brand gains instant credibility, wider visibility, and measurable growth — all while keeping costs under control. It drives growth by rewarding partners for performance, expanding reach, and boosting sales efficiently.",
};

const BLOG_TOPIC = "affiliate marketing";

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
        icon={HandshakeIcon}
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
