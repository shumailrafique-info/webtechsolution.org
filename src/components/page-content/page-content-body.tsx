import { BLOG_PROSE } from "@/lib/blogProse";
import { prepareProseHtml } from "@/lib/prose-html";
import { cn } from "@/lib/utils";
import { getPageContent } from "@/server/page-content";

export async function PageContentBody({
  slug,
  framed = true,
}: {
  slug: string;
  framed?: boolean;
}) {
  const content = await getPageContent(slug);

  if (!content?.html) {
    return null;
  }

  return (
    <section
      className={cn(
        BLOG_PROSE,
        framed && "rounded-lg border border-border bg-card p-6 sm:p-8",
      )}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: stored HTML from the admin editor
      dangerouslySetInnerHTML={{ __html: prepareProseHtml(content.html).html }}
    />
  );
}
