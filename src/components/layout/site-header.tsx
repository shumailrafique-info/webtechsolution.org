"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchDrawer } from "@/app/(web)/search/_components/search-drawer";
import { ChevronDownIcon, MenuIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MAIN_NAV, type NavItem } from "@/lib/site-nav";
import { cn } from "@/lib/utils";

function Brand({ className }: { className?: string }) {
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
        width={174}
        height={50}
        priority
        className="h-10 w-auto"
      />
    </Link>
  );
}

function DesktopItem({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const linkClass = cn(
    "rounded-full px-3 py-1.5 text-[14.5px] font-medium transition-colors",
    active
      ? "text-primary"
      : "text-foreground/80 hover:bg-accent hover:text-accent-foreground",
  );

  if (!item.children) {
    return (
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={linkClass}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <button
            type="button"
            className={cn(linkClass, "inline-flex items-center gap-1")}
          >
            {item.label}
            <ChevronDownIcon aria-hidden className="size-3.5" />
          </button>
        }
      />
      <PopoverContent
        align="start"
        className="w-fit rounded-2xl! p-2 space-y-0 gap-0"
      >
        <Link
          href={item.href}
          onClick={close}
          className="block rounded-full px-3 py-2 text-[14px] text-foreground/85 transition-colors hover:text-accent-foreground hover:bg-accent"
        >
          All {item.label} <span aria-hidden>&rarr;</span>
        </Link>

        <ul className="grid gap-0.5">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={close}
                className="block rounded-full px-3 py-2 text-[14px] text-foreground/85 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

function MobileItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <li>
        <SheetClose
          nativeButton={false}
          render={
            <Link
              href={item.href}
              className="block rounded-md px-2 py-2.5 text-[15px] font-medium text-foreground transition-colors hover:bg-accent"
            />
          }
        >
          {item.label}
        </SheetClose>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-md px-2 py-2.5 text-[15px] font-medium text-foreground transition-colors hover:bg-accent"
      >
        {item.label}
        <ChevronDownIcon
          aria-hidden
          className={cn("size-4 transition-transform", open && "rotate-180")}
        />
      </button>

      {open ? (
        <ul className="mt-0.5 mb-1 ml-2 border-l border-border pl-3">
          <li>
            <SheetClose
              nativeButton={false}
              render={
                <Link
                  href={item.href}
                  className="block rounded-md px-2 py-2 text-[13px] font-semibold text-primary transition-colors hover:bg-accent"
                />
              }
            >
              All {item.label}
            </SheetClose>
          </li>
          {item.children.map((child) => (
            <li key={child.href}>
              <SheetClose
                nativeButton={false}
                render={
                  <Link
                    href={child.href}
                    className="block rounded-md px-2 py-2 text-[14px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  />
                }
              >
                {child.label}
              </SheetClose>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md transition-shadow",
        scrolled ? "border-border shadow-sm" : "border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 pr-4 pl-1 py-3">
        <Brand />

        <nav
          aria-label="Main"
          className="ml-auto hidden items-center gap-0.5 lg:flex"
        >
          {MAIN_NAV.map((item) => (
            <DesktopItem
              key={item.href}
              item={item}
              active={isActive(item.href)}
            />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <SearchDrawer />
          <Button
            nativeButton={false}
            render={<Link href="/contact-us" />}
            className="hidden sm:inline-flex bg-linear-to-br from-primary to-brand-deep rounded-full! py-2.5 h-fit px-5"
          >
            Get In Touch
          </Button>

          <Sheet>
            <SheetTrigger
              aria-label="Open menu"
              className="inline-flex items-center justify-center rounded-md p-2 text-foreground transition-colors hover:bg-accent lg:hidden"
            >
              <MenuIcon aria-hidden className="size-5" />
            </SheetTrigger>

            <SheetContent side="right" className="w-[20rem]">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <Brand />
              </div>

              <nav
                aria-label="Mobile"
                className="no-scrollbar overflow-y-auto px-3 py-4"
              >
                <ul className="grid">
                  {MAIN_NAV.map((item) => (
                    <MobileItem key={item.href} item={item} />
                  ))}
                </ul>

                <SheetClose
                  nativeButton={false}
                  render={
                    <Link
                      href="/contact-us"
                      className="mt-4 flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-[14px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    />
                  }
                >
                  Get In Touch
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
