import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FOUNDED,
  FOUNDER,
  OFFICES,
  PROJECTS_DELIVERED,
  TEAM_MEMBERS,
} from "@/components/home/data";
import {
  Accent,
  ArrowLink,
  Container,
  Eyebrow,
  Italic,
  PrimaryButton,
  SecondaryButton,
  TrustChip,
} from "@/components/home/primitives";
import { Stats } from "@/components/home/stats";
import { BuildingsIcon, CalendarIcon, SealCheckIcon } from "@/components/icons";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbList, graph, organizationRef } from "@/lib/seo";
import {
  ABOUT_TEAM,
  MISSION,
  SPECIALISMS,
  VISION,
  WHO_WE_ARE,
  WHO_WE_ARE_CLOSING,
} from "./_components/data";
import { TeamBioCard } from "./_components/team-bio-card";

const TITLE = "About Us";
const PATH = "/about-us";
const DESCRIPTION =
  "WebTech Solutions is a digital agency founded on 1st January 2013, specializing in App Development, SEO, and Digital Marketing for businesses in Pakistan, the UK, Spain and the USA.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH },
};

const schema = graph([
  breadcrumbList([
    { name: "Home", path: "/" },
    { name: TITLE, path: PATH },
  ]),
  { "@type": "AboutPage", name: TITLE, about: organizationRef },
]);

