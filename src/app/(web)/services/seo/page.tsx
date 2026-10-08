import type { Metadata } from "next";
import { SearchIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";
import { MoreServices } from "../_components/more-services";
import { RelatedPosts } from "../_components/related-posts";
import { ServiceCta } from "../_components/service-cta";
import { ServiceHero } from "../_components/service-hero";
import { ServiceImportance } from "../_components/service-importance";
import { ServiceOffers } from "../_components/service-offers";
import { ServicePillars } from "../_components/service-pillars";
import { ServiceSchema } from "../_components/service-schema";

const SLUG = "seo";
const NAME = "SEO";
const GROUP = "core";

const OFFERS = [
  {
    title: "AI Search Visibility (GEO/AEO)",
    body: "Get your brand cited in Google's AI Overviews and AI Mode. We track where AI answers mention you, fix entity and brand-mention gaps, tune structured data and E-E-A-T for AI retrieval, and optimize for Preferred-Source selection.",
  },
  {
    title: "On-Page SEO",
    body: "Optimize your website’s content, meta tags, and structure to improve search engine rankings and user experience.",
  },
  {
    title: "Off-Page SEO",
    body: "Enhance your site’s authority through strategic link-building, social media engagement, and influencer outreach.",
  },
  {
    title: "Technical SEO",
    body: "Address backend issues like site speed, mobile responsiveness, schema markup implementation, and crawlability to ensure search engines can efficiently index your site.",
  },
  {
    title: "Local SEO",
    body: "Target local customers with our Local SEO strategy, optimizing your Google Business Profile, NAP, and ensuring consistency across local directories.",
  },
  {
    title: "SEO Audits",
    body: "Conduct comprehensive audits to identify areas for improvement and develop strategies to enhance your site’s performance.",
  },
  {
    title: "Landing Page SEO",
    body: "Design and optimize landing pages that convert visitors into customers, focusing on relevant keywords and compelling calls-to-action.",
  },
  {
    title: "E-commerce SEO",
    body: "Improve your online store’s visibility by optimizing product descriptions, category pages, and implementing structured data for better search engine understanding.",
  },
];

const HOW_WE_DELIVER = [
  {
    title: "Audit",
    body: "Technical crawl, keyword gap and competitor analysis in weeks 1–2; you receive a prioritized issue list.",
  },
  {
    title: "Plan",
    body: "Priority fixes plus a content map, agreed with you before work begins.",
  },
  {
    title: "Execute",
    body: "Technical fixes, on-page optimization, content and outreach delivered in monthly sprints.",
  },
  {
    title: "Report",
    body: "Rankings, traffic and conversions in a plain-language monthly report.",
  },
];

export const metadata: Metadata = pageMetadata({
  title: "SEO Services - WebTech Solutions",
  description:
    "Boost your online presence with our professional SEO services. We drive traffic and help your business grow through SEO strategies.",
  path: `/services/${SLUG}`,
});

export default function Page() {
  return (
    <>
      <ServiceSchema
        slug={SLUG}
        name={NAME}
        group={GROUP}
        metaTitle={"SEO Services - WebTech Solutions"}
        metaDescription={
          "Boost your online presence with our professional SEO services. We drive traffic and help your business grow through SEO strategies."
        }
        offers={OFFERS}
      />
      <ServiceHero
        slug={SLUG}
        name={NAME}
        group={GROUP}
        icon={SearchIcon}
        title="Search engine"
        accent="optimization (SEO)"
        intro="Boost your online visibility with WebTech Solutions' expert SEO services. With 13 years of experience, we offer result-driven strategies, keyword optimization, and technical audits to improve rankings, increase traffic, and grow your business organically."
        offersCount={OFFERS.length}
      />
      <ServiceOffers
        name={NAME}
        intro="What's included, how we deliver it, and how we report it — listed below for this service."
        why="Free SEO audit, WebTech Solutions’ experts with 13+ years of experience, keyword optimization, and technical audits to improve rankings and increase traffic."
        offers={OFFERS}
      />
      <ServicePillars pillars={HOW_WE_DELIVER} />
      <ServiceImportance
        title="Importance of SEO"
        body="Most customers search before they buy. SEO puts your business in front of them at that exact moment — and unlike paid ads, the visibility keeps working long after the work is done. It is the foundation the rest of your marketing builds on."
      />
      <MoreServices group={GROUP} current={SLUG} />
      <RelatedPosts topic="SEO" />
      <ServiceCta title={`Ready to grow with ${NAME}?`} accent="Let’s talk." />
    </>
  );
}
