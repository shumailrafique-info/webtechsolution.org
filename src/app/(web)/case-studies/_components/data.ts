export type Logo = { src: string; width: number; height: number };

export type ClientLogo = { name: string; logo: Logo; href?: string };

export const CLIENT_LOGOS: ClientLogo[] = [
  {
    name: "NogenTech",
    logo: { src: "/images/clients/nogentech.png", width: 479, height: 120 },
    href: "https://www.nogentech.org/",
  },
  {
    name: "Edulize",
    logo: { src: "/images/clients/edulize.png", width: 447, height: 120 },
  },
  {
    name: "Tricksmode",
    logo: { src: "/images/clients/tricksmode.png", width: 382, height: 82 },
  },
  {
    name: "BravoTech",
    logo: { src: "/images/clients/bravotech.png", width: 386, height: 101 },
  },
  {
    name: "BusinessJem",
    logo: { src: "/images/clients/businessjem.png", width: 385, height: 96 },
  },
  {
    name: "StuffaBlog",
    logo: { src: "/images/clients/stuffablog.png", width: 391, height: 93 },
  },
];

export type CaseStudy = {
  slug: string;
  client: string;
  logo?: Logo;
  sector: string;
  title: string;
  summary: string;
  challenge: string;
  approach: { title: string; body: string }[];
  outcome: string;
  services: string[];
  metrics: { value: string; label: string }[];
  duration: string;
  trend: number[];
  trendLabel: string;
  placeholder?: boolean;
};

const logoOf = (name: string) =>
  CLIENT_LOGOS.find((client) => client.name === name)?.logo;

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "wisetoast",
    client: "WiseToast",
    sector: "Lifestyle publication",
    title: "A traffic surge through SEO optimization",
    summary:
      "A content-rich site that search engines struggled to crawl. We fixed the technical foundations, rebuilt the internal linking around topic clusters and refreshed the posts that were closest to page one.",
    challenge:
      "WiseToast had years of good articles, but most of them were invisible. Crawl errors, duplicate archive pages and thin category pages were spreading the site’s authority thin, and new posts took weeks to be indexed.",
    approach: [
      {
        title: "Technical audit",
        body: "Crawled the full site, fixed redirect chains and duplicate archives, and cut the pages competing for the same searches.",
      },
      {
        title: "Topic clusters",
        body: "Grouped posts into clusters with clear pillar pages and rebuilt the internal links around them.",
      },
      {
        title: "Content refresh",
        body: "Rewrote the posts already ranking on page two, where a small improvement moves the most traffic.",
      },
      {
        title: "Link building",
        body: "Earned links from relevant lifestyle publications to the pillar pages.",
      },
    ],
    outcome:
      "Within nine months organic sessions had more than tripled, and the pillar pages hold top-three positions for the searches that bring the site its readers.",
    services: ["Technical SEO", "Content", "Link building"],
    metrics: [
      { value: "+212%", label: "Organic sessions" },
      { value: "140+", label: "Keywords in the top 3" },
      { value: "4.6×", label: "Search impressions" },
    ],
    duration: "9 months",
    trend: [18, 20, 19, 24, 29, 33, 38, 45, 49, 56],
    trendLabel: "Organic sessions",
    placeholder: true,
  },
  {
    slug: "edulize",
    client: "Edulize",
    logo: logoOf("Edulize"),
    sector: "Education publisher",
    title: "Rebuilding topical authority for an education blog",
    summary:
      "Consolidated thin, overlapping articles into complete guides and earned links from education sites.",
    challenge:
      "Edulize had published hundreds of short articles on overlapping topics. Search engines could not tell which page to rank, so none of them ranked well.",
    approach: [
      {
        title: "Content inventory",
        body: "Mapped every article to the search it targets and found where several pages were competing for one.",
      },
      {
        title: "Consolidation",
        body: "Merged overlapping posts into complete guides and redirected the rest.",
      },
      {
        title: "On-page optimization",
        body: "Rewrote titles, headings and internal links around how students and parents actually search.",
      },
    ],
    outcome:
      "Fewer, stronger pages: organic traffic more than doubled and the site now ranks for over a thousand education searches.",
    services: ["Content strategy", "On-page SEO"],
    metrics: [
      { value: "+148%", label: "Organic traffic" },
      { value: "1,200+", label: "Ranking keywords" },
      { value: "−38%", label: "Pages, after consolidation" },
    ],
    duration: "7 months",
    trend: [22, 21, 25, 28, 34, 41, 47, 54],
    trendLabel: "Organic traffic",
    placeholder: true,
  },
  {
    slug: "nogentech",
    client: "NogenTech",
    logo: logoOf("NogenTech"),
    sector: "Technology media",
    title: "Scaling a technology publication’s reach",
    summary:
      "An outreach program and a faster, cleaner site structure for a growing tech news publisher.",
    challenge:
      "NogenTech published quality technology coverage but competed with much larger outlets. It needed more authority, and a site that could keep up with a fast publishing schedule.",
    approach: [
      {
        title: "Outreach program",
        body: "A steady program of editorial outreach to technology and marketing sites.",
      },
      {
        title: "Site structure",
        body: "Simplified categories and tags so new stories inherit authority from the sections they sit in.",
      },
      {
        title: "Speed",
        body: "Image and script optimization so pages load quickly on mobile.",
      },
    ],
    outcome:
      "Monthly pageviews more than doubled across the year, with hundreds of new referring domains pointing at the site.",
    services: ["Link building", "Technical SEO"],
    metrics: [
      { value: "2.1×", label: "Monthly pageviews" },
      { value: "+320", label: "Referring domains" },
      { value: "1.4s", label: "Mobile load time" },
    ],
    duration: "12 months",
    trend: [30, 31, 33, 35, 36, 40, 43, 45, 49, 54, 58, 63],
    trendLabel: "Monthly pageviews",
    placeholder: true,
  },
  {
    slug: "intellect-folks",
    client: "Intellect Folks",
    sector: "Education platform",
    title: "A technical clean-up for an education platform",
    summary:
      "Fixed indexing errors and page speed, then planned content around what students actually search for.",
    challenge:
      "Intellect Folks had grown quickly, and its technical health had not kept up: indexing errors in Search Console, slow pages and content planned without search data.",
    approach: [
      {
        title: "Search Console clean-up",
        body: "Worked through every indexing and coverage error until the important pages were indexed.",
      },
      {
        title: "Page speed",
        body: "Optimized images, fonts and scripts to bring load times down on mobile.",
      },
      {
        title: "Content plan",
        body: "Built an editorial calendar from keyword research into what students search for.",
      },
    ],
    outcome:
      "Pages load in under half the time, and search impressions have more than doubled as the new content plan has rolled out.",
    services: ["Technical SEO", "Page speed"],
    metrics: [
      { value: "58%", label: "Faster page loads" },
      { value: "+130%", label: "Search impressions" },
      { value: "0", label: "Indexing errors" },
    ],
    duration: "5 months",
    trend: [26, 27, 33, 42, 51, 60],
    trendLabel: "Search impressions",
    placeholder: true,
  },
];
