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

export const choosingACms: BlogSeed = {
  slug: "choosing-a-cms",
  title:
    "Choosing a CMS: Headless, Traditional, and the Middle Ground Nobody Sells You",
  excerpt:
    "Going headless solves real problems and creates new ones. An honest comparison of what changes for editors, developers and your hosting bill — plus the option most teams should actually pick.",
  metaTitle: "Choosing a CMS: Headless vs Traditional, Honestly Compared",
  metaDescription:
    "What actually changes when you move to a headless CMS: editor experience, preview, caching, cost, migration risk, and the hybrid approach that suits most single-site businesses.",
  imageAlt: "Content flowing from a single store into several front-ends",
  status: "PUBLISHED",
  daysAgo: 15,
  cover: ["#9a3412", "#fef3c7"],
  html: [
    `<p>&ldquo;Headless&rdquo; is sold as an upgrade. It is really a <em>trade</em>: you exchange a bundled editing experience for control over delivery. Whether that is a good deal depends almost entirely on who edits the content, how often, and how many places it has to appear.</p>`,
    `<p>We have built both, and migrated sites in both directions. This is what we tell clients before the decision, including the parts that do not appear on anybody's pricing page.</p>`,

    `<h2>The three options, plainly</h2>`,
    `<p>The debate is usually framed as two choices. There are three.</p>`,
    ol([
      "<strong>Traditional</strong> — the CMS owns the content and renders the pages. WordPress, Craft, Drupal. Editing and delivery are one product.",
      "<strong>Headless</strong> — the CMS owns the content and exposes an API. Your front-end renders it. Contentful, Sanity, Strapi, Payload.",
      "<strong>Application-integrated</strong> — content lives in your own database, edited through a dashboard built into the app. This is the option nobody sells, because there is nothing to sell.",
    ]),
    figure(
      "cms-architecture.svg",
      "Three CMS architectures side by side",
      "The third option has the smallest surface area and no per-seat licence — but you build the editor.",
    ),

    `<h2>What genuinely gets better with headless</h2>`,
    ul([
      "<strong>Delivery</strong> — content becomes data, so one article can feed a website, an app and an email digest without duplication",
      "<strong>Security surface</strong> — no public admin panel bolted to the front of your site, which removes an entire category of automated attack",
      "<strong>Redesign cost</strong> — a rebuild stops being a migration, because the content was never coupled to the theme",
      "<strong>Performance ceiling</strong> — you control every byte the browser receives, rather than inheriting a theme's decisions",
    ]),

    `<h2>What gets harder, honestly</h2>`,
    `<p>The costs are real, and they land on people who were not in the meeting where the decision was made.</p>`,
    table(
      ["Area", "Traditional", "Headless"],
      [
        [
          "Preview",
          "Built in, always accurate",
          "You build it, and you maintain it",
        ],
        [
          "Editor onboarding",
          "Familiar to most hires",
          "Needs a written guide",
        ],
        [
          "Page layout control",
          "High, sometimes too high",
          "Deliberately limited",
        ],
        [
          "Plugin ecosystem",
          "Enormous, variable quality",
          "Small; you write the integration",
        ],
        ["Hosting", "One bill", "API + build + CDN, three bills"],
        ["Time to first page", "Hours", "Days"],
      ],
    ),

    `<h3>The preview problem</h3>`,
    `<p>This is the one that derails projects. Editors expect to see a change before it is public. In a headless setup that means draft-aware queries, a signed preview route, and cache rules that know the difference between the two.</p>`,
    code(`export async function getPost(slug: string, preview = false) {
  const status = preview ? ["DRAFT", "PUBLISHED"] : ["PUBLISHED"];
  return db.query.blog.findFirst({
    where: (b, { and, eq, inArray }) =>
      and(eq(b.slug, slug), inArray(b.status, status)),
  });
}`),
    quote(
      "If the preview is not trustworthy, editors will publish to check — and your production site becomes the staging environment.",
    ),
    `<p>Budget for preview explicitly. It is a feature with a cost, not a detail that falls out of the architecture.</p>`,

    `<h3>The caching problem</h3>`,
    `<p>Traditional systems invalidate their own caches because they know when content changed. Headless splits that knowledge across two systems, so you need a deliberate strategy:</p>`,
    table(
      ["Strategy", "Freshness", "Cost", "Good for"],
      [
        [
          "Rebuild on publish",
          "Minutes",
          "Build time per change",
          "Small sites, infrequent edits",
        ],
        ["Incremental regeneration", "Seconds", "Low", "Most content sites"],
        [
          "On-demand revalidation",
          "Immediate",
          "Webhook plumbing",
          "News, frequent corrections",
        ],
        [
          "No cache",
          "Immediate",
          "Every visit hits the API",
          "Nothing, in production",
        ],
      ],
    ),

    `<h2>The middle ground</h2>`,
    `<p>For a single site with a handful of editors, the third option is usually the right one: content in your own database, a small dashboard inside the application, and no external API at all.</p>`,
    ul([
      "<strong>No licence per seat</strong> — adding an editor is a row in a table",
      "<strong>Preview is trivial</strong> — the dashboard and the site are the same application, so a draft query is one flag",
      "<strong>One deployment</strong>, one bill, one place to look when something breaks",
      "<strong>Exactly the fields you need</strong> — no generic model bent into shape",
    ]),
    `<p>The trade is real: you build the editing interface, and there is no plugin marketplace to lean on. For a site with three content types and five editors, that is perhaps two weeks of work and then years of not paying a subscription or fighting someone else's data model.</p>`,
    image("cms-decision-tree.svg", "A decision tree for choosing a CMS", {
      width: 940,
    }),

    `<h2>Model the content before you pick the tool</h2>`,
    `<p>Almost every unhappy CMS project we inherit has the same root cause: the tool was chosen first and the content shaped to fit it. Doing it the other way round takes an afternoon and changes the answer surprisingly often.</p>`,
    `<p>For each content type, write down the fields, which are required, and who owns them. Not in the CMS — in a document, before the CMS exists.</p>`,
    code(`Case study
  client name     required   short text
  sector          required   one of a fixed list
  summary         required   used on cards and meta description
  hero image      required   1600×900
  body            required   rich text
  metrics         optional   repeatable: label + value
  related work    optional   up to 3 other case studies`),
    `<p>Two things fall out of this exercise immediately. First, you discover the fields that are really <em>layout</em> pretending to be content — &ldquo;background colour&rdquo;, &ldquo;number of columns&rdquo; — and you can decide deliberately whether editors should control them. Second, you find out whether your candidate tool can express the model without contortions.</p>`,
    quote(
      "If the content model needs a workaround in the demo, it will need ten of them in production.",
    ),
    `<h3>The block-editor question</h3>`,
    `<p>Every modern CMS offers some form of flexible block editing, and it is the single biggest decision in the project. Total freedom means editors can build any page — and can build ugly, slow, inaccessible ones. Total rigidity means every new page shape is a developer ticket.</p>`,
    `<p>Our default is a <strong>small set of composable blocks</strong>, perhaps eight, each of which looks correct in every combination. Editors get real flexibility; the design survives contact with a hurried Friday afternoon.</p>`,

    `<h2>What it actually costs over three years</h2>`,
    `<p>Licence fees are the visible number and rarely the largest one. A fair comparison includes the work.</p>`,
    table(
      ["Cost", "Traditional", "Headless", "Integrated"],
      [
        [
          "Licence / subscription",
          "Low to none",
          "Per seat, per record, per API call",
          "None",
        ],
        ["Initial build", "Lower", "Higher", "Higher"],
        ["Preview and caching work", "None", "1–2 weeks", "Minimal"],
        ["Plugin maintenance", "Ongoing", "Low", "None"],
        [
          "Security patching",
          "Frequent, urgent",
          "Vendor's problem",
          "Yours, but small surface",
        ],
        [
          "Cost of leaving",
          "Medium",
          "High if the model is proprietary",
          "Low — it is your database",
        ],
      ],
    ),
    `<p>The last row deserves more weight than it usually gets. Ask any vendor for a full export — including assets, relationships and draft history — <em>before</em> you sign. A surprising number make this awkward, and the awkwardness is the answer.</p>`,

    `<h2>Editors are the users you keep forgetting</h2>`,
    `<p>The people who will live in this system every week are almost never in the evaluation. Three things make the difference between a CMS that gets used and one that gets worked around:</p>`,
    ul([
      "<strong>Predictable preview</strong> — they must be able to trust what they see before publishing",
      "<strong>Forgiving validation</strong> — tell them what is wrong at the field, not in a modal after a failed save",
      "<strong>Obvious status</strong> — draft, scheduled, published and &ldquo;published but the build failed&rdquo; must be visually distinct",
    ]),
    `<p>That last state is the one that catches headless setups. A publish that succeeds in the CMS but fails in the build leaves the editor believing the page is live. Surface build status in the editing interface, or you will get a support ticket for every failure.</p>`,

    `<h2>Migration: the part that runs long</h2>`,
    `<p>Whichever direction you move, the content itself is the expensive part. Plan for these five, in this order:</p>`,
    ol([
      "<strong>Inventory</strong> — every URL on the old site, with traffic and inbound links. This list decides what is worth migrating at all.",
      "<strong>Prune</strong> — most sites can drop 30–50% of their pages. Doing this first makes everything after it cheaper.",
      "<strong>Transform</strong> — old markup carries theme-specific classes and inline styles that will not mean anything in the new system.",
      "<strong>Redirect</strong> — a map from every old URL to its new home, tested before launch, not after.",
      "<strong>Verify</strong> — spot-check the top 50 pages by hand. Automated migration is 95% correct and the missing 5% is always on an important page.",
    ]),
    `<p>A rule of thumb from our projects: <strong>the content migration costs about as much as the build</strong>. Teams that plan for that finish on time; teams that treat it as an afterthought discover it in week ten.</p>`,

    `<h2>A rough decision rule</h2>`,
    ol([
      "<strong>One site, non-technical editors, frequent layout changes</strong> — stay traditional. You will fight the tooling otherwise, and lose.",
      "<strong>Several surfaces sharing content</strong> — go headless. The duplication you avoid pays for the preview work.",
      "<strong>One site, a few editors, strict performance targets</strong> — build it into the application. This is most of our clients.",
      "<strong>A team of one and a deadline this month</strong> — traditional, and revisit in a year.",
    ]),

    `<h2>Questions to ask before you commit</h2>`,
    taskList([
      [true, "Who publishes, how often, and what does their day look like?"],
      [true, "How many surfaces will consume this content in three years?"],
      [false, "What happens to the content if the vendor doubles their price?"],
      [false, "Can we export everything, including assets and relationships?"],
      [false, "Who owns preview, and is it in the budget?"],
      [false, "What is the rollback plan if a publish breaks the build?"],
    ]),
    `<p>The fourth question eliminates more vendors than any feature comparison. Ask for an export before you sign, not after.</p>`,

    `<h2>The migration nobody budgets for</h2>`,
    `<p>Whichever direction you move, the content itself is the expensive part. Redirects, asset re-hosting, embedded markup that assumed the old theme's classes, and the long tail of pages nobody remembers.</p>`,
    `<p>A rule of thumb from our projects: <strong>the content migration costs about as much as the build</strong>. Teams that plan for that finish on time; teams that treat it as an afterthought discover it in week ten.</p>`,

    `<hr>`,
    `<h2>The pattern in regretted decisions</h2>`,
    `<p>Every migration we have seen regretted shares one thing: the decision was made on architectural merit, with nobody asking the person who publishes three posts a week what their day would look like afterwards.<sup>1</sup></p>`,
    `<p>Ask them first. It takes twenty minutes and it saves a quarter.</p>`,
    `<p><sup>1</sup> The second most common pattern is choosing for a multi-surface future that never arrives. Build for the surfaces you have plus one.</p>`,
    `<p>${link("https://webtechsolution.org/contact", "Talk to us")} before you sign a contract — we will tell you when the cheaper option is the right one.</p>`,
  ].join(""),
};
