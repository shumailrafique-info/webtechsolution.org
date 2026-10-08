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
const NAME = "PPC & Google Ads";
const GROUP = "marketing";

const META_TITLE = "PPC & Google Ads Management Services - WebTech Solutions";
const META_DESCRIPTION =
  "WebTech Solutions designs and manages PPC and Google Ads campaigns across Search, Display, and YouTube, with keyword research, ad optimization, and budget management that maximize ROI.";

const HERO = {
  title: "PPC & Google Ads",
  accent: "management",
  intro:
    "We design and manage pay-per-click campaigns on Google Search, Display, and YouTube that reach the right audience at the right time, put your business in front of ready-to-buy customers, and turn ad spend into measurable growth.",
};

const WHY =
  "We design and manage Google Ads campaigns that maximize visibility, attract qualified leads, and deliver measurable business growth.";

const OFFERS_INTRO =
  "From the first keyword to the final report, every part of the campaign is planned, managed, and measured.";

const OFFERS = [
  {
    title: "Keyword Research & Strategy",
    body: "Find the searches your customers use and build campaigns around the ones that convert.",
  },
  {
    title: "Campaign Setup & Management",
    body: "Structure campaigns, ad groups, and targeting, then manage them day to day.",
  },
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
    title: "Ad Copy & Creative",
    body: "Clear, compelling ads that earn the click and match the page they lead to.",
  },
  {
    title: "Bid & Budget Optimization",
    body: "Adjust bids and budgets so spend goes to the clicks that deliver returns.",
  },
  {
    title: "Conversion Tracking & Reporting",
    body: "Track leads and sales from every click, optimize campaigns for better ROI, and report results in plain language.",
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
  title: "Importance of PPC & Google Ads",
  body: "PPC advertising delivers instant visibility, driving qualified traffic with precision targeting, and Google Ads is one of the fastest ways to put your business in front of ready-to-buy customers. Every click is an opportunity — turning ad spend into real, trackable leads, sales, and growth.",
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
