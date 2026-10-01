import { FOUNDED, FOUNDER, TEAM } from "./data";
import { Accent, ArrowLink, Container, Eyebrow, Italic } from "./primitives";
import { DisciplinesPanel, FounderFeature, TeamCard } from "./team";

export function People() {
  return (
    <section
      aria-labelledby="people-title"
      className="border-y border-primary/10 bg-brand-tint py-20 md:py-28"
    >
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

        <div className="mt-12 md:mt-16">
          <FounderFeature
            footer={
              <p className="mt-6 text-[13.5px] text-neutral-500">
                Writes on the blog as {FOUNDER.formerName}.
              </p>
            }
          >
            <p>
              Fawad founded WebTech Solutions on 1 January {FOUNDED.year} with a
              simple goal: to help businesses use smart digital solutions to
              grow <Italic className="text-heading">with confidence.</Italic>
            </p>
            <p>
              He still leads the team and guides strategy, and works closely
              with clients to make sure every project delivers real value.
            </p>
          </FounderFeature>
        </div>

        {/* The team. */}
        <div className="mt-20 border-t border-primary/15 pt-10 md:mt-24">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <h3 className="font-display text-[26px] leading-tight font-bold tracking-[-0.03em] text-heading md:text-[30px]">
              Alongside <Italic>Fawad</Italic>
            </h3>
            <ArrowLink href="/our-team">Meet the whole team</ArrowLink>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-4 md:gap-x-5">
            {TEAM.map((member) => (
              <li key={member.name} className="reveal">
                <TeamCard member={member} />
              </li>
            ))}
          </ul>
        </div>

        <DisciplinesPanel className="mt-16 md:mt-20" />
      </Container>
    </section>
  );
}
