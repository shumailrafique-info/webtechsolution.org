import { CheckIcon, SearchIcon, XIcon } from "@/components/icons";
import { Accent, Container, Italic, SectionHeading } from "./primitives";

/**
 * Problem, approach, solution, outcome. The drawing in the middle is a search
 * results page - the place the whole engagement is trying to change - with
 * the starting point on one side and the goal on the other.
 */

const PROBLEMS = [
  "Buried below competitors",
  "Traffic that doesn’t convert",
  "A site search engines struggle to read",
];

const GOALS = [
  "Found on the searches that bring customers",
  "Visitors with a clear next step",
  "Progress reported in plain language",
];

const STAGES = [
  {
    label: "Problem",
    title: "The right customers can’t find you.",
    body: "Rankings slipping, traffic that doesn’t convert, or a site search engines struggle to read. Usually it is several at once.",
  },
  {
    label: "Approach",
    title: "Audit before acting.",
    body: "A full audit of technical health, content, links and competitors, so the plan rests on evidence rather than guesswork.",
  },
  {
    label: "Solution",
    title: "Fix the foundations, then grow.",
    body: "Technical and on-page fixes first, then content and link building that compound over time, with local search where it matters.",
  },
  {
    label: "Outcome",
    title: "Progress you can see.",
    body: "Regular reporting on rankings and traffic, explained in plain language, so you always know what changed and why.",
  },
];

export function Approach() {
  return (
    <section
      aria-labelledby="approach-title"
      className="overflow-hidden bg-white py-14 md:py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          id="approach-title"
          eyebrow="How we think"
          title={
            <>
              Your business is good.
              <br />
              Your <Accent>visibility</Accent> isn&rsquo;t.
            </>
          }
          lede="Customers search before they buy. When they can’t find you, they find someone else — and you never hear about it. We start with that business problem, not with a deliverable."
        />

        {/* Before and after, around the page they both happen on. */}
        <div className="relative mx-auto mt-10 max-w-5xl md:mt-12">
          <div className="grid items-center gap-4 lg:grid-cols-[1fr_1.35fr_1fr] lg:gap-0">
            <div className="reveal relative z-20 order-2 rounded-[20px] border border-neutral-200 bg-white p-6 shadow-[0_18px_40px_-28px_rgba(30,20,10,0.35)] lg:order-1 lg:-mr-6 lg:translate-y-6">
              <p className="font-display text-[19px] leading-tight font-semibold tracking-[-0.02em] text-heading">
                Where most businesses start
              </p>
              <ul className="mt-4 grid gap-2.5">
                {PROBLEMS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[14.5px] leading-snug text-neutral-600"
                  >
                    <XIcon
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-neutral-400"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <SearchSketch />

            <div className="reveal relative z-20 order-3 rounded-[20px] bg-linear-to-br from-primary to-brand-deep p-6 text-white shadow-[0_24px_50px_-28px_rgba(180,60,10,0.7)] lg:-ml-6 lg:-translate-y-6">
              <p className="font-display text-[19px] leading-tight font-semibold tracking-[-0.02em]">
                Where we <Italic>take it</Italic>
              </p>
              <ul className="mt-4 grid gap-2.5">
                {GOALS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[14.5px] leading-snug text-white/90"
                  >
                    <span className="mt-px flex size-4 shrink-0 items-center justify-center rounded-full bg-white text-brand-deep">
                      <CheckIcon aria-hidden className="size-2.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* The four stages, in order. */}
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {STAGES.map((stage, index) => (
            <li
              key={stage.label}
              className="reveal relative rounded-[20px] border border-neutral-200 bg-neutral-50/60 p-6"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 items-center justify-center rounded-full bg-heading font-display text-[13px] font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-[13px] font-semibold tracking-[0.02em] text-brand-deep uppercase">
                  {stage.label}
                </span>
              </div>
              <h3 className="mt-5 font-display text-[20px] leading-[1.15] font-bold tracking-[-0.025em] text-heading">
                {stage.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-[1.6] text-neutral-600">
                {stage.body}
              </p>
            </li>
          ))}
        </ol>
        <p className="reveal mt-6 text-center text-[13.5px] text-neutral-500">
          How a typical search engagement runs. Website and campaign work
          follows the same principle: understand the goal first.
        </p>
      </Container>
    </section>
  );
}

/** A search results page with one result lifted to the top. */
function SearchSketch() {
  return (
    <div
      aria-hidden
      className="reveal relative z-10 order-1 mx-auto w-full max-w-md rounded-[22px] border border-neutral-200 bg-white p-4 shadow-[0_40px_80px_-40px_rgba(30,20,10,0.45)] lg:order-2 lg:max-w-none"
    >
      <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-2.5">
        <SearchIcon className="size-4 text-neutral-400" />
        <span className="h-1.5 w-32 rounded-full bg-neutral-300" />
      </div>

      <div className="mt-4 rounded-xl border border-primary/30 bg-primary/[0.06] p-3.5">
        <div className="flex items-center gap-2">
          <span className="size-4 rounded-full bg-linear-to-br from-primary to-brand-deep" />
          <span className="text-[12px] font-semibold text-brand-deep">
            Your business
          </span>
          <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-[10.5px] font-semibold text-brand-deep ring-1 ring-primary/25">
            Top result
          </span>
        </div>
        <span className="mt-2.5 block h-2 w-4/5 rounded-full bg-brand-deep/70" />
        <span className="mt-2 block h-1.5 w-full rounded-full bg-primary/20" />
        <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-primary/20" />
      </div>

      {[0, 1, 2].map((row) => (
        <div
          key={row}
          className="border-b border-neutral-100 px-3.5 py-3 last:border-0"
        >
          <div className="flex items-center gap-2">
            <span className="size-3.5 rounded-full bg-neutral-200" />
            <span className="h-1.5 w-16 rounded-full bg-neutral-200" />
          </div>
          <span className="mt-2 block h-2 w-3/5 rounded-full bg-neutral-300" />
          <span className="mt-1.5 block h-1.5 w-11/12 rounded-full bg-neutral-100" />
        </div>
      ))}
    </div>
  );
}
