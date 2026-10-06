import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Brand({
  className,
  size = "md",
}: {
  className?: string;
  size?: "md" | "lg";
}) {
  const height = size === "lg" ? 48 : 40;

  return (
    <Link
      href="/"
      aria-label="WebTech Solutions home"
      className={cn(
        "inline-flex shrink-0 items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <Image
        src="/logo.webp"
        alt="WebTech Solutions"
        width={Math.round(height * 3.475)}
        height={height}
        priority
        className={cn("w-auto", size === "lg" ? "h-12" : "h-10")}
      />
    </Link>
  );
}
