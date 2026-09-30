import { ol, quote, table, ul } from "./blocks";

/**
 * Managed content for the two CMS pages.
 *
 * These are full, readable policies written for a web development agency, not
 * placeholder text - but they are a starting point, not legal advice. Have a
 * solicitor review them before launch and fill in the two items marked with a
 * highlight: the registered entity's jurisdiction and the postal address.
 */

export type PageSeed = {
  slug: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  html: string;
  faqs: { question: string; answer: string }[];
};

const UPDATED = "1 October 2026";
const CONTACT = "hello@webtechsolution.org";
const mail = (address: string) =>
  `<a target="_blank" rel="noopener noreferrer" href="mailto:${address}">${address}</a>`;

export const PAGE_SEEDS: PageSeed[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description:
      "What Web Tech Solutions collects, why we collect it, who we share it with, how long we keep it and the choices you have.",
    metaTitle: "Privacy Policy",
    metaDescription:
      "How Web Tech Solutions handles personal data: the categories we collect, our legal basis, sub-processors, international transfers, retention periods, security measures and how to exercise your rights.",
    html: [
      `<p>This policy explains what personal data <strong>Web Tech Solutions</strong> ("we", "us") collects, why we collect it, and what you can do about it. It covers this website, our enquiry and onboarding process, and the administrative dashboard our staff use to publish content.</p>`,
      `<p>Client projects we build and host are covered by a separate data processing agreement with that client, who is the controller for data collected through their site. Where we host on their behalf we act as a <em>processor</em>, and this policy does not replace that agreement.</p>`,
      `<p><em>Last updated: ${UPDATED}. Previous versions are available on request.</em></p>`,

      `<h2>1. Who we are and how to reach us</h2>`,
      `<p>Web Tech Solutions is a web development and design studio. For anything in this policy, including access, correction or deletion requests, contact ${mail(CONTACT)}.</p>`,
      `<p><mark>Add the registered company name, number and postal address before publishing.</mark> If your organisation is required to appoint a data protection officer, name them here as well.</p>`,

      `<h2>2. A summary, in plain terms</h2>`,
      ul([
        "We collect as little as we can, and nothing we have no use for",
        "We <strong>never</strong> sell, rent or trade personal data, and we do not share it with advertisers",
        "Non-essential cookies and embedded third-party content load only after you agree",
        "You can ask for a copy of what we hold, or ask us to delete it, and we will answer within 30 days",
      ]),

      `<h2>3. What we collect and why</h2>`,
      `<p>The table below is the complete list for this website. If we ever need something outside it, we will ask you first and explain why.</p>`,
      table(
        ["Category", "Examples", "Why we have it", "Retention"],
        [
          [
            "Enquiry data",
            "Name, email, company, the message you send",
            "To answer your enquiry and keep a record of the conversation",
            "24 months after last contact",
          ],
          [
            "Client project data",
            "Billing contact, project correspondence, invoices",
            "To deliver work and meet accounting obligations",
            "7 years (statutory)",
          ],
          [
            "Usage analytics",
            "Pages viewed, referrer, approximate region, device type",
            "To see which pages are used and where they fail",
            "14 months",
          ],
          [
            "Server logs",
            "IP address, user agent, request path, timestamp",
            "Security, abuse prevention and debugging",
            "30 days",
          ],
          [
            "Dashboard accounts",
            "Name, email, role, sign-in timestamps",
            "To let named staff publish and edit content",
            "While the account is active, then 90 days",
          ],
          [
            "Uploaded media",
            "Images and documents added to the site",
            "To render the published pages",
            "Until deleted by an editor",
          ],
        ],
      ),
      `<p>We do <strong>not</strong> collect special category data (health, biometrics, political or religious belief, sexual orientation), we do not buy personal data from brokers, and we do not carry out automated decision-making or profiling that produces legal effects.</p>`,

      `<h2>4. Our legal basis for each purpose</h2>`,
      ul([
        "<strong>Legitimate interests</strong> — answering enquiries, keeping the site secure, understanding how it is used. We have assessed these against your rights and keep a record of that assessment.",
        "<strong>Consent</strong> — any non-essential cookie, analytics, or embedded third-party content. You may withdraw it at any time without affecting anything before withdrawal.",
        "<strong>Contract</strong> — data needed to deliver work you have engaged us for.",
        "<strong>Legal obligation</strong> — records we are required to keep, such as invoices and tax records.",
      ]),

      `<h2>5. Cookies and local storage</h2>`,
      `<p>Essential storage only, unless you opt in to more.</p>`,
      table(
        ["Name", "Type", "Purpose", "Expires"],
        [
          [
            "Theme preference",
            "Local storage",
            "Remembers light or dark mode on your device",
            "Until cleared",
          ],
          [
            "Session cookie",
            "Essential cookie",
            "Keeps staff signed in to the dashboard",
            "30 days",
          ],
          [
            "Consent record",
            "Essential cookie",
            "Remembers your cookie choice",
            "12 months",
          ],
          ["Analytics", "Optional", "Aggregate usage statistics", "14 months"],
        ],
      ),
      quote(
        "You can clear this storage at any time in your browser settings. Nothing on the public site stops working if you do.",
      ),

      `<h2>6. Who we share data with</h2>`,
      `<p>We use a small number of processors to run this site. Each is bound by a data processing agreement and receives only what their service requires.</p>`,
      table(
        ["Processor", "Function", "Data involved"],
        [
          [
            "Hosting provider",
            "Serving the website",
            "Server logs, IP addresses",
          ],
          [
            "Database provider",
            "Storing content and accounts",
            "Dashboard accounts, published content",
          ],
          [
            "Object storage provider",
            "Storing images and files",
            "Uploaded media",
          ],
          [
            "Email provider",
            "Sending and receiving mail",
            "Enquiry correspondence",
          ],
          ["Identity provider", "Staff sign-in", "Name, email address"],
        ],
      ),
      `<p>We will also disclose data where the law requires it, or to establish or defend a legal claim. If we are ever compelled to hand over data about you, we will tell you unless we are legally prohibited from doing so.</p>`,
      `<p>We do not share data with advertising networks, data brokers or social platforms, and there are no advertising pixels on this site.</p>`,

      `<h2>7. International transfers</h2>`,
      `<p>Some processors operate outside your country. Where that happens we rely on the standard contractual clauses, an adequacy decision, or an equivalent safeguard, and we have assessed the transfer in each case. We will tell you which applies to a specific service if you ask.</p>`,

      `<h2>8. How long we keep things</h2>`,
      `<p>Retention periods are in the table in section 3. Two principles sit behind them: we keep correspondence long enough to have context if you come back to us, and we keep financial records for the period the law requires. When a period expires the data is deleted or irreversibly anonymised, including in backups on their own rolling schedule.</p>`,

      `<h2>9. Your rights</h2>`,
      `<p>Depending on where you live, you can ask us to:</p>`,
      ol([
        "<strong>Access</strong> — give you a copy of the data we hold about you",
        "<strong>Rectify</strong> — correct anything inaccurate or incomplete",
        "<strong>Erase</strong> — delete it, where we have no overriding legal obligation to keep it",
        "<strong>Restrict</strong> — pause a particular use while a dispute is resolved",
        "<strong>Object</strong> — to processing based on legitimate interests, including any direct marketing",
        "<strong>Port</strong> — receive it in a structured, machine-readable format, or have it sent to another provider",
        "<strong>Withdraw consent</strong> — at any time, for anything we do on that basis",
      ]),
      `<p>Write to ${mail(CONTACT)} from the address you contacted us with, or give us enough detail to identify the record. We respond within <strong>30 days</strong> and there is no charge for a reasonable request. If we need more time for a complex request we will tell you within those 30 days and explain why.</p>`,
      `<p>If you are not satisfied with our response you may complain to your local data protection authority. We would rather you came to us first, but you are not required to.</p>`,

      `<h2>10. Security</h2>`,
      ul([
        "All traffic is encrypted in transit with TLS; stored data is encrypted at rest by our providers",
        "Dashboard access is limited to named administrators and protected by their identity provider's two-factor authentication",
        "Production data access is restricted to the people who need it, and reviewed when someone leaves",
        "Dependencies are monitored for known vulnerabilities and patched on a defined schedule",
      ]),
      `<p>No system is perfect. If a breach affects your personal data we will notify the relevant authority within 72 hours of becoming aware, and tell you directly where there is a high risk to your rights.</p>`,

      `<h2>11. Children</h2>`,
      `<p>This site is aimed at businesses and is not directed at children under 16. We do not knowingly collect their data. If you believe we have, contact us and we will delete it.</p>`,

      `<h2>12. Automated decisions and profiling</h2>`,
      `<p>We do not make automated decisions that produce legal or similarly significant effects. Analytics are aggregated and are not used to build individual profiles.</p>`,

      `<hr>`,
      `<h2>13. Changes to this policy</h2>`,
      `<p>If we make a material change we will update the date at the top and, where the change affects how we use data you have already given us, tell you directly rather than relying on you to notice.</p>`,
    ].join(""),
    faqs: [
      {
        question: "Do you sell my personal data?",
        answer:
          "No. We do not sell, rent or trade personal data, we do not share it with advertisers or data brokers, and there are no advertising pixels on this site. It is used only for the purposes listed in this policy.",
      },
      {
        question: "Do you use tracking cookies?",
        answer:
          "Only with your consent. Without it the site stores three things, all essential: your light or dark theme preference, your cookie choice itself, and a session cookie if you are a member of staff signed in to the dashboard.",
      },
      {
        question: "How do I get a copy of my data, or have it deleted?",
        answer: `Email ${CONTACT} from the address you contacted us with, or give us enough detail to identify the record. We respond within 30 days, and there is no charge for a reasonable request.`,
      },
      {
        question: "How long do you keep enquiry emails?",
        answer:
          "Up to 24 months after our last exchange, so we have context if you come back to us. You can ask us to delete the thread sooner and we will, unless it relates to an active contract or an invoice we must keep for tax purposes.",
      },
      {
        question: "Where is my data stored, and does it leave my country?",
        answer:
          "With our hosting, database, storage, email and identity providers. Some operate outside your country, in which case we rely on standard contractual clauses, an adequacy decision or an equivalent safeguard. We can confirm the location for any specific service on request.",
      },
      {
        question: "What happens to data on a site you built for a client?",
        answer:
          "That client is the data controller and their own privacy policy applies. Where we host or maintain the site we act as their processor under a data processing agreement, and we only handle data on their documented instructions.",
      },
      {
        question: "What do you do if there is a data breach?",
        answer:
          "We notify the relevant supervisory authority within 72 hours of becoming aware, and contact affected individuals directly where there is a high risk to their rights. We also publish what changed to prevent a recurrence.",
      },
    ],
  },

  {
    slug: "terms-and-conditions",
    title: "Terms and Conditions",
    description:
      "The terms for using this website, and the standard terms that apply when you engage Web Tech Solutions for a project.",
    metaTitle: "Terms and Conditions",
    metaDescription:
      "Terms of use for the Web Tech Solutions website plus our standard project terms: quotes, payment, change control, intellectual property, warranties, liability, termination and dispute resolution.",
    html: [
      `<p>These terms govern your use of this website and set out the standard terms we work under. A signed proposal or statement of work always takes precedence where it says something different; these terms fill the gaps rather than override them.</p>`,
      `<p><em>Last updated: ${UPDATED}</em></p>`,

      `<h2>1. Definitions</h2>`,
      table(
        ["Term", "Meaning"],
        [
          ["<strong>We</strong>, <strong>us</strong>", "Web Tech Solutions"],
          [
            "<strong>You</strong>, <strong>the client</strong>",
            "The person or organisation engaging us, or using this site",
          ],
          [
            "<strong>Proposal</strong>",
            "The written scope, price and schedule we issue for a project",
          ],
          [
            "<strong>Deliverables</strong>",
            "The designs, code, content and documentation produced under a proposal",
          ],
          [
            "<strong>Defect</strong>",
            "A deviation from the agreed specification, not a change of mind or a new requirement",
          ],
        ],
      ),

      `<h2>2. Using this website</h2>`,
      `<p>You may read, print and share the content here for your own use. You may not:</p>`,
      ul([
        "Republish substantial parts of it as your own work",
        "Attempt to gain unauthorised access to any part of the site or its infrastructure",
        "Scrape it at a rate that degrades the service for others",
        "Use it to distribute malware or unlawful material",
        "Remove or obscure any attribution or copyright notice",
      ]),
      `<p>We may suspend access to anyone breaching these terms, and we may change or withdraw any part of the site without notice.</p>`,

      `<h2>3. Content and accuracy</h2>`,
      `<p>Articles here are general information. We keep them current where we can, but <strong>they are not professional advice</strong> and we do not warrant that every detail is correct or applicable to your circumstances. Decisions you take based on them are your own.</p>`,
      `<p>External links are provided for convenience. We do not control those sites and are not responsible for their content or their handling of your data.</p>`,

      `<h2>4. Intellectual property in this site</h2>`,
      `<p>The text, design, code and images here belong to Web Tech Solutions or our licensors. Trade marks shown remain the property of their owners. Ownership of project work is dealt with separately in section 9.</p>`,

      `<h2>5. Quotes, scope and payment</h2>`,
      table(
        ["Term", "What it means"],
        [
          ["Quote validity", "30 days from issue, unless stated otherwise"],
          [
            "Deposit",
            "Typically 40% before work begins; the project is scheduled once received",
          ],
          ["Milestones", "Usually 30% at design sign-off and 30% at launch"],
          ["Invoices", "Payable within 14 days of issue"],
          [
            "Late payment",
            "Work may be paused after 14 days overdue; statutory interest may apply",
          ],
          [
            "Expenses",
            "Third-party licences, stock assets and hosting are passed through at cost",
          ],
        ],
      ),
      `<p>Prices exclude any applicable sales tax or VAT, which is added at the prevailing rate. Where a project is paused at your request for more than 30 days, we may re-schedule it and invoice for work completed to that point.</p>`,

      `<h2>6. Change control</h2>`,
      `<p>Anything not written into the agreed scope is a change request. We will not refuse small ones, but we will tell you what they cost <u>before</u> doing them rather than after. A change request is confirmed in writing, with its price and its effect on the schedule, before work starts.</p>`,
      quote(
        "Scope added quietly is the most common reason a fixed price stops being fixed. Writing it down protects both sides.",
      ),

      `<h2>7. Your responsibilities</h2>`,
      ol([
        "Supply content, brand assets and access credentials in the agreed format and on the dates in the schedule",
        "Name <strong>one person</strong> who can approve work and resolve internal disagreements",
        "Confirm that everything you give us is yours to use, or properly licensed",
        "Review deliverables within the agreed window, so the schedule holds",
        "Maintain your own accounts with third parties such as domain registrars, payment providers and analytics platforms",
      ]),
      `<p>Where delays in approvals, content or access push the schedule, timelines move accordingly and we will tell you by how much at the time.</p>`,

      `<h2>8. Acceptance</h2>`,
      `<p>Deliverables are deemed accepted when you confirm in writing, or <strong>ten working days</strong> after delivery if we have heard nothing, or when the site goes live — whichever happens first. Acceptance does not affect your rights under the warranty in section 10.</p>`,

      `<h2>9. Ownership of project work</h2>`,
      `<p>On <strong>full payment</strong>, the custom code, designs and content we produce for your project transfer to you. Two exceptions:</p>`,
      ul([
        "<strong>Open-source components</strong> remain under their own licences, which we will list on request",
        "<strong>Our pre-existing tools, libraries and know-how</strong> remain ours, licensed to you perpetually, irrevocably and free of charge for use in that project",
      ]),
      `<p>Until full payment is received, all deliverables remain our property and any licence to use them is suspended.</p>`,
      `<p>We may describe the work and show screenshots in our portfolio and case studies unless you ask us in writing not to.</p>`,

      `<h2>10. Warranty and support</h2>`,
      `<p>We fix defects in our work free of charge for <strong>30 days</strong> after launch. A defect is a deviation from the agreed specification. It is not a new requirement, a change of mind, a fault in third-party software or hosting, or a problem caused by changes someone else made after handover.</p>`,
      `<p>Ongoing support, maintenance and hosting are available under a separate agreement with its own response times.</p>`,

      `<h2>11. Third-party services</h2>`,
      `<p>Projects often rely on services we do not control — payment gateways, analytics, CRMs, hosting platforms, mapping and font providers. We integrate them carefully, but their availability, pricing, terms and continued existence are theirs. We are not liable for their outages, price changes or withdrawal, and where such a change requires rework, that rework is a change request.</p>`,

      `<h2>12. Confidentiality</h2>`,
      `<p>Each of us will keep the other's confidential information private, use it only for the project, and protect it as carefully as our own. This does not apply to information that is public, already known, independently developed, or required to be disclosed by law. These obligations continue for three years after the project ends.</p>`,

      `<h2>13. Data protection</h2>`,
      `<p>Where we process personal data on your behalf we act as your processor, on your documented instructions, under a separate data processing agreement. Our handling of data you give us directly is described in our Privacy Policy.</p>`,

      `<h2>14. Limitation of liability</h2>`,
      `<p>Nothing in these terms limits liability for death or personal injury caused by negligence, for fraud or fraudulent misrepresentation, or for anything else that cannot lawfully be limited.</p>`,
      `<p>Subject to that:</p>`,
      ul([
        "Our total liability for all claims arising from a project is capped at the fees paid for the work the claim relates to",
        "Neither party is liable for loss of profit, revenue, data, business or goodwill, or for any indirect or consequential loss",
        "You are responsible for maintaining your own backups of content and data after handover",
      ]),

      `<h2>15. Termination</h2>`,
      `<p>Either side may end a project in writing at any time. On termination you pay for work completed and any commitments already made on your behalf up to that date; we hand over what has been produced and paid for, in a usable format, within ten working days.</p>`,
      `<p>We may terminate immediately if an invoice is more than 30 days overdue, or if we are asked to do something unlawful.</p>`,

      `<h2>16. Force majeure</h2>`,
      `<p>Neither party is liable for delay caused by events outside its reasonable control. If such an event continues for more than 60 days, either party may terminate and section 15 applies.</p>`,

      `<h2>17. Disputes</h2>`,
      `<p>If something goes wrong, raise it with us first — most disagreements are a misunderstanding about scope and are resolved in a conversation. If we cannot settle it within 30 days, the parties will attempt mediation before starting proceedings.</p>`,

      `<h2>18. General</h2>`,
      ul([
        "Neither party may assign the agreement without the other's written consent, except to a successor of its business",
        "If any clause is unenforceable, the rest continues in force",
        "A failure to enforce a term is not a waiver of it",
        "There are no third-party beneficiaries to these terms",
        "The proposal and these terms are the entire agreement between us on their subject matter",
      ]),

      `<hr>`,
      `<h2>19. Governing law</h2>`,
      `<p>These terms are governed by the laws of the jurisdiction in which Web Tech Solutions is registered, and its courts have exclusive jurisdiction. <mark>Confirm the jurisdiction with your solicitor and state it explicitly before publishing.</mark></p>`,

      `<h2>20. Contact</h2>`,
      `<p>Questions about these terms? Write to ${mail(CONTACT)} and we will answer in plain language.</p>`,
    ].join(""),
    faqs: [
      {
        question: "Who owns the website once it is finished?",
        answer:
          "You do, once the final invoice is paid. Custom code, designs and content transfer to you. Open-source components keep their own licences, and our pre-existing tools and libraries stay ours but are licensed to you permanently and free of charge for use in that project.",
      },
      {
        question: "What are your payment terms?",
        answer:
          "Typically 40% to start, 30% at design sign-off and 30% at launch, each invoice payable within 14 days. Quotes stay valid for 30 days, and prices exclude any applicable sales tax or VAT.",
      },
      {
        question: "What happens if we want to change the scope mid-project?",
        answer:
          "We quote the change before doing it, including its effect on the schedule, and confirm it in writing. Small adjustments are usually absorbed; anything that affects cost or timeline is agreed first, so there are no surprises on the invoice.",
      },
      {
        question: "Do you fix bugs after launch?",
        answer:
          "Yes. Defects against the agreed specification are fixed free for 30 days after launch. New features, changes of mind, and faults in third-party services or hosting fall outside that. Ongoing maintenance is available under a separate agreement.",
      },
      {
        question: "Can we cancel a project?",
        answer:
          "Yes, in writing at any time. You pay for work completed and any commitments already made on your behalf, and we hand over everything produced and paid for within ten working days.",
      },
      {
        question: "Do you charge hourly?",
        answer:
          "Not for project work. We quote a fixed price against a fixed scope, because hourly billing rewards slowness and makes every conversation a meter running. Retainers and support agreements are priced per month.",
      },
      {
        question: "Will you show our project in your portfolio?",
        answer:
          "We may describe the work and show screenshots unless you ask us in writing not to. If your project is confidential, tell us at the start and we will record that in the proposal.",
      },
    ],
  },
];
