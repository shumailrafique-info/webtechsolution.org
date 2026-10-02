import { CONTACT, FOUNDED, FOUNDER, OFFICES } from "@/components/home/data";
import { JsonLd } from "@/components/seo/json-ld";
import {
  absoluteUrl,
  graph,
  ORGANIZATION_ID,
  organizationRef,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  SOCIAL_PROFILES,
  WEBSITE_ID,
} from "@/lib/seo";

export function SiteSchema() {
  return (
    <JsonLd
      data={graph([
        {
          "@type": "Organization",
          "@id": ORGANIZATION_ID,
          name: SITE_NAME,
          alternateName: ["Web Tech Solutions", "WebTech Solution"],
          url: `${SITE_URL}/`,
          logo: {
            "@type": "ImageObject",
            url: absoluteUrl("/logo.png"),
            width: 1838,
            height: 529,
          },
          image: absoluteUrl("/logo.png"),
          description: SITE_TAGLINE,
          foundingDate: FOUNDED.iso,
          founder: {
            "@type": "Person",
            name: FOUNDER.name,
            alternateName: FOUNDER.formerName,
            jobTitle: FOUNDER.role,
          },
          areaServed: OFFICES.map((office) => ({
            "@type": "Country",
            name: office.country,
          })),
          email: CONTACT.email,
          telephone: CONTACT.phones.map((phone) => phone.href),
          address: OFFICES.map((office) => ({
            "@type": "PostalAddress",
            streetAddress: office.lines.join(", "),
            addressLocality: office.city,
            postalCode: office.postalCode || undefined,
            addressCountry: office.countryCode,
          })),
          contactPoint: CONTACT.phones.map((phone) => ({
            "@type": "ContactPoint",
            telephone: phone.href,
            email: CONTACT.email,
            contactType: "customer service",
            areaServed: phone.label === "Spain" ? "ES" : "PK",
            availableLanguage: ["English"],
          })),
          sameAs: SOCIAL_PROFILES,
        },
        {
          "@type": "WebSite",
          "@id": WEBSITE_ID,
          name: SITE_NAME,
          url: `${SITE_URL}/`,
          description: SITE_TAGLINE,
          publisher: organizationRef,
          inLanguage: "en-US",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        },
      ])}
    />
  );
}
