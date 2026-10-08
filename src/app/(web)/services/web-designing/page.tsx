import type { Metadata } from "next";
import { PencilRulerIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";
import { MoreServices } from "../_components/more-services";
import { RelatedPosts } from "../_components/related-posts";
import { ServiceCta } from "../_components/service-cta";
import { ServiceHero } from "../_components/service-hero";
import { ServiceImportance } from "../_components/service-importance";
import { ServiceOffers } from "../_components/service-offers";
import { ServicePillars } from "../_components/service-pillars";
import { ServiceSchema } from "../_components/service-schema";

const SLUG = "web-designing";
const NAME = "Web Designing";
const GROUP = "core";

const META_TITLE = "Web Designing Services - WebTech Solutions";
const META_DESCRIPTION =
  "We create visually stunning, user-friendly, and responsive websites that provide a seamless user experience and drive business growth.";

const OFFERS = [
  {
    title: "Website Design",
    body: "Develop aesthetically appealing and functional websites.",
  },
  {
    title: "UI/UX Design",
    body: "Optimize user experience and interface design.",
  },
  {
    title: "Mobile-Friendly Design",
    body: "Create responsive websites for all devices.",
  },
  {
    title: "Website Redesign",
    body: "Revamp outdated websites for a modern look.",
  },
  {
    title: "Landing Page Design",
    body: "Develop high-converting pages for campaigns.",
  },
];

const HOW_WE_DELIVER = [
  {
    title: "Discover",
    body: "Business goals, audience and sitemap defined with you.",
  },
  {
    title: "Wireframe",
    body: "Page structures approved by you before visual design.",
  },
  {
    title: "Design",
    body: "Mockups with two revision rounds, mobile-first.",
  },
  {
    title: "Handoff & QA",
    body: "Design system delivered and launch QA done with the developers.",
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
        icon={PencilRulerIcon}
        title="Web"
        accent="designing"
        intro="We design visually striking, user-focused websites that look great on every device and make the next step obvious — from brand-new sites and redesigns to high-converting landing pages."
        offersCount={OFFERS.length}
      />
      <ServiceOffers
        name={NAME}
        intro="What's included, how we deliver it, and how we report it — listed below for this service."
        why="Mobile-first designs built around one conversion goal per page. Wireframes first, then mockups with two revision rounds — launch QA included."
        offers={OFFERS}
      />
      <ServicePillars pillars={HOW_WE_DELIVER} />
      <ServiceImportance
        title="Importance of Web Designing"
        body="Your website is often the first impression customers have of your brand. Great web design makes that impression count by combining beauty with functionality. From mobile responsiveness to intuitive navigation, effective design keeps visitors engaged and encourages them to take action — whether that’s making a purchase, booking a service, or reaching out to you."
      />
      <MoreServices group={GROUP} current={SLUG} />
      <RelatedPosts topic="web design" />
      <ServiceCta
        title={`Ready to grow with ${NAME}?`}
        accent="Let’s talk."
        body="Describe your business — we'll sketch a homepage wireframe concept."
      />
    </>
  );
}
