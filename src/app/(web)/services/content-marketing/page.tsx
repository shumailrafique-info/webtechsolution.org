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

const HERO = {
  title: "Content",
  accent: "marketing",
  intro:
    "Great content isn’t just about words — it’s about impact. We help your brand share stories, answer questions, and connect with audiences in ways that matter. Our content marketing turns casual readers into loyal customers.",
};

const WHY =
  "From SEO-optimized blogs to multi-channel campaigns, we craft content that reflects your brand identity, resonates with your audience, and delivers measurable results.";

const OFFERS_INTRO =
  "Discover our range of professional services designed to elevate your brand, boost engagement, and drive business growth.";

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
  title: "Importance of Content Marketing",
  body: "Great content doesn’t just attract clicks — it builds connections. Content marketing helps your brand share stories, answer questions, and solve problems in ways that matter to your audience. When done right, it turns casual readers into loyal customers who trust your expertise.",
};

const BLOG_TOPIC = "content marketing";

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
        icon={FileTextIcon}
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
