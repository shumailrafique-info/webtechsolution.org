import type { Metadata } from "next";
import { PenNibIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";
import { MoreServices } from "../_components/more-services";
import { RelatedPosts } from "../_components/related-posts";
import { ServiceCta } from "../_components/service-cta";
import { ServiceHero } from "../_components/service-hero";
import { ServiceImportance } from "../_components/service-importance";
import { ServiceOffers } from "../_components/service-offers";
import { ServicePillars } from "../_components/service-pillars";
import { ServiceSchema } from "../_components/service-schema";

const SLUG = "content-writing";
const NAME = "Content Writing";
const GROUP = "core";

const META_TITLE = "Best SEO Content Writing Services - WebTech Solutions";
const META_DESCRIPTION =
  "Expert writers at WebTech Solutions write appealing, high-quality, and SEO-friendly content according to our clients’ target audience.";

const OFFERS_TITLE = "Our content writing process";

const OFFERS = [
  {
    title: "Discovery & Strategy",
    body: "We begin with understanding your brand, target audience, and goals to shape a tailored content plan.",
  },
  {
    title: "Research & Keyword Planning",
    body: "Each piece is backed by keyword and topic research to ensure visibility and relevance in search.",
  },
  {
    title: "Drafting & Editing",
    body: "Our experts craft polished, compelling content, followed by thorough editing to ensure clarity, coherence, and correctness.",
  },
  {
    title: "Feedback & Revision",
    body: "Your feedback guides refinements. We include revision rounds to ensure the final result fits your brand voice.",
  },
  {
    title: "Performance Analysis",
    body: "Receive easy-to-read reports tracking content engagement and SEO impact — so you can see real results.",
  },
];

const HOW_WE_DELIVER = [
  {
    title: "Brief",
    body: "Search intent, outline and angle approved by you before writing starts.",
  },
  {
    title: "Research & draft",
    body: "Expert sources, data and examples; written for E-E-A-T, not fluff.",
  },
  {
    title: "Edit",
    body: "Proofreading, plagiarism check and one revision round included.",
  },
  {
    title: "Deliver & publish",
    body: "Formatted with meta tags and headings, on a monthly content calendar.",
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
        offersTitle={OFFERS_TITLE}
        offers={OFFERS}
      />
      <ServiceHero
        slug={SLUG}
        name={NAME}
        group={GROUP}
        icon={PenNibIcon}
        title="SEO content"
        accent="writing services"
        intro="Get SEO content built to meet Google's E-E-A-T standards. For 13 years, we've written blogs, web copy, and articles that start with keyword and search-intent research, are checked against expert sources, and are edited to rank and earn reader trust."
        offersCount={OFFERS.length}
      />
      <ServiceOffers
        name={NAME}
        title={OFFERS_TITLE}
        intro="Discover our range of professional services designed to elevate your brand, boost engagement, and drive business growth."
        why="High-quality, SEO-optimized, well-researched content using that aligns with Google’s E-E-A-T standards."
        offers={OFFERS}
      />
      <ServicePillars pillars={HOW_WE_DELIVER} />
      <ServiceImportance
        title="Importance of Content Writing"
        body="SEO content writing transforms your website into a traffic magnet. By blending creativity with strategy, it boosts visibility, engages readers, and converts visitors into paying customers. It is how you turn words into visibility, clicks, and loyal customers. It’s not just writing — it’s growth powered by words."
      />
      <MoreServices group={GROUP} current={SLUG} />
      <RelatedPosts topic="content writing" />
      <ServiceCta title={`Ready to grow with ${NAME}?`} accent="Let’s talk." />
    </>
  );
}
