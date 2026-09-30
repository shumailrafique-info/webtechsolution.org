import { Faq, FaqEntry } from "@/components/page-content/faq";
import { faqHeading, parseFaqs } from "@/lib/page-content";
import { getPageContent } from "@/server/page-content";

export async function PageFaq({ slug }: { slug: string }) {
  const content = await getPageContent(slug);
  const faqs = parseFaqs(content?.faqs);

  if (faqs.length === 0) {
    return null;
  }

  return (
    <Faq title={faqHeading(slug)}>
      {faqs.map((faq) => (
        <FaqEntry key={faq.question} question={faq.question}>
          {faq.answer}
        </FaqEntry>
      ))}
    </Faq>
  );
}
