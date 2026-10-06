import { cn } from "@/lib/utils";
import { FOUNDED, OFFICES, PRESS, PROJECTS_DELIVERED } from "./data";
import { Container } from "./primitives";

export function Stats() {
  const figures = [
    { value: String(FOUNDED.year), label: "Established" },
    { value: PROJECTS_DELIVERED, label: "Clients Served" },
    { value: String(OFFICES.length), label: "Global Offices" },
    { value: String(PRESS.length), label: "Years of Experience." },
  ];

  return (
    <section
      aria-label="WebTech Solutions in figures"
      className="border-y border-neutral-200/70 bg-neutral-50"
    >
      <Container>
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {figures.map((figure, index) => (
            <div
              key={figure.label}
              className={cn(
                "reveal flex flex-col items-center border-neutral-200/70 px-3 py-9 text-center md:py-12",
                index % 2 === 1 && "border-l",
                index < 2 && "border-b lg:border-b-0",
                index === 2 && "lg:border-l",
              )}
            >
              <dt className="order-2 mt-2 text-[14px] text-neutral-600">
                {figure.label}
              </dt>
              <dd className="order-1 bg-linear-to-b from-primary to-brand-deep bg-clip-text font-display text-[44px] leading-none font-bold tracking-[-0.04em] text-transparent md:text-[56px]">
                {figure.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
