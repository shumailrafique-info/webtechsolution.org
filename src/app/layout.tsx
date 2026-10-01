import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "@/components/ui/toast";
import { serverEnv } from "@/env/server";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/seo";
import { cn } from "@/lib/utils";
import Providers from "@/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(serverEnv.BETTER_AUTH_URL),
  title: {
    default: SITE_NAME,
    template: `%s - ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        inter.className,
        bricolage.variable,
        playfair.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
