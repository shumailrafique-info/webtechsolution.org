import Image from "next/image";
import type { CSSProperties } from "react";
import {
  BuildingsIcon,
  CalendarIcon,
  MapPinIcon,
  SealCheckIcon,
} from "@/components/icons";
import { CONTACT, FOUNDED, OFFICES, PROJECTS_DELIVERED, TEAM } from "./data";
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
      <Container className="grid items-center gap-14 pt-10 pb-16 md:pt-14 lg:grid-cols-12 lg:gap-x-12 lg:pt-16 lg:pb-24">
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
            className="enter mt-6 max-w-[54ch] text-[17px] leading-[1.65] text-neutral-600 md:text-[18.5px]"
            style={delay(200)}
          >
            WebTech Solutions plans, builds and markets the online presence of
            growing businesses &mdash;{" "}
            <strong className="font-semibold text-heading">
              search, websites, apps and campaigns
            </strong>
            , handled by one team for clients in {markets}.
          </p>

          <div
            className="enter mt-9 flex flex-wrap items-center gap-3"
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
            className="enter mt-9 flex flex-wrap gap-x-6 gap-y-3"
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

        <figure className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div
            className="enter-image relative aspect-4/5 overflow-hidden rounded-[28px] bg-neutral-200 shadow-[0_30px_70px_-35px_rgba(30,20,10,0.45)]"
            style={delay(150)}
          >
            <Image
              src="/images/home/studio.webp"
              alt="Fawad Mohsin, founder of WebTech Solutions, working at a laptop with a member of the team"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, (min-width: 448px) 28rem, 100vw"
              className="object-cover object-[50%_35%]"
            />
          </div>
          <figcaption className="mt-3 text-right text-[13px] text-neutral-500">
            Fawad Mohsin, founder, at work with the team
          </figcaption>

          <div
            className="enter absolute bottom-14 -left-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-[0_18px_40px_-20px_rgba(30,20,10,0.35)] sm:-left-8 lg:-left-12"
            style={delay(560)}
          >
            <p className="flex items-center gap-1.5 text-[12px] font-medium text-neutral-500">
              <MapPinIcon aria-hidden className="size-3.5 text-primary" />
              Offices in
            </p>
            <ul className="mt-2 grid grid-cols-2 gap-x-5 gap-y-1 font-display text-[15px] font-semibold tracking-[-0.01em] text-heading">
              {OFFICES.map((office) => (
                <li key={office.city}>{office.city}</li>
              ))}
            </ul>
          </div>
        </figure>
      </Container>
    </section>
  );
}
