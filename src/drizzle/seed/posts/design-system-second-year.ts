import {
  type BlogSeed,
  code,
  figure,
  image,
  link,
  ol,
  quote,
  table,
  taskList,
  ul,
} from "../blocks";

export const designSystemSecondYear: BlogSeed = {
  slug: "design-system-second-year",
  title: "Designing a Design System That Survives Its Second Year",
  excerpt:
    "Most design systems are fine at launch and a liability eighteen months later. This is the structure, the governance and the deprecation habits that keep one useful once the people who built it have moved on.",
  metaTitle: "Designing a Design System That Survives Its Second Year",
  metaDescription:
    "Tokens, primitives, governance and deprecation: how to build a design system small enough to maintain and structured enough to grow, with the rules that stop it becoming a second product.",
  imageAlt: "Design tokens feeding into component primitives and pages",
  status: "PUBLISHED",
  daysAgo: 8,
  cover: ["#c2410c", "#fff7ed"],
  html: [
    `<p>Design systems fail in two directions. Either they are a colour palette in a slide deck that nobody implements, or they are a forty-component library that needs a full-time team and still does not cover the page someone is building today.</p>`,
    `<p>This is the middle path — the one we build for clients with <strong>two developers, no dedicated designer</strong> and a five-year horizon. The hard part is not the first version. It is the second year, when the people who made the original decisions have moved on and the system has to defend itself.</p>`,

    `<h2>Layer one: tokens, and only tokens</h2>`,
    `<p>Before a single component exists, name the values. Everything downstream reads from these, which is what turns a rebrand from a three-week search-and-replace into a one-file change.</p>`,
    code(`:root {
  /* Primitive: what the colour is */
  --orange-500: oklch(66.4% 0.225 34.7);
  --neutral-950: oklch(0.145 0 0);

  /* Semantic: what the colour is for */
  --primary: var(--orange-500);
  --foreground: var(--neutral-950);
  --radius: 0.625rem;
}`),
    `<p>The two-layer split matters more than it looks. Primitives are the palette; semantics are the roles. Components may only ever reference the semantic layer. Two rules enforce it:</p>`,
    ol([
      "A component may <strong>never</strong> hardcode a colour. If it needs one that does not exist, the token list is wrong — fix the list, not the component.",
      "Semantic names describe <em>role</em>, not appearance. <code>--primary</code> survives a rebrand; <code>--orange-500</code> in a button does not.",
    ]),
    figure(
      "ds-token-layers.svg",
      "Three layers: primitives, semantic tokens, components",
      "Components read only from the semantic layer, so a rebrand touches one file.",
    ),
    `<h3>Theming falls out for free</h3>`,
    `<p>When every colour resolves through a semantic token, dark mode is a redefinition rather than a second stylesheet. No <code>dark:</code> variants scattered through markup, nothing to keep in sync.</p>`,
    code(`.dark {
  --primary: var(--orange-400);
  --foreground: var(--neutral-50);
  --background: var(--neutral-950);
}`),

    `<h2>Layer two: six primitives</h2>`,
    `<p>Almost every interface a business needs is built from six things. Build these properly and then stop building.</p>`,
    table(
      ["Primitive", "Why it earns its place", "The trap"],
      [
        [
          "Button",
          "Every state in one file: hover, focus, disabled, loading",
          "Growing a <code>variant</code> prop to eleven values",
        ],
        [
          "Field",
          "Label, hint and error together, so accessibility is automatic",
          "Letting pages compose label and input by hand",
        ],
        [
          "Card",
          "The default container; stops ad-hoc border and shadow choices",
          "Adding layout props until it is a grid system",
        ],
        [
          "Dialog",
          "Focus trapping is too easy to get wrong twice",
          "A second, simpler modal appearing elsewhere",
        ],
        [
          "Table",
          "Responsive overflow behaviour, decided once",
          "Building a data grid nobody asked for",
        ],
        [
          "Toast",
          "The only sanctioned way to report an action's result",
          "Inline alerts growing in parallel",
        ],
      ],
    ),
    quote(
      "If you cannot name the problem a component solves, it is a snowflake, not a primitive.",
    ),

    `<h3>The rule for adding a seventh</h3>`,
    `<p>A new component is allowed when the same pattern has been <u>copy-pasted three times in real pages</u> — not when someone anticipates needing it. This single rule is the difference between a system that stays small and one that becomes a second product to maintain.</p>`,
    `<p>Write the rule down where the team can see it. In every project where we did not, the component count doubled within a year and half of the additions were used once.</p>`,

    `<h2>Layer three: states, written down</h2>`,
    `<p>Most bugs we inherit are missing states rather than wrong colours. Every interactive component documents all five before it is considered done:</p>`,
    taskList([
      [true, "Default and hover"],
      [true, "Keyboard focus — visible, and not just the browser default"],
      [true, "Disabled, with the reason exposed to screen readers"],
      [false, "Loading, including what happens on a double submit"],
      [false, "Error, with the recovery path spelled out"],
    ]),
    image(
      "ds-component-states.svg",
      "A button shown in five different states",
      {
        width: 860,
      },
    ),
    `<p>The loading state is the one teams skip, and it is the one that produces duplicate orders. If a button can submit a form, it needs a defined behaviour for the second click.</p>`,

    `<h2>The second-year problems</h2>`,
    `<p>Everything above gets you a good first version. What follows is what actually decides whether the system is still used in eighteen months.</p>`,
    `<h3>Problem one: nobody knows what exists</h3>`,
    `<p>A system nobody can search is a system people work around. You do not need a bespoke documentation site — you need one page per component with a live example, the props, and one sentence about when <em>not</em> to use it. That last line prevents more misuse than any amount of API documentation.</p>`,
    `<h3>Problem two: the fork</h3>`,
    `<p>A team needs a variation, the system does not offer it, so they copy the component into their own folder and change three lines. Six months later there are four buttons. The cure is response time: if a reasonable request takes three weeks, forking is the rational choice. We aim to answer within a week — either it ships, or we explain why not and suggest the composition that solves it.</p>`,
    `<h3>Problem three: deprecation nobody performs</h3>`,
    `<p>Systems grow because removing things is nobody's job. Give every deprecation a written path and a date:</p>`,
    code(`/**
 * @deprecated Use <Field> instead. Removed after 2026-06-01.
 * Migration: wrap the input in <Field> and move \`label\` across.
 */
export function LabelledInput(props: LabelledInputProps) { /* … */ }`),
    `<p>Then actually remove it on the date. The first removal is uncomfortable; every subsequent one is routine, and the system stops accumulating.</p>`,

    `<h2>Documentation people actually read</h2>`,
    `<p>Every team we meet has a documentation problem and most of them are trying to solve it by writing more. The fix is usually the opposite: less prose, better structured, closer to the code.</p>`,
    `<p>One page per component, four sections, in this order:</p>`,
    ol([
      "<strong>A live example</strong> — the rendered component, not a screenshot. Screenshots go stale silently.",
      "<strong>When to use it, and when not to.</strong> Two sentences each. The second one prevents more misuse than any API table.",
      "<strong>The props</strong>, generated from the types rather than written by hand, because a handwritten prop table is wrong within a month.",
      "<strong>Accessibility notes</strong> — what the component handles for you, and what it expects you to provide.",
    ]),
    `<p>That fourth section is the one teams skip and the one that pays. If a dialog traps focus for you but expects you to supply an accessible label, say so on the page. Otherwise every consumer rediscovers it during an audit.</p>`,
    quote(
      "Documentation is not a description of what you built. It is an answer to the question the next developer is about to ask.",
    ),

    `<h2>Versioning and release</h2>`,
    `<p>A design system is a dependency, which means it needs the discipline of one. Semantic versioning is not bureaucracy here — it is the contract that lets a product team upgrade without fear.</p>`,
    table(
      ["Change", "Version bump", "What consumers should expect"],
      [
        [
          "New component or variant",
          "Minor",
          "Nothing breaks; opt in when ready",
        ],
        [
          "Visual refinement within a token",
          "Patch",
          "Pixels move slightly, no code changes",
        ],
        ["Renamed or removed prop", "Major", "A codemod and a migration note"],
        [
          "Semantic token value changed",
          "Minor, with a note",
          "Colour shifts everywhere it is used",
        ],
        [
          "Semantic token removed",
          "Major",
          "Compile error until fixed — deliberately",
        ],
      ],
    ),
    `<p>The last row is a design decision worth defending. Removing a token should break the build loudly rather than fall back to a default, because a silent fallback produces a page that looks almost right and nobody notices for a quarter.</p>`,
    `<p>Ship a changelog with every release, written for the person consuming it rather than the person who made the change. &ldquo;Button: <code>size=&quot;xs&quot;</code> removed, use <code>size=&quot;sm&quot;</code> with <code>className</code> for tighter padding&rdquo; is useful. &ldquo;refactor button sizes&rdquo; is not.</p>`,

    `<h2>Adopting a system into an existing codebase</h2>`,
    `<p>Most of our design system work is not greenfield. It is a codebase with four years of accumulated styling and a team that cannot stop shipping features for three months. The sequence that works:</p>`,
    ol([
      "<strong>Tokens first, in parallel.</strong> Define the semantic layer and map it onto the existing values, even where those values are inconsistent. Nothing changes visually; you have simply given the current colours names.",
      "<strong>Reconcile quietly.</strong> Where three greys exist, pick one and point the other two at it. Do this over a few weeks and nobody files a bug.",
      "<strong>Replace at the point of change.</strong> When a page is being worked on anyway, swap its ad-hoc components for system ones. Never schedule a &ldquo;migration sprint&rdquo; — it will be cut.",
      "<strong>Block new ad-hoc styling.</strong> A lint rule that fails on a raw hex colour in a component file does more for adoption than any amount of advocacy.",
    ]),
    code(`// A lint rule beats a style guide, because it is enforced at 2am
// by someone who has never read the style guide.
"no-restricted-syntax": [
  "error",
  {
    selector: "Literal[value=/^#[0-9a-fA-F]{3,8}$/]",
    message: "Use a semantic token from globals.css, not a hex value.",
  },
],`),
    `<p>The order matters. Teams that start by building components end up with a library nobody uses next to a codebase that still hardcodes colours. Teams that start with tokens get value in week one and have a foundation the components can stand on.</p>`,

    `<h2>Measuring whether it is working</h2>`,
    `<p>&ldquo;Adoption&rdquo; is usually asserted rather than measured. Three numbers make it concrete, and all three are cheap to collect:</p>`,
    ul([
      "<strong>Coverage</strong> — what share of rendered components come from the system rather than local files. Rising is good; falling means people are forking.",
      "<strong>Raw values</strong> — the count of hardcoded colours and spacings in the codebase. This should trend to zero and then stay there.",
      "<strong>Request latency</strong> — how long between someone asking for a change and getting an answer. Over two weeks, forking becomes rational.",
    ]),
    `<p>The third is the leading indicator. Coverage falls <em>because</em> latency rose; by the time coverage is visibly dropping, the forks are already merged.</p>`,

    `<h2>Governance, in one paragraph</h2>`,
    `<p>Heavy processes die. What survives is small and specific: one named owner who reviews additions, a fortnightly thirty-minute slot for requests, and a rule that any change touching a semantic token needs a second pair of eyes. That is the entire governance model we hand over, and it has outlasted the teams who received it.</p>`,
    table(
      ["Decision", "Who decides", "How long it should take"],
      [
        ["New primitive", "Owner, after the rule of three", "One week"],
        ["New variant on an existing component", "Any developer", "Same day"],
        ["Change to a semantic token", "Owner plus one reviewer", "One week"],
        [
          "Removing a deprecated component",
          "Owner, on the stated date",
          "Immediate",
        ],
      ],
    ),

    `<h2>What we would do differently</h2>`,
    `<p>Two things, consistently. First, we would write the &ldquo;when not to use this&rdquo; line <em>before</em> building each component — it exposes components that have no real boundary. Second, we would set the deprecation policy on day one rather than in year two, because by then the system already carries things nobody will volunteer to remove.</p>`,
    `<p><span style="color: #f4552b">A design system is a maintenance commitment disguised as a productivity tool.</span> Made small and given an owner, it repays that commitment for years. Made large and given to everyone, it becomes the thing teams route around.</p>`,
    `<hr>`,
    `<p style="text-align: right"><strong>Next in this series:</strong> documenting components so people actually read it.</p>`,
    `<p>We run design system audits as a fixed-scope engagement — ${link("https://webtechsolution.org/contact", "ask us about one")} if yours is heading into its second year.</p>`,
  ].join(""),
};
