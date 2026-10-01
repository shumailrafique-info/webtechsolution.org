import type { Metadata } from "next";
import Link from "next/link";
import { FOUNDED, PROJECTS_DELIVERED } from "@/components/home/data";
import {
  Accent,
  Container,
  Eyebrow,
  Italic,
  PrimaryButton,
  SecondaryButton,
  TrustChip,
} from "@/components/home/primitives";
import { CalendarIcon, FileTextIcon, SealCheckIcon } from "@/components/icons";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbList, graph } from "@/lib/seo";
import { CaseStudyStory } from "./_components/case-study-story";
import { CASE_STUDIES } from "./_components/data";
import { LogoWall } from "./_components/logo-wall";

const TITLE = "Case Studies";
const PATH = "/case-studies";
const DESCRIPTION =
  "How WebTech Solutions has helped publishers and businesses grow their search visibility: the problem, what we did, and what changed.";

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
]);

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />

      <section
        aria-labelledby="case-studies-title"
        className="bg-white pt-6 pb-12 md:pb-16"
      >
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: TITLE }]}
            className="mb-0"
          />

          <div className="mx-auto mt-10 max-w-3xl text-center md:mt-12">
            <Eyebrow className="enter">Case studies</Eyebrow>
            <h1
              id="case-studies-title"
              className="enter mt-6 font-display text-[42px] leading-none font-bold tracking-[-0.045em] text-balance text-heading sm:text-[56px] lg:text-[66px]"
            >
              Work that got businesses <Accent>found.</Accent>
            </h1>
            <p className="enter mx-auto mt-6 max-w-[58ch] text-[17px] leading-[1.65] text-neutral-600 md:text-[18.5px]">
              A closer look at how we have helped publishers and businesses grow
              their search visibility &mdash; the problem they came with, what
              we did, and what changed.
            </p>

            <div className="enter mt-9 flex flex-wrap items-center justify-center gap-3">
              <PrimaryButton href="/contact-us">Start a project</PrimaryButton>
              <SecondaryButton href="/services">See what we do</SecondaryButton>
            </div>

            <ul className="enter mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3">
              <TrustChip icon={FileTextIcon}>
                {CASE_STUDIES.length} case studies
              </TrustChip>
              <TrustChip icon={SealCheckIcon}>
                {PROJECTS_DELIVERED} projects delivered
              </TrustChip>
              <TrustChip icon={CalendarIcon}>Since {FOUNDED.year}</TrustChip>
            </ul>
          </div>

          <nav
            aria-label="Case studies"
            className="enter mt-12 flex flex-wrap justify-center gap-2"
          >
            {CASE_STUDIES.map((study, index) => (
              <Link
                key={study.slug}
                href={`#${study.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white py-1.5 pr-4 pl-1.5 text-[14px] font-medium text-neutral-700 transition-colors hover:border-primary/40 hover:text-brand-deep"
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-neutral-100 text-[12px] font-semibold text-neutral-600">
                  {index + 1}
                </span>
                {study.client}
              </Link>
            ))}
          </nav>
        </Container>
      </section>

      <section
        aria-labelledby="clients-title"
        className="border-y border-primary/10 bg-brand-tint py-10 md:py-14"
      >
        <Container>
          <h2
            id="clients-title"
            className="reveal text-center font-display text-[22px] font-bold tracking-tight text-heading md:text-[26px]"
          >
            Clients and <Italic>partners</Italic>
          </h2>
          <LogoWall className="reveal mt-8" />
        </Container>
      </section>

      {CASE_STUDIES.map((study, index) => (
        <CaseStudyStory
          key={study.slug}
          study={study}
          index={index}
          total={CASE_STUDIES.length}
        />
      ))}

      <section aria-labelledby="next-title" className="bg-white py-12 md:py-16">
        <Container>
          <div className="reveal flex flex-col items-start justify-between gap-8 rounded-[28px] bg-linear-to-br from-primary to-brand-deep p-8 text-white md:flex-row md:items-center md:p-12">
            <div>
              <h2
                id="next-title"
                className="font-display text-[30px] leading-[1.05] font-bold tracking-[-0.035em] md:text-[42px]"
              >
                Want results <Italic>like these?</Italic>
              </h2>
              <p className="mt-3 max-w-[50ch] text-[16.5px] leading-[1.65] text-white/85">
                Tell us where your business is today and where you want it to
                be.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact-us"
                className="inline-flex items-center rounded-full bg-white px-6 py-3.5 font-display text-[16px] leading-none font-semibold tracking-[-0.01em] text-brand-deep shadow-[0_12px_30px_-14px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start a project
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center rounded-full border-2 border-white/40 px-6 py-3 font-display text-[16px] leading-none font-semibold tracking-[-0.01em] text-white transition-colors hover:border-white"
              >
                See pricing
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
