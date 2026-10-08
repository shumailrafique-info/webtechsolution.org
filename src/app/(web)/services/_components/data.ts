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
      "Improve your search rankings with tailored SEO strategies that drive organic traffic and conversions.",
  },
  {
    slug: "content-writing",
    name: "Content Writing",
    group: "core",
    icon: PenNibIcon,
    summary:
      "Deliver compelling, SEO-friendly content that informs and converts.",
  },
  {
    slug: "link-building",
    name: "Link Building",
    group: "core",
    icon: LinkIcon,
    summary: "Ethical link-building campaigns that boost SEO performance.",
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    group: "core",
    icon: ShareIcon,
    summary:
      "Engage, inspire, and convert audiences through impactful social media storytelling.",
  },
  {
    slug: "email-marketing",
    name: "Email Marketing",
    group: "core",
    icon: MailIcon,
    summary:
      "Nurture leads and build loyalty with personalized email campaigns.",
  },
  {
    slug: "web-designing",
    name: "Web Designing",
    group: "core",
    icon: PencilRulerIcon,
    summary: "Modern, user-focused designs that elevate your online presence.",
  },
  {
    slug: "web-development",
    name: "Web Development",
    group: "core",
    icon: CodeIcon,
    summary:
      "Create fast, secure, and scalable websites built for performance.",
  },
  {
    slug: "app-development",
    name: "App Development",
    group: "core",
    icon: DeviceMobileIcon,
    summary:
      "Transform ideas into powerful mobile apps with seamless functionality.",
  },
  {
    slug: "google-business-profile",
    name: "GMB Listing",
    group: "core",
    icon: MapPinIcon,
    summary:
      "Attract nearby customers with a polished and professional GMB presence.",
  },
  {
    slug: "content-marketing",
    name: "Content Marketing",
    group: "marketing",
    icon: FileTextIcon,
    summary:
      "Build authority with strategic content campaigns that attract and convert.",
  },
  {
    slug: "google-ads",
    name: "PPC & Google Ads",
    group: "marketing",
    icon: GoogleIcon,
    summary:
      "Generate instant leads with expertly managed PPC and Google Ads campaigns designed for ROI.",
  },
  {
    slug: "affiliate-marketing",
    name: "Affiliate Marketing",
    group: "marketing",
    icon: HandshakeIcon,
    summary: "Drive sales through trusted affiliate networks and strategies.",
  },
  {
    slug: "video-marketing",
    name: "Video Marketing",
    group: "marketing",
    icon: VideoIcon,
    summary: "Tell your story with impactful videos that drive engagement.",
  },
  {
    slug: "mobile-marketing",
    name: "Mobile Marketing",
    group: "marketing",
    icon: MegaphoneIcon,
    summary:
      "Reach customers on the go with mobile-first marketing strategies.",
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
    lede: "Search, content, websites and apps: the foundations of being found online.",
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
