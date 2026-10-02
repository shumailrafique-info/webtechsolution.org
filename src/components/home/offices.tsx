import { ClockIcon, MapPinIcon } from "@/components/icons";
import { OFFICES } from "./data";
import { Accent, Container, SectionHeading } from "./primitives";

/** The four offices, with addresses exactly as the company publishes them. */
export function Offices() {
  return (
    <section
      aria-labelledby="offices-title"
      className="bg-neutral-50 py-14 md:py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          id="offices-title"
          eyebrow="Where we work"
          title={
            <>
              Four offices. Clients on <Accent>three continents.</Accent>
            </>
          }
          lede="One team working across the United States, the United Kingdom, Spain and Pakistan."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
          {OFFICES.map((office) => (
            <li
              key={office.city}
              className="reveal flex flex-col rounded-[24px] border border-neutral-200 bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-neutral-500">
                  {office.country}
                </span>
                <span className="rounded-md bg-heading px-1.5 py-0.5 font-display text-[11.5px] font-bold tracking-[0.04em] text-white">
                  {office.countryCode}
                </span>
              </div>
              <h3 className="mt-5 font-display md:mt-8 text-[28px] leading-none font-bold tracking-[-0.035em] text-heading">
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
              <p className="mt-auto flex items-center gap-1.5 pt-4 text-[13px] md:pt-6 font-medium text-neutral-500">
                <ClockIcon aria-hidden className="size-3.5" />
                {office.timezone}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
