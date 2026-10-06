import { BuildingsIcon, CalendarIcon, SealCheckIcon } from "@/components/icons";
import Image from "next/image";
import type { CSSProperties } from "react";
import {
  CONTACT,
  FOUNDED,
  FOUNDER,
  OFFICES,
  PROJECTS_DELIVERED,
  TEAM,
} from "./data";
import {
  Accent,
  Container,
  PrimaryButton,
  SecondaryButton,
  TrustChip,
} from "./primitives";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

const markets = (() => {
  const names = OFFICES.map((office) =>
    office.country === "United Kingdom"
      ? "the UK"
      : office.country === "United States"
        ? "the United States"
        : office.country,
  );
  return `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
})();

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-neutral-100 bg-[#F4F3EF]"
    >
      <Container className="grid items-center gap-10 pt-8 pb-12 md:gap-14 md:pt-14 md:pb-16 lg:grid-cols-12 lg:gap-x-12 lg:pt-16 lg:pb-24">
        <div className="lg:col-span-7">
          <div className="enter flex items-center gap-3" style={delay(0)}>
            <ul className="flex -space-x-2.5">
              {TEAM.slice(0, 5).map((member) => (
                <li
                  key={member.name}
                  className="relative size-9 overflow-hidden rounded-full bg-neutral-100 ring-[2.5px] ring-white"
                >
                  <Image
                    src={member.image}
                    alt=""
                    fill
                    sizes="36px"
                    className="object-cover object-top"
                  />
                </li>
              ))}
            </ul>
            <p className="text-[13.5px] leading-tight text-neutral-600">
              <span className="mr-1 inline-block rounded-[5px] bg-linear-to-b from-primary to-brand-deep px-1.5 py-px font-display font-bold text-white">
                {PROJECTS_DELIVERED}
              </span>
              projects delivered
              <br />
              by one in-house team since {FOUNDED.year}.
            </p>
          </div>

          <h1
            id="hero-title"
            className="enter mt-7 font-display text-[46px] leading-[0.98] font-bold tracking-[-0.045em] text-heading sm:text-[60px] lg:text-[74px]"
            style={delay(90)}
          >
            Be the business people find <Accent>first.</Accent>
          </h1>

          <p
            className="enter mt-6 max-w-[54ch] text-[17px] leading-[1.65] tracking-tight text-neutral-600 md:text-[18.5px]"
            style={delay(200)}
          >
            WebTech Solutions helps businesses grow through{" "}
            <strong className="font-semibold text-heading">
              SEO, content marketing, digital PR, web development, and mobile
              app development
            </strong>
            , combining 13+ years of experience with AI-assisted, human-led
            execution.
          </p>

          <div
            className="enter mt-8 flex flex-nowrap items-center gap-2 sm:gap-3 md:mt-9"
            style={delay(320)}
          >
            <PrimaryButton href="/contact-us">Start a project</PrimaryButton>
            <SecondaryButton href="/services">See what we do</SecondaryButton>
          </div>
          <p
            className="enter mt-4 text-[13.5px] text-neutral-500"
            style={delay(380)}
          >
            Prefer email?{" "}
            <a
              href={`mailto:${CONTACT.email}`}
              className="font-medium text-neutral-700 underline decoration-neutral-300 underline-offset-4 hover:decoration-primary"
            >
              {CONTACT.email}
            </a>
          </p>

          <ul
            className="enter mt-7 flex flex-wrap gap-x-5 gap-y-2.5 md:mt-9 md:gap-x-6 md:gap-y-3"
            style={delay(460)}
          >
            <TrustChip icon={CalendarIcon}>Since {FOUNDED.year}</TrustChip>
            <TrustChip icon={SealCheckIcon}>
              {PROJECTS_DELIVERED} projects delivered
            </TrustChip>
            <TrustChip icon={BuildingsIcon}>
              {OFFICES.length} offices, 3 continents
            </TrustChip>
          </ul>
        </div>

        <div className="relative mx-auto grid w-full max-w-md grid-cols-12 gap-2 sm:gap-4 lg:col-span-5 lg:max-w-none">
          <figure
            className="enter-image relative col-span-7 aspect-4/5 pt-8"
            style={delay(150)}
          >
            <Image
              src="/images/home/hero-founder.webp"
              alt={`${FOUNDER.name}, founder of WebTech Solutions`}
              fill
              priority
              sizes="(min-width: 1024px) 300px, (min-width: 448px) 260px, 58vw"
              className="rounded-b-[26px] object-contain object-bottom"
            />
          </figure>

          <div
            className="enter col-span-5 mt-auto flex flex-col justify-end rounded-[22px] border border-neutral-200 bg-white p-4 h-fit sm:p-5"
            style={delay(300)}
          >
            <p className="font-display text-[40px] leading-none font-bold tracking-tighter text-heading sm:text-[54px]">
              {PROJECTS_DELIVERED}
            </p>
            <p className="mt-3 text-[13px] leading-snug text-neutral-600 sm:text-[14px]">
              Successful projects powered by experience
            </p>
            <span
              aria-hidden
              className="mt-4 block h-1 overflow-hidden rounded-full bg-neutral-100"
            >
              <span className="block h-full w-1/5 rounded-full bg-primary" />
            </span>
          </div>

          <div
            className="enter relative col-span-12 aspect-588/216 overflow-hidden rounded-[22px] bg-neutral-950"
            style={delay(420)}
          >
            <Image
              src="/images/home/hero-traffic.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 480px, (min-width: 448px) 28rem, 100vw"
              className="object-cover"
            />
            <p className="relative flex h-full max-w-[58%] items-center pl-5 font-display text-[17px] leading-tight font-semibold tracking-[-0.02em] text-white sm:pl-7 sm:text-[24px]">
              Drive more traffic and product sales
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
