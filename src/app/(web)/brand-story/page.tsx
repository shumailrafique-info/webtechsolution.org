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
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbList, graph } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Chapter, ChapterNav } from "./_components/chapter";
import {
  COMMITMENTS,
  FACTS,
  MARKETS,
  PITFALLS,
  PRINCIPLES,
  SERVICES,
} from "./_components/data";

const TITLE = "Brand Story";
const PATH = "/brand-story";

export const metadata: Metadata = pageMetadata({
  title: "Brand Story of WebTech Solutions | Strategy-First Digital Agency",
  description:
    "Read the brand story of WebTech Solutions. Founded in 2013 by Fawad Mohsin, we help startups and growing businesses build strategy-driven digital systems with clarity and responsibility.",
  path: "/brand-story",
});

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
              WebTech Solutions did not begin with the ambition to become the
              biggest digital agency in the room. It began with a far more
              difficult goal:
            </p>
            <blockquote className="enter mx-auto mt-8 max-w-[36ch] font-display text-[26px] leading-[1.3] font-semibold tracking-[-0.02em] text-heading md:text-[32px]">
              <span aria-hidden className="text-primary">
                &ldquo;
              </span>
              To be the most reliable digital marketing agency for early
              startups and grown-up businesses.
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
            <p>
              Founded in 2013 by Fawad Mohsin (professionally known as Fawad
              Malik), WebTech Solutions was created at a time when digital
              services were growing fast, but digital clarity was fading.
              Businesses were promised rankings, traffic, installs, and
              conversions, while very few were given structure, honest
              expectations, or systems that could survive long-term growth.
            </p>
            <p>
              What emerged was not just another agency, but a digital partner
              built on restraint, discipline, and responsibility.
            </p>
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
              title="The early years:"
              accent="learning before scaling"
              lead="Only offer what can be backed by experience, logic, and results."
            >
              <div className="reveal grid gap-5 text-[16.5px] leading-[1.75] text-neutral-600">
                <p>
                  In its earliest phase, WebTech Solutions operated with a
                  simple but demanding mindset: Nothing would be offered unless
                  it could be defended by experience, logic, and results.
                </p>
                <p>
                  Rather than scaling aggressively, the agency spent its
                  formative years working closely with real businesses across
                  different markets, industries, and maturity levels. This
                  period shaped the internal philosophy that still defines
                  WebTech Solutions today.
                </p>
              </div>
              <p className="reveal mt-8 rounded-[22px] bg-heading p-7 font-display text-[21px] leading-[1.4] font-semibold tracking-[-0.02em] text-white md:p-9 md:text-[25px]">
                The work revealed an uncomfortable truth: most failures were not
                caused by a lack of tools or platforms, but by poor strategy and
                fragmented execution.
              </p>
              <p className="reveal mt-8 text-[16.5px] leading-[1.75] text-neutral-600">
                WebTech Solutions positioned itself differently from the start.
                It did not treat SEO, development, design, or content as
                separate services. It treated them as interconnected components
                of one digital ecosystem. That perspective became the agency’s
                defining advantage.
              </p>
            </Chapter>

            <Chapter
              id="global-presence"
              title="Local roots to"
              accent="global presence"
              lead="Expansion across markets, without losing accountability."
            >
              <p className="reveal text-[16.5px] leading-[1.75] text-neutral-600">
                As results accumulated and trust deepened, WebTech Solutions
                expanded beyond borders. Clients from different regions brought
                new challenges, like different user behaviors, search
                ecosystems, compliance requirements, and performance
                expectations.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
                {MARKETS.map((market, index) => (
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
                This presence is not symbolic. It shapes how the agency thinks
                and executes, while avoiding one-size-fits-all planning. Growth
                has never come at the cost of quality or accountability.
              </p>
            </Chapter>

            <Chapter
              id="principles"
              title="What WebTech Solutions"
              accent="stands for"
              lead="Principle-driven work, built for long-term trust."
            >
              <ul className="grid gap-3 sm:grid-cols-2">
                {PRINCIPLES.map((item, index) => (
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
                  WebTech Solutions does not position itself as a vendor.
                  Clients are treated as long-term partners, with open
                  communication and realistic goal-setting from day one.
                </p>
                <ul className="mt-6 grid gap-2.5 md:grid-cols-3">
                  {COMMITMENTS.map((item) => (
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
              title="Services offered: a unified approach to"
              accent="digital growth"
              lead="Strategy first. Connected execution after."
            >
              <p className="reveal text-[16.5px] leading-[1.75] text-neutral-600">
                Services are treated as interdependent parts of one digital
                system. Many businesses struggle because key pieces are built in
                isolation:
              </p>
              <ul className="mt-6 grid gap-3 md:grid-cols-3">
                {PITFALLS.map((item) => (
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
                The objective is simple: build resilient digital infrastructure
                that supports sustainable business growth.
              </p>

              <ol className="mt-10 grid gap-3">
                {SERVICES.map((item, index) => {
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

            <Chapter id="blog" title="WebTech Solutions’" accent="blog">
              <div className="reveal flex flex-col items-start gap-6 rounded-[24px] border border-neutral-200 bg-white p-7 md:flex-row md:items-center md:justify-between md:p-9">
                <p className="max-w-[52ch] text-[16.5px] leading-[1.7] text-neutral-600">
                  The agency shares insights and tool reviews openly because an
                  informed client is a stronger partner. Trust is built through
                  clarity, not persuasion.
                </p>
                <ArrowLink href="/blog" className="shrink-0">
                  Read the blog
                </ArrowLink>
              </div>
            </Chapter>

            <Chapter
              id="leadership"
              title="Fawad Malik’s"
              accent="leadership"
              lead="Systems over promises, responsibility over visibility."
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
                    WebTech Solutions is led by Fawad Malik. The agency culture
                    is built around process, honesty, and accountability. It is
                    a brand where systems matter more than promises, and
                    responsibility matters more than visibility.
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
              title="The philosophy"
              accent="going forward"
              lead="Clarity, responsibility, and sustainable growth."
            >
              <div className="reveal grid gap-5 text-[16.5px] leading-[1.75] text-neutral-600">
                <p>
                  WebTech Solutions exists to help businesses handle complexity
                  with confidence, without overwhelming them with jargon or
                  selling illusions. It builds digital systems that are
                  intelligent, ethical, and built to last.
                </p>
                <p className="font-display text-[22px] leading-[1.4] font-semibold tracking-[-0.02em] text-heading md:text-[26px]">
                  Platforms will change. Technology will advance. What will not
                  change is WebTech Solutions’ commitment to clarity,
                  responsibility, and sustainable growth.
                </p>
                <p>
                  The agency continues to improve its methods, expand its
                  expertise, and support businesses across global markets
                  without compromising its values.
                </p>
              </div>
              <div className="reveal mt-10 flex flex-nowrap items-center gap-2 sm:gap-3">
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
