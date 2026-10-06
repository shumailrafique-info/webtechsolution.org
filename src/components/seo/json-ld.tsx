import type { Thing, WithContext } from "@/lib/seo";

export function JsonLd({ data }: { data: WithContext<Thing> | Thing }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
