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

const META_TITLE = "Affordable SEO Services - WebTech Solutions";
const META_DESCRIPTION =
  "Boost your online presence with our professional SEO services. We drive traffic and help your business grow through SEO strategies.";

const HERO = {
  title: "Search engine",
  accent: "optimization (SEO)",
  intro:
    "Boost your online visibility with WebTech Solutions’ expert SEO services. With 13 years of experience, we offer result-driven strategies, keyword optimization, and technical audits to improve rankings, increase traffic, and grow your business organically.",
};

const WHY =
  "Free SEO audit, WebTech Solutions’ experts with 13+ years of experience, keyword optimization, and technical audits to improve rankings and increase traffic.";

const OFFERS_INTRO =
  "Discover our range of professional services designed to elevate your brand, boost engagement, and drive business growth.";

const OFFERS = [
  {
    title: "AI Assisted SEO",
    body: "We use AI tools and smart data analysis to find keyword opportunities, improve content, automate routine SEO tasks, and make better decisions based on search performance.",
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

const PILLARS = [
  {
    title: "Innovations",
    body: "We integrate the latest SEO tools and methodologies to craft innovative strategies that deliver measurable results.",
  },
  {
    title: "Action Plans",
    body: "Our step-by-step action plans are designed to systematically improve your site’s SEO performance, ensuring long-term success.",
  },
  {
    title: "Big Projects",
    body: "Equipped to handle large-scale SEO projects, we provide scalable solutions that align with your expanding business needs.",
  },
  {
    title: "Great Tests",
    body: "Every strategy undergoes rigorous testing to ensure effectiveness, allowing us to refine our approach for optimal outcomes.",
  },
];

const IMPORTANCE = {
  title: "Importance of SEO",
  body: "Most customers search before they buy. SEO puts your business in front of them at that exact moment — and unlike paid ads, the visibility keeps working long after the work is done. It is the foundation the rest of your marketing builds on.",
};

const BLOG_TOPIC = "SEO";

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
        icon={SearchIcon}
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
