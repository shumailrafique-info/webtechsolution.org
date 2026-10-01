import type { Metadata } from "next";
import { CONTACT, OFFICES } from "@/components/home/data";
import {
  Accent,
  Container,
  Eyebrow,
  Italic,
} from "@/components/home/primitives";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbList, graph, organizationRef } from "@/lib/seo";
import { ContactForm } from "./_components/contact-form";
import { HEAD_OFFICE_MAP, INTRO } from "./_components/data";

const TITLE = "Contact Us";
const PATH = "/contact-us";

export const metadata: Metadata = pageMetadata({
  absoluteTitle: "Contact Us - Grow Your Business With WebTech Solutions",
  description:
    "WebTech Solutions provides free website audit, content writing, app development, web design and digital marketing services.",
  path: "/contact-us",
  cardTitle: "Let’s talk about your digital growth",
  eyebrow: "Contact us",
});

const schema = graph([
  breadcrumbList([
    { name: "Home", path: "/" },
    { name: TITLE, path: PATH },
  ]),
  { "@type": "ContactPage", name: TITLE, about: organizationRef },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />

      <section
        aria-labelledby="contact-title"
        className="bg-white pt-6 pb-12 md:pb-16"
      >
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: TITLE }]}
            className="mb-0"
          />

          <div className="mt-10 grid items-start gap-10 md:mt-12 md:gap-12 lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-6">
              <Eyebrow className="enter">{INTRO.eyebrow}</Eyebrow>
              <h1
                id="contact-title"
                className="enter mt-6 font-display text-[40px] leading-[1.02] font-bold tracking-[-0.045em] text-balance text-heading sm:text-[52px] lg:text-[58px]"
              >
                {INTRO.title} <Accent>{INTRO.accent}</Accent>
              </h1>
              <p className="enter mt-6 max-w-[56ch] text-[17px] leading-[1.7] text-neutral-600">
                {INTRO.body}
              </p>

              <div className="enter mt-9">
                <p className="text-[13px] font-medium text-neutral-500">
                  Email us
                </p>
                <h2 className="mt-1 font-display text-[22px] font-bold tracking-tight text-heading">
                  Got a question? We&rsquo;re <Italic>happy to help</Italic>
                </h2>
              </div>

              <ul className="enter mt-5 grid gap-3 sm:grid-cols-2">
                <li className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-5">
                  <p className="flex items-center gap-2 text-[13px] font-medium text-neutral-500">
                    <MailIcon aria-hidden className="size-4 text-primary" />
                    Email
                  </p>
                  <div className="mt-2 grid gap-1">
                    {[CONTACT.email, CONTACT.marketingEmail].map((email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="text-[15px] font-semibold wrap-break-word text-heading transition-colors hover:text-brand-deep"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </li>
                <li className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-5">
                  <p className="flex items-center gap-2 text-[13px] font-medium text-neutral-500">
                    <PhoneIcon aria-hidden className="size-4 text-primary" />
                    Phone
                  </p>
                  <div className="mt-2 grid gap-1">
                    {CONTACT.phones.map((phone) => (
                      <a
                        key={phone.href}
                        href={`tel:${phone.href}`}
                        className="flex items-baseline justify-between gap-3 text-[15px] font-semibold text-heading transition-colors hover:text-brand-deep"
                      >
                        {phone.display}
                        <span className="text-[12.5px] font-normal text-neutral-500">
                          {phone.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </li>
                <li className="flex items-center gap-2 rounded-[20px] border border-neutral-200 bg-neutral-50 px-5 py-4 text-[14.5px] text-neutral-600 sm:col-span-2">
                  <ClockIcon aria-hidden className="size-4 text-primary" />
                  {CONTACT.hours}
                  <span className="text-neutral-400">· Sunday closed</span>
                </li>
              </ul>
            </div>

            <ContactForm className="enter lg:sticky lg:top-28 lg:col-span-6" />
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="locations-title"
        className="border-t border-primary/10 bg-brand-tint py-14 md:py-20 lg:py-24"
      >
        <Container>
          <div className="reveal mx-auto max-w-3xl text-center">
            <Eyebrow>Visit us</Eyebrow>
            <h2
              id="locations-title"
              className="mt-5 font-display text-[34px] leading-[1.05] font-bold tracking-[-0.035em] text-heading sm:text-[42px] lg:text-[50px]"
            >
              Our <Accent>locations.</Accent>
            </h2>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OFFICES.map((office, index) => (
              <li
                key={office.city}
                className="reveal flex flex-col rounded-[24px] border border-neutral-200 bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-neutral-500">
                    {office.country}
                  </span>
                  {index === 0 ? (
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[12px] font-semibold text-brand-deep ring-1 ring-primary/20">
                      Head office
                    </span>
                  ) : (
                    <span className="rounded-md bg-heading px-1.5 py-0.5 font-display text-[11.5px] font-bold tracking-[0.04em] text-white">
                      {office.countryCode}
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-[26px] md:mt-8 leading-none font-bold tracking-[-0.035em] text-heading">
                  {office.city}
                </h3>
                <address className="mt-4 flex gap-2 text-[14.5px] leading-[1.6] text-neutral-600 not-italic">
                  <MapPinIcon
                    aria-hidden
                    className="mt-1 size-4 shrink-0 text-primary"
                  />
                  <span>
                    {office.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    {office.postalCode ? (
                      <span className="block">{office.postalCode}</span>
                    ) : null}
                  </span>
                </address>
              </li>
            ))}
          </ul>

          <figure className="reveal mt-6 overflow-hidden rounded-[28px] border border-neutral-200 bg-white p-2">
            <iframe
              title={HEAD_OFFICE_MAP.title}
              src={HEAD_OFFICE_MAP.src}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-90 w-full rounded-[22px] border-0 md:h-110"
            />
            <figcaption className="px-4 py-3 text-[13.5px] text-neutral-500">
              {HEAD_OFFICE_MAP.title} &mdash; {OFFICES[0].lines.join(", ")},{" "}
              {OFFICES[0].city}
            </figcaption>
          </figure>
        </Container>
      </section>
    </>
  );
}
