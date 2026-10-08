import type { Metadata } from "next";
import { CodeIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";
import { MoreServices } from "../_components/more-services";
import { RelatedPosts } from "../_components/related-posts";
import { ServiceCta } from "../_components/service-cta";
import { ServiceHero } from "../_components/service-hero";
import { ServiceImportance } from "../_components/service-importance";
import { ServiceOffers } from "../_components/service-offers";
import { ServicePillars } from "../_components/service-pillars";
import { ServiceSchema } from "../_components/service-schema";

const SLUG = "web-development";
const NAME = "Web Development";
const GROUP = "core";

const META_TITLE = "Web Development Services - WebTech Solutions";
const META_DESCRIPTION =
  "Take your business to an advanced level using the professional web development services of WebTech Solutions and generate more revenue.";

const HERO = {
  title: "Web",
  accent: "development",
  intro:
    "We build fast, secure, and scalable websites — custom builds, online stores, and SEO-friendly development — and keep them updated and running smoothly after launch.",
};

const WHY =
  "Our web development process ensures functionality, scalability, and performance — crafted to meet your unique business goals.";

const OFFERS_INTRO =
  "Discover our range of professional services designed to elevate your brand, boost engagement, and drive business growth.";

const OFFERS = [
  {
    title: "Custom Web Development",
    body: "We develop a unique, high-performing website built around your business.",
  },
  {
    title: "Responsive Design",
    body: "We ensure your website looks great on all devices.",
  },
  {
    title: "E-Commerce Solutions",
    body: "Build a secure and scalable online store for your business.",
  },
  {
    title: "SEO-Friendly Development",
    body: "We optimize your website for search engines to improve visibility.",
  },
  {
    title: "Website Maintenance & Support",
    body: "We make sure that your site is updated, secure, and running smoothly.",
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
  title: "Importance of Web Development",
  body: "Web development is the backbone of your digital presence — ensuring speed, security, and scalability for long-term success. Strong web development turns ideas into powerful online platforms that engage, convert, and grow your business.",
};

const BLOG_TOPIC = "web development";

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
        icon={CodeIcon}
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
