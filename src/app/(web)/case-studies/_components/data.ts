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
    title: "A traffic surge through Search Engine optimization",
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
    slug: "texttofont",
    client: "TextToFont.com",
    logo: { src: "/images/clients/texttofont.png", width: 279, height: 21 },
    sector: "Font & text tools",
    title: "Growing organic traffic through SEO and content expansion",
    summary:
      "We improved the site's SEO structure, expanded font-related content, and created a stronger internal linking system to help more pages appear in search results.",
    challenge:
      "TextToFont had a growing collection of font and text generator tools, but many pages needed stronger search visibility and better connections between related tools.",
    approach: [
      {
        title: "Technical SEO",
        body: "Improved the site's structure, indexing, and page organization to make important tool pages easier for search engines to understand.",
      },
      {
        title: "Keyword Expansion",
        body: "Added content around different font styles, text effects, and popular generator searches to reach more relevant queries.",
      },
      {
        title: "Internal Linking",
        body: "Connected related font and text tools to create clearer topic clusters and help users discover more tools.",
      },
      {
        title: "Content Optimization",
        body: "Improved tool descriptions, headings, and supporting content around important pages.",
      },
    ],
    outcome:
      "The site developed a broader SEO footprint with more relevant pages targeting font and text-related searches.",
    services: ["Technical SEO", "Content SEO", "Internal Linking"],
    metrics: [
      { value: "+186%", label: "Organic sessions" },
      { value: "350+", label: "Keywords ranking" },
      { value: "3.2×", label: "Search impressions" },
    ],
    duration: "8 months",
    trend: [14, 16, 19, 23, 28, 33, 37, 40],
    trendLabel: "Organic sessions",
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
    slug: "nogentech-com",
    client: "NogenTech.com",
    logo: { src: "/images/clients/nogentech-com.png", width: 567, height: 129 },
    sector: "SEO content platform",
    title: "Building search visibility for an SEO content platform",
    summary:
      "We strengthened NogenTech's content strategy around SEO, content optimization, AI search, and editorial workflows to build a stronger organic presence.",
    challenge:
      "NogenTech needed to clearly communicate its content optimization platform while building topical authority around modern SEO, AI search, and content quality.",
    approach: [
      {
        title: "Topic Strategy",
        body: "Built content around content optimization, search intent, AI citation readiness, E-E-A-T, and editorial SEO.",
      },
      {
        title: "Content Optimization",
        body: "Improved articles to better match search intent and provide useful information beyond generic summaries.",
      },
      {
        title: "Internal Linking",
        body: "Connected related articles, product pages, tools, and use-case pages to build stronger topic relationships.",
      },
      {
        title: "Content Authority",
        body: "Expanded supporting content around the platform's core features and modern search workflows.",
      },
    ],
    outcome:
      "NogenTech now has a broader content structure covering SEO content optimization, AI discovery, editorial QA, and related search topics.",
    services: ["SEO", "Content Strategy", "AI Search"],
    metrics: [
      { value: "+164%", label: "Organic sessions" },
      { value: "120+", label: "Keywords in top 10" },
      { value: "2.8×", label: "Search impressions" },
    ],
    duration: "6 months",
    trend: [20, 22, 27, 33, 41, 49],
    trendLabel: "Organic sessions",
    placeholder: true,
  },
];
