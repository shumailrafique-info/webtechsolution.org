import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import {
  ArrowUpRightIcon,
  CheckIcon,
  CodeIcon,
  DeviceMobileIcon,
  FacebookIcon,
  HeartIcon,
  InstagramIcon,
  LinkedinIcon,
  LinkIcon,
  MessageIcon,
  PenNibIcon,
  SearchIcon,
  ShareIcon,
  TiktokIcon,
  TrendUpIcon,
  YoutubeIcon,
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
  "On-page optimization",
  "Content creation",
  "Link building",
  "Local SEO & Business Profile",
  "SEO audits",
  "Analytics & reporting",
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
          lede="Most businesses arrive with one question: why aren’t more of the right people finding us? Search is the center of our work, and the sites, apps and campaigns we build are designed to be found."
        />

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          <article className="reveal relative overflow-hidden rounded-[24px] bg-linear-to-br from-primary to-brand-deep p-7 text-white md:col-span-2 md:p-9">
            <div className="grid gap-9 md:grid-cols-[1fr_1.05fr] md:gap-10">
              <div className="flex flex-col">
                <IconBadge icon={SearchIcon} tone="dark" />
                <p className="mt-6 text-[13px] font-medium text-white/75">
                  Our primary practice
                </p>
                <h3 className="mt-1.5 font-display text-[30px] leading-[1.05] font-bold tracking-[-0.03em] md:text-[36px]">
                  Search engine optimization
                </h3>
                <p className="mt-4 text-[15.5px] leading-[1.65] text-white/85">
                  Improve search visibility through technical SEO, content
                  strategy, on-page optimization, and authority building
                </p>
                <ArrowLink
                  href="/services/seo"
                  tone="dark"
                  className="mt-auto pt-8 hover:text-white!"
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
            icon={PenNibIcon}
            title={<>Content Marketing</>}
            text="Research-led content built around real search intent, topical relevance, and your business goals."
            href="/services/content-marketing"
          >
            <ContentSketch />
          </ServiceCard>

          <ServiceCard
            icon={LinkIcon}
            title={<>Digital PR & Link Building</>}
            text="Earn relevant mentions and authoritative links that strengthen brand visibility and search authority."
            href="/services/link-building"
          >
            <LinkSketch />
          </ServiceCard>

          <ServiceCard
            icon={CodeIcon}
            title={<>Web Development</>}
            text="Fast, responsive websites built around usability, performance, and business conversion goals."
            href="/services/web-develpment"
          >
            <BrowserSketch />
          </ServiceCard>

          <ServiceCard
            icon={DeviceMobileIcon}
            title={<>Mobile App Development</>}
            text="Custom Android and iOS applications designed around real user needs and scalable business requirements."
            href="/services/app-development"
          >
            <PhoneSketch />
          </ServiceCard>

          <ServiceCard
            icon={ShareIcon}
            title={<>Social Media Marketing</>}
            text="Build a consistent brand presence with platform-specific content, campaigns, and audience engagement."
            href="/services/social-media-marketing"
            wide
          >
            <SocialSketch />
          </ServiceCard>
        </div>
      </Container>
    </section>
  );
}

function ServiceCard({
  icon,
  title,
  text,
  href,
  wide = false,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  title: ReactNode;
  text: string;
  href: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <article
      className={cn(
        "reveal group relative flex flex-col rounded-[24px] border border-neutral-200 bg-white p-7 transition-[border-color,box-shadow] duration-300 hover:border-neutral-300 hover:shadow-[0_20px_45px_-30px_rgba(30,20,10,0.3)]",
        wide &&
          "md:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-10 lg:p-9",
      )}
    >
      <div className="flex flex-col">
        <div className="flex items-start justify-between">
          <IconBadge icon={icon} />
          <ArrowUpRightIcon
            aria-hidden
            className={cn(
              "size-5 text-neutral-300 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary",
              wide && "lg:hidden",
            )}
          />
        </div>
        <h3
          className={cn(
            "mt-6 font-display text-[24px] leading-tight font-bold tracking-tight text-heading",
            wide && "lg:text-[30px]",
          )}
        >
          <Link href={href} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        <p
          className={cn(
            "mt-2 text-[15px] leading-[1.6] text-neutral-600",
            wide && "max-w-[46ch]",
          )}
        >
          {text}
        </p>
      </div>
      <div className={cn("mt-auto pt-7", wide && "lg:mt-0 lg:pt-0")}>
        {children}
      </div>
    </article>
  );
}

function ContentSketch() {
  return (
    <div
      aria-hidden
      className="rounded-xl border border-neutral-200 bg-neutral-50 p-3.5"
    >
      <div className="rounded-lg border border-neutral-200 bg-white p-3">
        <span className="block h-2.5 w-4/5 rounded-full bg-heading/80" />
        <span className="mt-2 block h-1.5 w-full rounded-full bg-neutral-200" />
        {["w-1/2", "w-2/5"].map((width) => (
          <div key={width} className="mt-2.5 flex items-center gap-2">
            <span className="text-[9.5px] font-bold text-primary">H2</span>
            <span
              className={cn("block h-2 rounded-full bg-heading/55", width)}
            />
          </div>
        ))}
        <span className="mt-2 block h-1.5 w-11/12 rounded-full bg-neutral-200" />
      </div>
      <div className="mt-3 flex items-center gap-2.5 text-[11.5px] font-medium text-neutral-600">
        Intent match
        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-200">
          <span className="block h-full w-[92%] rounded-full bg-linear-to-r from-primary to-brand-deep" />
        </span>
        <span className="font-semibold text-heading">92%</span>
      </div>
    </div>
  );
}

