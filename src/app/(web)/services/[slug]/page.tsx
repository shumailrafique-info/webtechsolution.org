import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import { SERVICES, serviceBySlug, serviceHref } from "../_components/data";
import { ServiceDetail } from "../_components/service-detail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};

  return pageMetadata({
    absoluteTitle: service.metaTitle,
    description: service.metaDescription,
    path: serviceHref(service.slug),
    cardTitle: `${service.hero.title} ${service.hero.accent}`,
    eyebrow:
      service.group === "marketing" ? "Digital marketing" : "Our services",
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  return <ServiceDetail service={service} />;
}
