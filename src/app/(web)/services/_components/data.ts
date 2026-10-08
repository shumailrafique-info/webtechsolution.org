import type { ComponentType } from "react";
import {
  CodeIcon,
  DeviceMobileIcon,
  FileTextIcon,
  GoogleIcon,
  HandshakeIcon,
  LinkIcon,
  MailIcon,
  MapPinIcon,
  MegaphoneIcon,
  PencilRulerIcon,
  PenNibIcon,
  SearchIcon,
  ShareIcon,
  VideoIcon,
} from "@/components/icons";

export type ServiceGroup = "core" | "marketing";

export type Point = { title: string; body: string };

export type ServiceSummary = {
  slug: string;
  name: string;
  group: ServiceGroup;
  icon: ComponentType<{ className?: string }>;
  summary: string;
};

export const imageOf = (slug: string) => `/images/services/${slug}.webp`;
export const serviceHref = (slug: string) => `/services/${slug}`;

export const SERVICES: ServiceSummary[] = [
  {
    slug: "seo",
    name: "SEO",
    group: "core",
    icon: SearchIcon,
    summary:
      "Technical audits, keyword maps, on-page fixes, content plans and editorial link earning — monthly reporting on the searches that bring customers.",
  },
  {
    slug: "content-writing",
    name: "Content Writing",
    group: "core",
    icon: PenNibIcon,
    summary:
      "Human-written, search-intent-mapped articles and web copy: researched briefs, expert sourcing, E-E-A-T checks and revision rounds.",
  },
  {
    slug: "link-building",
    name: "Link Building",
    group: "core",
    icon: LinkIcon,
    summary:
      "Relationship-based outreach earning editorial links and brand mentions on relevant sites — no link farms; live placement reports.",
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    group: "core",
    icon: ShareIcon,
    summary:
      "Platform-specific content calendars, ad creative and community management for Instagram, Facebook, LinkedIn and TikTok — tracked to leads.",
  },
  {
    slug: "email-marketing",
    name: "Email Marketing",
    group: "core",
    icon: MailIcon,
    summary:
      "Segmented campaigns and automation: welcome, cart-recovery and re-engagement sequences, subject-line testing, deliverability management.",
  },
  {
    slug: "web-designing",
    name: "Web Designing",
    group: "core",
    icon: PencilRulerIcon,
    summary:
      "Wireframed, mobile-first website designs built around one conversion goal per page — mockups, revisions and launch QA included.",
  },
  {
    slug: "web-development",
    name: "Web Development",
    group: "core",
    icon: CodeIcon,
    summary:
      "Fast, secure, scalable website builds with technical SEO baked in — staging reviews, go-live QA and post-launch support.",
  },
  {
    slug: "app-development",
    name: "App Development",
    group: "core",
    icon: DeviceMobileIcon,
    summary:
      "iOS and Android apps: clickable prototype before coding, sprint-based builds tested on real devices, store submission handled.",
  },
  {
    slug: "google-business-profile",
    name: "Google Business Profile",
    group: "core",
    icon: MapPinIcon,
    summary:
      "Profile optimization, review strategy, posts and photos managed for local rankings — Ask Maps ready, monthly local reports.",
  },
  {
    slug: "content-marketing",
    name: "Content Marketing",
    group: "marketing",
    icon: FileTextIcon,
    summary:
      "Topic-cluster content strategy: editorial calendars, distribution across blog/social/email, and quarterly authority reporting.",
  },
  {
    slug: "google-ads",
    name: "PPC & Google Ads",
    group: "marketing",
    icon: GoogleIcon,
    summary:
      "Google-only campaign management: Search, Display, YouTube and remarketing — structured ad groups, negative-keyword hygiene, monthly ROI reports.",
  },
  {
    slug: "affiliate-marketing",
    name: "Affiliate Marketing",
    group: "marketing",
    icon: HandshakeIcon,
    summary:
      "Affiliate program setup, partner recruitment, commission structures and fraud monitoring — performance-based growth without upfront ad spend.",
  },
  {
    slug: "video-marketing",
    name: "Video Marketing",
    group: "marketing",
    icon: VideoIcon,
    summary:
      "Short-form clips, explainers, product demos and YouTube campaigns — scripted, edited and published by our in-house video team.",
  },
  {
    slug: "mobile-marketing",
    name: "Mobile Marketing",
    group: "marketing",
    icon: MegaphoneIcon,
    summary:
      "Consent-based SMS, push and in-app campaigns with opt-out compliance — targeted sends with delivery and conversion reporting.",
  },
];

export const servicesIn = (group: ServiceGroup) =>
  SERVICES.filter((service) => service.group === group);

export const GROUPS: Record<
  ServiceGroup,
  { title: string; accent: string; lede: string; href: string }
> = {
  core: {
    title: "Our",
    accent: "services",
    lede: "SEO, paid ads, content, web design and app development, all under one roof.",
    href: "/services",
  },
  marketing: {
    title: "Digital",
    accent: "marketing",
    lede: "Campaigns that reach your audience now, alongside search work that compounds.",
    href: "/services/digital-marketing",
  },
};

export const groupLabel = (group: ServiceGroup) =>
  `${GROUPS[group].title} ${GROUPS[group].accent}`;
