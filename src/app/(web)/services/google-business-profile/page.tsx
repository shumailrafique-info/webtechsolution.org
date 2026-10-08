import type { Metadata } from "next";
import { MapPinIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";
import { MoreServices } from "../_components/more-services";
import { RelatedPosts } from "../_components/related-posts";
import { ServiceCta } from "../_components/service-cta";
import { ServiceHero } from "../_components/service-hero";
import { ServiceImportance } from "../_components/service-importance";
import { ServiceOffers } from "../_components/service-offers";
import { ServicePillars } from "../_components/service-pillars";
import { ServiceSchema } from "../_components/service-schema";

const SLUG = "google-business-profile";
const NAME = "GMB Listing";
const GROUP = "core";

const META_TITLE =
  "Google Business Profile Management Services | Rank Higher Locally";
const META_DESCRIPTION =
  "Optimize your Google Business Profile listing to boost local SEO rankings, attract customers, and grow your business with our expert GMB services.";

const OFFERS = [
  {
    title: "GMB Profile Setup & Optimization",
    body: "We create and optimize your Google Business Profile to rank higher on Google.",
  },
  {
    title: "Local SEO Strategy",
    body: "We implement strategies to improve your presence in local searches.",
  },
  {
    title: "Reputation Management",
    body: "Gain trust by managing customer reviews effectively, using insights from our experts.",
  },
  {
    title: "Google Posts & Updates",
    body: "Engage your audience with fresh content, offers, and updates designed by our professionals.",
  },
  {
    title: "Performance Tracking & Insights",
    body: "Our analytics experts help you understand your GMB analytics to maximize results.",
  },
];

const HOW_WE_DELIVER = [
  {
    title: "Audit",
    body: "Profile completeness, NAP consistency and review analysis.",
  },
  {
    title: "Optimize",
    body: "Categories, services, photos and business description fixed.",
  },
  {
    title: "Activate",
    body: "Posts schedule, review-response strategy and Ask Maps readiness.",
  },
  {
    title: "Report",
    body: "Local rankings, calls and direction requests, monthly.",
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
        icon={MapPinIcon}
        title="Google Business Profile"
        accent="(GMB) listing"
        intro="We manage your Google Business Profile so nearby customers find you first: profile optimization, review strategy, posts, photos and local ranking reports."
        offersCount={OFFERS.length}
      />
      <ServiceOffers
        name={NAME}
        intro="What's included, how we deliver it, and how we report it — listed below for this service."
        why="Local-search specialists: profile optimization, review strategy and posts that follow Google's 2026 feature set — including Ask Maps readiness. "
        offers={OFFERS}
      />
      <ServicePillars pillars={HOW_WE_DELIVER} />
      <ServiceImportance
        title="Importance of a GMB Listing"
        body="Your GMB profile is often the first thing potential customers see when searching for products or services nearby. A fully optimized listing ensures your business appears in Google Maps, local packs, and search results — driving more calls, visits, and conversions."
      />
      <MoreServices group={GROUP} current={SLUG} />
      <RelatedPosts topic="Google Business Profile" />
      <ServiceCta
        title={`Ready to grow with ${NAME}?`}
        accent="Let’s talk."
        body="Send your business name — we'll run a free profile audit with 5 quick wins."
      />
    </>
  );
}
