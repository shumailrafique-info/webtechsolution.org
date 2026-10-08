export type PlanId = "consultation" | "launch" | "growth";

export type Plan = {
  id: PlanId;
  name: string;
  price: string;
  unit: string;
  billing: string;
  tagline: string;
  summary: string;
  features: string[];
  cta: string;
};

export const PLANS: Plan[] = [
  {
    id: "consultation",
    name: "Elite Business Consultation",
    price: "$349",
    unit: "/hour",
    billing: "Per hour",
    tagline: "Expert advice",
    summary:
      "One-to-one time with our team to look at your business and plan your next move.",
    features: [
      "Expert business insights",
      "One-on-one consultation",
      "Personalized SEO strategy",
    ],
    cta: "Book a consultation",
  },
  {
    id: "launch",
    name: "Pro Website Launch",
    price: "$1,249",
    unit: "/month",
    billing: "Monthly",
    tagline: "Support your business",
    summary:
      "A custom website designed and launched for you, with SEO maintenance built in.",
    features: [
      "SEO maintenance",
      "Custom website design",
      "1 month premium support",
      "Two months bug-free",
    ],
    cta: "Launch my website",
  },
  {
    id: "growth",
    name: "Ultimate Growth Package",
    price: "$2,499",
    unit: "/month",
    billing: "Monthly",
    tagline: "Long-term performance",
    summary:
      "Advanced SEO with weekly audits and custom support, built for long-term growth.",
    features: [
      "Advanced SEO integration",
      "Weekly SEO audits",
      "Custom support",
      "3 months premium support",
      "3 months bug-free site",
      "Long-term performance",
    ],
    cta: "Start growing",
  },
];

export const planById = (id: string | null | undefined) =>
  PLANS.find((plan) => plan.id === id);

export const planHref = (id: PlanId) => `/contact-us?plan=${id}#query`;

export const PRICING = {
  consultation: { name: PLANS[0].name, price: `${PLANS[0].price}/hour` },
  launch: {
    name: PLANS[1].name,
    price: `${PLANS[1].price}/month`,
    support: "1 month",
    bugFree: "2 months",
  },
  growth: {
    name: PLANS[2].name,
    price: `${PLANS[2].price}/month`,
    support: "3 months",
    bugFree: "3 months",
  },
} as const;

type Cell = boolean | string;

export const COMPARISON: { label: string; values: [Cell, Cell, Cell] }[] = [
  { label: "Billing", values: ["Per hour", "Monthly", "Monthly"] },
  { label: "Expert business insights", values: [true, false, false] },
  { label: "One-on-one consultation", values: [true, false, false] },
  { label: "Personalized SEO strategy", values: [true, false, false] },
  { label: "Custom website design", values: [false, true, false] },
  { label: "SEO maintenance", values: [false, true, false] },
  { label: "Advanced SEO integration", values: [false, false, true] },
  { label: "Weekly SEO audits", values: [false, false, true] },
  { label: "Custom support", values: [false, false, true] },
  { label: "Premium support", values: [false, "1 month", "3 months"] },
  { label: "Bug-free period", values: [false, "2 months", "3 months"] },
  { label: "Long-term performance focus", values: [false, false, true] },
];

export const PRICING_FAQS = [
  {
    question: "Which plan is right for me?",
    answer: `If you are not sure where to start, the ${PLANS[0].name} is a one-to-one session at ${PLANS[0].price} an hour that ends with a personalized SEO strategy. If you need a new website with SEO maintenance, choose ${PLANS[1].name}. For advanced SEO with weekly audits and custom support, choose the ${PLANS[2].name}.`,
  },
  {
    question: "What happens after launch?",
    answer: `Premium support is included: ${PRICING.launch.support} with ${PLANS[1].name} and ${PRICING.growth.support} with the ${PLANS[2].name}, with a bug-free period of ${PRICING.launch.bugFree} and ${PRICING.growth.bugFree} respectively.`,
  },
  {
    question: "How do I get started?",
    answer:
      "Use the button on the plan you want. It opens our contact form with the plan already filled in — add a few lines about your business and we will reply to confirm the details.",
  },
  {
    question: "When can I reach you?",
    answer:
      "Monday to Saturday, 9:00 am – 5:00 pm. Email info@webtechsolution.org or call +1 (786) 927-5040 (USA) or +34 631 060 869 (Spain).",
  },
];
