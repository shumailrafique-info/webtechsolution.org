import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import {
  ArrowUpRightIcon,
  CheckIcon,
  CodeIcon,
  DeviceMobileIcon,
  MegaphoneIcon,
  PencilRulerIcon,
  SearchIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import {
  Accent,
  ArrowLink,
  Container,
  IconBadge,
  SectionHeading,
} from "./primitives";

const SEO_INCLUDES = [
  "Keyword research",
  "Technical SEO",
  "On-page optimisation",
  "Content creation",
  "Link building",
  "Local SEO & Business Profile",
  "SEO audits",
  "Analytics & reporting",
];

const MARKETING = [
  { name: "PPC & Google Ads", href: "/services/pay-per-click-ppc-advertising" },
  { name: "Social media", href: "/services/social-media-marketing" },
  { name: "Email marketing", href: "/services/email-marketing" },
  { name: "Content marketing", href: "/services/content-marketing" },
  { name: "Video marketing", href: "/services/video-marketing" },
  { name: "Affiliate marketing", href: "/services/affiliate-marketing" },
  { name: "Mobile marketing", href: "/services/mobile-marketing" },
];

export function Services() {
  return (
    <section
      aria-labelledby="services-title"
      className="bg-white py-14 md:py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          id="services-title"
          eyebrow="What we do"
          title={
            <>
              Everything it takes to be <Accent>found online.</Accent>
            </>
          }
          lede="Most businesses arrive with one question: why aren’t more of the right people finding us? Search is the centre of our work, and the sites, apps and campaigns we build are designed to be found."
        />

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Primary practice. */}
          <article className="reveal relative overflow-hidden rounded-[24px] bg-linear-to-br from-primary to-brand-deep p-7 text-white md:col-span-2 md:p-9">
            <div className="grid gap-9 md:grid-cols-[1fr_1.05fr] md:gap-10">
              <div className="flex flex-col">
                <IconBadge icon={SearchIcon} tone="dark" />
                <p className="mt-6 text-[13px] font-medium text-white/75">
                  Our primary practice
                </p>
                <h3 className="mt-1.5 font-display text-[30px] leading-[1.05] font-bold tracking-[-0.03em] md:text-[36px]">
                  Search engine optimisation
                </h3>
                <p className="mt-4 text-[15.5px] leading-[1.65] text-white/85">
                  Technical audits, on-page optimisation, content and ethical
                  link building, run as one programme rather than a checklist
                  &mdash; for businesses whose customers search before they buy,
                  and local businesses that need to show up nearby.
                </p>
                <ArrowLink
                  href="/services/seo"
                  tone="dark"
                  className="mt-auto pt-8"
                >
                  Explore SEO
                </ArrowLink>
              </div>

              <ul className="grid content-start gap-2 sm:grid-cols-2 md:grid-cols-1">
                {SEO_INCLUDES.map((item) => (
                  <li
                    key={item}
                    className="flex items-center justify-between gap-3 rounded-full border border-white/15 bg-white/10 py-2 pr-2 pl-4 text-[14px] font-medium"
                  >
                    {item}
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-brand-deep">
                      <CheckIcon aria-hidden className="size-3" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <ServiceCard
            icon={PencilRulerIcon}
            title={<>Web design</>}
            text="User-focused layouts that make the next step obvious."
            href="/services/web-designing"
          >
            <BrowserSketch />
          </ServiceCard>

          <ServiceCard
            icon={CodeIcon}
            title={<>Web development</>}
            text="Fast, secure and scalable sites, built for performance."
            href="/services/web-develpment"
          >
            <QualityStack />
          </ServiceCard>

          <ServiceCard
            icon={DeviceMobileIcon}
            title={<>App development</>}
            text="Mobile apps taken from idea to working product."
            href="/services/app-development"
          >
            <PhoneSketch />
          </ServiceCard>

          <ServiceCard
            icon={MegaphoneIcon}
            title={<>Digital marketing</>}
            text="Reach you need now, alongside search work that compounds."
            href="/services/digital-marketing"
          >
            <ul className="flex flex-wrap gap-1.5">
              {MARKETING.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="relative z-10 inline-flex rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[13px] font-medium text-neutral-700 transition-colors hover:border-primary/40 hover:text-brand-deep"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </ServiceCard>
        </div>
      </Container>
    </section>
  );
}

/**
 * A secondary service. The whole card is the link to its page; links inside
 * the drawing area sit above that cover with `relative z-10`.
 */
function ServiceCard({
  icon,
  title,
  text,
  href,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  title: ReactNode;
  text: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <article className="reveal group relative flex flex-col rounded-[24px] border border-neutral-200 bg-white p-7 transition-[border-color,box-shadow] duration-300 hover:border-neutral-300 hover:shadow-[0_20px_45px_-30px_rgba(30,20,10,0.3)]">
      <div className="flex items-start justify-between">
        <IconBadge icon={icon} />
        <ArrowUpRightIcon
          aria-hidden
          className="size-5 text-neutral-300 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
        />
      </div>
      <h3 className="mt-6 font-display text-[24px] leading-tight font-bold tracking-tight text-heading">
        <Link href={href} className="after:absolute after:inset-0">
          {title}
        </Link>
      </h3>
      <p className="mt-2 text-[15px] leading-[1.6] text-neutral-600">{text}</p>
      <div className="mt-auto pt-7">{children}</div>
    </article>
  );
}

/** A page wireframe: what a design hands to development. */
function BrowserSketch() {
  return (
    <div
      aria-hidden
      className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50"
    >
      <div className="flex items-center gap-1 border-b border-neutral-200 bg-white px-3 py-2">
        <span className="size-1.5 rounded-full bg-neutral-300" />
        <span className="size-1.5 rounded-full bg-neutral-300" />
        <span className="size-1.5 rounded-full bg-neutral-300" />
        <span className="ml-3 h-1.5 w-20 rounded-full bg-neutral-200" />
      </div>
      <div className="grid grid-cols-[1.3fr_1fr] gap-3 p-4">
        <div className="space-y-2">
          <span className="block h-2.5 w-full rounded-full bg-heading/80" />
          <span className="block h-2.5 w-3/4 rounded-full bg-heading/80" />
          <span className="block h-1.5 w-11/12 rounded-full bg-neutral-300" />
          <span className="block h-1.5 w-2/3 rounded-full bg-neutral-300" />
          <span className="mt-3 block h-5 w-16 rounded-full bg-linear-to-br from-primary to-brand-deep" />
        </div>
        <span className="block rounded-lg bg-linear-to-br from-primary/15 to-primary/5 ring-1 ring-primary/15" />
      </div>
    </div>
  );
}

/** The qualities a build is held to, ending in the result. */
function QualityStack() {
  const rows = ["Fast", "Secure", "Scalable"];
  return (
    <ul aria-hidden className="grid gap-1.5">
      {rows.map((row) => (
        <li
          key={row}
          className="flex items-center justify-between rounded-full border border-neutral-200 bg-white py-1.5 pr-1.5 pl-4 text-[13.5px] font-medium text-neutral-700"
        >
          {row}
          <span className="flex size-5 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
            <CheckIcon className="size-3" />
          </span>
        </li>
      ))}
      <li
        className={cn(
          "flex items-center justify-between rounded-full py-1.5 pr-1.5 pl-4 text-[13.5px] font-semibold text-white",
          "bg-linear-to-br from-primary to-brand-deep",
        )}
      >
        Built for performance
        <span className="flex size-5 items-center justify-center rounded-full bg-white text-brand-deep">
          <CheckIcon className="size-3" />
        </span>
      </li>
    </ul>
  );
}

/** A phone outline with an app screen inside. */
function PhoneSketch() {
  return (
    <div aria-hidden className="flex justify-center">
      <div className="w-36 rounded-[22px] border-[5px] border-heading bg-white p-2.5 pb-2">
        <span className="mx-auto block h-1 w-8 rounded-full bg-neutral-300" />
        <span className="mt-3 block h-14 rounded-lg bg-linear-to-br from-primary to-brand-deep" />
        <span className="mt-2.5 block h-1.5 w-3/4 rounded-full bg-heading/70" />
        <span className="mt-1.5 block h-1.5 w-1/2 rounded-full bg-neutral-300" />
        <div className="mt-2.5 grid grid-cols-2 gap-1.5">
          <span className="h-8 rounded-md bg-neutral-100" />
          <span className="h-8 rounded-md bg-neutral-100" />
        </div>
        <div className="mt-2.5 flex justify-around border-t border-neutral-100 pt-1.5">
          <span className="size-2 rounded-full bg-primary" />
          <span className="size-2 rounded-full bg-neutral-200" />
          <span className="size-2 rounded-full bg-neutral-200" />
        </div>
      </div>
    </div>
  );
}
