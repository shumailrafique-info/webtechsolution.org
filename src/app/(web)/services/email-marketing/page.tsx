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

const HOW_WE_DELIVER = [
  {
    title: "Audit",
    body: "List health check, ESP setup and deliverability review.",
  },
  {
    title: "Strategy",
    body: "Segments and automation map: welcome, cart-recovery and re-engagement sequences.",
  },
  {
    title: "Create & send",
    body: "Copy, design and A/B tests on subject lines and content.",
  },
  {
    title: "Report",
    body: "Open, click and conversion rates plus list growth, monthly.",
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
        icon={MailIcon}
        title="Email"
        accent="marketing"
        intro="Grow smarter with WebTech Solutions’ professional email marketing services. We create targeted, well-designed campaigns, automate customer journeys, and continuously optimize results to improve engagement, conversions, and ROI — understanding your goals, refining your message, and turning subscribers into long-term customers."
        offersCount={OFFERS.length}
      />
      <ServiceOffers
        name={NAME}
        intro="Discover our range of professional services designed to elevate your brand, boost engagement, and drive business growth."
        why="We treat your growth like our own — and every strategy we use is backed by real results."
        offers={OFFERS}
      />
      <ServicePillars pillars={HOW_WE_DELIVER} />
      <ServiceImportance
        title="Importance of Email Marketing"
        body="Your customers check their inbox every day — email marketing ensures your brand is right there with them. From promotions to personalized updates, effective email campaigns keep your audience engaged, build trust, and turn subscribers into loyal buyers. Smart email marketing connects your brand with the right people, at the right time, with the right message."
      />
      <MoreServices group={GROUP} current={SLUG} />
      <RelatedPosts topic="email marketing" />
      <ServiceCta title={`Ready to grow with ${NAME}?`} accent="Let’s talk." />
    </>
  );
}
