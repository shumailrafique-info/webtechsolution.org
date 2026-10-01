import Image from "next/image";
import Link from "next/link";
import { CLIENTS, type Client, FOUNDED, PROJECTS_DELIVERED } from "./data";
import {
  Accent,
  Container,
  SecondaryButton,
  SectionHeading,
} from "./primitives";

/**
 * Clients named on the company's case studies page. A card shows only what
 * is on record: the name always, the sector or the work where known, and a
 * project image and link once they are supplied in `CLIENTS`.
 */
export function Clients() {
  return (
    <section
      aria-labelledby="clients-title"
      className="bg-white py-20 md:py-28"
    >
      <Container>
        <SectionHeading
          id="clients-title"
          eyebrow="Selected clients"
          title={
            <>
              Businesses that came to us to be <Accent>found.</Accent>
            </>
          }
          lede={`A few of the ${PROJECTS_DELIVERED} projects delivered since ${FOUNDED.year}, for publishers and businesses across our four markets.`}
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {CLIENTS.map((client) => (
            <li key={client.name} className="reveal">
              <ClientCard client={client} />
            </li>
          ))}
        </ul>

        <div className="reveal mt-10 flex justify-center">
          <SecondaryButton href="/case-studies">
            Read the case studies
          </SecondaryButton>
        </div>
      </Container>
    </section>
  );
}

function ClientCard({ client }: { client: Client }) {
  const body = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-neutral-50 ring-1 ring-neutral-200/70">
        {client.image ? (
          <Image
            src={client.image}
            alt={`${client.name} project`}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          // Until there is a project image, a monogram holds the space.
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,white,transparent_70%)]"
          >
            <span className="bg-linear-to-b from-primary to-brand-deep bg-clip-text font-display text-[64px] leading-none font-bold tracking-[-0.06em] text-transparent">
              {client.name
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </span>
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-3 px-1.5 pt-4 pb-1">
        <div>
          <p className="font-display text-[19px] leading-tight font-bold tracking-[-0.02em] text-heading">
            {client.name}
          </p>
          {client.sector || client.work ? (
            <p className="mt-1 text-[14px] leading-snug text-neutral-600">
              {client.work ?? client.sector}
            </p>
          ) : null}
        </div>
        {client.service ? (
          <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[12px] font-semibold text-brand-deep ring-1 ring-primary/20">
            {client.service}
          </span>
        ) : null}
      </div>
    </>
  );

  const card =
    "group flex h-full flex-col rounded-[22px] border border-neutral-200 bg-white p-2.5 transition-[border-color,box-shadow] duration-300";

  return client.href ? (
    <Link
      href={client.href}
      className={`${card} hover:border-neutral-300 hover:shadow-[0_20px_45px_-30px_rgba(30,20,10,0.3)]`}
    >
      {body}
    </Link>
  ) : (
    <div className={card}>{body}</div>
  );
}
