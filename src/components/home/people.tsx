import Image from "next/image";
import { FOUNDED, FOUNDER, TEAM } from "./data";
import { Accent, ArrowLink, Container, Eyebrow, Italic } from "./primitives";

/**
 * The people behind the work.
 *
 * Answers the question a cautious buyer actually has - who will I be dealing
 * with? - with names, faces and roles from the team page. The disciplines
 * line is drawn from those same roles and the services the company sells,
 * which is a more honest signal of capability than a wall of tool logos.
 */

const DISCIPLINES = [
  "Technical SEO",
  "On-page SEO",
  "Google Search Console",
  "Link building & outreach",
  "Content writing & editing",
  "Google Ads & PPC",
  "Social media",
  "Email marketing",
  "Graphic design",
  "Video editing",
  "Web & app development",
];

export function People() {
  return (
    <section aria-labelledby="people-title" className="bg-white py-20 md:py-28">
      <Container>
        <div className="reveal max-w-3xl">
          <Eyebrow>People</Eyebrow>
          <h2
            id="people-title"
            className="mt-5 font-display text-[34px] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-heading sm:text-[42px] lg:text-[50px]"
          >
            The people you&rsquo;ll <Accent>actually work with.</Accent>
          </h2>
        </div>

        {/* Founder. */}
        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:items-end lg:gap-x-14">
          <figure className="reveal-image relative mx-auto aspect-[4/5] w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div className="absolute inset-x-0 top-[16%] bottom-0 rounded-[28px] bg-linear-to-br from-primary to-brand-deep" />
            <Image
              src={FOUNDER.image}
              alt={`${FOUNDER.name}, ${FOUNDER.role} of WebTech Solutions`}
              fill
              sizes="(min-width: 1024px) 38vw, (min-width: 768px) 28rem, 90vw"
              className="rounded-b-[28px] object-contain object-bottom"
            />
          </figure>

          <div className="reveal lg:col-span-7 lg:pb-6">
            <p className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[13px] font-semibold text-brand-deep ring-1 ring-primary/20">
              {FOUNDER.role}
            </p>
            <h3 className="mt-4 font-display text-[40px] leading-[1.02] font-bold tracking-[-0.04em] text-heading md:text-[56px]">
              {FOUNDER.name}
            </h3>
            <div className="mt-6 max-w-[54ch] space-y-5 text-[17px] leading-[1.7] text-neutral-600">
              <p>
                Fawad founded WebTech Solutions on 1 January {FOUNDED.year} with
                a simple goal: to help businesses use smart digital solutions to
                grow <Italic className="text-heading">with confidence.</Italic>
              </p>
              <p>
                He still leads the team and guides strategy, and works closely
                with clients to make sure every project delivers real value.
              </p>
            </div>
            <p className="mt-6 text-[13.5px] text-neutral-500">
              Writes on the blog as {FOUNDER.formerName}.
            </p>
          </div>
        </div>

        {/* The team. */}
        <div className="mt-20 border-t border-neutral-200 pt-10 md:mt-24">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <h3 className="font-display text-[26px] leading-tight font-bold tracking-[-0.03em] text-heading md:text-[30px]">
              Alongside <Italic>Fawad</Italic>
            </h3>
            <ArrowLink href="/our-team">Meet the whole team</ArrowLink>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-4 md:gap-x-5">
            {TEAM.map((member) => (
              <li key={member.name} className="reveal group">
                <div className="relative aspect-[6/7] overflow-hidden rounded-[20px] bg-neutral-100">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    sizes="(min-width: 768px) 22vw, 45vw"
                    // One photographic treatment makes portraits from
                    // different shoots read as one team; colour on hover.
                    className="object-cover grayscale-[0.85] contrast-[1.05] transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                </div>
                <p className="mt-4 font-display text-[17px] font-bold tracking-[-0.02em] text-heading">
                  {member.name}
                </p>
                <p className="mt-1 text-[13.5px] leading-snug text-neutral-500">
                  {member.role}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Disciplines, from the roles above and the services offered. */}
        <div className="reveal mt-16 rounded-[24px] border border-neutral-200 bg-neutral-50 p-6 md:mt-20 md:p-8 lg:flex lg:items-start lg:gap-10">
          <h3 className="shrink-0 font-display text-[19px] font-bold tracking-[-0.02em] text-heading lg:w-52 lg:pt-1.5">
            Disciplines <Italic>in-house</Italic>
          </h3>
          <ul className="mt-5 flex flex-wrap gap-2 lg:mt-0">
            {DISCIPLINES.map((discipline) => (
              <li
                key={discipline}
                className="rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-[14px] font-medium text-neutral-700"
              >
                {discipline}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
