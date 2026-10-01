const EMAIL = "info@webtechsolution.org";

const mailto = (subject: string) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;

export const LINKS = {
  email: EMAIL,
  inquiry: mailto("Advertising Inquiry (WebTech Solutions)"),
  brief: mailto("Advertising Brief (WebTech Solutions)"),
  opportunities: mailto("Advertising Opportunities (WebTech Solutions)"),
  contact: "/contact-us",
};

export const INTRO = {
  eyebrow: "Advertising, sponsorship, and brand placement",
  title: "Advertise with",
  accent: "WebTech Solutions.",
  body: "Promote your product or service to readers who care about SEO, marketing, blogging, and tech. We offer placements that look natural, stay useful, and match the topic.",
  facts: [
    "Response time: usually within 1 business day",
    "Agency since 2013",
    "SEO, marketing, web and app services",
  ],
};

export const MEDIA_KIT = {
  title: "Media kit",
  accent: "snapshot",
  note: "For advertisers",
  rows: [
    {
      label: "Blog topics",
      value: "SEO, digital marketing, blogging, business, tech",
    },
    {
      label: "Best fit",
      value: "SaaS, marketing tools, hosting, WordPress, B2B services",
    },
    {
      label: "Top content types",
      value: "Tool lists, comparisons, how-to guides, case studies",
    },
    {
      label: "Approval rule",
      value:
        "We accept only topic-matched offers. If it does not fit, we decline.",
    },
    {
      label: "What to send",
      value: "Website + offer + target topic/page + preferred timeline",
    },
  ],
};

export const AUDIENCE = {
  eyebrow: "About our blog audience",
  title: "Who reads our",
  accent: "content?",
  readers:
    "Our readers are usually small business owners, founders, marketers, bloggers, and people building websites. They want simple guides, tools, comparisons, and step-by-step help.",
  categoriesTitle: "Main content categories",
  categories: [
    "SEO",
    "Digital marketing",
    "Social media marketing",
    "Content marketing",
    "Blogging",
    "Business",
    "Technology",
  ],
  goodFit:
    "Great fit: SaaS tools, marketing tools, hosting, WordPress products, ecommerce apps, and B2B services.",
  rule: "We keep things topic-based. If it doesn’t match our readers, we will decline.",
};

export const AD_TYPES = [
  {
    id: "sponsored-article",
    title: "Sponsored Article",
    body: "A full post about your product or service, written for real readers. Disclosure can be added if needed.",
  },
  {
    id: "brand-placement",
    title: "Brand Placement",
    body: "Your brand added inside a related page (example: tools list, guide, or comparison).",
  },
  {
    id: "banner",
    title: "Banner / Sidebar Spot",
    body: "Visual placement for a fixed time period (weekly or monthly).",
  },
] as const;

export const OTHER_OPPORTUNITIES = [
  {
    id: "category",
    title: "Category Sponsorship",
    body: "Be the featured partner for a topic like SEO, Blogging, or Technology for a fixed time period.",
  },
  {
    id: "feature",
    title: "Tool or Product Feature",
    body: "A focused write-up that explains what your tool does, who it’s for, and when it makes sense to use.",
  },
  {
    id: "comparison",
    title: "Comparison Mention",
    body: "Get included in a relevant comparison post (example: alternatives, best tools list, or buyers guide).",
  },
  {
    id: "case-study",
    title: "Case Study Spotlight",
    body: "Share real results, numbers, and lessons from your brand. Great for trust and long-term value.",
  },
  {
    id: "resource",
    title: "Resource Page Placement",
    body: "Add your product to a curated resources section where readers already look for recommendations.",
  },
  {
    id: "custom",
    title: "Custom Package",
    body: "If you want a mix of placements and content, we can build a plan around your goal and timeline.",
  },
] as const;

export const BRIEF = {
  title: "Send a quick",
  accent: "brief",
  body: "Include your website, what you want to promote, your target audience, and the type you want (or just say Not sure and we will suggest the best match).",
};

export const FAQS = [
  {
    question: "Do you accept every industry?",
    answer: "No. We accept ads that match our blog topics and readers.",
  },
  {
    question: "Can I approve the draft?",
    answer:
      "Yes, for sponsored articles we can share a draft for review before publishing.",
  },
  {
    question: "Where do I contact you?",
    answer: "Email info@webtechsolution.org or use the contact page.",
  },
  {
    question: "What should I send in the first email?",
    answer:
      "Your website, your offer, the placement type you want, and a preferred timeline.",
  },
];
