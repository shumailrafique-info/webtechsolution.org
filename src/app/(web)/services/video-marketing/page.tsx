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

const HOW_WE_DELIVER = [
  {
    title: "Concept",
    body: "Goals, scripts and storyboards approved by you.",
  },
  {
    title: "Produce",
    body: "Shoot or animation, then professional editing.",
  },
  {
    title: "Optimize",
    body: "Captions, thumbnails and platform-specific formats.",
  },
  {
    title: "Publish & report",
    body: "Posting schedule with views and engagement reporting.",
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
        icon={VideoIcon}
        title="Video"
        accent="marketing"
        intro="We create and promote videos that tell your story — from short social clips and explainers to product demos and YouTube campaigns that drive engagement."
        offersCount={OFFERS.length}
      />
      <ServiceOffers
        name={NAME}
        intro="What's included, how we deliver it, and how we report it — listed below for this service."
        why="We combine creativity, expertise, and results-driven strategies to deliver solutions that truly make a difference."
        offers={OFFERS}
      />
      <ServicePillars pillars={HOW_WE_DELIVER} />
      <ServiceImportance
        title="Importance of Video Marketing"
        body="Short-form social clips, explainers, product demos and YouTube campaigns — scripted, edited and published by our in-house video team."
      />
      <MoreServices group={GROUP} current={SLUG} />
      <RelatedPosts topic="video marketing" />
      <ServiceCta title={`Ready to grow with ${NAME}?`} accent="Let’s talk." />
    </>
  );
}
