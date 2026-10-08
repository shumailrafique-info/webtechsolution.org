import type { Metadata } from "next";
import { MegaphoneIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";
import { MoreServices } from "../_components/more-services";
import { RelatedPosts } from "../_components/related-posts";
import { ServiceCta } from "../_components/service-cta";
import { ServiceHero } from "../_components/service-hero";
import { ServiceImportance } from "../_components/service-importance";
import { ServiceOffers } from "../_components/service-offers";
import { ServicePillars } from "../_components/service-pillars";
import { ServiceSchema } from "../_components/service-schema";

const SLUG = "mobile-marketing";
const NAME = "Mobile Marketing";
const GROUP = "marketing";

const META_TITLE = "Mobile Marketing Services - WebTech Solutions";
const META_DESCRIPTION =
  "WebTech Solutions helps you design mobile marketing strategies that ensure your brand effectively reaches mobile users.";

const HERO = {
  title: "Mobile",
  accent: "marketing",
  intro:
    "We help your brand reach customers on the go with SMS, push notifications, in-app ads, and location-based campaigns built for mobile-first audiences.",
};

const WHY =
  "We combine creativity, expertise, and results-driven strategies to deliver solutions that truly make a difference.";

const OFFERS_INTRO =
  "Discover our range of professional services designed to elevate your brand, boost engagement, and drive business growth.";

const OFFERS = [
  {
    title: "SMS Marketing",
    body: "Send promotional and transactional messages to mobile users.",
  },
  {
    title: "In-app Advertising",
    body: "Promote brands through targeted ads within mobile apps.",
  },
  {
    title: "Push Notifications",
    body: "Deliver real-time updates and offers to users.",
  },
  {
    title: "Geo Targeting Campaigns",
    body: "Target users based on their location for personalized marketing.",
  },
  {
    title: "Mobile-Friendly Content",
    body: "Optimize websites and ads for mobile devices.",
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
  title: "Importance of Mobile Marketing",
  body: "Your customers are always on their phones — mobile marketing makes sure your brand is too. Whether it’s a quick text, a personalized app notification, or mobile-friendly ads, this strategy keeps your business connected, relevant, and top-of-mind, creating direct, personalized connections that drive growth.",
};

const BLOG_TOPIC = "mobile marketing";

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
        icon={MegaphoneIcon}
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
