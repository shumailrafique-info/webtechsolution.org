import type { Metadata } from "next";
import { LinkIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";
import { MoreServices } from "../_components/more-services";
import { RelatedPosts } from "../_components/related-posts";
import { ServiceCta } from "../_components/service-cta";
import { ServiceHero } from "../_components/service-hero";
import { ServiceImportance } from "../_components/service-importance";
import { ServiceOffers } from "../_components/service-offers";
import { ServicePillars } from "../_components/service-pillars";
import { ServiceReasons } from "../_components/service-reasons";
import { ServiceSchema } from "../_components/service-schema";

const SLUG = "link-building";
const NAME = "Link Building";
const GROUP = "core";

const META_TITLE = "Scalable White Label Link Building Services (13+ Years)";
const META_DESCRIPTION =
  "Partner with a trusted white label link building team. Editorial links, digital PR, and long-term SEO growth backed by 13+ years.";

const OFFERS_TITLE = "How we help you build white-label backlinks";

const OFFERS = [
  {
    title: "Discovery & Backlink Strategy Planning",
    body: "We analyze your niche, content assets, and opportunities to identify optimal backlink sources.",
  },
  {
    title: "Customized Outreach Execution",
    body: "Our team drafts custom pitches, secures placements, and negotiates link terms on your behalf.",
  },
  {
    title: "Content Development (where needed)",
    body: "We create or optimize content to meet the editorial requirements of partner sites — ensuring mutual value.",
  },
  {
    title: "Monitoring & Reporting",
    body: "Receive status updates, live tracking, and performance insights to evaluate campaign impact.",
  },
  {
    title: "Competitor Backlink Analysis",
    body: "Analyze competitors’ backlink profiles to identify opportunities and build superior links that boost your website’s performance.",
  },
];

const REASONS = [
  {
    title: "Built on 13 Years of Real Experience",
    body: "We’ve been supporting SEO campaigns for over 13 years, adapting through every major algorithm update. Our strategies are shaped by experience — not trends.",
  },
  {
    title: "Quality Over Volume, Always",
    body: "Relevant editorial links and brand mentions, earned from trusted websites that make sense for your clients’ niche. No mass placements, no shortcuts.",
  },
  {
    title: "Designed for Agencies",
    body: "Fully white label, with clear communication and client-ready reporting. We never contact your clients, and we never compete with your agency.",
  },
  {
    title: "Transparent, Predictable Process",
    body: "You’ll always know what’s happening, what’s been delivered, and what’s next. Our process is clear, repeatable, and built for scale.",
  },
  {
    title: "Future-Focused SEO",
    body: "Beyond rankings, our work supports brand trust, entity recognition, and AI visibility — helping your clients stay visible as search evolves.",
  },
];

const HOW_WE_DELIVER = [
  {
    title: "Audit",
    body: "Backlink profile review including a toxic-link check.",
  },
  {
    title: "Prospect",
    body: "List of relevant outreach targets approved by you.",
  },
  {
    title: "Outreach",
    body: "Personalized pitches and follow-ups to earn editorial links and mentions.",
  },
  {
    title: "Report",
    body: "Live placement URLs with anchor text and domain metrics.",
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
        offersTitle={OFFERS_TITLE}
        offers={OFFERS}
      />
      <ServiceHero
        slug={SLUG}
        name={NAME}
        group={GROUP}
        icon={LinkIcon}
        title="White label"
        accent="link building services"
        intro="Earn real backlinks that build trust, authority, and AI visibility. With 13 years of hands-on experience, we help agencies secure genuine editorial links and brand mentions on relevant, trusted websites. Our approach combines relationship-based outreach, digital PR placements, and content-led link earning — so clients grow visibility and traffic with long-term stability."
        offersCount={OFFERS.length}
      />
      <ServiceOffers
        name={NAME}
        title={OFFERS_TITLE}
        intro="What's included, how we deliver it, and how we report it — listed below for this service."
        why="Relationship-based outreach since 2013 — editorial links and brand mentions, no link farms. Every placement reported with live URLs and domain metrics."
        offers={OFFERS}
      />
      <ServicePillars pillars={HOW_WE_DELIVER} />
      <ServiceImportance
        title="Importance of Link Building"
        body="Link earning isn’t about chasing authority scores anymore — it’s about building trust and clarity around a brand. When your clients earn editorial links and brand mentions from relevant, reputable websites, search engines and AI systems better understand who they are, what they do, and why they’re credible. We approach link building as a long-term authority strategy, not a volume game: stronger organic visibility, qualified referral traffic, and SEO growth that holds up in competitive markets — all delivered quietly under your brand."
      />
      <ServiceReasons
        name={NAME}
        lede="Choosing a white-label partner isn’t just about links — it’s about trust, consistency, and protecting your brand. We work as an extension of your agency, quietly supporting your clients’ growth while you stay in control."
        items={REASONS}
      />
      <MoreServices group={GROUP} current={SLUG} />
      <RelatedPosts topic="link building" />
      <ServiceCta
        title={`Ready to grow with ${NAME}?`}
        accent="Let’s talk."
        body="Send us your domain — we'll show you 10 relevant sites we can earn links from."
      />
    </>
  );
}
