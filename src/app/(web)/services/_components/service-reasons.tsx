import { Accent, Container } from "@/components/home/primitives";
import { cn } from "@/lib/utils";
import type { Point } from "./data";

export function ServiceReasons({
  name,
  lede,
  items,
}: {
  name: string;
  lede: string;
  items: Point[];
}) {
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
            Why choose WebTech Solutions for{" "}
            <Accent>{name.toLowerCase()}.</Accent>
          </h2>
          <p className="mt-5 text-[16.5px] leading-[1.65] text-neutral-600">
            {lede}
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {items.map((item, index) => (
            <li
              key={item.title}
              className={cn(
                "reveal rounded-[22px] border border-neutral-200 bg-white p-6",
                index < 2 ? "lg:col-span-3" : "lg:col-span-2",
                index === 4 && "sm:col-span-2 lg:col-span-2",
              )}
            >
              <span className="font-display text-[15px] font-bold text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-[19px] leading-snug font-bold tracking-[-0.02em] text-heading">
                {item.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-neutral-600">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
