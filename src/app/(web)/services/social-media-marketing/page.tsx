import type { Metadata } from "next";
import { ShareIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";
import { MoreServices } from "../_components/more-services";
import { RelatedPosts } from "../_components/related-posts";
import { ServiceCta } from "../_components/service-cta";
import { ServiceHero } from "../_components/service-hero";
import { ServiceImportance } from "../_components/service-importance";
import { ServiceOffers } from "../_components/service-offers";
import { ServicePillars } from "../_components/service-pillars";
import { ServiceSchema } from "../_components/service-schema";

const SLUG = "social-media-marketing";
const NAME = "Social Media Marketing";
const GROUP = "core";

const META_TITLE = "Social Media Marketing Services - WebTech Solutions";
const META_DESCRIPTION =
  "WebTech Solutions creates data-driven social media strategies and campaigns to increase brand visibility and drive traffic.";

const HERO = {
  title: "Social media",
  accent: "marketing",
  intro:
    "Boost your sales and grow your brand with WebTech Solutions’ social media marketing. We work as your partner — planning, creating, and managing campaigns that spark engagement, build trust, and turn followers into customers, with clear reporting and measurable results.",
};

const WHY =
  "We don’t just manage your social media — we grow it with strategy, creativity, and results you can actually see.";

const OFFERS_INTRO =
  "We create social media strategies that spark conversations, build loyal communities, and strengthen your brand presence across platforms.";

const OFFERS = [
  {
    title: "Social Media Marketing Strategy",
    body: "Develop customized plans to enhance brand visibility.",
  },
  {
    title: "Content Creation",
    body: "Produce engaging posts, images, and videos for social media.",
  },
  {
    title: "Paid Social Advertising",
    body: "Reach a wider audience through targeted ads and optimize ad campaigns for better ROI.",
  },
  {
    title: "Community Management",
    body: "Foster relationships and manage audience interactions.",
  },
  {
    title: "Analytics & Reporting",
    body: "Monitor campaign performance and optimize strategies.",
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
  title: "Why Social Media Marketing?",
  body: "Social media is no longer optional — it’s where your audience lives, engages, and makes buying decisions. Effective social media marketing builds brand authority, drives targeted traffic, and turns followers into loyal customers.",
};

const BLOG_TOPIC = "social media marketing";

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
        icon={ShareIcon}
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
