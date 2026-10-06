import { TESTIMONIALS } from "./data";
import { Accent, Container, SectionHeading } from "./primitives";

export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section
      aria-labelledby="testimonials-title"
      className="bg-neutral-50 py-14 md:py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          id="testimonials-title"
          eyebrow="Testimonials"
          title={
            <>
              In our clients&rsquo; <Accent>own words.</Accent>
            </>
          }
        />

        <ul className="mt-10 columns-1 gap-4 md:mt-12 md:columns-2 lg:columns-3">
          {TESTIMONIALS.map((item) => (
            <li
              key={`${item.name}-${item.company ?? ""}`}
              className="reveal mb-4 break-inside-avoid"
            >
              <figure className="rounded-[22px] border border-neutral-200 bg-white p-6">
                <figcaption>
                  <p className="font-display text-[17px] font-bold tracking-[-0.02em] text-heading">
                    {item.name}
                  </p>
                  {item.role || item.company ? (
                    <p className="mt-0.5 text-[13.5px] text-neutral-500">
                      {[item.role, item.company].filter(Boolean).join(", ")}
                    </p>
                  ) : null}
                </figcaption>
                <blockquote className="mt-4 text-[15.5px] leading-[1.65] text-neutral-700">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                {item.context ? (
                  <p className="mt-4 text-[13px] text-neutral-400">
                    {item.context}
                  </p>
                ) : null}
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
