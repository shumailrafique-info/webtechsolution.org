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

const HOW_WE_DELIVER = [
  {
    title: "Setup",
    body: "Program terms, tracking and commission structure configured.",
  },
  {
    title: "Recruit",
    body: "Partner outreach, vetting and onboarding.",
  },
  {
    title: "Manage",
    body: "Creatives, partner communication and fraud monitoring.",
  },
  {
    title: "Report",
    body: "Sales per partner, payouts and growth plan, monthly.",
  },
];

export const metadata: Metadata = pageMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  path: `/services/${SLUG}`,
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
        title="Affiliate"
        accent="marketing"
        intro="We design and manage affiliate programs that reward partners for performance — from setup and recruitment to tracking and commissions — so your reach grows while costs stay under control."
        offersCount={OFFERS.length}
      />
      <ServiceOffers
        name={NAME}
        intro="Discover our range of professional services designed to elevate your brand, boost engagement, and drive business growth."
        why="We combine creativity, expertise, and results-driven strategies to deliver solutions that truly make a difference."
        offers={OFFERS}
      />
      <ServicePillars pillars={HOW_WE_DELIVER} />
      <ServiceImportance
        title="Importance of Affiliate Marketing"
        body="Affiliate marketing turns partnerships into profits. With the right affiliates, your brand gains instant credibility, wider visibility, and measurable growth — all while keeping costs under control. It drives growth by rewarding partners for performance, expanding reach, and boosting sales efficiently."
      />
      <MoreServices group={GROUP} current={SLUG} />
      <RelatedPosts topic="affiliate marketing" />
      <ServiceCta title={`Ready to grow with ${NAME}?`} accent="Let’s talk." />
    </>
  );
}
