import { Accent, Container, IconBadge } from "@/components/home/primitives";
import {
  CompassIcon,
  RocketIcon,
  StrategyIcon,
  WrenchIcon,
} from "@/components/icons";
import type { Point } from "./data";

const PILLAR_ICONS = [CompassIcon, StrategyIcon, RocketIcon, WrenchIcon];

export function ServicePillars({ pillars }: { pillars: Point[] }) {
  return (
    <section
      aria-labelledby="pillars-title"
      className="border-y border-primary/10 bg-brand-tint py-14 md:py-20"
    >
      <Container>
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2
            id="pillars-title"
            className="font-display text-[32px] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-heading sm:text-[40px]"
          >
            How we <Accent>deliver.</Accent>
          </h2>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <li
              key={pillar.title}
              className="reveal rounded-[22px] border border-neutral-200 bg-white p-6"
            >
              <IconBadge icon={PILLAR_ICONS[index % PILLAR_ICONS.length]} />
              <h3 className="mt-5 font-display text-[19px] font-bold tracking-[-0.02em] text-heading">
                {pillar.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-neutral-600">
                {pillar.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
