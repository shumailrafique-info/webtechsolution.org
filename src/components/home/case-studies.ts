export type Logo = { src: string; width: number; height: number };

export type ClientLogo = { name: string; logo: Logo; href?: string };

export const CLIENT_LOGOS: ClientLogo[] = [
  {
    name: "NogenTech",
    logo: {
      src: "/images/home/clients/nogentech.png",
      width: 479,
      height: 120,
    },
    href: "https://www.nogentech.org/",
  },
  {
    name: "Edulize",
    logo: {
      src: "/images/home/clients/edulize.png",
      width: 447,
      height: 120,
    },
  },
  {
    name: "Tricksmode",
    logo: {
      src: "/images/home/clients/tricksmode.png",
      width: 382,
      height: 82,
    },
  },
  {
    name: "BravoTech",
    logo: {
      src: "/images/home/clients/bravotech.png",
      width: 386,
      height: 101,
    },
  },
  {
    name: "BusinessJem",
    logo: {
      src: "/images/home/clients/businessjem.png",
      width: 385,
      height: 96,
    },
  },
  {
    name: "StuffaBlog",
    logo: {
      src: "/images/home/clients/stuffablog.png",
      width: 391,
      height: 93,
    },
  },
];

export type CaseStudy = {
  client: string;
  logo?: Logo;
  sector: string;
  title: string;
  summary: string;
  services: string[];
  metrics: { value: string; label: string }[];
  duration: string;
  trend?: number[];
  href?: string;
  placeholder?: boolean;
};

const logoOf = (name: string) =>
  CLIENT_LOGOS.find((client) => client.name === name)?.logo;

export const CASE_STUDIES: CaseStudy[] = [
  {
    client: "WiseToast",
    sector: "Lifestyle publication",
    title: "A traffic surge through SEO optimisation",
    summary:
      "A content-rich site that search engines struggled to crawl. We fixed the technical foundations, rebuilt the internal linking around topic clusters and refreshed the posts that were closest to page one.",
    services: ["Technical SEO", "Content", "Link building"],
    metrics: [
      { value: "+212%", label: "Organic sessions" },
      { value: "140+", label: "Keywords in the top 3" },
      { value: "4.6×", label: "Search impressions" },
    ],
    duration: "9 months",
    trend: [18, 20, 19, 24, 29, 33, 38, 45, 49, 56],
    placeholder: true,
  },
  {
    client: "Edulize",
    logo: logoOf("Edulize"),
    sector: "Education publisher",
    title: "Rebuilding topical authority for an education blog",
    summary:
      "Consolidated thin, overlapping articles into complete guides and earned links from education sites.",
    services: ["Content strategy", "On-page SEO"],
    metrics: [
      { value: "+148%", label: "Organic traffic" },
      { value: "1,200+", label: "Ranking keywords" },
    ],
    duration: "7 months",
    placeholder: true,
  },
  {
    client: "NogenTech",
    logo: logoOf("NogenTech"),
    sector: "Technology media",
    title: "Scaling a technology publication’s reach",
    summary:
      "An outreach programme and a faster, cleaner site structure for a growing tech news publisher.",
    services: ["Link building", "Technical SEO"],
    metrics: [
      { value: "2.1×", label: "Monthly pageviews" },
      { value: "+320", label: "Referring domains" },
    ],
    duration: "12 months",
    placeholder: true,
  },
  {
    client: "Intellect Folks",
    sector: "Education platform",
    title: "A technical clean-up for an education platform",
    summary:
      "Fixed indexing errors and page speed, then planned content around what students actually search for.",
    services: ["Technical SEO", "Page speed"],
    metrics: [
      { value: "58%", label: "Faster page loads" },
      { value: "+130%", label: "Search impressions" },
    ],
    duration: "5 months",
    placeholder: true,
  },
];
