export type NavLink = {
  label: string;
  href: string;
};

export type NavItem = NavLink & {
  children?: NavLink[];
};

export const SERVICES: NavLink[] = [
  { label: "SEO", href: "/services/seo" },
  { label: "Content Writing", href: "/services/content-writing" },
  { label: "Link Building", href: "/services/link-building" },
  {
    label: "Social Media Marketing",
    href: "/services/social-media-marketing",
  },
  { label: "Email Marketing", href: "/services/email-marketing" },
  { label: "Web Designing", href: "/services/web-designing" },

  { label: "Web Development", href: "/services/web-development" },
  { label: "App Development", href: "/services/app-development" },
  {
    label: "Google Business Profile",
    href: "/services/google-business-profile",
  },
];

export const MARKETING: NavLink[] = [
  { label: "Content Marketing", href: "/services/content-marketing" },
  { label: "PPC & Google Ads", href: "/services/google-ads" },
  { label: "Affiliate Marketing", href: "/services/affiliate-marketing" },
  { label: "Video Marketing", href: "/services/video-marketing" },
  { label: "Mobile Marketing", href: "/services/mobile-marketing" },
];

export const MAIN_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Services", href: "/services", children: SERVICES },
  {
    label: "Digital Marketing",
    href: "/services/digital-marketing",
    children: MARKETING,
  },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About Us", href: "/about-us" },
  { label: "Blog", href: "/blog" },
];

export const COMPANY_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Our Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About Us", href: "/about-us" },
  { label: "Brand Story", href: "/brand-story" },
  { label: "Our Team", href: "/our-team" },
  { label: "Contact", href: "/contact-us" },
  { label: "Advertisement with Us", href: "/advertisement-with-us" },
];

export const RESOURCE_LINKS: NavLink[] = [
  { label: "Pricing", href: "/pricing" },
  { label: "FAQs", href: "/faqs" },
];
