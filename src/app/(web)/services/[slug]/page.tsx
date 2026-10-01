import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, serviceBySlug, serviceHref } from "../_components/data";
import { ServiceDetail } from "../_components/service-detail";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};

  const url = serviceHref(service.slug);
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  return <ServiceDetail service={service} />;
}
