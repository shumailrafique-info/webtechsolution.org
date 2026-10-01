import { serverEnv } from "@/env/server";
import type { FaqItem } from "@/lib/validation/zod/page-content.schema";

export type Thing = Record<string, unknown>;
export type WithContext<T extends Thing> = T & {
  "@context": "https://schema.org";
};

export const SITE_NAME = "WebTech Solutions";
export const SITE_TITLE = "WebTech Solutions – SEO & Digital Marketing Agency";
export const SITE_TAGLINE =
  "Founded on 1st January 2013, WebTech Solutions provides app development, SEO, and digital marketing services to help businesses grow online.";
export const TWITTER_HANDLE = "@WebtechSolutio7";

export const SOCIAL_PROFILES = [
  "https://www.facebook.com/webtechsolutions7",
  "https://x.com/WebtechSolutio7",
  "https://www.instagram.com/webtechsolution77/",
  "https://www.linkedin.com/company/webtechsolution7",
  "https://www.youtube.com/@webtechsolution9638",
];

export const SITE_URL = serverEnv.BETTER_AUTH_URL.replace(/\/+$/, "");
export const SITE_DOMAIN = new URL(SITE_URL).host.replace(/^www\./, "");

export function absoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const organizationRef = { "@id": ORGANIZATION_ID };
export const webSiteRef = { "@id": WEBSITE_ID };

export function withContext<T extends Thing>(data: T): WithContext<T> {
  return { "@context": "https://schema.org", ...data };
}

export function breadcrumbList(items: { name: string; path: string }[]): Thing {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPage(faqs: FaqItem[]): Thing | null {
  if (faqs.length === 0) return null;

  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function graph(nodes: (Thing | null | undefined)[]): WithContext<Thing> {
  return withContext({ "@graph": nodes.filter(Boolean) as Thing[] });
}
