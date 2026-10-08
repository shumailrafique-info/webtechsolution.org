import type { Metadata } from "next";
import { DeviceMobileIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";
import { MoreServices } from "../_components/more-services";
import { RelatedPosts } from "../_components/related-posts";
import { ServiceCta } from "../_components/service-cta";
import { ServiceHero } from "../_components/service-hero";
import { ServiceImportance } from "../_components/service-importance";
import { ServiceOffers } from "../_components/service-offers";
import { ServicePillars } from "../_components/service-pillars";
import { ServiceSchema } from "../_components/service-schema";

const SLUG = "app-development";
const NAME = "App Development";
const GROUP = "core";

const META_TITLE = "Custom App Development Services - WebTech Solutions";
const META_DESCRIPTION =
  "Build custom Android and iOS apps with WebTech Solutions. We develop secure, scalable, and business-focused mobile applications tailored to your goals.";

const HERO = {
  title: "App development",
  accent: "services",
  intro:
    "We build custom Android and iOS applications that solve real business challenges, improve customer experiences, and help companies launch reliable digital products that grow with their business.",
};

const WHY =
  "With 12+ years of industry experience, WebTech Solutions delivers reliable, innovative, and results-driven mobile app solutions tailored to your business needs.";

const OFFERS_INTRO =
  "Discover our range of professional services designed to elevate your brand, boost engagement, and drive business growth.";

const OFFERS = [
  {
    title: "Custom App Development",
    body: "We build a unique mobile app tailored to your business needs.",
  },
  {
    title: "iOS & Android Development",
    body: "We develop apps for both iOS and Android platforms with seamless functionality.",
  },
  {
    title: "UI/UX Design",
    body: "Deliver an intuitive and visually appealing user experience with our app design services.",
  },
  {
    title: "App Testing & Optimization",
    body: "We ensure your app runs smoothly with rigorous testing.",
  },
  {
    title: "App Maintenance & Support",
    body: "We keep your app updated, secure, and performing at its best.",
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
  title: "Importance of App Development",
  body: "App development empowers businesses to deliver seamless digital experiences, enhance customer engagement, and stay competitive in a mobile-first world. App development puts your business in your customer’s pocket, ready whenever they are.",
};

const BLOG_TOPIC = "app development";

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
        icon={DeviceMobileIcon}
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
