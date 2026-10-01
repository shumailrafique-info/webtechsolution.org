import type { Metadata } from "next";
import Link from "next/link";
import {
  Accent,
  Container,
  Eyebrow,
  IconBadge,
  Italic,
  PrimaryButton,
  SecondaryButton,
} from "@/components/home/primitives";
import {
  ArrowUpRightIcon,
  BookmarksIcon,
  CheckIcon,
  FolderStarIcon,
  LayoutIcon,
  NewspaperIcon,
  PlusIcon,
  PuzzleIcon,
  ScalesIcon,
  StarIcon,
  TagIcon,
  TimerIcon,
  WrenchIcon,
  XIcon,
} from "@/components/icons";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbList, graph } from "@/lib/seo";
import { cn } from "@/lib/utils";
import {
  AD_TYPES,
  AUDIENCE,
  BRIEF,
  FAQS,
  INTRO,
  LINKS,
  MEDIA_KIT,
  OTHER_OPPORTUNITIES,
} from "./_components/data";

const TITLE = "Advertise With Us";
const PATH = "/advertisement-with-us";
const DESCRIPTION =
  "Advertise with WebTech Solutions: sponsored articles, brand placements and banner spots for readers who care about SEO, marketing, blogging and tech.";

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
  {
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
]);

const AD_TYPE_ICONS = {
  "sponsored-article": NewspaperIcon,
  "brand-placement": TagIcon,
  banner: LayoutIcon,
};

