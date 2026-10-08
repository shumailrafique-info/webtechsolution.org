import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT } from "@/components/home/data";
import {
  Accent,
  Container,
  Eyebrow,
  PrimaryButton,
} from "@/components/home/primitives";
import { ArrowUpRightIcon, MailIcon, PlusIcon } from "@/components/icons";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbList, graph } from "@/lib/seo";
import { FAQS, MORE_ANSWERS } from "./_components/data";

const TITLE = "FAQs";
const PATH = "/faqs";

export const metadata: Metadata = pageMetadata({
  title: "FAQs - WebTech Solutions – SEO & Digital Marketing Agency",
  description:
    "Answers to common questions about WebTech Solutions pricing, how soon you see results, contracts, monthly reporting and white-label services for agencies.",
  path: "/faqs",
});

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

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />

      <section
        aria-labelledby="faqs-title"
        className="bg-white pt-6 pb-10 md:pb-14"
      >
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: TITLE }]}
            className="mb-0"
          />

          <div className="mx-auto mt-10 max-w-3xl text-center md:mt-12">
            <Eyebrow className="enter">Help and FAQs</Eyebrow>
            <h1
              id="faqs-title"
              className="enter mt-6 font-display text-[42px] leading-none font-bold tracking-[-0.045em] text-balance text-heading sm:text-[56px] lg:text-[66px]"
            >
              Frequently asked <Accent>questions.</Accent>
            </h1>
            <p className="enter mx-auto mt-6 max-w-[54ch] text-[17px] leading-[1.65] text-neutral-600 md:text-[18.5px]">
              Everything you need to know about SEO and about working with
              WebTech Solutions. Can’t find your answer? Ask us directly.
            </p>
          </div>
        </Container>
      </section>

      <section
        aria-label={`${FAQS.length} questions`}
        className="border-t border-primary/10 bg-brand-tint/60 py-14 md:py-20"
      >
        <Container className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-8">
            <div className="reveal overflow-hidden rounded-[24px] border border-neutral-200 bg-white">
              {FAQS.map((faq, index) => (
                <details
                  key={faq.question}
                  open={index === 0}
                  className="group border-b border-neutral-100 last:border-0"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 transition-colors hover:bg-neutral-50/70 md:px-7 [&::-webkit-details-marker]:hidden">
                    <h2 className="font-display text-[18px] leading-snug font-bold tracking-[-0.02em] text-heading md:text-[20px]">
                      {faq.question}
                    </h2>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-[transform,background-color,color,border-color] duration-300 group-open:rotate-45 group-open:border-transparent group-open:bg-primary group-open:text-white">
                      <PlusIcon aria-hidden className="size-4" />
                    </span>
                  </summary>
                  <p className="-mt-1 px-6 pb-6 text-[16px] leading-[1.7] text-neutral-600 md:px-7 md:pr-20">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="grid gap-4 lg:sticky lg:top-28">
              <div className="reveal rounded-[24px] bg-heading p-7 text-white">
                <h2 className="font-display text-[24px] leading-tight font-bold tracking-[-0.03em]">
                  Still have a <span className="text-primary">question?</span>
                </h2>
                <p className="mt-2.5 text-[15px] leading-[1.6] text-neutral-400">
                  Send it to us and the team will get back to you.{" "}
                  {CONTACT.hours}.
                </p>
                <PrimaryButton href="/contact-us#query" className="mt-6">
                  Ask us
                </PrimaryButton>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="mt-5 flex items-center gap-2 text-[14px] text-neutral-300 transition-colors hover:text-white"
                >
                  <MailIcon aria-hidden className="size-4 text-primary" />
                  {CONTACT.email}
                </a>
              </div>

              <nav
                aria-label="More answers"
                className="reveal rounded-[24px] border border-neutral-200 bg-white p-2"
              >
                <p className="px-4 pt-3 pb-1 text-[13px] font-semibold text-neutral-500">
                  More answers
                </p>
                <ul>
                  {MORE_ANSWERS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group flex items-start justify-between gap-3 rounded-[16px] px-4 py-3 transition-colors hover:bg-neutral-50"
                      >
                        <span>
                          <span className="block font-display text-[16px] font-bold tracking-[-0.02em] text-heading">
                            {item.title}
                          </span>
                          <span className="mt-0.5 block text-[13.5px] leading-snug text-neutral-500">
                            {item.body}
                          </span>
                        </span>
                        <ArrowUpRightIcon
                          aria-hidden
                          className="mt-1 size-4 shrink-0 text-neutral-300 transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
