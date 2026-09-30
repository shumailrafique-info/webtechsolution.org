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

export const websitePerformanceGuide: BlogSeed = {
  slug: "website-performance-guide",
  title: "The Complete Guide to Website Performance in 2026",
  excerpt:
    "Everything we have learned shipping fast sites: how to set budgets people actually keep, what to measure, the seven fixes that cover most cases, and how to stop a site decaying six months after launch.",
  metaTitle: "The Complete Guide to Website Performance in 2026",
  metaDescription:
    "A working guide to web performance: budgets per template, field measurement, the seven highest-value fixes, third-party control, and the review habits that keep a site fast long after launch.",
  imageAlt: "A performance waterfall chart with the critical path highlighted",
  status: "PUBLISHED",
  daysAgo: 2,
  cover: ["#f4552b", "#fff1ec"],
  html: [
    `<p>Almost every website is fast on the day it launches. The interesting question is whether it is still fast eight months later, after a marketing team has added two tracking scripts, a chat widget, a cookie banner and a hero video. This guide is the whole of our approach at <strong>Web Tech Solutions</strong> — budgets, measurement, the fixes that actually move the number, and the review habits that stop the slow decay.</p>`,
    `<p>It is long because performance work is not one trick. If you only have ten minutes, read <em>Set a budget</em> and <em>The seven fixes</em> and come back to the rest later.</p>`,

    `<h2>Why performance is a business problem, not a technical one</h2>`,
    `<p>Developers tend to argue for speed on craft grounds, which is the least persuasive framing available. The arguments that land in a boardroom are simpler:</p>`,
    ul([
      "<strong>Revenue</strong> — every study we have run with clients shows conversion falling as the largest paint gets later, and the drop is steepest between one and three seconds",
      "<strong>Acquisition cost</strong> — a slow landing page burns paid traffic you already bought, and the bounce is invisible in the ad platform's numbers",
      "<strong>Search</strong> — Core Web Vitals are a ranking input, small but real, and they are measured on your <em>actual visitors</em> rather than a lab run",
      "<strong>Support load</strong> — a meaningful share of &ldquo;the site is broken&rdquo; tickets are really &ldquo;the site was slow and I gave up&rdquo;",
    ]),
    quote(
      "The most expensive performance problem is the one nobody is measuring, because it never becomes anybody's job.",
    ),

    `<h2>Set a budget, not a score</h2>`,
    `<p>A Lighthouse score is a <em>result</em>. Results make poor targets because a developer cannot check one while writing code. Budgets are different: they are bytes and milliseconds, they belong to a specific template, and they can fail a build. We agree these with the client before a line of markup exists.</p>`,
    table(
      ["Template", "JS budget", "LCP target", "Why this number"],
      [
        [
          "Marketing home",
          "90&nbsp;KB",
          "1.8&nbsp;s",
          "Highest paid traffic, least patient audience",
        ],
        [
          "Blog article",
          "45&nbsp;KB",
          "1.5&nbsp;s",
          "Mostly text; anything heavier is decoration",
        ],
        [
          "Product listing",
          "120&nbsp;KB",
          "2.0&nbsp;s",
          "Filtering needs real client-side code",
        ],
        [
          "Checkout",
          "160&nbsp;KB",
          "2.2&nbsp;s",
          "Payment SDKs are unavoidable, everything else is not",
        ],
      ],
    ),
    `<p>Budgets are set <strong>per template</strong> because averages hide problems. A site can have a healthy median while its highest-traffic page is the slowest thing on the domain. We have seen a site pass every aggregate check while its homepage sat at four seconds on mobile.</p>`,
    `<h3>Making the budget stick</h3>`,
    `<p>A budget that lives in a document is a wish. Ours lives in CI and fails the build:</p>`,
    code(`// budget.config.js — checked on every pull request
export default {
  "/": { js: 90_000, css: 40_000, lcp: 1800 },
  "/blog/*": { js: 45_000, css: 35_000, lcp: 1500 },
  "/checkout": { js: 160_000, css: 45_000, lcp: 2200 },
};`),
    `<p>The first time it fails, someone will ask for an exception. Grant it — once, in writing, with an owner and a date. The point of the budget is not to be unbreakable; it is to make the cost of breaking it visible to the person choosing to break it.</p>`,
    image("perf-budget.svg", "A table of per-template performance budgets"),

    `<h2>Measure the field, not your laptop</h2>`,
    `<p>Your development machine is a lie: fast CPU, fast network, warm cache, no browser extensions. What matters is <mark>the 75th percentile of real visitors</mark> — the same population search engines score you on. From day one we collect three streams.</p>`,
    ol([
      "<strong>Core Web Vitals from real sessions</strong>, segmented by device class and connection, because a median that mixes desktop and mobile tells you nothing useful",
      "<strong>Server timing for every dynamic route</strong>, so a slow database query cannot hide behind a fast shell",
      "<strong>Asset weight over time</strong>, which is the only metric that catches gradual decay",
    ]),
    `<h3>What the three metrics actually mean</h3>`,
    table(
      ["Metric", "What it measures", "Good", "Usual cause when bad"],
      [
        [
          "LCP",
          "When the main content appears",
          "&lt; 2.5&nbsp;s",
          "Unoptimised hero image, slow server response, render-blocking CSS",
        ],
        [
          "INP",
          "How quickly the page responds to input",
          "&lt; 200&nbsp;ms",
          "Long JavaScript tasks blocking the main thread",
        ],
        [
          "CLS",
          "How much the layout jumps",
          "&lt; 0.1",
          "Images without dimensions, late-loading banners, web fonts",
        ],
      ],
    ),
    `<p>INP is the one most teams are behind on. It replaced the older responsiveness metric and it is unforgiving: it looks at your <em>worst</em> interaction, not your average one. A page can feel fine to the developer who built it and still fail, because the developer never clicks the filter button on a mid-range Android.</p>`,
    figure(
      "perf-waterfall.svg",
      "A request waterfall with the critical path highlighted",
      "The critical path is every request that must finish before the main content can paint. Shortening it is most of the work.",
    ),

    `<h2>The seven fixes that cover most cases</h2>`,
    `<p>After enough audits the same problems recur. In rough order of value per hour spent:</p>`,
    `<h3>1. Fix the images</h3>`,
    `<p>Images are usually both the biggest win and the easiest to get wrong. Our defaults:</p>`,
    ul([
      "Serve <code>AVIF</code> with a <code>WebP</code> fallback — never a bare JPEG",
      "Set explicit <code>width</code> and <code>height</code> so nothing shifts while loading",
      "Mark everything below the fold <code>loading=&quot;lazy&quot;</code>, and everything above it eager",
      "Generate four widths per image and let the browser choose with <code>srcset</code>",
    ]),
    code(`<img
  src="/hero-960.avif"
  srcset="/hero-640.avif 640w, /hero-960.avif 960w, /hero-1440.avif 1440w"
  sizes="(max-width: 768px) 100vw, 960px"
  width="960"
  height="540"
  alt="Team reviewing a site launch checklist"
  fetchpriority="high"
/>`),
    `<h3>2. Stop blocking the first paint</h3>`,
    `<p>Every stylesheet and synchronous script in the document head delays the first pixel. Inline the small amount of CSS the first screen needs, load the rest asynchronously, and move scripts to the end or mark them <code>defer</code>.</p>`,
    `<h3>3. Give fonts a fallback</h3>`,
    `<p>A web font that blocks rendering costs you the paint; one that swaps carelessly costs you layout stability. Use <code>font-display: swap</code>, preload the single weight used above the fold, and set <code>size-adjust</code> so the fallback occupies the same space.</p>`,
    code(`@font-face {
  font-family: "Inter";
  src: url("/fonts/inter.woff2") format("woff2");
  font-display: swap;
  size-adjust: 107%;
}`),
    `<h3>4. Cut the JavaScript, then cut it again</h3>`,
    `<p>Most marketing pages ship a framework to animate a dropdown. Audit what actually needs to be interactive; render the rest on the server. Where a component genuinely needs client code, load it when it becomes visible rather than at page load.</p>`,
    `<h3>5. Cache properly at the edge</h3>`,
    `<p>Static assets get a content hash and a year of immutable caching. HTML gets a short cache with revalidation. Dynamic pages that change rarely get incremental regeneration rather than a database round trip per visit.</p>`,
    table(
      ["Asset", "Cache-Control", "Reasoning"],
      [
        [
          "Hashed JS and CSS",
          "<code>max-age=31536000, immutable</code>",
          "The URL changes when the content does",
        ],
        [
          "Images at stable paths",
          "<code>max-age=3600</code>",
          "They can be replaced in place, so never immutable",
        ],
        [
          "HTML",
          "<code>s-maxage=60, stale-while-revalidate</code>",
          "Fresh enough to edit, cheap enough to serve",
        ],
      ],
    ),
    `<h3>6. Make the server fast, or make it unnecessary</h3>`,
    `<p>Time to first byte is the floor under every other metric. If the server takes 800&nbsp;ms, no amount of front-end work gets you to a 1.5&nbsp;second paint. Look for N+1 queries, missing indexes and synchronous third-party calls in the request path.</p>`,
    `<h3>7. Put third parties on a leash</h3>`,
    `<p>A tag manager is a promise that people outside your team can ship code to production without review. Sometimes that is worth it. Frequently it is not.</p>`,
    code(`// Defer anything that is not needed for first paint.
const idle = window.requestIdleCallback ?? ((fn) => setTimeout(fn, 1));

idle(() => {
  import("./analytics").then((m) => m.start());
});`),
    `<p>We give each third party a measured budget and an owner. Nothing costs more than <strong>15&nbsp;KB</strong> of main-thread work without explicit sign-off, and anything without an owner is removed at the next review.</p>`,

    `<h2>Diagnosing a slow page in twenty minutes</h2>`,
    `<p>When a client says &ldquo;the site is slow&rdquo;, the useful response is not a tool but a sequence. This one isolates the cause in about twenty minutes and it has never failed us.</p>`,
    ol([
      "<strong>Is it slow for real users or just for you?</strong> Check field data first. A problem that does not appear at the 75th percentile is a local problem.",
      "<strong>Is the server slow?</strong> Look at time to first byte alone. If it is over 600&nbsp;ms, stop — nothing on the front end will save you.",
      "<strong>Is it slow to paint, or slow to respond?</strong> These have entirely different causes. LCP is assets and server; INP is JavaScript.",
      "<strong>Disable JavaScript and reload.</strong> If the page is suddenly fast, you have a script problem and you have just narrowed it to one category.",
      "<strong>Block third parties at the network level.</strong> If that fixes it, the conversation is now a business one, not a technical one.",
      "<strong>Only then open the profiler.</strong> By this point you know which third of the stack to look at.",
    ]),
    `<p>Most teams start at step six, which is why performance work so often produces a week of effort and a 3% improvement.</p>`,
    `<h3>Reading a waterfall</h3>`,
    `<p>Three shapes account for nearly every slow first paint:</p>`,
    table(
      ["What you see", "What it means", "Fix"],
      [
        [
          "A long flat bar before anything else starts",
          "Slow server response",
          "Caching, query tuning, or move rendering to the edge",
        ],
        [
          "A staircase of requests each starting as the last ends",
          "A request chain — one file discovers the next",
          "Preload the critical assets so they start together",
        ],
        [
          "A huge image arriving late",
          "The LCP element was not prioritised",
          "<code>fetchpriority=&quot;high&quot;</code> and correct sizing",
        ],
      ],
    ),
    `<p>The staircase is the most common and the least noticed. A stylesheet that imports another stylesheet that references a font creates three sequential round trips before any text renders.</p>`,

    `<h2>Mobile is the real target</h2>`,
    `<p>Most teams optimise on a desktop and ship to an audience that is 60–70% mobile. The gap is not small: a mid-range Android has perhaps a quarter of the JavaScript throughput of the laptop the site was built on, and it is thermally throttled after a few minutes of use.</p>`,
    ul([
      "<strong>Test on a real mid-range device</strong>, not a flagship and not a simulator. Keep one in the office.",
      "<strong>Use CPU throttling</strong> at 4&times; as your default profiling setting, not the unthrottled one",
      "<strong>Watch INP specifically on mobile</strong> — touch interactions surface main-thread blocking that a mouse click hides",
      "<strong>Remember the network is variable</strong>, not just slow: a train journey is a series of reconnections, not a steady 3G line",
    ]),
    quote(
      "If it is fast on the developer's laptop, you have learned nothing about whether it is fast.",
    ),

    `<h2>The decay problem</h2>`,
    `<p>Here is the pattern we see in almost every rescue project. The site launches fast. Nobody breaks it. Forty small releases later it is slow, and no single release looks expensive enough to blame.</p>`,
    quote(
      "The site did not get slower in one release. It got slower in forty releases, none of which looked expensive on its own.",
    ),
    `<p>The fix is not heroics. It is a small recurring review — thirty minutes a month with three questions:</p>`,
    ol([
      "Has any template crossed its budget since last month?",
      "What is the largest new asset we added, and who asked for it?",
      "Is every third-party script still earning its place?",
    ]),

    `<h2>The pre-release checklist</h2>`,
    `<p>Every release runs through the same list. It lives in the repository, not in someone's head:</p>`,
    taskList([
      [true, "Budgets still met on the three highest-traffic templates"],
      [true, "No new render-blocking request in the document head"],
      [true, "Every image above the fold has explicit dimensions"],
      [false, "Field data reviewed seven days after release"],
      [false, "Third-party inventory re-checked against the sign-off list"],
      [false, "Slowest route's server timing compared with last release"],
    ]),

    `<h3>A walkthrough</h3>`,
    `<p>If you would rather watch than read, this is the same workflow applied to a live site from audit to fix:</p>`,
    youtube("0fONene3OIA"),

    `<h2>What we would tell a team starting tomorrow</h2>`,
    `<p>Do not start with a tool. Start with one number you care about, measured on real visitors, reviewed by a named person on a fixed day. Everything else — the budgets, the CI checks, the image pipeline — is machinery for keeping that number honest.</p>`,
    `<p style="text-align: center"><em>Performance is not a project. It is a feature you keep paying for.</em></p>`,
    `<hr>`,
    `<p>Want the budget config and checklist as files you can drop into your own repository? ${link("https://webtechsolution.org/contact", "Get in touch")} and we will send them over.<sup>1</sup></p>`,
    `<p><sup>1</sup> No sign-up, no drip campaign. We will send the files and leave you alone.</p>`,
  ].join(""),
};
