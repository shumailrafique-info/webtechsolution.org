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

const HERO = {
  title: "SEO content",
  accent: "writing services",
  intro:
    "Get high-quality, SEO-optimized content that aligns with Google’s E-E-A-T standards. At WebTech Solutions, we create authoritative, engaging blogs, web copy, and articles that boost rankings, drive traffic, and build audience trust with 13 years of experience.",
};

const WHY =
  "High-quality, SEO-optimized, well-researched content using LSI keywords that aligns with Google’s E-E-A-T standards.";

const OFFERS_TITLE = "Our content writing process";

const OFFERS_INTRO =
  "Discover our range of professional services designed to elevate your brand, boost engagement, and drive business growth.";

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
  title: "Importance of Content Writing",
  body: "SEO content writing transforms your website into a traffic magnet. By blending creativity with strategy, it boosts visibility, engages readers, and converts visitors into paying customers. It is how you turn words into visibility, clicks, and loyal customers. It’s not just writing — it’s growth powered by words.",
};

const BLOG_TOPIC = "content writing";

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
        offersTitle={OFFERS_TITLE}
        offers={OFFERS}
      />
      <ServiceHero
        slug={SLUG}
        name={NAME}
        group={GROUP}
        icon={PenNibIcon}
        title={HERO.title}
        accent={HERO.accent}
        intro={HERO.intro}
        offersCount={OFFERS.length}
      />
      <ServiceOffers
        name={NAME}
        title={OFFERS_TITLE}
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
