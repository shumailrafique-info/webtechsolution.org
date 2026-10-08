import type { Metadata } from "next";
import { GoogleIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";
import { MoreServices } from "../_components/more-services";
import { RelatedPosts } from "../_components/related-posts";
import { ServiceCta } from "../_components/service-cta";
import { ServiceHero } from "../_components/service-hero";
import { ServiceImportance } from "../_components/service-importance";
import { ServiceOffers } from "../_components/service-offers";
import { ServicePillars } from "../_components/service-pillars";
import { ServiceSchema } from "../_components/service-schema";

const SLUG = "google-ads";
const NAME = "Google Ads";
const GROUP = "marketing";

const META_TITLE = "Google Ads Management Services - WebTech Solutions";
const META_DESCRIPTION =
  "Our team specializes in keyword research, ad optimization, and budget management to maximize your brand’s ROI with Google Ads.";

const HERO = {
  title: "Google",
  accent: "Ads",
  intro:
    "We design and manage Google Ads campaigns across Search, Display, and YouTube that put your business in front of ready-to-buy customers and turn ad spend into measurable growth.",
};

const WHY =
  "We design and manage Google Ads campaigns that maximize visibility, attract qualified leads, and deliver measurable business growth.";

const OFFERS_INTRO =
  "Discover our range of professional services designed to elevate your brand, boost engagement, and drive business growth.";

const OFFERS = [
  {
    title: "Search Ads",
    body: "Appear at the top of Google search results.",
  },
  {
    title: "Display Ads",
    body: "Show visually appealing ads across Google’s partner websites.",
  },
  {
    title: "YouTube Ads",
    body: "Promote video content on YouTube and related platforms.",
  },
  {
    title: "Remarketing Campaigns",
    body: "Re-engage visitors who have previously interacted with your brand.",
  },
  {
    title: "Performance Tracking",
    body: "Monitor and optimize campaigns for better ROI.",
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
  title: "Importance of Google Ads",
  body: "Google Ads is one of the fastest ways to put your business in front of ready-to-buy customers, delivering measurable results and maximum ROI. Investing in Google Ads means investing in growth — turning ad spend into real, trackable revenue.",
};

const BLOG_TOPIC = "Google Ads";

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
        icon={GoogleIcon}
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
