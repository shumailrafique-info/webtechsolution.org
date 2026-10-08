import type { Metadata } from "next";
import { VideoIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";
import { MoreServices } from "../_components/more-services";
import { RelatedPosts } from "../_components/related-posts";
import { ServiceCta } from "../_components/service-cta";
import { ServiceHero } from "../_components/service-hero";
import { ServiceImportance } from "../_components/service-importance";
import { ServiceOffers } from "../_components/service-offers";
import { ServicePillars } from "../_components/service-pillars";
import { ServiceSchema } from "../_components/service-schema";

const SLUG = "video-marketing";
const NAME = "Video Marketing";
const GROUP = "marketing";

const META_TITLE = "Video Marketing Services - WebTech Solutions";
const META_DESCRIPTION =
  "WebTech Solutions creates quality, engaging video content strategies that align with your brand’s message and goals.";

const HERO = {
  title: "Video",
  accent: "marketing",
  intro:
    "We create and promote videos that tell your story — from short social clips and explainers to product demos and YouTube campaigns that drive engagement.",
};

const WHY =
  "We combine creativity, expertise, and results-driven strategies to deliver solutions that truly make a difference.";

const OFFERS_INTRO =
  "Discover our range of professional services designed to elevate your brand, boost engagement, and drive business growth.";

const OFFERS = [
  {
    title: "Social Media Videos",
    body: "Create short, engaging videos for Instagram, Facebook, and TikTok.",
  },
  {
    title: "YouTube Marketing",
    body: "Optimize and promote branded content on YouTube for visibility.",
  },
  {
    title: "Explainer Videos",
    body: "Simplify complex ideas with informative, visually appealing videos.",
  },
  {
    title: "Product Videos",
    body: "Showcase features and benefits through high-quality product demonstrations.",
  },
  {
    title: "Testimonial Videos",
    body: "Build trust with real customer reviews and success stories.",
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
  title: "Importance of Video Marketing",
  body: "People love watching videos — and that’s exactly why video marketing works. Whether it’s a product demo, a brand story, or customer testimonials, videos make complex ideas simple, engaging, and memorable. They help your audience connect with your brand on a deeper level and inspire action.",
};

const BLOG_TOPIC = "video marketing";

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
        icon={VideoIcon}
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
