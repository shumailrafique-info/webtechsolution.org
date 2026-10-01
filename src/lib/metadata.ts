import type { Metadata } from "next";
import { SITE_NAME, TWITTER_HANDLE } from "@/lib/seo";

export function ogImagePath(
  title?: string,
  description?: string,
  eyebrow?: string,
) {
  const params = new URLSearchParams();
  if (title) params.set("title", title);
  if (description) params.set("description", description);
  if (eyebrow) params.set("eyebrow", eyebrow);
  const query = params.toString();
  return query ? `/og?${query}` : "/og";
}

type PageMetadataInput = {
  title?: string;
  absoluteTitle?: string;
  description: string;
  path: string;
  image?: { url: string; alt?: string; width?: number; height?: number };
  cardTitle?: string;
  eyebrow?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noindex?: boolean;
};

export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
  image,
  cardTitle,
  eyebrow,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  noindex,
}: PageMetadataInput): Metadata {
  const fullTitle =
    absoluteTitle ?? (title ? `${title} - ${SITE_NAME}` : SITE_NAME);
  const images = image
    ? [
        {
          url: image.url,
          alt: image.alt ?? fullTitle,
          width: image.width,
          height: image.height,
        },
      ]
    : [
        {
          url: ogImagePath(
            cardTitle ?? title ?? absoluteTitle,
            description,
            eyebrow,
          ),
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ];

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: {
      canonical: path,
      types: {
        "application/rss+xml": [
          { url: "/feed.xml", title: `${SITE_NAME} Blog` },
        ],
      },
    },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      type,
      locale: "en_US",
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      description,
      images,
      ...(type === "article" ? { publishedTime, modifiedTime, authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      title: fullTitle,
      description,
      images: images.map((item) => item.url),
    },
  };
}
