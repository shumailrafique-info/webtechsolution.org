import Link from "next/link";
import { Brand } from "@/components/layout/brand";
import { cn } from "@/lib/utils";

const HEADER_LINKS = [
  { label: "Blog", href: "/blog", compact: true },
  { label: "Privacy Policy", href: "/privacy-policy", compact: false },
  { label: "Terms", href: "/terms-and-conditions", compact: false },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-4">
        <Brand />
        <nav
          aria-label="Main"
          className="ml-auto flex min-w-0 items-center gap-0.5 sm:gap-1"
        >
          {HEADER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-2.5 py-2 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:px-3",
                !link.compact && "hidden sm:inline-block",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
