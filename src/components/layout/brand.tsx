import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The wordmark, used where the full header is not present - the sign-in and
 * sign-up pages. A separate file carries the dark-mode colouring; see the
 * note in the header for why a CSS filter will not do.
 */
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
        className={cn("w-auto dark:hidden", size === "lg" ? "h-12" : "h-10")}
      />
      <Image
        src="/logo-dark.webp"
        alt=""
        aria-hidden
        width={Math.round(height * 3.475)}
        height={height}
        priority
        className={cn(
          "hidden w-auto dark:block",
          size === "lg" ? "h-12" : "h-10",
        )}
      />
    </Link>
  );
}
