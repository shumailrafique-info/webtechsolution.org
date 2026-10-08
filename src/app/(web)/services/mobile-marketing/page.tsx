import type { Metadata } from "next";
import { MegaphoneIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";
import { MoreServices } from "../_components/more-services";
import { RelatedPosts } from "../_components/related-posts";
import { ServiceCta } from "../_components/service-cta";
import { ServiceHero } from "../_components/service-hero";
import { ServiceImportance } from "../_components/service-importance";
import { ServiceOffers } from "../_components/service-offers";
import { ServicePillars } from "../_components/service-pillars";
import { ServiceSchema } from "../_components/service-schema";

const SLUG = "mobile-marketing";
const NAME = "Mobile Marketing";
const GROUP = "marketing";

const META_TITLE = "Mobile Marketing Services - WebTech Solutions";
const META_DESCRIPTION =
  "WebTech Solutions helps you design mobile marketing strategies that ensure your brand effectively reaches mobile users.";

const OFFERS = [
  {
    title: "SMS Marketing",
    body: "Send promotional and transactional messages to mobile users.",
  },
  {
    title: "In-app Advertising",
    body: "Promote brands through targeted ads within mobile apps.",
  },
  {
    title: "Push Notifications",
    body: "Deliver real-time updates and offers to users.",
  },
  {
    title: "Geo Targeting Campaigns",
    body: "Target users based on their location for personalized marketing.",
  },
  {
    title: "Mobile-Friendly Content",
    body: "Optimize websites and ads for mobile devices.",
  },
];

const HOW_WE_DELIVER = [
  {
    title: "Setup",
    body: "Consent-based opt-in lists and platform integration.",
  },
  {
    title: "Plan",
    body: "SMS/push calendar with consent records and opt-out compliance.",
  },
  {
    title: "Send",
    body: "Targeted, personalized campaigns to mobile audiences.",
  },
  {
    title: "Report",
    body: "Delivery, open and conversion rates per campaign.",
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
        icon={MegaphoneIcon}
        title="Mobile"
        accent="marketing"
        intro="We help your brand reach customers on the go with SMS, push notifications, in-app ads, and location-based campaigns built for mobile-first audiences."
        offersCount={OFFERS.length}
      />
      <ServiceOffers
        name={NAME}
        intro="What's included, how we deliver it, and how we report it — listed below for this service."
        why="We combine creativity, expertise, and results-driven strategies to deliver solutions that truly make a difference."
        offers={OFFERS}
      />
      <ServicePillars pillars={HOW_WE_DELIVER} />
      <ServiceImportance
        title="Importance of Mobile Marketing"
        body="SMS, push and in-app campaigns with consent-based lists and opt-out compliance — built for mobile-first audiences."
      />
      <MoreServices group={GROUP} current={SLUG} />
      <RelatedPosts topic="mobile marketing" />
      <ServiceCta title={`Ready to grow with ${NAME}?`} accent="Let’s talk." />
    </>
  );
}
