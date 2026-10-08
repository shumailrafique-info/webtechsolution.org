import Image from "next/image";
import Link from "next/link";
import { CONTACT, FOUNDED } from "@/components/home/data";
import { Container } from "@/components/home/primitives";
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  XLogoIcon,
  YoutubeIcon,
} from "@/components/icons";
import {
  COMPANY_LINKS,
  MARKETING,
  type NavLink,
  RESOURCE_LINKS,
  SERVICES,
} from "@/lib/site-nav";
import { cn } from "@/lib/utils";

const SOCIAL = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/webtechsolutions7/",
    Icon: FacebookIcon,
    color: "bg-[#1877F2]",
  },
  {
    label: "X",
    href: "https://x.com/webtechsolutio7",
    Icon: XLogoIcon,
    color: "bg-black ring-1 ring-white/25",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/webtechsolution77/",
    Icon: InstagramIcon,
    color:
      "bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/webtechsolution7",
    Icon: LinkedinIcon,
    color: "bg-[#0A66C2]",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@webtechsolution9638",
    Icon: YoutubeIcon,
    color: "bg-[#FF0000]",
  },
];

const COLUMNS: { id: string; title: string; links: NavLink[] }[] = [
  { id: "footer-company", title: "Company", links: COMPANY_LINKS },
  { id: "footer-services", title: "Services", links: SERVICES },
  { id: "footer-marketing", title: "Digital marketing", links: MARKETING },
  { id: "footer-resources", title: "Resources", links: RESOURCE_LINKS },
];

function ColumnTitle({ id, children }: { id?: string; children: string }) {
  return (
    <h2
      id={id}
      className="flex items-center gap-2 font-display text-[15px] font-bold tracking-[-0.01em] text-white"
    >
      <span aria-hidden className="size-1.5 rounded-full bg-primary" />
      {children}
    </h2>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-neutral-200/80 bg-[#17172f]">
      <Container className="pt-14 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label="WebTech Solutions home"
              className="inline-flex rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Image
                src="/logo-on-dark.webp"
                alt="WebTech Solutions"
                width={174}
                height={50}
                className="h-11 w-auto"
              />
            </Link>

            <p className="mt-5 max-w-[38ch] text-[15px] leading-[1.7] text-[#b8b8b8]">
              Since {FOUNDED.year}, one in-house team planning, building and
              marketing the online presence of growing businesses.
            </p>

            <ul className="mt-6 flex flex-wrap items-center gap-2">
              {SOCIAL.map(({ label, href, Icon, color }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className={cn(
                      "grid size-10 place-items-center rounded-full text-white transition-[transform,filter] duration-200 hover:-translate-y-0.5 hover:brightness-110",
                      color,
                    )}
                  >
                    <Icon aria-hidden className="size-5.5" />
                  </a>
                </li>
              ))}
            </ul>

            <ul className="mt-8 grid gap-2.5 text-[14.5px] text-[#b8b8b8]">
              <li className="flex items-start gap-2.5">
                <MailIcon
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-primary"
                />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="min-w-0 font-medium transition-colors wrap-anywhere hover:text-primary"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MailIcon
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-primary"
                />
                <a
                  href={`mailto:${CONTACT.marketingEmail}`}
                  className="min-w-0 transition-colors wrap-anywhere hover:text-primary"
                >
                  {CONTACT.marketingEmail}
                </a>
              </li>
              {CONTACT.phones.map((phone) => (
                <li key={phone.href} className="flex items-start gap-2.5">
                  <PhoneIcon
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-primary"
                  />
                  <a
                    href={`tel:${phone.href}`}
                    className="transition-colors hover:text-primary text-[#b8b8b8]"
                  >
                    <span className="font-medium ">{phone.display}</span>{" "}
                    <span className="text-white">({phone.label})</span>
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-2.5">
                <ClockIcon
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-primary"
                />
                <span>
                  {CONTACT.hours}
                  <br />
                  Sunday closed
                </span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            {COLUMNS.map((column) => (
              <nav key={column.id} aria-labelledby={column.id}>
                <ColumnTitle id={column.id}>{column.title}</ColumnTitle>
                <ul className="mt-4 grid gap-0.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-block py-1 text-[14.5px] text-[#b8b8b8] transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </Container>

      <Container>
        <p
          aria-hidden
          className="mt-8 mb-[-0.2em] bg-linear-to-b from-neutral-300/90 to-neutral-300/0 bg-clip-text text-center font-display text-[22vw] leading-[0.9] font-bold tracking-[-0.06em] text-transparent select-none md:mt-6 xl:text-[250px]"
        >
          WebTech
        </p>
      </Container>

      <div className="relative border-t border-neutral-200/20 bg-[#17172f]">
        <Container className="flex flex-col items-center justify-center sm:justify-between gap-3 py-6 text-[13.5px] text-neutral-200 sm:flex-row">
          <p className="text-center sm:text-left">
            &copy; {FOUNDED.year}&ndash;{new Date().getFullYear()} WebTech
            Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-white hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="transition-colors hover:text-white hover:underline"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
