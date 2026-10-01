import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

const TITLE = "Link Building";
const PATH = "/services/link-building";

export const metadata: Metadata = {
  title: TITLE,
  alternates: { canonical: PATH },
  // Nothing here yet, so keep it out of the index until it is written.
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <PlaceholderPage
      title={TITLE}
      path={PATH}
      parent={{ label: "Our Services", href: "/services" }}
    />
  );
}
