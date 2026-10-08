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
        intro="What's included, how we deliver it, and how we report it — listed below for this service."
        why="Programs built for performance: setup, partner recruitment, commission structures and fraud monitoring — growth without upfront ad spend."
        offers={OFFERS}
      />
      <ServicePillars pillars={HOW_WE_DELIVER} />
      <ServiceImportance
        title="Importance of Affiliate Marketing"
        body="We build affiliate programs where partners earn for performance: setup, recruitment, tracking, commission structures and fraud monitoring."
      />
      <MoreServices group={GROUP} current={SLUG} />
      <RelatedPosts topic="affiliate marketing" />
      <ServiceCta
        title={`Ready to grow with ${NAME}?`}
        accent="Let’s talk."
        body="Tell us your product — we'll design your commission structure."
      />
    </>
  );
}