export default function Page() {
  const team = ABOUT_TEAM.map((name) =>
    TEAM_MEMBERS.find((member) => member.name === name),
  ).filter((member) => member !== undefined);

  return (
    <>
      <JsonLd data={schema} />

      <section
        aria-labelledby="about-title"
        className="overflow-hidden bg-white pt-6 pb-12 md:pb-16"
      >
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: TITLE }]}
            className="mb-0"
          />

          <div className="mt-10 grid items-center gap-10 md:mt-12 md:gap-14 lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-7">
              <Eyebrow className="enter">About us</Eyebrow>
              <h1
                id="about-title"
                className="enter mt-6 font-display text-[42px] leading-none font-bold tracking-[-0.045em] text-balance text-heading sm:text-[56px] lg:text-[66px]"
              >
                Market-leading digital agency <Accent>expertise.</Accent>
              </h1>
              <p className="enter mt-6 max-w-[54ch] text-[17px] leading-[1.65] text-neutral-600 md:text-[18.5px]">
                A trusted digital agency since {FOUNDED.year}, helping
                businesses build a strong online presence and grow with
                confidence &mdash; with{" "}
                <strong className="font-semibold text-heading">
                  app development, SEO and digital marketing
                </strong>{" "}
                handled by one team.
              </p>
              <div className="enter mt-9 flex flex-wrap items-center gap-3">
                <PrimaryButton href="/contact-us">Contact us</PrimaryButton>
                <SecondaryButton href="/our-team">
                  Meet the team
                </SecondaryButton>
              </div>
              <ul className="enter mt-9 flex flex-wrap gap-x-6 gap-y-3">
                <TrustChip icon={CalendarIcon}>Since {FOUNDED.year}</TrustChip>
                <TrustChip icon={SealCheckIcon}>
                  {PROJECTS_DELIVERED} projects done
                </TrustChip>
                <TrustChip icon={BuildingsIcon}>
                  {OFFICES.length} offices
                </TrustChip>
              </ul>
            </div>

            <figure className="enter-image relative mx-auto aspect-4/5 w-full max-w-md lg:col-span-5 lg:max-w-none">
              <div className="absolute inset-x-0 top-[16%] bottom-0 rounded-[28px] bg-linear-to-br from-primary to-brand-deep" />
              <Image
                src={FOUNDER.image}
                alt={`${FOUNDER.name}, ${FOUNDER.role} of WebTech Solutions`}
                fill
                priority
                sizes="(min-width: 1024px) 38vw, (min-width: 448px) 28rem, 90vw"
                className="rounded-b-[28px] object-contain object-bottom"
              />
              <figcaption className="absolute bottom-4 left-4 rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-[0_18px_40px_-20px_rgba(30,20,10,0.35)] sm:left-6">
                <span className="block font-display text-[16px] font-bold tracking-[-0.02em] text-heading">
                  {FOUNDER.name}
                </span>
                <span className="text-[13px] text-neutral-500">
                  Founder &amp; CEO, since {FOUNDED.year}
                </span>
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <Stats />

      <section
        aria-labelledby="who-title"
        className="bg-white py-14 md:py-20 lg:py-24"
      >
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-x-12">
          <div className="reveal lg:col-span-5">
            <Eyebrow>About WebTech Solutions</Eyebrow>
            <h2
              id="who-title"
              className="mt-5 font-display text-[34px] leading-[1.05] font-bold tracking-[-0.035em] text-heading sm:text-[42px] lg:text-[50px]"
            >
              Who <Italic>we are</Italic>
            </h2>
            <ul className="mt-7 flex flex-wrap gap-2">
              {SPECIALISMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex rounded-full border border-neutral-200 bg-white px-4 py-2 text-[14px] font-medium text-neutral-700 transition-colors hover:border-primary/40 hover:text-brand-deep"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal grid gap-5 text-[17px] leading-[1.75] text-neutral-600 lg:col-span-7">
            {WHO_WE_ARE.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            <p className="mt-2 border-l-[3px] border-primary pl-5 font-display text-[22px] leading-[1.35] font-semibold tracking-[-0.02em] text-heading md:text-[26px]">
              {WHO_WE_ARE_CLOSING}
            </p>
          </div>
        </Container>
      </section>

      <section
        aria-label="Vision and mission"
        className="border-y border-primary/10 bg-brand-tint py-14 md:py-20 lg:py-24"
      >
        <Container className="grid gap-5 md:grid-cols-2">
          {[VISION, MISSION].map((item) => (
            <article
              key={item.accent}
              className="reveal flex flex-col overflow-hidden rounded-[28px] border border-neutral-200 bg-white"
            >
              <div className="relative aspect-568/380 bg-neutral-100">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 768px) 46vw, 92vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-7 md:p-9">
                <h2 className="font-display text-[30px] leading-[1.05] font-bold tracking-[-0.035em] text-heading md:text-[38px]">
                  {item.title} <Italic>{item.accent}</Italic>
                </h2>
                <p className="mt-4 text-[16px] leading-[1.7] text-neutral-600">
                  {item.body}
                </p>
                <ArrowLink href={item.cta.href} className="mt-auto pt-7">
                  {item.cta.label}
                </ArrowLink>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <section
        aria-labelledby="team-title"
        className="bg-white py-14 md:py-20 lg:py-24"
      >
        <Container>
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>WebTech Solutions experts</Eyebrow>
              <h2
                id="team-title"
                className="mt-5 font-display text-[34px] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-heading sm:text-[42px] lg:text-[50px]"
              >
                Meet the WebTech Solutions <Accent>team.</Accent>
              </h2>
            </div>
            <ArrowLink href="/our-team">See the full team</ArrowLink>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <li key={member.name} className="reveal">
                <TeamBioCard member={member} />
              </li>
            ))}
            <li className="reveal sm:col-span-2">
              <div className="flex h-full flex-col justify-between gap-8 rounded-[24px] bg-linear-to-br from-primary to-brand-deep p-7 text-white md:p-9">
                <div>
                  <ul className="flex -space-x-2.5">
                    {TEAM_MEMBERS.slice(0, 6).map((member) => (
                      <li
                        key={member.name}
                        className="relative size-10 overflow-hidden rounded-full bg-white/20 ring-[2.5px] ring-brand-deep"
                      >
                        <Image
                          src={member.image}
                          alt=""
                          fill
                          sizes="40px"
                          className="object-cover object-top"
                        />
                      </li>
                    ))}
                  </ul>
                  <h3 className="mt-6 font-display text-[28px] leading-[1.05] font-bold tracking-[-0.035em] md:text-[34px]">
                    Meet the whole <Italic>team</Italic>
                  </h3>
                  <p className="mt-3 max-w-[44ch] text-[15.5px] leading-[1.6] text-white/85">
                    {TEAM_MEMBERS.length + 1} people across development,
                    content, marketing, design and operations, led by{" "}
                    {FOUNDER.name}.
                  </p>
                </div>
                <Link
                  href="/our-team"
                  className="inline-flex items-center self-start rounded-full bg-white px-6 py-3.5 font-display text-[16px] leading-none font-semibold tracking-[-0.01em] text-brand-deep shadow-[0_12px_30px_-14px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  See the full team
                </Link>
              </div>
            </li>
          </ul>
        </Container>
      </section>
    </>
  );
}
