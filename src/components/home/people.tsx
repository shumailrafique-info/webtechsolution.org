import { FOUNDED, FOUNDER, TEAM } from "./data";
import { Accent, ArrowLink, Container, Eyebrow } from "./primitives";
import { DisciplinesPanel, FounderFeature, TeamCard } from "./team";

export function Founder() {
  return (
    <section
      aria-labelledby="founder-title"
      className="border-y border-primary/10 bg-brand-tint py-14 md:py-20 lg:py-24"
    >
      <Container>
        <div className="reveal max-w-3xl">
          <Eyebrow>Leadership</Eyebrow>
          <h2
            id="founder-title"
            className="mt-5 font-display text-[34px] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-heading sm:text-[42px] lg:text-[50px]"
          >
            Led by its founder, <Accent>since day one.</Accent>
          </h2>
        </div>

        <div className="mt-12">
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
              grow{" "}
              <strong className="font-semibold text-heading">
                with confidence.
              </strong>
            </p>
            <p>
              He still leads the team and guides strategy, and works closely
              with clients to make sure every project delivers real value.
            </p>
          </FounderFeature>
        </div>
      </Container>
    </section>
  );
}

export function People() {
  return (
    <section
      aria-labelledby="people-title"
      className="bg-white py-14 md:py-20 lg:py-24"
    >
      <Container>
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <Eyebrow>Team</Eyebrow>
            <h2
              id="people-title"
              className="mt-5 font-display text-[34px] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-heading sm:text-[42px] lg:text-[50px]"
            >
              The people you&rsquo;ll <Accent>actually work with.</Accent>
            </h2>
          </div>
          <ArrowLink href="/our-team">Meet the whole team</ArrowLink>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-4 md:gap-x-5">
          {TEAM.map((member) => (
            <li key={member.name} className="reveal">
              <TeamCard member={member} />
            </li>
          ))}
        </ul>

        <DisciplinesPanel className="mt-12 bg-neutral-50 md:mt-16" />
      </Container>
    </section>
  );
}
