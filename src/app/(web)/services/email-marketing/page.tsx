import type { Metadata } from "next";
import { MailIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";
import { MoreServices } from "../_components/more-services";
import { RelatedPosts } from "../_components/related-posts";
import { ServiceCta } from "../_components/service-cta";
import { ServiceHero } from "../_components/service-hero";
import { ServiceImportance } from "../_components/service-importance";
import { ServiceOffers } from "../_components/service-offers";
import { ServicePillars } from "../_components/service-pillars";
import { ServiceSchema } from "../_components/service-schema";

const SLUG = "email-marketing";
const NAME = "Email Marketing";
const GROUP = "core";

const META_TITLE = "Email Marketing Services - WebTech Solutions";
const META_DESCRIPTION =
  "WebTech Solutions’ email marketing service includes writing email content, audience segmentation and optimizing campaigns for better engagement.";

const HERO = {
  title: "Email",
  accent: "marketing",
  intro:
    "Grow smarter with WebTech Solutions’ professional email marketing services. We create targeted, well-designed campaigns, automate customer journeys, and continuously optimize results to improve engagement, conversions, and ROI — understanding your goals, refining your message, and turning subscribers into long-term customers.",
};

const WHY =
  "We treat your growth like our own — and every strategy we use is backed by real results.";

const OFFERS_INTRO =
  "Discover our range of professional services designed to elevate your brand, boost engagement, and drive business growth.";

const OFFERS = [
  {
    title: "Email Campaign Strategy",
    body: "Develop targeted email marketing plans.",
  },
  {
    title: "Personalized Email Automation",
    body: "Create personalized, automated email sequences.",
  },
  {
    title: "Email Copywriting",
    body: "Write compelling subject lines and engaging content.",
  },
  {
    title: "List Management",
    body: "Maintain and segment email lists for better targeting.",
  },
  {
    title: "Performance Tracking",
    body: "Analyze email metrics for optimization.",
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
  title: "Importance of Email Marketing",
  body: "Your customers check their inbox every day — email marketing ensures your brand is right there with them. From promotions to personalized updates, effective email campaigns keep your audience engaged, build trust, and turn subscribers into loyal buyers. Smart email marketing connects your brand with the right people, at the right time, with the right message.",
};

const BLOG_TOPIC = "email marketing";

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
        icon={MailIcon}
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
