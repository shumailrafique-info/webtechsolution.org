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

const SLUG = "gmb";
const NAME = "GMB Listing";
const GROUP = "core";

const META_TITLE = "Google My Business Listing Services | Rank Higher Locally";
const META_DESCRIPTION =
  "Optimize your Google My Business listing to boost local SEO rankings, attract customers, and grow your business with our expert GMB services.";

const HERO = {
  title: "Google My Business",
  accent: "(GMB) listing",
  intro:
    "At WebTech Solutions, we help businesses dominate local search with powerful Google My Business (GMB) optimization — so your business appears in Google Maps, local packs, and search results.",
};

const WHY =
  "We combine creativity, expertise, and results-driven strategies to deliver solutions that truly make a difference.";

const OFFERS_INTRO =
  "Discover our range of professional services designed to elevate your brand, boost engagement, and drive business growth.";

const OFFERS = [
  {
    title: "GMB Profile Setup & Optimization",
    body: "We help in creating and optimizing your GMB profile to rank higher on Google.",
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
  title: "Importance of a GMB Listing",
  body: "Your GMB profile is often the first thing potential customers see when searching for products or services nearby. A fully optimized listing ensures your business appears in Google Maps, local packs, and search results — driving more calls, visits, and conversions.",
};

const BLOG_TOPIC = "Google Business Profile";

export const metadata: Metadata = pageMetadata({
  absoluteTitle: META_TITLE,
  description: META_DESCRIPTION,
  path: `/services/${SLUG}`,
  cardTitle: `${HERO.title} ${HERO.accent}`,
  eyebrow: "Our services",
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
