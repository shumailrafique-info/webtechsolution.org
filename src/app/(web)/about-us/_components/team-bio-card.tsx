import Image from "next/image";
import type { TeamMember } from "@/components/home/data";

export function TeamBioCard({ member }: { member: TeamMember }) {
  return (
    <article className="group flex h-full gap-4 overflow-hidden rounded-[24px] border border-neutral-200 bg-white p-3 transition-[border-color,box-shadow] duration-300 hover:border-neutral-300 hover:shadow-[0_20px_45px_-30px_rgba(30,20,10,0.3)] sm:flex-col sm:gap-0 sm:p-0">
      <div className="relative aspect-4/5 w-24 shrink-0 self-start overflow-hidden rounded-[16px] bg-neutral-100 sm:aspect-6/5 sm:w-full sm:rounded-none">
        <Image
          src={member.image}
          alt={`${member.name}, ${member.role}`}
          fill
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 96px"
          className="object-cover object-[50%_25%] grayscale-[0.85] contrast-[1.05] transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col py-1 pr-2 sm:p-5">
        <h3 className="font-display text-[17px] font-bold tracking-[-0.02em] text-heading sm:text-[18px]">
          {member.name}
        </h3>
        <p className="mt-0.5 text-[13px] font-medium text-brand-deep sm:text-[13.5px]">
          {member.role}
        </p>
        {member.bio ? (
          <p className="mt-2 text-[13.5px] leading-[1.55] text-neutral-600 sm:mt-3 sm:text-[14px] sm:leading-[1.6]">
            {member.bio}
          </p>
        ) : null}
      </div>
    </article>
  );
}
