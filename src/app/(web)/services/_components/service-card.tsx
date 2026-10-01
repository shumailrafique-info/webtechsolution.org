import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";
import { imageOf, type Service, serviceHref } from "./data";

export function ServiceCard({
  service,
  headingLevel: Heading = "h3",
}: {
  service: Service;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <Link
      href={serviceHref(service.slug)}
      className="group flex h-full flex-col rounded-[24px] border border-neutral-200 bg-white p-6 outline-none transition-[border-color,box-shadow] duration-300 hover:border-neutral-300 hover:shadow-[0_20px_45px_-30px_rgba(30,20,10,0.3)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-20 items-center justify-center rounded-[20px] bg-brand-tint ring-1 ring-primary/10">
          <Image
            src={imageOf(service.slug)}
            alt=""
            width={64}
            height={64}
            sizes="64px"
            className="size-16 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
          />
        </span>
        <ArrowUpRightIcon
          aria-hidden
          className="size-5 text-neutral-300 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
        />
      </div>
      <Heading className="mt-6 font-display text-[21px] leading-tight font-bold tracking-tight text-heading transition-colors group-hover:text-brand-deep">
        {service.name}
      </Heading>
      <p className="mt-2 text-[14.5px] leading-[1.6] text-neutral-600">
        {service.summary}
      </p>
    </Link>
  );
}
