import { Accent, ArrowLink, Container } from "@/components/home/primitives";
import { GROUPS, groupLabel, type ServiceGroup, servicesIn } from "./data";
import { ServiceCard } from "./service-card";

export function MoreServices({
  group,
  current,
}: {
  group: ServiceGroup;
  current: string;
}) {
  const label = groupLabel(group).toLowerCase();
  const siblings = servicesIn(group)
    .filter((item) => item.slug !== current)
    .slice(0, 3);

  if (siblings.length === 0) return null;

  return (
    <section
      aria-labelledby="siblings-title"
      className="bg-white pt-12 md:pt-16"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="siblings-title"
            className="font-display text-[30px] leading-tight font-bold tracking-[-0.035em] text-heading md:text-[38px]"
          >
            More in <Accent>{label}.</Accent>
          </h2>
          <ArrowLink href={GROUPS[group].href}>All {label}</ArrowLink>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siblings.map((item) => (
            <li key={item.slug}>
              <ServiceCard service={item} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
