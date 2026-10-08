import { Container } from "@/components/home/primitives";

export function ServiceImportance({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <section
      aria-labelledby="importance-title"
      className="bg-white pt-14 md:pt-20"
    >
      <Container>
        <div className="reveal grid gap-8 rounded-[28px] bg-heading p-8 text-white md:grid-cols-[1fr_1.5fr] md:items-start md:p-12">
          <h2
            id="importance-title"
            className="font-display text-[30px] leading-[1.05] font-bold tracking-[-0.035em] text-balance md:text-[38px]"
          >
            {title}
          </h2>
          <p className="text-[17px] leading-[1.75] text-neutral-300 md:text-[18px]">
            {body}
          </p>
        </div>
      </Container>
    </section>
  );
}
