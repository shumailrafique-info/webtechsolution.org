import type { Metadata } from "next";
import { Approach } from "@/components/home/approach";
import { Clients } from "@/components/home/clients";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { LatestPosts } from "@/components/home/latest-posts";
import { Offices } from "@/components/home/offices";
import { Founder, People } from "@/components/home/people";
import { Press } from "@/components/home/press";
import { Process } from "@/components/home/process";
import { Services } from "@/components/home/services";
import { Stats } from "@/components/home/stats";
import { Testimonials } from "@/components/home/testimonials";
import { pageMetadata } from "@/lib/metadata";
import { SITE_TAGLINE, SITE_TITLE } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: SITE_TITLE,
  description: SITE_TAGLINE,
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <Press />
      <Services />
      <Stats />
      <Founder />
      <Approach />
      <Process />
      <Clients />
      <People />
      <Testimonials />
      <Offices />
      <LatestPosts />
      <Faq />
      <FinalCta />
    </>
  );
}