const OPPORTUNITY_ICONS = {
  category: FolderStarIcon,
  feature: WrenchIcon,
  comparison: ScalesIcon,
  "case-study": StarIcon,
  resource: BookmarksIcon,
  custom: PuzzleIcon,
};

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />

      <section
        aria-labelledby="advertise-title"
        className="bg-white pt-6 pb-16 md:pb-24"
      >
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: TITLE }]}
            className="mb-0"
          />

          <div className="mt-10 grid items-start gap-12 md:mt-14 lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-7">
              <Eyebrow className="enter">{INTRO.eyebrow}</Eyebrow>
              <h1
                id="advertise-title"
                className="enter mt-6 font-display text-[42px] leading-none font-bold tracking-[-0.045em] text-balance text-heading sm:text-[56px] lg:text-[64px]"
              >
                {INTRO.title} <Accent>{INTRO.accent}</Accent>
              </h1>
              <p className="enter mt-6 max-w-[54ch] text-[17px] leading-[1.7] text-neutral-600 md:text-[18.5px]">
                {INTRO.body}
              </p>
              <div className="enter mt-9 flex flex-wrap items-center gap-3">
                <PrimaryButton href={LINKS.inquiry}>Email us</PrimaryButton>
                <SecondaryButton href={LINKS.contact}>
                  Contact page
                </SecondaryButton>
              </div>
              <p className="enter mt-4 text-[13.5px] text-neutral-500">
                {LINKS.email}
              </p>
              <ul className="enter mt-8 grid gap-2.5">
                {INTRO.facts.map((fact, index) => (
                  <li
                    key={fact}
                    className="flex items-center gap-2.5 text-[14.5px] text-neutral-600"
                  >
                    <span className="flex size-8 items-center justify-center rounded-lg border border-neutral-200 bg-white">
                      {index === 0 ? (
                        <TimerIcon
                          aria-hidden
                          className="size-4 text-neutral-700"
                        />
                      ) : (
                        <CheckIcon
                          aria-hidden
                          className="size-4 text-neutral-700"
                        />
                      )}
                    </span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            <aside
              aria-labelledby="media-kit-title"
              className="enter rounded-[28px] border border-neutral-200 bg-white p-6 shadow-[0_30px_70px_-45px_rgba(30,20,10,0.45)] md:p-8 lg:col-span-5"
            >
              <div className="flex items-center justify-between gap-3">
                <h2
                  id="media-kit-title"
                  className="font-display text-[26px] leading-tight font-bold tracking-[-0.035em] text-heading"
                >
                  {MEDIA_KIT.title} <Italic>{MEDIA_KIT.accent}</Italic>
                </h2>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[12px] font-semibold text-brand-deep ring-1 ring-primary/20">
                  {MEDIA_KIT.note}
                </span>
              </div>
              <dl className="mt-6 grid">
                {MEDIA_KIT.rows.map((row) => (
                  <div
                    key={row.label}
                    className="grid gap-1 border-t border-neutral-100 py-3.5 sm:grid-cols-[8.5rem_1fr] sm:gap-4"
                  >
                    <dt className="text-[13px] font-semibold text-neutral-500">
                      {row.label}
                    </dt>
                    <dd className="text-[14.5px] leading-[1.55] text-heading">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-neutral-100 pt-5">
                <a
                  href={LINKS.brief}
                  className="inline-flex items-center rounded-full bg-heading px-5 py-2.5 font-display text-[15px] font-semibold text-white transition-colors hover:bg-brand-deep"
                >
                  Send brief
                </a>
                <Link
                  href={LINKS.contact}
                  className="inline-flex items-center gap-1 text-[14px] font-semibold text-brand-deep hover:underline"
                >
                  Contact form
                  <ArrowUpRightIcon aria-hidden className="size-3.5" />
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="audience-title"
        className="border-y border-primary/10 bg-brand-tint py-20 md:py-28"
      >
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="reveal lg:col-span-5">
            <Eyebrow>{AUDIENCE.eyebrow}</Eyebrow>
            <h2
              id="audience-title"
              className="mt-5 font-display text-[34px] leading-[1.05] font-bold tracking-[-0.035em] text-heading sm:text-[42px] lg:text-[50px]"
            >
              {AUDIENCE.title} <Accent>{AUDIENCE.accent}</Accent>
            </h2>
            <p className="mt-5 text-[17px] leading-[1.7] text-neutral-600">
              {AUDIENCE.readers}
            </p>
          </div>

          <div className="grid gap-4 lg:col-span-7">
            <div className="reveal rounded-[24px] border border-neutral-200 bg-white p-6 md:p-8">
              <h3 className="font-display text-[19px] font-bold tracking-[-0.02em] text-heading">
                {AUDIENCE.categoriesTitle}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {AUDIENCE.categories.map((category) => (
                  <li
                    key={category}
                    className="rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-[14px] font-medium text-neutral-700"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <p className="reveal flex items-start gap-3 rounded-[20px] bg-linear-to-br from-primary to-brand-deep p-5 text-[15px] leading-[1.6] font-medium text-white">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-brand-deep">
                <CheckIcon aria-hidden className="size-3" />
              </span>
              {AUDIENCE.goodFit}
            </p>
            <p className="reveal flex items-start gap-3 rounded-[20px] border border-neutral-200 bg-white p-5 text-[15px] leading-[1.6] text-neutral-600">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
                <XIcon aria-hidden className="size-3" />
              </span>
              {AUDIENCE.rule}
            </p>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="types-title"
        className="bg-white py-20 md:py-28"
      >
        <Container>
          <div className="reveal mx-auto max-w-3xl text-center">
            <Eyebrow>Options</Eyebrow>
            <h2
              id="types-title"
              className="mt-5 font-display text-[34px] leading-[1.05] font-bold tracking-[-0.035em] text-heading sm:text-[42px] lg:text-[50px]"
            >
              Advertisement <Accent>types.</Accent>
            </h2>
          </div>

          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {AD_TYPES.map((type, index) => (
              <li
                key={type.id}
                className={cn(
                  "reveal flex flex-col rounded-[24px] p-7",
                  index === 0
                    ? "bg-linear-to-br from-primary to-brand-deep text-white"
                    : "border border-neutral-200 bg-white",
                )}
              >
                <IconBadge
                  icon={AD_TYPE_ICONS[type.id]}
                  tone={index === 0 ? "dark" : "light"}
                />
                <h3
                  className={cn(
                    "mt-6 font-display text-[23px] font-bold tracking-tight",
                    index !== 0 && "text-heading",
                  )}
                >
                  {type.title}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-[15px] leading-[1.6]",
                    index === 0 ? "text-white/85" : "text-neutral-600",
                  )}
                >
                  {type.body}
                </p>
              </li>
            ))}
          </ul>

          <div className="reveal mt-20 flex flex-wrap items-end justify-between gap-4 border-b border-neutral-200 pb-6">
            <h3 className="font-display text-[28px] leading-tight font-bold tracking-[-0.03em] text-heading md:text-[34px]">
              Other advertisement <Italic>opportunities</Italic>
            </h3>
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-[13px] font-semibold text-neutral-600">
              Extra
            </span>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OTHER_OPPORTUNITIES.map((item) => (
              <li
                key={item.id}
                className="reveal flex flex-col rounded-[24px] border border-neutral-200 bg-white p-6"
              >
                <IconBadge icon={OPPORTUNITY_ICONS[item.id]} />
                <h4 className="mt-5 font-display text-[19px] font-bold tracking-tight text-heading">
                  {item.title}
                </h4>
                <p className="mt-1.5 text-[14.5px] leading-[1.6] text-neutral-600">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="brief-title"
        className="bg-white pb-20 md:pb-28"
      >
        <Container>
          <div className="reveal flex flex-col items-start justify-between gap-8 rounded-[28px] bg-heading p-8 text-white md:flex-row md:items-center md:p-12">
            <div>
              <h2
                id="brief-title"
                className="font-display text-[30px] leading-[1.05] font-bold tracking-[-0.035em] md:text-[42px]"
              >
                {BRIEF.title}{" "}
                <Italic className="font-medium text-primary">
                  {BRIEF.accent}
                </Italic>
              </h2>
              <p className="mt-3 max-w-[56ch] text-[16.5px] leading-[1.65] text-neutral-400">
                {BRIEF.body}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <PrimaryButton href={LINKS.opportunities}>
                Email now
              </PrimaryButton>
              <Link
                href={LINKS.contact}
                className="inline-flex items-center rounded-full border-2 border-white/25 px-6 py-3 font-display text-[16px] leading-none font-semibold tracking-[-0.01em] text-white transition-colors hover:border-white sm:py-3.5"
              >
                Contact form
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="ad-faq-title"
        className="border-t border-neutral-200/70 bg-neutral-50 py-20 md:py-28"
      >
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="reveal lg:col-span-5">
            <Eyebrow>FAQ</Eyebrow>
            <h2
              id="ad-faq-title"
              className="mt-5 font-display text-[34px] leading-[1.05] font-bold tracking-[-0.035em] text-heading sm:text-[42px] lg:text-[50px]"
            >
              Quick <Accent>answers.</Accent>
            </h2>
          </div>
          <div className="lg:col-span-7">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="reveal group border-b border-neutral-200 first:border-t"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-[19px] leading-snug font-bold tracking-[-0.02em] text-heading md:text-[21px]">
                    {faq.question}
                  </h3>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-[transform,background-color,color,border-color] duration-300 group-open:rotate-45 group-open:border-transparent group-open:bg-primary group-open:text-white">
                    <PlusIcon aria-hidden className="size-4" />
                  </span>
                </summary>
                <p className="-mt-1 pb-7 text-[16px] leading-[1.7] text-neutral-600 md:pr-14">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
