import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, breadcrumbList, graph, organizationRef } from "@/lib/seo";
import {
  GROUPS,
  groupLabel,
  type Point,
  type ServiceGroup,
  serviceHref,
} from "./data";

export function ServiceSchema({
  slug,
  name,
  group,
  metaTitle,
  metaDescription,
  offersTitle,
  offers,
}: {
  slug: string;
  name: string;
  group: ServiceGroup;
  metaTitle: string;
  metaDescription: string;
  offersTitle?: string;
  offers: Point[];
}) {
  const path = serviceHref(slug);

  return (
    <JsonLd
      data={graph([
        breadcrumbList([
          { name: "Home", path: "/" },
          { name: groupLabel(group), path: GROUPS[group].href },
          { name, path },
        ]),
        {
          "@type": "Service",
          "@id": `${absoluteUrl(path)}#service`,
          name: metaTitle,
          serviceType: name,
          description: metaDescription,
          url: absoluteUrl(path),
          provider: organizationRef,
          areaServed: ["PK", "GB", "ES", "US"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: offersTitle ?? `${name} services`,
            itemListElement: offers.map((offer) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: offer.title,
                description: offer.body,
              },
            })),
          },
        },
      ])}
    />
  );
}
