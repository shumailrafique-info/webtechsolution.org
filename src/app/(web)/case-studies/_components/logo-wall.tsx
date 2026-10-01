import Image from "next/image";
import { cn } from "@/lib/utils";
import { CLIENT_LOGOS } from "./data";

export function LogoWall({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6",
        className,
      )}
    >
      {CLIENT_LOGOS.map((client) => (
        <li
          key={client.name}
          className="group flex h-24 items-center justify-center rounded-[18px] border border-neutral-200 bg-white px-5 transition-[border-color,box-shadow] duration-300 hover:border-neutral-300 hover:shadow-[0_14px_30px_-22px_rgba(30,20,10,0.35)]"
        >
          <Image
            src={client.logo.src}
            alt={client.name}
            width={client.logo.width}
            height={client.logo.height}
            sizes="160px"
            className="h-auto max-h-11 w-auto max-w-full object-contain opacity-80 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
          />
        </li>
      ))}
    </ul>
  );
}
