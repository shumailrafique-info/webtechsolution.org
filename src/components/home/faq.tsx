import Link from "next/link";
import { PRICING } from "@/app/(web)/pricing/_components/data";
import { PlusIcon } from "@/components/icons";
import { CONTACT, OFFICES } from "./data";
import { Accent, Container, Eyebrow, PrimaryButton } from "./primitives";

export type Faq = {
  question: string;
  answer: string;
  link?: { href: string; label: string };
};

export const FAQS: Faq[] = [
  {
    question: "How much does it cost?",
    answer: `Our published plans start with a one-to-one ${PRICING.consultation.name} at ${PRICING.consultation.price}. Monthly plans begin with ${PRICING.launch.name} at ${PRICING.launch.price}, covering a custom website design and SEO maintenance, and the ${PRICING.growth.name} at ${PRICING.growth.price} adds advanced SEO and weekly SEO audits.`,
    link: { href: "/pricing", label: "See the plans" },
  },
  {
    question: "What SEO services do you offer?",
    answer:
      "Keyword research, on-page and technical optimization, link building and content creation, plus local SEO for visibility in regional searches. We run SEO audits to find what is holding a site back, and analytics and reporting keep you informed about progress. The aim is a strategy tailored to your business that drives sustainable growth.",
    link: { href: "/services/seo", label: "About our SEO service" },
  },
  {
    question: "What happens after launch?",
    answer: `Premium support is part of our website plans: ${PRICING.launch.support} with ${PRICING.launch.name} and ${PRICING.growth.support} with the ${PRICING.growth.name}, with a bug-free period of ${PRICING.launch.bugFree} and ${PRICING.growth.bugFree} respectively.`,
  },
  {
    question: "Do you work with businesses outside the United States?",
    answer: `Yes. We have offices in ${OFFICES.map((office) => office.city)
      .join(", ")
      .replace(
        /, ([^,]*)$/,
        " and $1",
      )}, and work with clients in the United States, the United Kingdom, Spain and Pakistan.`,
  },
  {
    question: "When can we reach you?",
    answer: `${CONTACT.hours}. Email ${CONTACT.email}, or call ${CONTACT.phones.map((phone) => `${phone.display} (${phone.label})`).join(" or ")}.`,
    link: { href: "/contact-us", label: "Contact us" },
  },
  {
    question: "Are you hiring?",
    answer:
      "We are always looking for talented people who are passionate about SEO. Email us with your interest, your experience and any relevant projects, along with your CV.",
  },
];

export function Faq() {
  return (
    <section
      aria-labelledby="faq-title"
      className="bg-white py-14 md:py-20 lg:py-24"
    >
      <Container className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:gap-x-12">
        <div className="reveal lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>
          <h2
            id="faq-title"
            className="mt-5 font-display text-[34px] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-heading sm:text-[42px] lg:text-[50px]"
          >
            Questions we get <Accent>a lot.</Accent>
          </h2>
          <p className="mt-5 max-w-[42ch] text-[16.5px] leading-[1.65] text-neutral-600">
            Something else on your mind? Ask us directly &mdash; the first
            conversation is about understanding your business, not selling you a
            package.
          </p>
          <PrimaryButton href="/contact-us" className="mt-8">
            Ask a question
          </PrimaryButton>
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
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-[transform,background-color,color,border-color] duration-300 group-open:rotate-45 group-open:border-transparent group-open:bg-primary group-open:text-white">
                  <PlusIcon aria-hidden className="size-4" />
                </span>
              </summary>
              <div className="-mt-1 pb-7 text-[16px] md:pr-14 leading-[1.7] text-neutral-600">
                <p>{faq.answer}</p>
                {faq.link ? (
                  <Link
                    href={faq.link.href}
                    className="mt-3 inline-block font-semibold text-brand-deep underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
                  >
                    {faq.link.label}
                  </Link>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
