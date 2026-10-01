import { ClockIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { CONTACT } from "./data";
import { Container, Italic, PrimaryButton } from "./primitives";

export function FinalCta() {
  return (
    <section
      aria-labelledby="contact-title"
      className="bg-white pt-4 pb-4 md:pb-6"
    >
      <Container>
        <div className="reveal relative overflow-hidden rounded-[32px] bg-heading px-6 py-6 sm:px-8 sm:py-8 text-white">
          {/* A single warm light from the corner, nothing more. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_100%_100%,color-mix(in_oklch,var(--primary)_28%,transparent),transparent_55%)]"
          />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-x-12">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[13px] font-medium text-neutral-300">
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-primary"
                />
                Contact
              </p>
              <h2
                id="contact-title"
                className="mt-6 font-display text-[38px] leading-[1.02] font-bold tracking-[-0.04em] sm:text-[48px] lg:text-[60px]"
              >
                Have a project in mind? Let&rsquo;s talk about{" "}
                <Italic className="font-medium text-primary">
                  what you&rsquo;re building.
                </Italic>
              </h2>
              <p className="mt-6 max-w-[48ch] text-[17px] leading-[1.7] text-neutral-400">
                Tell us where the business is today and where you want it to be.
              </p>
              <PrimaryButton href="/contact-us" className="mt-9">
                Start a project
              </PrimaryButton>
            </div>

            <ul className="grid gap-3 lg:col-span-5">
              <li className="rounded-[20px] border border-white/10 bg-white/4 p-5">
                <p className="flex items-center gap-2 text-[13px] font-medium text-neutral-400">
                  <MailIcon aria-hidden className="size-4 text-primary" />
                  Email
                </p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="mt-2 block font-display text-[18px] font-semibold tracking-[-0.02em] wrap-break-word transition-colors hover:text-primary sm:text-[21px] md:text-[23px]"
                >
                  {CONTACT.email}
                </a>
                <a
                  href={`mailto:${CONTACT.marketingEmail}`}
                  className="mt-1 block text-[14.5px] wrap-break-word text-neutral-400 transition-colors hover:text-white"
                >
                  {CONTACT.marketingEmail}
                </a>
              </li>
              <li className="rounded-[20px] border border-white/10 bg-white/4 p-5">
                <p className="flex items-center gap-2 text-[13px] font-medium text-neutral-400">
                  <PhoneIcon aria-hidden className="size-4 text-primary" />
                  Phone
                </p>
                <div className="mt-2 grid gap-1.5">
                  {CONTACT.phones.map((phone) => (
                    <a
                      key={phone.href}
                      href={`tel:${phone.href}`}
                      className="flex items-baseline justify-between gap-4 text-[16.5px] font-medium transition-colors hover:text-primary"
                    >
                      {phone.display}
                      <span className="text-[13px] font-normal text-neutral-500">
                        {phone.label}
                      </span>
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-2 px-1 text-[14px] text-neutral-400">
                <ClockIcon aria-hidden className="size-4 text-primary" />
                {CONTACT.hours}
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
