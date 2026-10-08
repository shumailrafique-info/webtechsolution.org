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

const HERO = {
  title: "Web",
  accent: "designing",
  intro:
    "We design visually striking, user-focused websites that look great on every device and make the next step obvious — from brand-new sites and redesigns to high-converting landing pages.",
};

const WHY =
  "We create visually stunning, conversion-focused designs that capture attention and turn visitors into loyal customers.";

const OFFERS_INTRO =
  "Discover our range of professional services designed to elevate your brand, boost engagement, and drive business growth.";

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
  title: "Importance of Web Designing",
  body: "Your website is often the first impression customers have of your brand. Great web design makes that impression count by combining beauty with functionality. From mobile responsiveness to intuitive navigation, effective design keeps visitors engaged and encourages them to take action — whether that’s making a purchase, booking a service, or reaching out to you.",
};

const BLOG_TOPIC = "web design";

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
        icon={PencilRulerIcon}
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
