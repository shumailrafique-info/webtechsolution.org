import Image from "next/image";
import Link from "next/link";
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  XLogoIcon,
  YoutubeIcon,
} from "@/components/icons";
import { COMPANY_LINKS, RESOURCE_LINKS, SERVICES } from "@/lib/site-nav";

const EMAIL = "info@webtechsolution.org";
const FOUNDED = 2013;

const SOCIAL = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/webtechsolutions7/",
    Icon: FacebookIcon,
  },
  { label: "X", href: "https://x.com/webtechsolutio7", Icon: XLogoIcon },
  {
    label: "Instagram",
    href: "https://www.instagram.com/webtechsolution77/",
    Icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/webtechsolution7",
    Icon: LinkedinIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@webtechsolution9638",
    Icon: YoutubeIcon,
  },
];

const HEADING =
  "text-[12px] font-semibold tracking-[0.08em] text-foreground uppercase";
const LINK =
  "inline-block py-1 text-[14px] text-muted-foreground transition-colors hover:text-primary";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link
              href="/"
              aria-label="WebTech Solutions home"
              className="inline-flex rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Image
                src="/logo.webp"
                alt="WebTech Solutions"
                width={174}
                height={50}
                className="h-10 w-auto"
              />
            </Link>

            <p className="mt-4 max-w-[40ch] text-[14px] leading-relaxed text-muted-foreground">
              Founded in 2013, WebTech Solutions provides app development, SEO
              and digital marketing services to help businesses grow online.
            </p>

            <ul className="mt-5 flex flex-wrap items-center gap-2">
              {SOCIAL.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon aria-hidden className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-company" className="md:col-span-2">
            <h2 id="footer-company" className={HEADING}>
              Company
            </h2>
            <ul className="mt-3 -my-1">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-services" className="md:col-span-3">
            <h2 id="footer-services" className={HEADING}>
              Our Services
            </h2>
            <ul className="mt-3 -my-1">
              {SERVICES.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className={HEADING}>Contact</h2>

            <ul className="mt-3 grid gap-3 text-[14px] text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MailIcon
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-primary"
                />
                <a
                  href={`mailto:${EMAIL}`}
                  className="transition-colors hover:text-primary"
                >
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <ClockIcon
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-primary"
                />
                <span>
                  Mon &ndash; Sat (09:00 &ndash; 05:00)
                  <br />
                  Sunday &ndash;(Closed)
                </span>
              </li>
            </ul>

            <h2 className={`${HEADING} mt-6`}>Resources</h2>
            <ul className="mt-3 -my-1">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-[13px] text-muted-foreground sm:flex-row">
          <p>
            &copy; WebTech Solutions {FOUNDED}&ndash;
            {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
