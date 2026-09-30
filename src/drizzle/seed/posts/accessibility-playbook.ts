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

export const accessibilityPlaybook: BlogSeed = {
  slug: "accessibility-playbook",
  title: "A Practical Accessibility Playbook for Product Teams",
  excerpt:
    "Not a standards summary. The checks we run, the two manual passes that find what tools cannot, the patterns that break most often, and how to fold all of it into a team's normal week.",
  metaTitle: "A Practical Web Accessibility Playbook for Product Teams",
  metaDescription:
    "An accessibility workflow teams actually follow: twelve prioritised checks, the keyboard and screen-reader passes, the components that break most often, and how to stop regressions returning.",
  imageAlt: "Keyboard focus moving through a form in reading order",
  status: "PUBLISHED",
  daysAgo: 22,
  cover: ["#7c2d12", "#ffedd5"],
  html: [
    `<p>Accessibility work stalls when it arrives as a two-hundred-page standard. Teams read the first section, feel the size of it, and file the whole thing under &ldquo;later&rdquo;.</p>`,
    `<p>This is the opposite: the working playbook we hand teams on day one. Twelve checks ordered by impact per hour, two manual passes, and the five components that account for most of what we find.</p>`,

    `<h2>Why the standards-first approach fails</h2>`,
    `<p>WCAG is a specification, not a workflow. It is written to be complete and testable by an auditor, which makes it excellent for compliance and poor for a Tuesday afternoon. A developer with a ticket needs to know <em>what to check on this component, now</em>.</p>`,
    quote(
      "Compliance is the floor you can be sued for falling through. Usability is the thing you were trying to build.",
    ),
    `<p>The other failure is treating accessibility as an audit at the end. An audit at the end produces a 90-item backlog that competes with launch, and loses.</p>`,

    `<h2>The twelve checks</h2>`,
    `<p>Ordered by how much they matter against how little they cost to fix.</p>`,
    taskList([
      [
        true,
        "Every interactive element is reachable with <code>Tab</code>, in a sensible order",
      ],
      [
        true,
        "A visible focus ring everywhere — never <code>outline: none</code> without a replacement",
      ],
      [
        true,
        "Text contrast at least <strong>4.5:1</strong>; large text <strong>3:1</strong>",
      ],
      [
        true,
        "Every form control has a real <code>&lt;label&gt;</code>, not a placeholder",
      ],
      [true, "Images are either described or explicitly marked decorative"],
      [false, "Errors are announced, not only coloured red"],
      [false, "Headings form an outline with no skipped levels"],
      [false, "Dialogs trap focus and return it to the trigger on close"],
      [
        false,
        "The page has one <code>&lt;main&gt;</code> and a skip link above it",
      ],
      [false, "Motion respects <code>prefers-reduced-motion</code>"],
      [false, "Touch targets are at least 44&nbsp;&times;&nbsp;44 CSS pixels"],
      [false, "The page is usable at 200% zoom without horizontal scrolling"],
    ]),
    `<p>The first five cover the majority of what real users hit. If a team does nothing else for a quarter, doing those five well is a genuine improvement rather than a compliance gesture.</p>`,

    `<h2>The two passes tools cannot do</h2>`,
    `<p>Automated tools catch perhaps a third of real barriers. They are very good at contrast ratios and missing attributes, and blind to whether the experience makes sense. Two manual passes, fifteen minutes each, find the rest.</p>`,
    `<h3>Pass one: the keyboard</h3>`,
    `<p>Unplug the mouse. Complete the primary task — sign up, add to basket, submit the form. Watch for:</p>`,
    ul([
      "Focus disappearing entirely, usually into an element with <code>outline: none</code>",
      "Focus jumping somewhere unexpected after a dialog closes",
      "A custom dropdown that opens but cannot be operated with arrow keys",
      "Order that follows the CSS layout rather than the reading order",
    ]),
    figure(
      "a11y-focus-order.svg",
      "A form showing focus order following the reading order",
      "Focus order follows the DOM, not the visual layout — flexbox order and grid placement can silently break it.",
    ),
    `<h3>Pass two: the screen off</h3>`,
    `<p>Turn on the screen reader, turn off the monitor, complete the same task. This is uncomfortable the first time. <mark>That discomfort is the finding.</mark></p>`,
    `<p>You are listening for whether the page tells a coherent story: does the heading structure describe the content, do links make sense out of context, does an error say what went wrong and how to fix it?</p>`,

    `<h2>The five components that break most often</h2>`,
    table(
      ["Component", "What usually goes wrong", "The fix"],
      [
        [
          "Custom select",
          "Div soup with no keyboard support",
          "Use a native <code>&lt;select&gt;</code>, or a tested primitive",
        ],
        [
          "Modal dialog",
          "Focus escapes to the page behind it",
          "Trap focus, restore it on close, close on <code>Esc</code>",
        ],
        [
          "Icon-only button",
          "No accessible name at all",
          "<code>aria-label</code>, and check it reads naturally",
        ],
        [
          "Toast",
          "Appears and disappears silently",
          "A live region, and long enough to read",
        ],
        [
          "Data table",
          "Headers not associated with cells",
          "Real <code>&lt;th&gt;</code> with <code>scope</code>",
        ],
      ],
    ),
    `<p>Notice that four of the five are solved by not building the component yourself. The cheapest accessibility strategy available is using a primitive that someone else has already tested with assistive technology.</p>`,

    `<h2>Contrast, without the arguments</h2>`,
    `<p>Contrast is where design and accessibility collide most often, usually over a light grey that a brand guideline loves. The numbers are not negotiable, so settle them in the token layer rather than per component.</p>`,
    table(
      ["Content", "Minimum ratio"],
      [
        ["Body text", "4.5:1"],
        ["Large text (18.66px bold, or 24px)", "3:1"],
        ["Icons and form borders", "3:1"],
        ["Focus indicator against the background", "3:1"],
        ["Disabled text", "No minimum — but do not rely on it alone"],
      ],
    ),
    image("a11y-contrast.svg", "Contrast ratios shown on sample text", {
      width: 820,
    }),
    `<p>The last row is a trap. Disabled controls are exempt from contrast rules, which teams read as permission to make them unreadable. If a control's disabled state is the only signal that something is wrong, the page has a bigger problem than contrast.</p>`,

    `<h2>Forms, in detail</h2>`,
    `<p>Forms are where accessibility problems concentrate, because they are where the page stops being a document and starts being an application. Five rules cover most of it.</p>`,
    `<h3>1. Label everything, visibly</h3>`,
    `<p>A placeholder is not a label. It disappears when typing starts, it fails contrast requirements in most designs, and screen readers treat it inconsistently. Use a real <code>&lt;label&gt;</code> with a <code>for</code> attribute, and keep it visible.</p>`,
    code(`<!-- Wrong: the label vanishes as soon as the user types -->
<input type="email" placeholder="Email address">

<!-- Right: label persists, hint is associated, error is announced -->
<label for="email">Email address</label>
<input id="email" type="email" aria-describedby="email-hint email-error">
<p id="email-hint">We only use this to reply to your enquiry.</p>
<p id="email-error" role="alert">Enter an email address, like name@example.com</p>`),
    `<h3>2. Errors must be perceivable three ways</h3>`,
    `<p>Colour, text, and programmatic association. Red alone fails for colour-blind users; text alone fails if it is visually distant from the field; association alone fails if nobody announces it. Do all three.</p>`,
    `<h3>3. Say what to do, not what went wrong</h3>`,
    `<p>&ldquo;Invalid input&rdquo; describes the system's state. &ldquo;Enter a date after today&rdquo; describes the user's next action. The second one is shorter <em>and</em> more useful, which is rare enough to be worth noticing.</p>`,
    `<h3>4. Do not validate on every keystroke</h3>`,
    `<p>Announcing an error while someone is halfway through typing their email address is hostile to everyone and genuinely disorienting with a screen reader. Validate on blur, or on submit.</p>`,
    `<h3>5. Group related controls</h3>`,
    `<p>Radio buttons and checkbox groups need a <code>&lt;fieldset&gt;</code> and a <code>&lt;legend&gt;</code>, otherwise the question they answer is never announced — the user hears the options without the prompt.</p>`,

    `<h2>The ARIA rules that matter</h2>`,
    `<p>ARIA is powerful and mostly misused. Four rules will keep you out of trouble:</p>`,
    ol([
      "<strong>Prefer native elements.</strong> A <code>&lt;button&gt;</code> is keyboard accessible, focusable and announced correctly for free. A <code>&lt;div role=&quot;button&quot;&gt;</code> needs four attributes and two event handlers to catch up.",
      "<strong>Do not change native semantics</strong> unless you truly must. <code>&lt;h2 role=&quot;tab&quot;&gt;</code> removes the heading from the outline.",
      "<strong>Every interactive ARIA control must be keyboard operable.</strong> A role is a promise about behaviour; if you claim <code>role=&quot;menu&quot;</code>, arrow keys must work.",
      "<strong>Never put <code>aria-hidden=&quot;true&quot;</code> on a focusable element.</strong> It creates a control that can be reached but not announced — the worst of both.",
    ]),
    quote(
      "No ARIA is better than bad ARIA. An unstyled native control beats a beautiful one that lies about what it is.",
    ),

    `<h2>Why this is not optional</h2>`,
    `<p>Beyond it being the right thing to do, three practical pressures are converging: accessibility legislation now covers private-sector digital services in most of the markets our clients sell into; procurement processes increasingly require a conformance statement; and the population that benefits is far larger than the one usually imagined.</p>`,
    ul([
      "Roughly one in six people live with a significant disability",
      "Temporary and situational limitations — a broken wrist, bright sunlight, a noisy train — affect everyone at some point",
      "The oldest segment of your audience is growing fastest, and is the most likely to abandon a page that fights them",
    ]),
    `<p>The commercial argument is simply that a form which cannot be completed is a form that does not convert, whatever the reason it cannot be completed.</p>`,

    `<h2>Four myths worth retiring</h2>`,
    table(
      ["Myth", "Reality"],
      [
        [
          "&ldquo;It will make the design ugly&rdquo;",
          "Contrast and focus rings are design constraints like any other, and good designers work within constraints daily",
        ],
        [
          "&ldquo;Our users do not have disabilities&rdquo;",
          "You cannot know this, and your analytics certainly do not tell you — people who cannot use the site do not appear in it",
        ],
        [
          "&ldquo;We will do an audit before launch&rdquo;",
          "An audit at the end produces a backlog that competes with launch, and loses",
        ],
        [
          "&ldquo;The automated tool says we pass&rdquo;",
          "Tools catch about a third of real barriers and nothing about whether the experience makes sense",
        ],
      ],
    ),

    `<h2>Folding it into a normal week</h2>`,
    `<p>Nothing above requires a specialist. It requires the checks to happen at a point where fixing them is cheap.</p>`,
    ol([
      "<strong>At design</strong> — contrast checked in the token palette, focus states drawn alongside hover",
      "<strong>At review</strong> — the reviewer runs the keyboard pass on whatever the change touches",
      "<strong>In CI</strong> — automated rules for the mechanical checks, failing the build on a regression",
      "<strong>Quarterly</strong> — one screen-off pass through the primary journey",
    ]),
    code(`// Fail the build on new violations, not on the existing backlog.
const results = await axe.run(page);
const introduced = results.violations.filter(
  (v) => !baseline.some((b) => b.id === v.id && b.target === v.target),
);
if (introduced.length > 0) process.exit(1);`),
    `<p>Baselining matters. A team inheriting a large backlog cannot fix it in one sprint, and a build that fails on day one gets disabled by day three. Freeze the existing violations, block new ones, and burn the baseline down on a schedule.</p>`,

    `<h2>Writing for screen readers is writing for everyone</h2>`,
    `<p>Two habits improve the experience for every visitor:</p>`,
    ul([
      `Link text that describes the destination — ${link("https://webtechsolution.org/contact", "talk to our team")} rather than &ldquo;click here&rdquo;`,
      "Error messages that say what to do: &ldquo;Enter a date after today&rdquo; beats &ldquo;Invalid input&rdquo;",
    ]),
    `<p>Scientific notation renders fine in this editor too — H<sub>2</sub>O, 10<sup>6</sup> — which matters for clients publishing technical content and is worth checking in your own prose styles.</p>`,

    `<hr>`,
    `<h2>What to do on Monday</h2>`,
    `<p>Pick the single journey that matters most — the one that makes money. Run the keyboard pass on it. Fix what you find. That is a better first week than any audit, and it gives the team something concrete to argue from when the bigger conversation starts.</p>`,
    `<p style="text-align: center"><em>Accessibility is not a phase. It is a series of small checks at the point of change.</em></p>`,
  ].join(""),
};
