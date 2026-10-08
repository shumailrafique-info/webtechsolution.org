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

const HOW_WE_DELIVER = [
  {
    title: "Audit",
    body: "Account structure, Quality Scores and tracking reviewed.",
  },
  {
    title: "Restructure",
    body: "Campaigns, ad groups, negative keywords and extensions rebuilt.",
  },
  {
    title: "Manage",
    body: "Search, Display, YouTube and remarketing with ongoing bid adjustments.",
  },
  {
    title: "Report",
    body: "Monthly ROI report with recommended next actions.",
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
        icon={GoogleIcon}
        title="PPC & Google Ads"
        accent="management"
        intro="We design and manage pay-per-click campaigns on Google Search, Display, and YouTube that reach the right audience at the right time, put your business in front of ready-to-buy customers, and turn ad spend into measurable growth."
        offersCount={OFFERS.length}
      />
      <ServiceOffers
        name={NAME}
        intro="What's included, how we deliver it, and how we report it — listed below for this service."
        why="Full-funnel paid media across Google (Search, Display, YouTube), Meta, TikTok and LinkedIn: keyword and audience builds, ad creative, structured ad groups, negative-keyword hygiene, bid management, remarketing and conversion tracking, with monthly ROI reports."
        offers={OFFERS}
      />
      <ServicePillars pillars={HOW_WE_DELIVER} />
      <ServiceImportance
        title="Importance of PPC & Google Ads"
        body="PPC advertising delivers instant visibility, driving qualified traffic with precision targeting, and Google Ads is one of the fastest ways to put your business in front of ready-to-buy customers. Every click is an opportunity — turning ad spend into real, trackable leads, sales, and growth."
      />
      <MoreServices group={GROUP} current={SLUG} />
      <RelatedPosts topic="PPC" />
      <ServiceCta
        title={`Ready to grow with ${NAME}?`}
        accent="Let’s talk."
        body="Share your monthly ad spend and read-only account access, and we'll send a free audit within 48 hours showing where your money leaks."
      />
    </>
  );
}
