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

const HOW_WE_DELIVER = [
  {
    title: "Scope",
    body: "Features, tech stack and timeline agreed in writing.",
  },
  {
    title: "Build",
    body: "Clean, fast code on a staging link you can review anytime.",
  },
  {
    title: "Test",
    body: "Speed, mobile, technical SEO basics and bug fixing before launch.",
  },
  {
    title: "Launch & support",
    body: "Go-live checklist, bug-free period and a maintenance plan.",
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
        icon={CodeIcon}
        title="Web"
        accent="development"
        intro="We build fast, secure, and scalable websites — custom builds, online stores, and SEO-friendly development — and keep them updated and running smoothly after launch."
        offersCount={OFFERS.length}
      />
      <ServiceOffers
        name={NAME}
        intro="Discover our range of professional services designed to elevate your brand, boost engagement, and drive business growth."
        why="Our web development process ensures functionality, scalability, and performance — crafted to meet your unique business goals."
        offers={OFFERS}
      />
      <ServicePillars pillars={HOW_WE_DELIVER} />
      <ServiceImportance
        title="Importance of Web Development"
        body="Web development is the backbone of your digital presence — ensuring speed, security, and scalability for long-term success. Strong web development turns ideas into powerful online platforms that engage, convert, and grow your business."
      />
      <MoreServices group={GROUP} current={SLUG} />
      <RelatedPosts topic="web development" />
      <ServiceCta title={`Ready to grow with ${NAME}?`} accent="Let’s talk." />
    </>
  );
}
