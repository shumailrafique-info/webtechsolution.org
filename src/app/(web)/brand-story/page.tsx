import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FOUNDER } from "@/components/home/data";
import {
  Accent,
  ArrowLink,
  Container,
  Eyebrow,
  IconBadge,
  PrimaryButton,
  SecondaryButton,
} from "@/components/home/primitives";
import {
  ArrowUpRightIcon,
  CheckIcon,
  GraphIcon,
  HandshakeIcon,
  LightbulbIcon,
  UsersIcon,
  XIcon,
} from "@/components/icons";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbList, graph } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Chapter, ChapterNav } from "./_components/chapter";
import {
  BLOG,
  EARLY_YEARS,
  FACTS,
  GLOBAL_PRESENCE,
  GOING_FORWARD,
  INTRO,
  LEADERSHIP,
  PRINCIPLES,
  SERVICES,
} from "./_components/data";

const TITLE = "Brand Story";
const PATH = "/brand-story";
const DESCRIPTION =
  "The story of WebTech Solutions: a strategy-first digital agency founded in 2013 by Fawad Mohsin, built on restraint, discipline and responsibility.";

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

const PRINCIPLE_ICONS = [GraphIcon, UsersIcon, LightbulbIcon, HandshakeIcon];

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />

      <section
        aria-labelledby="story-title"
        className="bg-white pt-6 pb-12 md:pb-16"
      >
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: TITLE }]}
            className="mb-0"
          />

          <div className="mx-auto mt-10 max-w-4xl text-center md:mt-12">
            <Eyebrow className="enter">WebTech Solutions</Eyebrow>
            <h1
              id="story-title"
              className="enter mt-6 font-display text-[40px] leading-[1.02] font-bold tracking-[-0.045em] text-balance text-heading sm:text-[54px] lg:text-[64px]"
            >
              A brand built where strategy meets{" "}
              <Accent>responsibility.</Accent>
            </h1>
            <p className="enter mx-auto mt-6 max-w-[60ch] text-[17px] leading-[1.65] text-neutral-600 md:text-[18.5px]">
              {INTRO.opening}
            </p>
            <blockquote className="enter mx-auto mt-8 max-w-[36ch] font-serif text-[26px] leading-[1.3] font-semibold text-heading italic md:text-[32px]">
              <span aria-hidden className="text-primary">
                &ldquo;
              </span>
              {INTRO.goal}
              <span aria-hidden className="text-primary">
                &rdquo;
              </span>
            </blockquote>
          </div>

          <dl className="enter mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-3">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-5 text-center"
              >
                <dt className="text-[13px] font-medium text-neutral-500">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 font-display text-[18px] leading-snug font-bold tracking-[-0.02em] text-heading">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="reveal mx-auto mt-12 grid max-w-3xl gap-5 text-[17px] leading-[1.75] text-neutral-600">
            {INTRO.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <div className="border-t border-primary/10 bg-brand-tint/60 py-14 md:py-20 lg:py-24">
        <Container className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:gap-x-12">
          <aside className="lg:col-span-3">
            <ChapterNav />
          </aside>

          <div className="grid gap-12 md:gap-16 lg:col-span-9">
            <Chapter
              id="early-years"
              title={EARLY_YEARS.title}
              accent={EARLY_YEARS.accent}
              lead={EARLY_YEARS.lead}
            >
              <div className="reveal grid gap-5 text-[16.5px] leading-[1.75] text-neutral-600">
                {EARLY_YEARS.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
              <p className="reveal mt-8 rounded-[22px] bg-heading p-7 font-display text-[21px] leading-[1.4] font-semibold tracking-[-0.02em] text-white md:p-9 md:text-[25px]">
                {EARLY_YEARS.truth}
              </p>
              <p className="reveal mt-8 text-[16.5px] leading-[1.75] text-neutral-600">
                {EARLY_YEARS.closing}
              </p>
            </Chapter>

            <Chapter
              id="global-presence"
              title={GLOBAL_PRESENCE.title}
              accent={GLOBAL_PRESENCE.accent}
              lead={GLOBAL_PRESENCE.lead}
            >
              <p className="reveal text-[16.5px] leading-[1.75] text-neutral-600">
                {GLOBAL_PRESENCE.body}
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
                {GLOBAL_PRESENCE.markets.map((market, index) => (
                  <li
                    key={market.code}
                    className={cn(
                      "reveal rounded-[20px] border border-neutral-200 bg-white p-5",
                      index === 0 && "sm:col-span-2",
                      index < 2 ? "xl:col-span-3" : "xl:col-span-2",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-display text-[19px] font-bold tracking-tight text-heading">
                        {market.country}
                      </p>
                      <span className="rounded-md bg-heading px-1.5 py-0.5 font-display text-[11.5px] font-bold tracking-[0.04em] text-white">
                        {market.code}
                      </span>
                    </div>
                    <p className="mt-2 text-[14.5px] leading-[1.55] text-neutral-600">
                      {market.note}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="reveal mt-8 text-[16.5px] leading-[1.75] text-neutral-600">
                {GLOBAL_PRESENCE.closing}
              </p>
            </Chapter>

            <Chapter
              id="principles"
              title={PRINCIPLES.title}
              accent={PRINCIPLES.accent}
              lead={PRINCIPLES.lead}
            >
              <ul className="grid gap-3 sm:grid-cols-2">
                {PRINCIPLES.items.map((item, index) => (
                  <li
                    key={item.title}
                    className="reveal rounded-[22px] border border-neutral-200 bg-white p-6"
                  >
                    <IconBadge icon={PRINCIPLE_ICONS[index]} />
                    <p className="mt-5 font-display text-[19px] font-bold tracking-tight text-heading">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-[15px] leading-[1.6] text-neutral-600">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="reveal mt-5 rounded-[24px] bg-linear-to-br from-primary to-brand-deep p-7 text-white md:p-9">
                <p className="max-w-[60ch] text-[17px] leading-[1.65] text-white/90">
                  {PRINCIPLES.partnership}
                </p>
                <ul className="mt-6 grid gap-2.5 md:grid-cols-3">
                  {PRINCIPLES.commitments.map((item) => (
                    <li
                      key={item.title}
                      className="rounded-[18px] border border-white/15 bg-white/10 p-4"
                    >
                      <p className="flex items-center gap-2 font-display text-[16px] font-bold tracking-[-0.02em]">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-brand-deep">
                          <CheckIcon aria-hidden className="size-3" />
                        </span>
                        {item.title}
                      </p>
                      <p className="mt-1.5 text-[14px] text-white/80">
                        {item.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Chapter>

            <Chapter
              id="services"
              title={SERVICES.title}
              accent={SERVICES.accent}
              lead={SERVICES.lead}
            >
              <p className="reveal text-[16.5px] leading-[1.75] text-neutral-600">
                {SERVICES.body}
              </p>
              <ul className="mt-6 grid gap-3 md:grid-cols-3">
                {SERVICES.pitfalls.map((item) => (
                  <li
                    key={item.title}
                    className="reveal rounded-[20px] border border-neutral-200 bg-white p-5"
                  >
                    <p className="flex items-start gap-2 font-display text-[16px] leading-snug font-bold tracking-[-0.02em] text-heading">
                      <XIcon
                        aria-hidden
                        className="mt-0.5 size-4 shrink-0 text-neutral-400"
                      />
                      {item.title}
                    </p>
                    <p className="mt-1.5 pl-6 text-[14px] text-neutral-600">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="reveal mt-6 border-l-[3px] border-primary pl-5 font-display text-[19px] leading-[1.45] font-semibold tracking-[-0.015em] text-heading md:text-[21px]">
                {SERVICES.objective}
              </p>

              <ol className="mt-10 grid gap-3">
                {SERVICES.items.map((item, index) => {
                  const body = (
                    <>
                      <span className="font-display text-[28px] leading-none font-bold tracking-[-0.04em] text-primary md:w-14">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">
                        <span className="flex items-start justify-between gap-3 font-display text-[19px] leading-snug font-bold tracking-tight text-heading">
                          {item.title}
                          {item.href ? (
                            <ArrowUpRightIcon
                              aria-hidden
                              className="mt-1 size-4 shrink-0 text-neutral-300 transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                            />
                          ) : null}
                        </span>
                        <span className="mt-1.5 block text-[15px] leading-[1.6] text-neutral-600">
                          {item.body}
                        </span>
                      </span>
                    </>
                  );
                  const card =
                    "group flex flex-col gap-3 rounded-[22px] border border-neutral-200 bg-white p-6 md:flex-row md:gap-6";
                  return (
                    <li key={item.title} className="reveal">
                      {item.href ? (
                        <Link
                          href={item.href}
                          className={`${card} transition-[border-color,box-shadow] duration-300 hover:border-neutral-300 hover:shadow-[0_20px_45px_-30px_rgba(30,20,10,0.3)]`}
                        >
                          {body}
                        </Link>
                      ) : (
                        <div className={card}>{body}</div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </Chapter>

            <Chapter id="blog" title={BLOG.title} accent={BLOG.accent}>
              <div className="reveal flex flex-col items-start gap-6 rounded-[24px] border border-neutral-200 bg-white p-7 md:flex-row md:items-center md:justify-between md:p-9">
                <p className="max-w-[52ch] text-[16.5px] leading-[1.7] text-neutral-600">
                  {BLOG.body}
                </p>
                <ArrowLink href="/blog" className="shrink-0">
                  Read the blog
                </ArrowLink>
              </div>
            </Chapter>

            <Chapter
              id="leadership"
              title={LEADERSHIP.title}
              accent={LEADERSHIP.accent}
              lead={LEADERSHIP.lead}
            >
              <div className="reveal grid items-end gap-8 overflow-hidden rounded-[28px] border border-neutral-200 bg-white md:grid-cols-[1fr_1.3fr]">
                <figure className="relative mx-auto aspect-4/5 w-full max-w-xs md:max-w-none">
                  <div className="absolute inset-x-6 top-[18%] bottom-0 rounded-t-[24px] bg-linear-to-br from-primary to-brand-deep" />
                  <Image
                    src={FOUNDER.image}
                    alt={`${FOUNDER.name} (${FOUNDER.formerName}), ${FOUNDER.role} of WebTech Solutions`}
                    fill
                    sizes="(min-width: 768px) 30vw, 80vw"
                    className="object-contain object-bottom"
                  />
                </figure>
                <div className="p-7 md:py-10 md:pr-10 md:pl-0">
                  <p className="text-[17px] leading-[1.75] text-neutral-600">
                    {LEADERSHIP.body}
                  </p>
                  <p className="mt-6 font-display text-[18px] font-bold tracking-[-0.02em] text-heading">
                    {FOUNDER.name}
                  </p>
                  <p className="text-[14px] text-neutral-500">
                    Founder &amp; CEO, also known as {FOUNDER.formerName}
                  </p>
                </div>
              </div>
            </Chapter>

            <Chapter
              id="going-forward"
              title={GOING_FORWARD.title}
              accent={GOING_FORWARD.accent}
              lead={GOING_FORWARD.lead}
            >
              <div className="reveal grid gap-5 text-[16.5px] leading-[1.75] text-neutral-600">
                {GOING_FORWARD.body.map((paragraph, index) =>
                  index === 1 ? (
                    <p
                      key={paragraph.slice(0, 24)}
                      className="font-display text-[22px] leading-[1.4] font-semibold tracking-[-0.02em] text-heading md:text-[26px]"
                    >
                      {paragraph}
                    </p>
                  ) : (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ),
                )}
              </div>
              <div className="reveal mt-10 flex flex-wrap gap-3">
                <PrimaryButton href="/contact-us">Work with us</PrimaryButton>
                <SecondaryButton href="/our-team">
                  Meet the team
                </SecondaryButton>
              </div>
            </Chapter>
          </div>
        </Container>
      </div>
    </>
  );
}
