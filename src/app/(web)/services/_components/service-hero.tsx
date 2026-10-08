import Image from "next/image";
import type { ComponentType } from "react";
import { FOUNDED, PROJECTS_DELIVERED } from "@/components/home/data";
import {
  Accent,
  Container,
  Eyebrow,
  IconBadge,
  PrimaryButton,
  SecondaryButton,
  TrustChip,
} from "@/components/home/primitives";
import { CalendarIcon, SealCheckIcon, UsersIcon } from "@/components/icons";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { GROUPS, groupLabel, imageOf, type ServiceGroup } from "./data";

export function ServiceHero({
  slug,
  name,
  group,
  icon,
  title,
  accent,
  intro,
  offersCount,
}: {
  slug: string;
  name: string;
  group: ServiceGroup;
  icon: ComponentType<{ className?: string }>;
  title: string;
  accent: string;
  intro: string;
  offersCount: number;
}) {
  const label = groupLabel(group);

  return (
    <section
      aria-labelledby="service-title"
      className="overflow-hidden bg-white pt-6 pb-12 md:pb-16"
    >
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label, href: GROUPS[group].href },
            { label: name },
          ]}
          className="mb-0"
        />

        <div className="mt-10 grid items-center gap-10 md:mt-12 md:gap-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <Eyebrow className="enter">{label}</Eyebrow>
            <h1
              id="service-title"
              className="enter mt-6 font-display text-[40px] leading-[1.02] font-bold tracking-[-0.045em] text-balance text-heading sm:text-[52px] lg:text-[60px]"
            >
              {title} <Accent>{accent}</Accent>
            </h1>
            <p className="enter mt-6 max-w-[58ch] text-[17px] leading-[1.7] text-neutral-600 md:text-[18px]">
              {intro}
            </p>
            <div className="enter mt-9 flex flex-nowrap items-center gap-2 sm:gap-3">
              <PrimaryButton href="/contact-us#query">
                Start a project
              </PrimaryButton>
              <SecondaryButton href="/pricing">See pricing</SecondaryButton>
            </div>
            <ul className="enter mt-9 flex flex-wrap gap-x-6 gap-y-3">
              <TrustChip icon={CalendarIcon}>Since {FOUNDED.year}</TrustChip>
              <TrustChip icon={SealCheckIcon}>
                {PROJECTS_DELIVERED} projects delivered
              </TrustChip>
              <TrustChip icon={UsersIcon}>In-house team</TrustChip>
            </ul>
          </div>

          <figure className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div className="enter-image relative aspect-square overflow-hidden rounded-[32px] border border-primary/10 bg-brand-tint">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_70%)]"
              />
              <Image
                src={imageOf(slug)}
                alt={`${name} services by WebTech Solutions`}
                fill
                priority
                sizes="(min-width: 1024px) 38vw, (min-width: 448px) 28rem, 90vw"
                className="object-contain p-10 md:p-14"
              />
            </div>
            <div className="enter absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-[0_18px_40px_-20px_rgba(30,20,10,0.35)]">
              <IconBadge icon={icon} />
              <span>
                <span className="block font-display text-[15px] font-bold tracking-[-0.01em] text-heading">
                  {name}
                </span>
                <span className="text-[12.5px] text-neutral-500">
                  {offersCount} services included
                </span>
              </span>
            </div>
          </figure>
        </div>
      </Container>
    </section>
  );
}
