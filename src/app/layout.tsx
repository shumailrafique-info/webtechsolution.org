import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toast";
import { ogImagePath } from "@/lib/metadata";
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_TITLE,
  SITE_URL,
  TWITTER_HANDLE,
} from "@/lib/seo";
import { cn } from "@/lib/utils";
import Providers from "@/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s - ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
  applicationName: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_TAGLINE,
    images: [{ url: ogImagePath(), width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    title: SITE_TITLE,
    description: SITE_TAGLINE,
    images: [ogImagePath()],
  },
  alternates: {
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: `${SITE_NAME} Blog` }],
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-US"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        inter.className,
        bricolage.variable,
      )}
    >
      <head>
        <meta
          name="google-site-verification"
          content="nLbSkJYcs6wRXfQZGONgqf565LD1tXp34X5IqdYm9JA"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
