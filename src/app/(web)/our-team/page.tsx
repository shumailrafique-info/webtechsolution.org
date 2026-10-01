import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CONTACT,
  FOUNDED,
  FOUNDER,
  PROJECTS_DELIVERED,
  TEAM_GROUPS,
  TEAM_MEMBERS,
} from "@/components/home/data";
import {
  Accent,
  Container,
  Eyebrow,
  Italic,
  PrimaryButton,
  SecondaryButton,
  TrustChip,
} from "@/components/home/primitives";
import {
  DisciplinesPanel,
  FounderFeature,
  TeamCard,
} from "@/components/home/team";
import { CalendarIcon, SealCheckIcon, UsersIcon } from "@/components/icons";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbList, graph, ORGANIZATION_ID } from "@/lib/seo";

const TITLE = "Our Team";
const PATH = "/our-team";
const PEOPLE = TEAM_MEMBERS.length + 1;
const DESCRIPTION = `Meet the ${PEOPLE} people behind WebTech Solutions: SEO, content, development, design and marketing specialists led by founder ${FOUNDER.name} since ${FOUNDED.year}.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH },
};

/** Applications go by email, as the company's FAQ asks. */
const JOIN_HREF = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Joining WebTech Solutions")}`;

const schema = graph([
  breadcrumbList([
    { name: "Home", path: "/" },
    { name: TITLE, path: PATH },
  ]),
  {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    founder: {
      "@type": "Person",
      name: FOUNDER.name,
      alternateName: FOUNDER.formerName,
      jobTitle: FOUNDER.role,
    },
    employee: TEAM_MEMBERS.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
    })),
  },
]);

