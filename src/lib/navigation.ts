export type PageEntry = {
  slug: string;
  name: string;
  path: string;
};

export const PAGES: readonly PageEntry[] = [
  {
    slug: "privacy-policy",
    name: "Privacy Policy",
    path: "/privacy-policy",
  },
  {
    slug: "terms-and-conditions",
    name: "Terms and Conditions",
    path: "/terms-and-conditions",
  },
];

export function pageBySlug(slug: string) {
  return PAGES.find((page) => page.slug === slug);
}
