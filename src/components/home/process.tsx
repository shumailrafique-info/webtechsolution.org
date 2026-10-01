import type { ComponentType } from "react";
import { PRICING } from "@/app/(web)/pricing/_components/data";
import {
  CheckIcon,
  CodeIcon,
  CompassIcon,
  LifebuoyIcon,
  PencilRulerIcon,
  RocketIcon,
  StrategyIcon,
} from "@/components/icons";
import {
  Accent,
  Container,
  IconBadge,
  Italic,
  SectionHeading,
} from "./primitives";

type Step = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  accent: string;
  body: string;
  tasks: string[];
  output: string;
};

const STEPS: Step[] = [
  {
    icon: CompassIcon,
    title: "Discover &",
    accent: "understand",
    body: "We start with the business: who your customers are, what they search for, and what a good result looks like to you.",
    tasks: ["Your goals", "Your customers", "Your competitors"],
    output: "A clear brief",
  },
  {
    icon: StrategyIcon,
    title: "Plan &",
    accent: "agree",
    body: "Scope, priorities and timeline agreed with you before work begins, so you know what is being built and when.",
    tasks: ["Scope", "Priorities", "Timeline"],
    output: "An agreed plan",
  },
  {
    icon: PencilRulerIcon,
    title: "Design &",
    accent: "review",
    body: "Structure and layouts shaped around how your customers make decisions, reviewed with you before development starts.",
    tasks: ["Structure", "Layouts", "Your feedback"],
    output: "An approved design",
  },
  {
    icon: CodeIcon,
    title: "Build &",
    accent: "optimise",
    body: "Development and optimisation by the same team that planned it, so search is built in rather than added later.",
    tasks: ["Development", "On-page SEO", "Testing"],
    output: "Ready to launch",
  },
  {
    icon: RocketIcon,
    title: "Launch &",
    accent: "index",
    body: "Going live carefully: checked, submitted for indexing and measured, so there is a baseline to improve on.",
    tasks: ["Go-live checks", "Search Console", "Analytics"],
    output: "Live and measured",
  },
  {
    icon: LifebuoyIcon,
    title: "Support &",
    accent: "grow",
    body: `Premium support after launch is part of our website plans — ${PRICING.launch.support} on ${PRICING.launch.name}, ${PRICING.growth.support} on the ${PRICING.growth.name}.`,
    tasks: ["Fixes & updates", "Ongoing SEO", "Reporting"],
    output: "Ongoing support",
  },
];

export function Process() {
  return (
    <section
      aria-labelledby="process-title"
      className="bg-neutral-50 py-14 md:py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          id="process-title"
          eyebrow="How we work"
          title={
            <>
              Your project, in <Accent>six clear steps.</Accent>
            </>
          }
          lede="Every step has a clear output, so you always know what is happening, who is doing it and what comes next."
        />

        <ol className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, index) => (
            <li
              key={step.accent}
              className="reveal flex flex-col rounded-[24px] border border-neutral-200 bg-white p-7"
            >
              <div className="flex items-start justify-between">
                <IconBadge icon={step.icon} />
                <span className="font-display text-[15px] font-bold tracking-[-0.02em] text-neutral-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 font-display text-[23px] leading-[1.1] font-bold tracking-tight text-heading">
                {step.title} <Italic>{step.accent}</Italic>
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-[1.6] text-neutral-600">
                {step.body}
              </p>

              <ul className="mt-auto grid gap-1.5 pt-5 sm:pt-7">
                {step.tasks.map((task) => (
                  <li
                    key={task}
                    className="hidden items-center justify-between rounded-full border border-neutral-200 bg-white py-1.5 pr-1.5 pl-4 text-[13.5px] font-medium text-neutral-700 sm:flex"
                  >
                    {task}
                    <span className="flex size-5 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
                      <CheckIcon aria-hidden className="size-3" />
                    </span>
                  </li>
                ))}
                <li className="flex items-center justify-between rounded-full bg-linear-to-br from-primary to-brand-deep py-1.5 pr-1.5 pl-4 text-[13.5px] font-semibold text-white shadow-[0_8px_20px_-10px_rgba(200,70,10,0.8)]">
                  {step.output}
                  <span className="flex size-5 items-center justify-center rounded-full bg-white text-brand-deep">
                    <CheckIcon aria-hidden className="size-3" />
                  </span>
                </li>
              </ul>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
