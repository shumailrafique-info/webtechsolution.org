import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, TWITTER_HANDLE } from "@/lib/seo";

export function ogImagePath(title?: string, description?: string) {
  const params = new URLSearchParams();
  if (title) params.set("title", title);
  if (description) params.set("description", description);
  const query = params.toString();
  return query ? `/og?${query}` : "/og";
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: { url: string; alt?: string; width?: number; height?: number };
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noindex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  noindex,
}: PageMetadataInput): Metadata {
  const images = image
    ? [
        {
          url: image.url,
          alt: image.alt ?? title,
          width: image.width,
          height: image.height,
        },
      ]
    : [
        {
          url: ogImagePath(title, description),
          width: 1200,
          height: 630,
          alt: title,
        },
      ];

  return {
    title: { absolute: title },
    description,
    metadataBase: new URL(SITE_URL),
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
      title: title,
      description,
      images,
      ...(type === "article" ? { publishedTime, modifiedTime, authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      title: title,
      description,
      images: images.map((item) => item.url),
    },
  };
}
