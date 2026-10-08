import type { Metadata } from "next";
import { ShareIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";
import { MoreServices } from "../_components/more-services";
import { RelatedPosts } from "../_components/related-posts";
import { ServiceCta } from "../_components/service-cta";
import { ServiceHero } from "../_components/service-hero";
import { ServiceImportance } from "../_components/service-importance";
import { ServiceOffers } from "../_components/service-offers";
import { ServicePillars } from "../_components/service-pillars";
import { ServiceSchema } from "../_components/service-schema";

const SLUG = "social-media-marketing";
const NAME = "Social Media Marketing";
const GROUP = "core";

const META_TITLE = "Social Media Marketing Services - WebTech Solutions";
const META_DESCRIPTION =
  "WebTech Solutions creates data-driven social media strategies and campaigns to increase brand visibility and drive traffic.";

const OFFERS = [
  {
    title: "Social Media Marketing Strategy",
    body: "Develop customized plans to enhance brand visibility.",
  },
  {
    title: "Content Creation",
    body: "Produce engaging posts, images, and videos for social media.",
  },
  {
    title: "Paid Social Advertising",
    body: "Reach a wider audience through targeted ads and optimize ad campaigns for better ROI.",
  },
  {
    title: "Community Management",
    body: "Foster relationships and manage audience interactions.",
  },
  {
    title: "Analytics & Reporting",
    body: "Monitor campaign performance and optimize strategies.",
  },
];

const HOW_WE_DELIVER = [
  {
    title: "Audit & strategy",
    body: "Channel review, audience definition and content pillars.",
  },
  {
    title: "Calendar",
    body: "Monthly content calendar approved by you before posting.",
  },
  {
    title: "Publish & engage",
    body: "Posts, stories and reels plus daily community management.",
  },
  {
    title: "Report",
    body: "Reach, engagement and traffic/leads per platform, every month.",
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
        icon={ShareIcon}
        title="Social media"
        accent="marketing"
        intro="Boost your sales and grow your brand with WebTech Solutions’ social media marketing. We work as your partner — planning, creating, and managing campaigns that spark engagement, build trust, and turn followers into customers, with clear reporting and measurable results."
        offersCount={OFFERS.length}
      />
      <ServiceOffers
        name={NAME}
        intro="What's included, how we deliver it, and how we report it — listed below for this service."
        why="Platform-specific strategies for Instagram, Facebook, LinkedIn and TikTok. Monthly calendars approved by you, with reports tied to traffic and leads — not just likes."
        offers={OFFERS}
      />
      <ServicePillars pillars={HOW_WE_DELIVER} />
      <ServiceImportance
        title="Why Social Media Marketing?"
        body="Social media is no longer optional — it’s where your audience lives, engages, and makes buying decisions. Effective social media marketing builds brand authority, drives targeted traffic, and turns followers into loyal customers."
      />
      <MoreServices group={GROUP} current={SLUG} />
      <RelatedPosts topic="social media marketing" />
      <ServiceCta
        title={`Ready to grow with ${NAME}?`}
        accent="Let’s talk."
        body="Tell us your platforms — we'll build a free 1-week content calendar sample."
      />
    </>
  );
}