export default function Page() {
  const groups = TEAM_GROUPS.map((group) => ({
    ...group,
    members: TEAM_MEMBERS.filter((member) => member.group === group.id),
  })).filter((group) => group.members.length > 0);

  return (
    <>
      <JsonLd data={schema} />

      {/* Introduction. */}
      <section
        aria-labelledby="team-title"
        className="border-b border-neutral-100 bg-white pt-6 pb-16 md:pb-20"
      >
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: TITLE }]}
            className="mb-0"
          />

          <div className="mx-auto mt-10 max-w-3xl text-center md:mt-14">
            <div className="enter flex justify-center">
              <ul className="flex -space-x-2.5">
                {TEAM_MEMBERS.slice(0, 9).map((member) => (
                  <li
                    key={member.name}
                    className="relative size-10 overflow-hidden rounded-full bg-neutral-100 ring-[2.5px] ring-white"
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
                <li className="relative flex size-10 items-center justify-center rounded-full bg-heading font-display text-[12.5px] font-bold text-white ring-[2.5px] ring-white">
                  +{PEOPLE - 9}
                </li>
              </ul>
            </div>

            <h1
              id="team-title"
              className="enter mt-7 font-display text-[42px] leading-none font-bold tracking-[-0.045em] text-balance text-heading sm:text-[56px] lg:text-[66px]"
            >
              The people behind <Accent>every project.</Accent>
            </h1>
            <p className="enter mx-auto mt-6 max-w-[58ch] text-[17px] leading-[1.65] text-neutral-600 md:text-[18.5px]">
              {PEOPLE} specialists in search, content, development, design and
              marketing &mdash; one team, led by founder {FOUNDER.name} since{" "}
              {FOUNDED.year}. These are the people who plan, build and run your
              project.
            </p>

            <div className="enter mt-9 flex flex-wrap items-center justify-center gap-3">
              <PrimaryButton href="/contact-us">Start a project</PrimaryButton>
              <SecondaryButton href="#join">Join the team</SecondaryButton>
            </div>

            <ul className="enter mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3">
              <TrustChip icon={UsersIcon}>{PEOPLE} people</TrustChip>
              <TrustChip icon={CalendarIcon}>Since {FOUNDED.year}</TrustChip>
              <TrustChip icon={SealCheckIcon}>
                {PROJECTS_DELIVERED} projects delivered
              </TrustChip>
            </ul>
          </div>

          {/* Jump to a discipline. */}
          <nav
            aria-label="Teams"
            className="enter mt-12 flex flex-wrap justify-center gap-2"
          >
            {groups.map((group) => (
              <Link
                key={group.id}
                href={`#${group.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white py-1.5 pr-1.5 pl-4 text-[14px] font-medium text-neutral-700 transition-colors hover:border-primary/40 hover:text-brand-deep"
              >
                {group.title} {group.accent}
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-neutral-100 px-1.5 text-[12px] font-semibold text-neutral-600">
                  {group.members.length}
                </span>
              </Link>
            ))}
          </nav>
        </Container>
      </section>

      {/* Founder. */}
      <section
        aria-label="Founder"
        className="border-b border-primary/10 bg-brand-tint py-20 md:py-28"
      >
        <Container>
          <Eyebrow className="reveal mb-10 md:mb-14">Leadership</Eyebrow>
          <FounderFeature
            headingLevel="h2"
            footer={
              <p className="mt-6 text-[13.5px] text-neutral-500">
                Formerly known as {FOUNDER.formerName}, the name he still writes
                under on the blog.
              </p>
            }
          >
            <p>
              Fawad Mohsin is the Founder and CEO of WebTech Solutions, with a
              background in digital strategy, SEO and technology-driven business
              growth.
            </p>
            <p>
              He started the company on 1 January {FOUNDED.year} with a simple
              goal: to help businesses use smart digital solutions to grow{" "}
              <Italic className="text-heading">with confidence.</Italic> Today
              he leads the team, guides strategy and works closely with clients
              to make sure every project delivers real value and measurable
              results.
            </p>
          </FounderFeature>
        </Container>
      </section>

      {/* The team, by discipline. */}
      <section aria-label="The team" className="bg-white py-20 md:py-28">
        <Container className="grid gap-20 md:gap-24">
          {groups.map((group) => (
            <section
              key={group.id}
              id={group.id}
              aria-labelledby={`${group.id}-title`}
              className="scroll-mt-28"
            >
              <div className="reveal flex flex-wrap items-end justify-between gap-x-10 gap-y-3 border-b border-neutral-200 pb-6">
                <div>
                  <h2
                    id={`${group.id}-title`}
                    className="font-display text-[30px] leading-[1.05] font-bold tracking-[-0.035em] text-heading md:text-[38px]"
                  >
                    {group.title} <Italic>{group.accent}</Italic>
                  </h2>
                  <p className="mt-2.5 max-w-[56ch] text-[15.5px] leading-[1.6] text-neutral-600">
                    {group.lede}
                  </p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-[13px] font-semibold text-brand-deep ring-1 ring-primary/20">
                  {group.members.length}{" "}
                  {group.members.length === 1 ? "person" : "people"}
                </span>
              </div>

              <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
                {group.members.map((member) => (
                  <li key={member.name} className="reveal">
                    <TeamCard member={member} />
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <DisciplinesPanel className="bg-neutral-50" />
        </Container>
      </section>

      {/* Hiring. */}
      <section
        id="join"
        aria-labelledby="join-title"
        className="scroll-mt-28 bg-white pb-16 md:pb-20"
      >
        <Container>
          <div className="reveal grid gap-8 rounded-[28px] bg-linear-to-br from-primary to-brand-deep p-8 text-white md:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[13px] font-medium">
                <span aria-hidden className="size-1.5 rounded-full bg-white" />
                Careers
              </p>
              <h2
                id="join-title"
                className="mt-5 font-display text-[32px] leading-[1.05] font-bold tracking-[-0.035em] md:text-[44px]"
              >
                Want to <Italic>join us?</Italic>
              </h2>
              <p className="mt-4 max-w-[52ch] text-[16.5px] leading-[1.65] text-white/85">
                We are always looking for talented people who are passionate
                about SEO. Email us with your interest, your experience and any
                relevant projects, along with your CV.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 lg:items-end">
              <a
                href={JOIN_HREF}
                className="inline-flex items-center rounded-full bg-white px-6 py-3.5 font-display text-[16px] leading-none font-semibold tracking-[-0.01em] text-brand-deep shadow-[0_12px_30px_-14px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Send your CV
              </a>
              <span className="text-[14px] text-white/80">{CONTACT.email}</span>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
