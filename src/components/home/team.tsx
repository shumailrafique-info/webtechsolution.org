import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FOUNDER, type TeamMember } from "./data";

export const DISCIPLINES = [
  "Technical SEO",
  "On-page SEO",
  "Google Search Console",
  "Link building & outreach",
  "Content writing & editing",
  "Google Ads & PPC",
  "Social media",
  "Email marketing",
  "Graphic design",
  "Video editing",
  "Web & app development",
];

export function TeamCard({
  member,
  className,
}: {
  member: TeamMember;
  className?: string;
}) {
  return (
    <div className={cn("group", className)}>
      <div className="relative aspect-6/7 overflow-hidden rounded-[20px] bg-neutral-100">
        <Image
          src={member.image}
          alt={`${member.name}, ${member.role}`}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 45vw"
          className="object-cover transition-[filter,transform] duration-700 group-hover:scale-[1.03] "
        />
      </div>
      <p className="mt-4 font-display text-[17px] font-bold tracking-[-0.02em] text-heading">
        {member.name}
      </p>
      <p className="mt-1 text-[13.5px] leading-snug text-neutral-500">
        {member.role}
      </p>
    </div>
  );
}

export function FounderFeature({
  children,
  footer,
  headingLevel: Heading = "h3",
}: {
  children: ReactNode;
  footer?: ReactNode;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-x-14">
      <figure className="reveal-image relative mx-auto aspect-4/5 w-full max-w-md lg:col-span-5 lg:max-w-none">
        <div className="absolute inset-x-0 top-[16%] bottom-0 rounded-[28px] bg-linear-to-br from-primary to-brand-deep" />
        <Image
          src={FOUNDER.image}
          alt={`${FOUNDER.name}, ${FOUNDER.role} of WebTech Solutions`}
          fill
          sizes="(min-width: 1024px) 38vw, (min-width: 768px) 28rem, 90vw"
          className="rounded-b-[28px] object-contain object-bottom"
        />
      </figure>

      <div className="reveal lg:col-span-7 lg:pb-6">
        <p className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[13px] font-semibold text-brand-deep ring-1 ring-primary/20">
          {FOUNDER.role}
        </p>
        <Heading className="mt-4 font-display text-[40px] leading-[1.02] font-bold tracking-[-0.04em] text-heading md:text-[56px]">
          {FOUNDER.name}
        </Heading>
        <div className="mt-6 max-w-[54ch] space-y-5 text-[17px] leading-[1.7] text-neutral-600">
          {children}
        </div>
        {footer}
      </div>
    </div>
  );
}

export function DisciplinesPanel({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "reveal rounded-[24px] border border-neutral-200 bg-white p-6 md:p-8 lg:flex lg:items-start lg:gap-10",
        className,
      )}
    >
      <h3 className="shrink-0 font-display text-[19px] font-bold tracking-[-0.02em] text-heading lg:w-52 lg:pt-1.5">
        Disciplines in-house
      </h3>
      <ul className="mt-5 flex flex-wrap gap-2 lg:mt-0">
        {DISCIPLINES.map((discipline) => (
          <li
            key={discipline}
            className="rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-[14px] font-medium text-neutral-700"
          >
            {discipline}
          </li>
        ))}
      </ul>
    </div>
  );
}
