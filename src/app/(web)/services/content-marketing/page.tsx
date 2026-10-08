import type { Metadata } from "next";
import { FileTextIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";
import { MoreServices } from "../_components/more-services";
import { RelatedPosts } from "../_components/related-posts";
import { ServiceCta } from "../_components/service-cta";
import { ServiceHero } from "../_components/service-hero";
import { ServiceImportance } from "../_components/service-importance";
import { ServiceOffers } from "../_components/service-offers";
import { ServicePillars } from "../_components/service-pillars";
import { ServiceSchema } from "../_components/service-schema";

const SLUG = "content-marketing";
const NAME = "Content Marketing";
const GROUP = "marketing";

const META_TITLE = "Content Marketing Services - WebTech Solutions";
const META_DESCRIPTION =
  "Boost brand visibility, engage your audience, and drive conversions with our expert content marketing services tailored for growth.";

const OFFERS = [
  {
    title: "Blog Writing",
    body: "Publish insightful articles to inform and engage your audience.",
  },
  {
    title: "Video Content",
    body: "Create engaging videos to enhance brand storytelling.",
  },
  {
    title: "Infographics",
    body: "Design visually appealing, data-driven content for easy sharing.",
  },
  {
    title: "E-books & Guides",
    body: "Provide in-depth knowledge to build brand authority.",
  },
  {
    title: "Case Studies",
    body: "Showcase real-life success stories to boost credibility.",
  },
];

const HOW_WE_DELIVER = [
  {
    title: "Research",
    body: "Audience, competitors and topic clusters mapped.",
  },
  {
    title: "Calendar",
    body: "Quarterly editorial calendar approved by you.",
  },
  {
    title: "Produce & distribute",
    body: "Articles created and distributed across blog, social and email.",
  },
  {
    title: "Report",
    body: "Traffic, rankings and leads per quarter with next-quarter plan.",
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
        icon={FileTextIcon}
        title="Content"
        accent="marketing"
        intro="Content marketing that builds topical authority: research-led editorial calendars, distribution across blog, social and email, and quarterly visibility reports."
        offersCount={OFFERS.length}
      />
      <ServiceOffers
        name={NAME}
        intro="Discover our range of professional services designed to elevate your brand, boost engagement, and drive business growth."
        why="From SEO-optimized blogs to multi-channel campaigns, we craft content that reflects your brand identity, resonates with your audience, and delivers measurable results."
        offers={OFFERS}
      />
      <ServicePillars pillars={HOW_WE_DELIVER} />
      <ServiceImportance
        title="Importance of Content Marketing"
        body="Great content doesn’t just attract clicks — it builds connections. Content marketing helps your brand share stories, answer questions, and solve problems in ways that matter to your audience. When done right, it turns casual readers into loyal customers who trust your expertise."
      />
      <MoreServices group={GROUP} current={SLUG} />
      <RelatedPosts topic="content marketing" />
      <ServiceCta title={`Ready to grow with ${NAME}?`} accent="Let’s talk." />
    </>
  );
}
