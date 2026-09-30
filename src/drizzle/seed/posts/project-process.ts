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
  youtube,
} from "../blocks";

export const projectProcess: BlogSeed = {
  slug: "how-we-run-a-web-project",
  title: "From Brief to Launch: How We Run a Web Project",
  excerpt:
    "The six phases, who does what in each, the artefacts that come out, and the four things that cause almost every delay we have seen. Written so you can hold us to it.",
  metaTitle: "From Brief to Launch: How We Run a Web Project",
  metaDescription:
    "Our full project process: discovery, structure, design, build, launch and aftercare — with the deliverables, decision owners, timelines and the four most common causes of delay.",
  imageAlt: "A project timeline showing six phases from brief to launch",
  status: "DRAFT",
  daysAgo: 1,
  cover: ["#ea580c", "#fff7ed"],
  html: [
    `<p><em>Draft — internal review before publishing. Check the timeline figures against the last four projects.</em></p>`,
    `<p>Most agency process pages are marketing. This one is the actual sequence we follow, including the parts that are awkward to admit — where projects slip, what we need from you, and what happens when the two do not line up.</p>`,
    `<p>If you are evaluating us, read the <strong>What delays projects</strong> section first. It will tell you more about working with us than the rest combined.</p>`,

    `<h2>The six phases</h2>`,
    figure(
      "process-timeline.svg",
      "Six project phases on a timeline",
      "A typical marketing site runs eight to twelve weeks; the middle two phases carry most of the risk.",
    ),
    table(
      ["Phase", "Length", "You provide", "We deliver"],
      [
        [
          "1. Discovery",
          "1 week",
          "Access to stakeholders, analytics, current pain points",
          "Goals, audiences, success measures, a scope we both signed",
        ],
        [
          "2. Structure",
          "1–2 weeks",
          "Content inventory, decisions on what to keep",
          "Sitemap, page templates, content model",
        ],
        [
          "3. Design",
          "2–3 weeks",
          "Brand assets, one named approver",
          "Key screens, the token palette, component inventory",
        ],
        [
          "4. Build",
          "3–5 weeks",
          "Final copy and images, third-party credentials",
          "The site, the dashboard, a staging URL from week one",
        ],
        [
          "5. Launch",
          "1 week",
          "DNS access, a go / no-go decision",
          "Migration, redirects, monitoring, handover session",
        ],
        [
          "6. Aftercare",
          "30 days",
          "Feedback from real use",
          "Defect fixes, a performance review, a written backlog",
        ],
      ],
    ),

    `<h2>Phase 1 — Discovery</h2>`,
    `<p>One week, and the only phase where we push back on almost everything. The goal is to leave with a scope narrow enough to finish and specific enough to test.</p>`,
    ul([
      "<strong>Goals</strong> stated as numbers, not adjectives: &ldquo;book 40 consultations a month&rdquo;, not &ldquo;look more professional&rdquo;",
      "<strong>Audiences</strong> in priority order, because a page cannot be optimised for three of them at once",
      "<strong>Constraints</strong> — the systems we must integrate with, the brand rules we cannot break, the date that is immovable",
      "<strong>Out of scope</strong>, written down and agreed, which is the most valuable line in the document",
    ]),
    quote(
      "Every project that went badly started with a scope that was agreed verbally and remembered differently.",
    ),

    `<h2>Phase 2 — Structure</h2>`,
    `<p>Before anything is drawn, we agree what the pages are and what each one contains. Content model first, layout second — a page designed before its content is known becomes a template nobody can fill.</p>`,
    `<p>The output is a sitemap and a content model: for every template, the fields, which are required, and who owns them.</p>`,
    code(`Blog post
  title          required   max 70 chars for search
  excerpt        required   used on cards and meta description
  cover image    required   1200×630, focal point top-left
  body           required   rich text; tables and images allowed
  status         required   DRAFT | PUBLISHED`),
    `<p>This is also where we find the content nobody wants to write. Better in week two than week nine.</p>`,

    `<h2>Phase 3 — Design</h2>`,
    `<p>We design the hardest three screens first, not the easiest. If the template survives the densest page, the rest follow. Two rounds of revisions are included, with one named approver on your side.</p>`,
    image(
      "process-approval.svg",
      "An approval flow with a single named approver",
      {
        width: 860,
      },
    ),
    `<p>The single-approver rule is not bureaucracy. Design by committee produces work that offends nobody and moves no numbers, and it is the second most common cause of slipped dates.</p>`,

    `<h2>Phase 4 — Build</h2>`,
    `<p>A staging URL exists from the first week, and it updates on every merge. You watch the site being built rather than waiting for a reveal.</p>`,
    `<p>We work in the order of risk: the content model and dashboard first, then templates, then the decorative layer. If the project runs short on time, what gets cut is animation — never accessibility, performance or the editing experience.</p>`,
    taskList([
      [true, "Staging URL shared, with access for your whole team"],
      [true, "Dashboard usable, so content entry can start early"],
      [true, "Templates built against real content, not lorem ipsum"],
      [false, "Performance budgets met on all primary templates"],
      [false, "Keyboard and screen-reader pass on the primary journey"],
      [false, "Analytics, consent and search console configured"],
    ]),

    `<h2>Phase 5 — Launch</h2>`,
    `<p>Launch is a checklist, not an event. The night-before version:</p>`,
    ol([
      "Redirect map tested against the old site's top 200 URLs",
      "DNS TTL lowered 24 hours in advance, so a rollback is minutes not hours",
      "Monitoring and error reporting live <em>before</em> the switch, not after",
      "A named person on call for the first 24 hours",
      "A written rollback procedure that someone other than the author has read",
    ]),
    `<p>Redirects are where most launches lose traffic. An old site typically has a long tail of URLs with links pointing at them, and a 404 there is rankings and referrals thrown away.</p>`,

    `<h2>Phase 6 — Aftercare</h2>`,
    `<p>Thirty days of defect fixes at no charge. A defect is a deviation from what we agreed; it is not a new requirement or a change of mind, and we will say so plainly when the difference comes up.</p>`,
    `<p>At the end we hand over a written backlog: what we would do next, in priority order, with rough effort. Whether we do it is your choice — the document is yours either way.</p>`,

    `<h2>The questions we ask in discovery</h2>`,
    `<p>Discovery is not a workshop with sticky notes. It is a short list of questions whose answers change what we build. These are the ones that earn their place:</p>`,
    ol([
      "<strong>What has to be true in twelve months for this to have been worth doing?</strong> The answer is the actual brief, and it is usually not what the brief says.",
      "<strong>Who is the visitor you most want and least often get?</strong> This shapes the homepage more than any brand exercise.",
      "<strong>What does your current site do well?</strong> Teams arrive focused on problems and throw away things that work.",
      "<strong>Which page does your sales team send people to?</strong> It is rarely the homepage, and it is usually under-designed.",
      "<strong>What will you stop doing to make room for this?</strong> Capacity is the constraint nobody plans for.",
      "<strong>Who can say no?</strong> If nobody can, every decision will be relitigated.",
    ]),
    `<p>The last two are uncomfortable and they are the ones that predict whether a project runs smoothly. We would rather have the awkward conversation in week one than in week nine.</p>`,

    `<h2>How we estimate</h2>`,
    `<p>We estimate templates, not pages. Twelve pages sharing three templates is a small project; six pages needing six templates is not. Clients are routinely surprised by this, and it is the single most useful thing to explain early.</p>`,
    table(
      ["Unit", "Typical range", "What moves it"],
      [
        [
          "A new template",
          "2–4 days",
          "Number of states, responsive complexity, animation",
        ],
        [
          "A content type in the dashboard",
          "0.5–1 day",
          "Field count, validation, media handling",
        ],
        [
          "A third-party integration",
          "1–3 days",
          "API quality and their sandbox environment",
        ],
        [
          "A page reusing an existing template",
          "1–2 hours",
          "Content entry only",
        ],
        [
          "Migration of existing content",
          "Roughly the build again",
          "Volume, and how messy the old markup is",
        ],
      ],
    ),
    `<p>We add a deliberate contingency and we say so out loud rather than hiding it in the line items. A project with no contingency is a project that will have an uncomfortable conversation in week seven.</p>`,

    `<h2>How we communicate</h2>`,
    `<p>A fixed cadence, so nobody has to chase and nobody is surprised:</p>`,
    ul([
      "<strong>Weekly written update</strong> — what moved, what is next, what we need from you, and anything at risk. Written, so it can be forwarded.",
      "<strong>A 30-minute call</strong> at the same time each week. It is cancelled when there is nothing to decide, which is a good week.",
      "<strong>A shared board</strong> you can look at any time without asking us",
      "<strong>Same-day acknowledgement</strong> on anything urgent, even if the answer is &ldquo;looking at it tomorrow&rdquo;",
    ]),
    quote(
      "Most client dissatisfaction is not about the work. It is about not knowing what is happening.",
    ),

    `<h2>What we say no to</h2>`,
    `<p>Saying yes to everything is how agencies produce mediocre work late. The things we decline, and why:</p>`,
    table(
      ["Request", "Why we decline"],
      [
        [
          "A launch date with no content plan",
          "The date will move; better to agree a realistic one now",
        ],
        [
          "&ldquo;Make it look like this competitor&rdquo;",
          "You inherit their compromises without knowing which were deliberate",
        ],
        [
          "Carousels on the homepage",
          "Measured engagement on slides beyond the first is close to zero",
        ],
        [
          "A CMS that lets editors change any layout",
          "It reliably produces pages that break the design in month three",
        ],
        [
          "Fixed price on an undefined scope",
          "It is a guess presented as a commitment, and both sides lose",
        ],
      ],
    ),
    `<p>We will always explain the reasoning and offer an alternative. If you hear the argument and still want it, it is your site — we will build it and note the decision.</p>`,

    `<h2>Risk, tracked openly</h2>`,
    `<p>Every project has a short risk list in the shared board, visible to both sides. Three columns: the risk, who owns it, and what we are doing about it. It is reviewed on the weekly call and usually has fewer than five entries.</p>`,
    taskList([
      [
        true,
        "Payment provider sandbox access — owner: client — requested week 1",
      ],
      [true, "Brand assets in vector format — owner: client — received"],
      [false, "Legal review of terms content — owner: client — due week 6"],
      [
        false,
        "Old site URL export for redirects — owner: us — blocked on hosting access",
      ],
    ]),
    `<p>Making risks visible is not pessimism. An unowned risk becomes a delay; a named one usually gets resolved before it matters.</p>`,

    `<h2>What delays projects</h2>`,
    `<p>Four causes, in order of frequency. None of them are technical.</p>`,
    table(
      ["Cause", "How it shows up", "What prevents it"],
      [
        [
          "Content arriving late",
          "Templates built against placeholder text, then reworked",
          "Content deadlines in the schedule, treated as deliverables",
        ],
        [
          "Too many approvers",
          "Contradictory feedback across two rounds",
          "One named approver who consolidates internally",
        ],
        [
          "Scope added quietly",
          "&ldquo;Small&rdquo; requests that each cost a day",
          "Every change quoted before work starts",
        ],
        [
          "Third-party access",
          "Waiting on credentials for a payment or CRM system",
          "Access requested in week one, not week six",
        ],
      ],
    ),
    `<p><span style="color: #f4552b">Content is the one that gets almost everyone.</span> It is nobody's full-time job, it competes with the day job, and it is invisible until the templates need filling. We now schedule it like any other deliverable, with a date and an owner.</p>`,

    `<h2>How we charge</h2>`,
    `<p>Fixed price against a fixed scope, in three payments: 40% to start, 30% at design sign-off, 30% at launch. Change requests are quoted separately <u>before</u> the work is done, never after.</p>`,
    `<p>We do not bill hourly for project work. Hourly billing rewards slowness and turns every conversation into a meter running, which is a poor basis for the honest &ldquo;that is not worth building&rdquo; conversations we would rather have.</p>`,

    `<h3>A short walkthrough</h3>`,
    youtube("0fONene3OIA"),

    `<hr>`,
    `<h2>What we ask of you</h2>`,
    `<p>Three things, and they are the whole of our side of the bargain:</p>`,
    ol([
      "One person who can decide, or who can get a decision within two working days",
      "Content and assets on the dates in the schedule",
      "Honest feedback early — a reservation raised in week three is a conversation; the same one in week nine is a delay",
    ]),
    `<p><mark>To do before publishing:</mark> add the two most recent project timelines as examples, and a note on how retainers work after aftercare ends.</p>`,
    `<p>${link("https://webtechsolution.org/contact", "Start a conversation")} — the first call is a scoping discussion, not a sales pitch.</p>`,
  ].join(""),
};
