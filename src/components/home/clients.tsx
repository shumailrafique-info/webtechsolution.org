import { StudyCard } from "@/app/(web)/case-studies/_components/case-study-cards";
import { CASE_STUDIES } from "@/app/(web)/case-studies/_components/data";
import { FOUNDED, PROJECTS_DELIVERED } from "./data";
import {
  Accent,
  Container,
  SecondaryButton,
  SectionHeading,
} from "./primitives";

export function Clients() {
  return (
    <section
      aria-labelledby="clients-title"
      className="bg-white py-14 md:py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          id="clients-title"
          eyebrow="Selected work"
          title={
            <>
              Businesses that came to us to be <Accent>found.</Accent>
            </>
          }
          lede={`A few of the ${PROJECTS_DELIVERED} projects delivered since ${FOUNDED.year}, for publishers and businesses across our four markets.`}
        />

        <div className="mt-10 grid gap-4 md:mt-12">
          <ul className="grid gap-4 md:grid-cols-3">
            {CASE_STUDIES.slice(0, 3).map((study) => (
              <li key={study.slug} className="reveal">
                <StudyCard study={study} />
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal mt-10 flex justify-center">
          <SecondaryButton href="/case-studies">
            Read the case studies
          </SecondaryButton>
        </div>
      </Container>
    </section>
  );
}
