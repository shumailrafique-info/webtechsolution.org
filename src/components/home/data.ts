export const FOUNDED = { year: 2013, iso: "2013-01-01" } as const;

export const PROJECTS_DELIVERED = "100+";

export const CONTACT = {
  email: "info@webtechsolution.org",
  marketingEmail: "marketing@webtechsolution.org",
  phones: [
    { label: "Pakistan", display: "+92 301 7277767", href: "+923017277767" },
    { label: "Spain", display: "+34 631 060 869", href: "+34631060869" },
  ],
  hours: "Monday to Saturday, 9:00 am – 5:00 pm",
} as const;

export type Office = {
  country: string;
  countryCode: string;
  city: string;
  lines: string[];
  postalCode: string;
  timezone: string;
};

// The United States is the primary market, so it leads every list.
export const OFFICES: Office[] = [
  {
    country: "United States",
    countryCode: "US",
    city: "Las Vegas",
    lines: ["3500 E Bonanza Rd"],
    postalCode: "",
    timezone: "Pacific Time",
  },
  {
    country: "United Kingdom",
    countryCode: "GB",
    city: "Manchester",
    lines: ["853 Ashton New Road", "Clayton"],
    postalCode: "M11 4PA",
    timezone: "GMT / BST",
  },
  {
    country: "Spain",
    countryCode: "ES",
    city: "Granada",
    lines: ["C/ Pasaje Flores Nº 1, 1 4D"],
    postalCode: "16006",
    timezone: "CET / CEST",
  },
  {
    country: "Pakistan",
    countryCode: "PK",
    city: "Faisalabad",
    lines: ["Office 11, 2nd Floor", "Kohinoor 1 Plaza"],
    postalCode: "38000",
    timezone: "UTC+5",
  },
];

export const FOUNDER = {
  name: "Fawad Mohsin",
  formerName: "Fawad Malik",
  role: "Founder & CEO",
  image: "/images/home/founder.webp",
} as const;

export const TEAM_GROUPS = [
  {
    id: "development",
    title: "Development &",
    accent: "technical SEO",
    lede: "The engineers who build the sites and keep them readable to search engines.",
  },
  {
    id: "content",
    title: "Content &",
    accent: "editorial",
    lede: "Writers and editors behind the content our search work is built on.",
  },
  {
    id: "marketing",
    title: "Marketing &",
    accent: "outreach",
    lede: "Campaigns, outreach, email and social: the reach that runs alongside search.",
  },
  {
    id: "design",
    title: "Design &",
    accent: "visuals",
    lede: "Graphics and visual identity for sites, campaigns and social.",
  },
  {
    id: "operations",
    title: "Running the",
    accent: "business",
    lede: "Keeping the company itself in good order.",
  },
] as const;

