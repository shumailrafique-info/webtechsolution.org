import Image from "next/image";
import type { CSSProperties } from "react";
import { PRESS } from "./data";
import { Container } from "./primitives";

export function Press() {
  const logos = (copy: boolean) => (
    <ul
      aria-hidden={copy || undefined}
      className={
        copy
          ? "marquee-copy flex shrink-0 items-center gap-14 pr-14"
          : "flex shrink-0 items-center gap-14 pr-14"
      }
    >
      {PRESS.map((outlet) => (
        <li key={outlet.name} className="relative h-7 w-28 shrink-0">
          <Image
            src={outlet.logo}
            alt={copy ? "" : outlet.name}
            fill
            sizes="112px"
            className="object-contain  mix-blend-multiply  transition duration-300 hover:opacity-100 hover:grayscale-0"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-labelledby="press-title"
      className="bg-white py-12 md:py-14 border-y"
    >
      <Container>
        <h2
          id="press-title"
          className="text-center text-[13.5px] font-medium text-neutral-500"
        >
          As featured in
        </h2>
      </Container>
      <div
        className="marquee mt-7 overflow-hidden mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        style={{ "--marquee-duration": "45s" } as CSSProperties}
      >
        <div className="marquee-track flex w-max">
          {logos(false)}
          {logos(true)}
        </div>
      </div>
    </section>
  );
}
