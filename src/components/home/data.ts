/**
 * Facts the homepage is built from.
 *
 * Every value here is taken from the company's existing website - the contact,
 * about, team, services, FAQ and pricing pages. Nothing is estimated or made
 * up: where the old site had no data (project screenshots, results figures,
 * a technology list, verifiable testimonials) the homepage shows less rather
 * than inventing more. Add to these lists as real material becomes available
 * and the sections pick it up.
 */

export const FOUNDED = { year: 2013, iso: "2013-01-01" } as const;

/** "100+ Successful Projects" on the old homepage. */
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
  /** Street address exactly as the company publishes it. */
  lines: string[];
  postalCode: string;
  timezone: string;
};

export const OFFICES: Office[] = [
  {
    country: "Pakistan",
    countryCode: "PK",
    city: "Faisalabad",
    lines: ["Office 11, 2nd Floor", "Kohinoor 1 Plaza"],
    postalCode: "38000",
    timezone: "UTC+5",
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
    country: "United States",
    countryCode: "US",
    city: "Las Vegas",
    lines: ["3500 E Bonanza Rd"],
    postalCode: "",
    timezone: "Pacific Time",
  },
];

export const FOUNDER = {
  name: "Fawad Mohsin",
  formerName: "Fawad Malik",
  role: "Founder & CEO",
  image: "/images/home/founder.webp",
} as const;

export type TeamMember = { name: string; role: string; image: string };

/** Roles as the team page lists them. */
export const TEAM: TeamMember[] = [
  {
    name: "Syed Saud Ahsan",
    role: "Head of Development & Technical SEO",
    image: "/images/home/team/syed-saud-ahsan.webp",
  },
  {
    name: "Raza Mohsin",
    role: "Head of Marketing",
    image: "/images/home/team/raza-mohsin.webp",
  },
  {
    name: "Noman Sarwar",
    role: "Senior Editor & Analyst",
    image: "/images/home/team/noman-sarwar.webp",
  },
  {
    name: "Arham Nayak",
    role: "Google Search Console Manager",
    image: "/images/home/team/arham-nayak.webp",
  },
  {
    name: "Hammad Mohsin",
    role: "Outreach Specialist",
    image: "/images/home/team/hammad-mohsin.webp",
  },
  {
    name: "Talha Ashraf",
    role: "Video Editor & Social Media Manager",
    image: "/images/home/team/talha-ashraf.webp",
  },
  {
    name: "Vicky Shah",
    role: "Email Marketing Specialist",
    image: "/images/home/team/vicky-shah.webp",
  },
  {
    name: "Azeem Riaz",
    role: "Graphic Designer",
    image: "/images/home/team/azeem-riaz.webp",
  },
];

/** Publications the old homepage lists under "Featured in". */
export const PRESS: { name: string; logo: string }[] = [
  { name: "Yahoo Finance", logo: "/images/home/press/yahoo-finance.png" },
  { name: "Digital Journal", logo: "/images/home/press/digital-journal.png" },
  { name: "Inquirer.net", logo: "/images/home/press/inquirer.png" },
  { name: "TechBullion", logo: "/images/home/press/techbullion.png" },
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

export type Client = {
  name: string;
  /** What the client does, as their own branding describes it. */
  sector?: string;
  /** What we did, where the old site recorded it. */
  work?: string;
  /** The service involved, where the old site recorded it. */
  service?: string;
  /** A project image, once one is supplied. */
  image?: string;
  href?: string;
};

/**
 * Clients named on the old case studies page. Only what that page recorded is
 * shown; supplying an image and a description for each one upgrades its row.
 */
export const CLIENTS: Client[] = [
  {
    name: "WiseToast",
    work: "Organic traffic growth through SEO",
    service: "SEO",
  },
  { name: "Edulize", sector: "Education publisher" },
  { name: "NogenTech", sector: "Technology & marketing publication" },
  { name: "Intellect Folks" },
];

/** The published plans, as the pricing page lists them. */
export const PRICING = {
  consultation: { name: "Elite Business Consultation", price: "$349/hour" },
  launch: {
    name: "Pro Website Launch",
    price: "$1,249/month",
    support: "1 month",
    bugFree: "2 months",
  },
  growth: {
    name: "Ultimate Growth Package",
    price: "$2,499/month",
    support: "3 months",
    bugFree: "3 months",
  },
} as const;

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  context?: string;
};

/**
 * Deliberately empty. The quotes on the old site sit beside stock portraits
 * with no company or role, so they cannot be shown as genuine client
 * statements. The section renders as soon as real ones are added here.
 */
export const TESTIMONIALS: Testimonial[] = [];