export type TeamGroup = (typeof TEAM_GROUPS)[number]["id"];

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  group: TeamGroup;
  bio?: string;
  home?: boolean;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Syed Saud Ahsan",
    role: "Head of Development & Technical SEO",
    image: "/images/home/team/syed-saud-ahsan.webp",
    group: "development",
    home: true,
  },
  {
    name: "Raza Mohsin",
    role: "Head of Marketing",
    bio: "Raza leads marketing strategy at WebTech Solutions, guiding campaigns that build brand awareness, generate leads, and support business growth.",
    image: "/images/home/team/raza-mohsin.webp",
    group: "marketing",
    home: true,
  },
  {
    name: "Noman Sarwar",
    role: "Senior Editor & Analyst",
    bio: "Noman leads content quality and performance insights, ensuring every piece at WebTech Solutions is accurate, impactful, and aligned with strategy.",
    image: "/images/home/team/noman-sarwar.webp",
    group: "content",
    home: true,
  },
  {
    name: "Arham Nayak",
    role: "Google Search Console Manager",
    bio: "Arham monitors website performance in Google Search Console, fixing issues, improving indexing, and helping WebTech Solutions maintain healthy search visibility.",
    image: "/images/home/team/arham-nayak.webp",
    group: "development",
    home: true,
  },
  {
    name: "Hammad Mohsin",
    role: "Outreach Specialist",
    bio: "Hammad manages outreach and partnerships at WebTech Solutions, building quality relationships that help expand our brand and reach new audiences.",
    image: "/images/home/team/hammad-mohsin.webp",
    group: "marketing",
    home: true,
  },
  {
    name: "Talha Ashraf",
    role: "Video Editor & Social Media Manager",
    bio: "Talha Ashraf is a Professional Video Editor & Social Media Manager at WebTech Solutions. He creates engaging visual content and helps brands build stronger connections online.",
    image: "/images/home/team/talha-ashraf.webp",
    group: "marketing",
    home: true,
  },
  {
    name: "Vicky Shah",
    role: "Email Marketing Specialist",
    bio: "Vicky connects with potential clients and manages outreach campaigns, helping WebTech Solutions bring in new projects and build strong relationships.",
    image: "/images/home/team/vicky-shah.webp",
    group: "marketing",
    home: true,
  },
  {
    name: "Azeem Riaz",
    role: "Graphic Designer",
    bio: "Azeem creates visuals and brand designs for WebTech Solutions, ensuring our graphics look professional, clear, and appealing.",
    image: "/images/home/team/azeem-riaz.webp",
    group: "design",
    home: true,
  },
  {
    name: "Rana Wajahat",
    role: "Content Editor",
    bio: "Rana Wajahat reviews and edits content at WebTech Solutions, ensuring every piece is clear, accurate, professional — helpful, engaging, and reliable.",
    image: "/images/home/team/rana-wajahat.webp",
    group: "content",
  },
  {
    name: "Hammad Ali",
    role: "Senior Content Writer",
    bio: "Hammad writes high-quality articles for WebTech Solutions’ clients, helping brands share clear messages and build trust with their audience.",
    image: "/images/home/team/hammad-ali.webp",
    group: "content",
  },
  {
    name: "Abrar Khan",
    role: "Digital Marketer",
    bio: "Abrar focuses on paid ads and digital campaigns, helping WebTech Solutions reach the right audience and drive quality results for clients.",
    image: "/images/home/team/abrar-khan.webp",
    group: "marketing",
  },
  {
    name: "Waqas Malik",
    role: "Digital Marketer",
    image: "/images/home/team/waqas-malik.webp",
    group: "marketing",
  },
  {
    name: "Aswad Ali",
    role: "Digital Marketer",
    bio: "Aswad focuses on paid ads and digital campaigns, helping WebTech Solutions reach the right audience and drive quality results for clients.",
    image: "/images/home/team/aswad-ali.webp",
    group: "marketing",
  },
  {
    name: "Ali Hassan",
    role: "Graphic Designer",
    bio: "Ali designs creative visuals and brand assets for WebTech Solutions, helping make our content clear, modern, and visually engaging.",
    image: "/images/home/team/ali-hassan.webp",
    group: "design",
  },
  {
    name: "Ali Jutt",
    role: "Graphic Designer",
    image: "/images/home/team/ali-jutt.webp",
    group: "design",
  },
  {
    name: "Afzaal Ahmed",
    role: "Professional Accountant",
    bio: "Afzaal Ahmed manages accounting, budgeting, and financial reporting at WebTech Solutions. With a careful, detail-oriented approach, he helps keep our operations organized.",
    image: "/images/home/team/afzaal-ahmed.webp",
    group: "operations",
  },
];

export const TEAM = TEAM_MEMBERS.filter((member) => member.home);

export const PRESS: { name: string; logo: string }[] = [
  { name: "Yahoo Finance", logo: "/images/home/press/yahoo-finance.png" },
  { name: "Digital Journal", logo: "/images/home/press/digital-journal.png" },
  { name: "Inquirer.net", logo: "/images/home/press/inquirer.png" },
  {
    name: "Analytics Insight",
    logo: "/images/home/press/analytics-insight.png",
  },
  { name: "WebProNews", logo: "/images/home/press/webpronews.png" },
  { name: "Trustwave", logo: "/images/home/press/trustwave.png" },
  { name: "AZ Big Media", logo: "/images/home/press/az-big-media.png" },
  { name: "Appinventiv", logo: "/images/home/press/appinventiv.png" },
  {
    name: "eCommerce Fastlane",
    logo: "/images/home/press/ecommerce-fastlane.png",
  },
  { name: "Porch", logo: "/images/home/press/porch.png" },
  { name: "POWR", logo: "/images/home/press/powr.png" },
  { name: "NogenTech", logo: "/images/home/press/nogentech.png" },
];

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  context?: string;
};

export const TESTIMONIALS: Testimonial[] = [];