function LinkSketch() {
  const sources = [
    { label: "News site", x: 6, y: 8 },
    { label: "Industry blog", x: 6, y: 92 },
    { label: "Trade press", x: 186, y: 8 },
    { label: "Podcast", x: 186, y: 92 },
  ];
  return (
    <div
      aria-hidden
      className="rounded-xl border border-neutral-200 bg-neutral-50 p-3"
    >
      <svg viewBox="0 0 280 124" className="w-full" role="presentation">
        {sources.map(({ label, x, y }) => (
          <line
            key={label}
            x1={x + 44}
            y1={y + 12}
            x2={140}
            y2={62}
            className="stroke-primary/40"
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
        ))}
        {sources.map(({ label, x, y }) => (
          <g key={label}>
            <rect
              x={x}
              y={y}
              width={88}
              height={24}
              rx={12}
              className="fill-white stroke-neutral-200"
            />
            <circle cx={x + 13} cy={y + 12} r={3} className="fill-primary" />
            <text
              x={x + 22}
              y={y + 15.5}
              className="fill-neutral-600 text-[10px] font-medium"
            >
              {label}
            </text>
          </g>
        ))}
        <circle cx={140} cy={62} r={30} className="fill-primary/10" />
        <circle cx={140} cy={62} r={21} className="fill-primary" />
        <text
          x={140}
          y={59}
          textAnchor="middle"
          className="fill-white text-[8.5px] font-semibold"
        >
          Your
        </text>
        <text
          x={140}
          y={70}
          textAnchor="middle"
          className="fill-white text-[8.5px] font-semibold"
        >
          site
        </text>
      </svg>
    </div>
  );
}

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
        <div className="flex flex-col gap-2">
          <span className="block h-2.5 w-full rounded-full bg-heading/80" />
          <span className="block h-2.5 w-3/4 rounded-full bg-heading/80" />
          <span className="block h-1.5 w-11/12 rounded-full bg-neutral-300" />
          <span className="block h-1.5 w-2/3 rounded-full bg-neutral-300" />
          <span className="mt-1 block h-5 w-16 rounded-full bg-linear-to-br from-primary to-brand-deep" />
        </div>
        <span className="block rounded-lg bg-linear-to-br from-primary/15 to-primary/5 ring-1 ring-primary/15" />
      </div>
      <ul className="flex flex-wrap gap-1.5 border-t border-neutral-200 bg-white px-3 py-2.5">
        {["Fast", "Responsive", "Converts"].map((quality) => (
          <li
            key={quality}
            className="flex items-center gap-1 rounded-full bg-neutral-100 py-0.5 pr-2.5 pl-1.5 text-[11.5px] font-medium text-neutral-700"
          >
            <CheckIcon className="size-3 text-primary" />
            {quality}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PhoneSketch() {
  return (
    <div aria-hidden className="flex items-center justify-center gap-3">
      <PlatformTag>Android</PlatformTag>
      <div className="w-32 shrink-0 rounded-[22px] border-[5px] border-heading bg-white p-2.5 pb-2">
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
      <PlatformTag>iOS</PlatformTag>
    </div>
  );
}

function PlatformTag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[12px] font-medium text-neutral-700 shadow-[0_6px_16px_-10px_rgba(30,20,10,0.35)]">
      {children}
    </span>
  );
}

function SocialSketch() {
  const platforms = [
    { name: "Facebook", Icon: FacebookIcon },
    { name: "Instagram", Icon: InstagramIcon },
    { name: "LinkedIn", Icon: LinkedinIcon },
    { name: "TikTok", Icon: TiktokIcon },
    { name: "YouTube", Icon: YoutubeIcon },
  ];
  return (
    <div
      aria-hidden
      className="grid gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3.5 sm:grid-cols-[1.15fr_1fr]"
    >
      <div className="rounded-lg border border-neutral-200 bg-white p-3">
        <div className="flex items-center gap-2">
          <span className="size-6 rounded-full bg-linear-to-br from-primary to-brand-deep" />
          <span className="grid gap-1">
            <span className="block h-1.5 w-16 rounded-full bg-heading/70" />
            <span className="block h-1 w-10 rounded-full bg-neutral-300" />
          </span>
        </div>
        <span className="mt-3 block h-16 rounded-md bg-linear-to-br from-primary/20 to-primary/5 ring-1 ring-primary/15" />
        <span className="mt-2.5 block h-1.5 w-11/12 rounded-full bg-neutral-200" />
        <div className="mt-2.5 flex items-center gap-3 text-[11px] font-medium text-neutral-500">
          <span className="flex items-center gap-1">
            <HeartIcon className="size-3.5 text-primary" />
            1.2k
          </span>
          <span className="flex items-center gap-1">
            <MessageIcon className="size-3.5" />
            86
          </span>
          <span className="flex items-center gap-1">
            <ShareIcon className="size-3.5" />
            140
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <ul className="flex flex-wrap gap-1.5">
          {platforms.map(({ name, Icon }) => (
            <li
              key={name}
              className="flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[12px] font-medium text-neutral-700"
            >
              <Icon className="size-3.5 text-heading" />
              {name}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between rounded-lg bg-linear-to-br from-primary to-brand-deep px-3 py-2.5 text-white">
          <span className="text-[12px] font-medium text-white/85">
            Monthly reach
          </span>
          <span className="flex items-center gap-1 text-[14px] font-bold">
            <TrendUpIcon className="size-4" />
            +38%
          </span>
        </div>
      </div>
    </div>
  );
}
