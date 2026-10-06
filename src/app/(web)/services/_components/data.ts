import type { ComponentType } from "react";
import {
  CodeIcon,
  CursorClickIcon,
  DeviceMobileIcon,
  FileTextIcon,
  GoogleIcon,
  HandshakeIcon,
  LinkIcon,
  MailIcon,
  MapPinIcon,
  MegaphoneIcon,
  PencilRulerIcon,
  PenNibIcon,
  SearchIcon,
  ShareIcon,
  VideoIcon,
} from "@/components/icons";

export type ServiceGroup = "core" | "marketing";

export type Point = { title: string; body: string };

export type Service = {
  slug: string;
  name: string;
  group: ServiceGroup;
  icon: ComponentType<{ className?: string }>;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  hero: { title: string; accent: string; intro: string };
  why: string;
  offersTitle?: string;
  offersIntro?: string;
  offers: Point[];
  importance: Point;
  pillars?: Point[];
  reasons?: { lede: string; items: Point[] };
  topic: string;
};

export const imageOf = (slug: string) => `/images/services/${slug}.webp`;
export const serviceHref = (slug: string) => `/services/${slug}`;

export const DEFAULT_PILLARS: Point[] = [
  {
    title: "Innovations",
    body: "We bring fresh, creative innovations to every project we take on.",
  },
  {
    title: "Action Plans",
    body: "Our clear, strategic action plans turn ideas into impactful results.",
  },
  {
    title: "Big Projects",
    body: "We confidently handle big projects with precision and expertise.",
  },
  {
    title: "Great Tests",
    body: "Every solution we deliver passes great tests of quality and performance.",
  },
];

const GENERIC_WHY =
  "We combine creativity, expertise, and results-driven strategies to deliver solutions that truly make a difference.";

const OFFERS_INTRO =
  "Discover our range of professional services designed to elevate your brand, boost engagement, and drive business growth.";

export const SERVICES: Service[] = [
  {
    slug: "seo",
    name: "SEO",
    group: "core",
    icon: SearchIcon,
    summary:
      "Improve your search rankings with tailored SEO strategies that drive organic traffic and conversions.",
    metaTitle: "Affordable SEO Services - WebTech Solutions",
    metaDescription:
      "Boost your online presence with our professional SEO services. We drive traffic and help your business grow through SEO strategies.",
    hero: {
      title: "Search engine",
      accent: "optimization (SEO)",
      intro:
        "Boost your online visibility with WebTech Solutions’ expert SEO services. With 13 years of experience, we offer result-driven strategies, keyword optimization, and technical audits to improve rankings, increase traffic, and grow your business organically.",
    },
    why: "Free SEO audit, WebTech Solutions’ experts with 13+ years of experience, keyword optimization, and technical audits to improve rankings and increase traffic.",
    offersIntro: OFFERS_INTRO,
    offers: [
      {
        title: "AI Assisted SEO",
        body: "We use AI tools and smart data analysis to find keyword opportunities, improve content, automate routine SEO tasks, and make better decisions based on search performance.",
      },
      {
        title: "On-Page SEO",
        body: "Optimize your website’s content, meta tags, and structure to improve search engine rankings and user experience.",
      },
      {
        title: "Off-Page SEO",
        body: "Enhance your site’s authority through strategic link-building, social media engagement, and influencer outreach.",
      },
      {
        title: "Technical SEO",
        body: "Address backend issues like site speed, mobile responsiveness, schema markup implementation, and crawlability to ensure search engines can efficiently index your site.",
      },
      {
        title: "Local SEO",
        body: "Target local customers with our Local SEO strategy, optimizing your Google Business Profile, NAP, and ensuring consistency across local directories.",
      },
      {
        title: "SEO Audits",
        body: "Conduct comprehensive audits to identify areas for improvement and develop strategies to enhance your site’s performance.",
      },
      {
        title: "Landing Page SEO",
        body: "Design and optimize landing pages that convert visitors into customers, focusing on relevant keywords and compelling calls-to-action.",
      },
      {
        title: "E-commerce SEO",
        body: "Improve your online store’s visibility by optimizing product descriptions, category pages, and implementing structured data for better search engine understanding.",
      },
    ],
    importance: {
      title: "Importance of SEO",
      body: "Most customers search before they buy. SEO puts your business in front of them at that exact moment — and unlike paid ads, the visibility keeps working long after the work is done. It is the foundation the rest of your marketing builds on.",
    },
    pillars: [
      {
        title: "Innovations",
        body: "We integrate the latest SEO tools and methodologies to craft innovative strategies that deliver measurable results.",
      },
      {
        title: "Action Plans",
        body: "Our step-by-step action plans are designed to systematically improve your site’s SEO performance, ensuring long-term success.",
      },
      {
        title: "Big Projects",
        body: "Equipped to handle large-scale SEO projects, we provide scalable solutions that align with your expanding business needs.",
      },
      {
        title: "Great Tests",
        body: "Every strategy undergoes rigorous testing to ensure effectiveness, allowing us to refine our approach for optimal outcomes.",
      },
    ],
    topic: "SEO",
  },
  {
    slug: "content-writing",
    name: "Content Writing",
    group: "core",
    icon: PenNibIcon,
    summary:
      "Deliver compelling, SEO-friendly content that informs and converts.",
    metaTitle: "Best SEO Content Writing Services - WebTech Solutions",
    metaDescription:
      "Expert writers at WebTech Solutions write appealing, high-quality, and SEO-friendly content according to our clients’ target audience.",
    hero: {
      title: "SEO content",
      accent: "writing services",
      intro:
        "Get high-quality, SEO-optimized content that aligns with Google’s E-E-A-T standards. At WebTech Solutions, we create authoritative, engaging blogs, web copy, and articles that boost rankings, drive traffic, and build audience trust with 13 years of experience.",
    },
    why: "High-quality, SEO-optimized, well-researched content using LSI keywords that aligns with Google’s E-E-A-T standards.",
    offersTitle: "Our content writing process",
    offersIntro: OFFERS_INTRO,
    offers: [
      {
        title: "Discovery & Strategy",
        body: "We begin with understanding your brand, target audience, and goals to shape a tailored content plan.",
      },
      {
        title: "Research & Keyword Planning",
        body: "Each piece is backed by keyword and topic research to ensure visibility and relevance in search.",
      },
      {
        title: "Drafting & Editing",
        body: "Our experts craft polished, compelling content, followed by thorough editing to ensure clarity, coherence, and correctness.",
      },
      {
        title: "Feedback & Revision",
        body: "Your feedback guides refinements. We include revision rounds to ensure the final result fits your brand voice.",
      },
      {
        title: "Performance Analysis",
        body: "Receive easy-to-read reports tracking content engagement and SEO impact — so you can see real results.",
      },
    ],
    importance: {
      title: "Importance of Content Writing",
      body: "SEO content writing transforms your website into a traffic magnet. By blending creativity with strategy, it boosts visibility, engages readers, and converts visitors into paying customers. It is how you turn words into visibility, clicks, and loyal customers. It’s not just writing — it’s growth powered by words.",
    },
    topic: "content writing",
  },
  {
    slug: "link-building",
    name: "Link Building",
    group: "core",
    icon: LinkIcon,
    summary: "Ethical link-building campaigns that boost SEO performance.",
    metaTitle: "Scalable White Label Link Building Services (13+ Years)",
    metaDescription:
      "Partner with a trusted white label link building team. Editorial links, digital PR, and long-term SEO growth backed by 13+ years.",
    hero: {
      title: "White label",
      accent: "link building services",
      intro:
        "Earn real backlinks that build trust, authority, and AI visibility. With 13 years of hands-on experience, we help agencies secure genuine editorial links and brand mentions on relevant, trusted websites. Our approach combines relationship-based outreach, digital PR placements, and content-led link earning — so clients grow visibility and traffic with long-term stability.",
    },
    why: "We rely on ethical, editorial link-earning methods focused on relevance and quality. Every campaign is built for long-term growth and supported by clear, transparent reporting you can trust.",
    offersTitle: "How we help you build white-label backlinks",
    offersIntro:
      "How WebTech Solutions delivers measurable results — from planning to reporting.",
    offers: [
      {
        title: "Discovery & Backlink Strategy Planning",
        body: "We analyze your niche, content assets, and opportunities to identify optimal backlink sources.",
      },
      {
        title: "Customized Outreach Execution",
        body: "Our team drafts custom pitches, secures placements, and negotiates link terms on your behalf.",
      },
      {
        title: "Content Development (where needed)",
        body: "We create or optimize content to meet the editorial requirements of partner sites — ensuring mutual value.",
      },
      {
        title: "Monitoring & Reporting",
        body: "Receive status updates, live tracking, and performance insights to evaluate campaign impact.",
      },
      {
        title: "Competitor Backlink Analysis",
        body: "Analyze competitors’ backlink profiles to identify opportunities and build superior links that boost your website’s performance.",
      },
    ],
    importance: {
      title: "Importance of Link Building",
      body: "Link earning isn’t about chasing authority scores anymore — it’s about building trust and clarity around a brand. When your clients earn editorial links and brand mentions from relevant, reputable websites, search engines and AI systems better understand who they are, what they do, and why they’re credible. We approach link building as a long-term authority strategy, not a volume game: stronger organic visibility, qualified referral traffic, and SEO growth that holds up in competitive markets — all delivered quietly under your brand.",
    },
    reasons: {
      lede: "Choosing a white-label partner isn’t just about links — it’s about trust, consistency, and protecting your brand. We work as an extension of your agency, quietly supporting your clients’ growth while you stay in control.",
      items: [
        {
          title: "Built on 13 Years of Real Experience",
          body: "We’ve been supporting SEO campaigns for over 13 years, adapting through every major algorithm update. Our strategies are shaped by experience — not trends.",
        },
        {
          title: "Quality Over Volume, Always",
          body: "Relevant editorial links and brand mentions, earned from trusted websites that make sense for your clients’ niche. No mass placements, no shortcuts.",
        },
        {
          title: "Designed for Agencies",
          body: "Fully white label, with clear communication and client-ready reporting. We never contact your clients, and we never compete with your agency.",
        },
        {
          title: "Transparent, Predictable Process",
          body: "You’ll always know what’s happening, what’s been delivered, and what’s next. Our process is clear, repeatable, and built for scale.",
        },
        {
          title: "Future-Focused SEO",
          body: "Beyond rankings, our work supports brand trust, entity recognition, and AI visibility — helping your clients stay visible as search evolves.",
        },
      ],
    },
    topic: "link building",
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    group: "core",
    icon: ShareIcon,
    summary:
      "Engage, inspire, and convert audiences through impactful social media storytelling.",
    metaTitle: "Social Media Marketing Services - WebTech Solutions",
    metaDescription:
      "WebTech Solutions creates data-driven social media strategies and campaigns to increase brand visibility and drive traffic.",
    hero: {
      title: "Social media",
      accent: "marketing",
      intro:
        "Boost your sales and grow your brand with WebTech Solutions’ social media marketing. We work as your partner — planning, creating, and managing campaigns that spark engagement, build trust, and turn followers into customers, with clear reporting and measurable results.",
    },
    why: "We don’t just manage your social media — we grow it with strategy, creativity, and results you can actually see.",
    offersIntro:
      "We create social media strategies that spark conversations, build loyal communities, and strengthen your brand presence across platforms.",
    offers: [
      {
        title: "Social Media Marketing Strategy",
        body: "Develop customized plans to enhance brand visibility.",
      },
      {
        title: "Content Creation",
        body: "Produce engaging posts, images, and videos for social media.",
      },
      {
        title: "Paid Social Advertising",
        body: "Reach a wider audience through targeted ads and optimize ad campaigns for better ROI.",
      },
      {
        title: "Community Management",
        body: "Foster relationships and manage audience interactions.",
      },
      {
        title: "Analytics & Reporting",
        body: "Monitor campaign performance and optimize strategies.",
      },
    ],
    importance: {
      title: "Why Social Media Marketing?",
      body: "Social media is no longer optional — it’s where your audience lives, engages, and makes buying decisions. Effective social media marketing builds brand authority, drives targeted traffic, and turns followers into loyal customers.",
    },
    topic: "social media marketing",
  },
  {
    slug: "email-marketing",
    name: "Email Marketing",
    group: "core",
    icon: MailIcon,
    summary:
      "Nurture leads and build loyalty with personalized email campaigns.",
    metaTitle: "Email Marketing Services - WebTech Solutions",
    metaDescription:
      "WebTech Solutions’ email marketing service includes writing email content, audience segmentation and optimizing campaigns for better engagement.",
    hero: {
      title: "Email",
      accent: "marketing",
      intro:
        "Grow smarter with WebTech Solutions’ professional email marketing services. We create targeted, well-designed campaigns, automate customer journeys, and continuously optimize results to improve engagement, conversions, and ROI — understanding your goals, refining your message, and turning subscribers into long-term customers.",
    },
    why: "We treat your growth like our own — and every strategy we use is backed by real results.",
    offersIntro: OFFERS_INTRO,
    offers: [
      {
        title: "Email Campaign Strategy",
        body: "Develop targeted email marketing plans.",
      },
      {
        title: "Personalized Email Automation",
        body: "Create personalized, automated email sequences.",
      },
      {
        title: "Email Copywriting",
        body: "Write compelling subject lines and engaging content.",
      },
      {
        title: "List Management",
        body: "Maintain and segment email lists for better targeting.",
      },
      {
        title: "Performance Tracking",
        body: "Analyze email metrics for optimization.",
      },
    ],
    importance: {
      title: "Importance of Email Marketing",
      body: "Your customers check their inbox every day — email marketing ensures your brand is right there with them. From promotions to personalized updates, effective email campaigns keep your audience engaged, build trust, and turn subscribers into loyal buyers. Smart email marketing connects your brand with the right people, at the right time, with the right message.",
    },
    topic: "email marketing",
  },
  {
    slug: "web-designing",
    name: "Web Designing",
    group: "core",
    icon: PencilRulerIcon,
    summary: "Modern, user-focused designs that elevate your online presence.",
    metaTitle: "Web Designing Services - WebTech Solutions",
    metaDescription:
      "We create visually stunning, user-friendly, and responsive websites that provide a seamless user experience and drive business growth.",
    hero: {
      title: "Web",
      accent: "designing",
      intro:
        "We design visually striking, user-focused websites that look great on every device and make the next step obvious — from brand-new sites and redesigns to high-converting landing pages.",
    },
    why: "We create visually stunning, conversion-focused designs that capture attention and turn visitors into loyal customers.",
    offersIntro: OFFERS_INTRO,
    offers: [
      {
        title: "Website Design",
        body: "Develop aesthetically appealing and functional websites.",
      },
      {
        title: "UI/UX Design",
        body: "Optimize user experience and interface design.",
      },
      {
        title: "Mobile-Friendly Design",
        body: "Create responsive websites for all devices.",
      },
      {
        title: "Website Redesign",
        body: "Revamp outdated websites for a modern look.",
      },
      {
        title: "Landing Page Design",
        body: "Develop high-converting pages for campaigns.",
      },
    ],
    importance: {
      title: "Importance of Web Designing",
      body: "Your website is often the first impression customers have of your brand. Great web design makes that impression count by combining beauty with functionality. From mobile responsiveness to intuitive navigation, effective design keeps visitors engaged and encourages them to take action — whether that’s making a purchase, booking a service, or reaching out to you.",
    },
    topic: "web design",
  },
  {
    slug: "web-develpment",
    name: "Web Development",
    group: "core",
    icon: CodeIcon,
    summary:
      "Create fast, secure, and scalable websites built for performance.",
    metaTitle: "Web Development Services - WebTech Solutions",
    metaDescription:
      "Take your business to an advanced level using the professional web development services of WebTech Solutions and generate more revenue.",
    hero: {
      title: "Web",
      accent: "development",
      intro:
        "We build fast, secure, and scalable websites — custom builds, online stores, and SEO-friendly development — and keep them updated and running smoothly after launch.",
    },
    why: "Our web development process ensures functionality, scalability, and performance — crafted to meet your unique business goals.",
    offersIntro: OFFERS_INTRO,
    offers: [
      {
        title: "Custom Web Development",
        body: "We develop a unique, high-performing website built around your business.",
      },
      {
        title: "Responsive Design",
        body: "We ensure your website looks great on all devices.",
      },
      {
        title: "E-Commerce Solutions",
        body: "Build a secure and scalable online store for your business.",
      },
      {
        title: "SEO-Friendly Development",
        body: "We optimize your website for search engines to improve visibility.",
      },
      {
        title: "Website Maintenance & Support",
        body: "We make sure that your site is updated, secure, and running smoothly.",
      },
    ],
    importance: {
      title: "Importance of Web Development",
      body: "Web development is the backbone of your digital presence — ensuring speed, security, and scalability for long-term success. Strong web development turns ideas into powerful online platforms that engage, convert, and grow your business.",
    },
    topic: "web development",
  },
  {
    slug: "app-development",
    name: "App Development",
    group: "core",
    icon: DeviceMobileIcon,
    summary:
      "Transform ideas into powerful mobile apps with seamless functionality.",
    metaTitle: "Custom App Development Services - WebTech Solutions",
    metaDescription:
      "Build custom Android and iOS apps with WebTech Solutions. We develop secure, scalable, and business-focused mobile applications tailored to your goals.",
    hero: {
      title: "App development",
      accent: "services",
      intro:
        "We build custom Android and iOS applications that solve real business challenges, improve customer experiences, and help companies launch reliable digital products that grow with their business.",
    },
    why: "With 12+ years of industry experience, WebTech Solutions delivers reliable, innovative, and results-driven mobile app solutions tailored to your business needs.",
    offersIntro: OFFERS_INTRO,
    offers: [
      {
        title: "Custom App Development",
        body: "We build a unique mobile app tailored to your business needs.",
      },
      {
        title: "iOS & Android Development",
        body: "We develop apps for both iOS and Android platforms with seamless functionality.",
      },
      {
        title: "UI/UX Design",
        body: "Deliver an intuitive and visually appealing user experience with our app design services.",
      },
      {
        title: "App Testing & Optimization",
        body: "We ensure your app runs smoothly with rigorous testing.",
      },
      {
        title: "App Maintenance & Support",
        body: "We keep your app updated, secure, and performing at its best.",
      },
    ],
    importance: {
      title: "Importance of App Development",
      body: "App development empowers businesses to deliver seamless digital experiences, enhance customer engagement, and stay competitive in a mobile-first world. App development puts your business in your customer’s pocket, ready whenever they are.",
    },
    topic: "app development",
  },
  {
    slug: "gmb",
    name: "GMB Listing",
    group: "core",
    icon: MapPinIcon,
    summary:
      "Attract nearby customers with a polished and professional GMB presence.",
    metaTitle: "Google My Business Listing Services | Rank Higher Locally",
    metaDescription:
      "Optimize your Google My Business listing to boost local SEO rankings, attract customers, and grow your business with our expert GMB services.",
    hero: {
      title: "Google My Business",
      accent: "(GMB) listing",
      intro:
        "At WebTech Solutions, we help businesses dominate local search with powerful Google My Business (GMB) optimization — so your business appears in Google Maps, local packs, and search results.",
    },
    why: GENERIC_WHY,
    offersIntro: OFFERS_INTRO,
    offers: [
      {
        title: "GMB Profile Setup & Optimization",
        body: "We help in creating and optimizing your GMB profile to rank higher on Google.",
      },
      {
        title: "Local SEO Strategy",
        body: "We implement strategies to improve your presence in local searches.",
      },
      {
        title: "Reputation Management",
        body: "Gain trust by managing customer reviews effectively, using insights from our experts.",
      },
      {
        title: "Google Posts & Updates",
        body: "Engage your audience with fresh content, offers, and updates designed by our professionals.",
      },
      {
        title: "Performance Tracking & Insights",
        body: "Our analytics experts help you understand your GMB analytics to maximize results.",
      },
    ],
    importance: {
      title: "Importance of a GMB Listing",
      body: "Your GMB profile is often the first thing potential customers see when searching for products or services nearby. A fully optimized listing ensures your business appears in Google Maps, local packs, and search results — driving more calls, visits, and conversions.",
    },
    topic: "Google Business Profile",
  },
  {
    slug: "content-marketing",
    name: "Content Marketing",
    group: "marketing",
    icon: FileTextIcon,
    summary:
      "Build authority with strategic content campaigns that attract and convert.",
    metaTitle: "Content Marketing Services - WebTech Solutions",
    metaDescription:
      "Boost brand visibility, engage your audience, and drive conversions with our expert content marketing services tailored for growth.",
    hero: {
      title: "Content",
      accent: "marketing",
      intro:
        "Great content isn’t just about words — it’s about impact. We help your brand share stories, answer questions, and connect with audiences in ways that matter. Our content marketing turns casual readers into loyal customers.",
    },
    why: "From SEO-optimized blogs to multi-channel campaigns, we craft content that reflects your brand identity, resonates with your audience, and delivers measurable results.",
    offersIntro: OFFERS_INTRO,
    offers: [
      {
        title: "Blog Writing",
        body: "Publish insightful articles to inform and engage your audience.",
      },
      {
        title: "Video Content",
        body: "Create engaging videos to enhance brand storytelling.",
      },
      {
        title: "Infographics",
        body: "Design visually appealing, data-driven content for easy sharing.",
      },
      {
        title: "E-books & Guides",
        body: "Provide in-depth knowledge to build brand authority.",
      },
      {
        title: "Case Studies",
        body: "Showcase real-life success stories to boost credibility.",
      },
    ],
    importance: {
      title: "Importance of Content Marketing",
      body: "Great content doesn’t just attract clicks — it builds connections. Content marketing helps your brand share stories, answer questions, and solve problems in ways that matter to your audience. When done right, it turns casual readers into loyal customers who trust your expertise.",
    },
    topic: "content marketing",
  },
  {
    slug: "pay-per-click-ppc-advertising",
    name: "Pay-Per-Click (PPC)",
    group: "marketing",
    icon: CursorClickIcon,
    summary:
      "Generate instant leads with targeted PPC campaigns designed for ROI.",
    metaTitle: "Pay-Per-Click (PPC) Advertising - WebTech Solutions",
    metaDescription:
      "WebTech Solutions designs PPC campaigns that maximize results while minimizing costs through keyword research and ad optimization.",
    hero: {
      title: "Pay-per-click (PPC)",
      accent: "advertising",
      intro:
        "We design PPC campaigns that reach the right audience at the right time. Every click is optimized to deliver measurable returns and drive business growth.",
    },
    why: GENERIC_WHY,
    offersIntro:
      "From the first keyword to the final report, every part of the campaign is planned, managed, and measured.",
    offers: [
      {
        title: "Keyword Research & Strategy",
        body: "Find the searches your customers use and build campaigns around the ones that convert.",
      },
      {
        title: "Ad Copy & Creative",
        body: "Clear, compelling ads that earn the click and match the page they lead to.",
      },
      {
        title: "Campaign Setup & Management",
        body: "Structure campaigns, ad groups, and targeting, then manage them day to day.",
      },
      {
        title: "Bid & Budget Optimization",
        body: "Adjust bids and budgets so spend goes to the clicks that deliver returns.",
      },
      {
        title: "Conversion Tracking & Reporting",
        body: "Track leads and sales from every click and report results in plain language.",
      },
    ],
    importance: {
      title: "Importance of PPC Advertising",
      body: "PPC advertising delivers instant visibility, driving qualified traffic and measurable results with precision targeting. With PPC, every click is an opportunity — turning ad spend into leads, sales, and growth.",
    },
    topic: "PPC",
  },
  {
    slug: "google-ads",
    name: "Google Ads",
    group: "marketing",
    icon: GoogleIcon,
    summary:
      "Reach your ideal customers with expertly managed Google Ads campaigns.",
    metaTitle: "Google Ads Management Services - WebTech Solutions",
    metaDescription:
      "Our team specializes in keyword research, ad optimization, and budget management to maximize your brand’s ROI with Google Ads.",
    hero: {
      title: "Google",
      accent: "Ads",
      intro:
        "We design and manage Google Ads campaigns across Search, Display, and YouTube that put your business in front of ready-to-buy customers and turn ad spend into measurable growth.",
    },
    why: "We design and manage Google Ads campaigns that maximize visibility, attract qualified leads, and deliver measurable business growth.",
    offersIntro: OFFERS_INTRO,
    offers: [
      {
        title: "Search Ads",
        body: "Appear at the top of Google search results.",
      },
      {
        title: "Display Ads",
        body: "Show visually appealing ads across Google’s partner websites.",
      },
      {
        title: "YouTube Ads",
        body: "Promote video content on YouTube and related platforms.",
      },
      {
        title: "Remarketing Campaigns",
        body: "Re-engage visitors who have previously interacted with your brand.",
      },
      {
        title: "Performance Tracking",
        body: "Monitor and optimize campaigns for better ROI.",
      },
    ],
    importance: {
      title: "Importance of Google Ads",
      body: "Google Ads is one of the fastest ways to put your business in front of ready-to-buy customers, delivering measurable results and maximum ROI. Investing in Google Ads means investing in growth — turning ad spend into real, trackable revenue.",
    },
    topic: "Google Ads",
  },
  {
    slug: "affiliate-marketing",
    name: "Affiliate Marketing",
    group: "marketing",
    icon: HandshakeIcon,
    summary: "Drive sales through trusted affiliate networks and strategies.",
    metaTitle: "Affiliate Marketing Services - WebTech Solutions",
    metaDescription:
      "WebTech Solutions designs and manages high-converting affiliate marketing programs tailored to your business to drive sustainable growth.",
    hero: {
      title: "Affiliate",
      accent: "marketing",
      intro:
        "We design and manage affiliate programs that reward partners for performance — from setup and recruitment to tracking and commissions — so your reach grows while costs stay under control.",
    },
    why: GENERIC_WHY,
    offersIntro: OFFERS_INTRO,
    offers: [
      {
        title: "Affiliate Program Setup",
        body: "Develop and launch a structured affiliate marketing strategy.",
      },
      {
        title: "Partner Recruitment",
        body: "Identify and onboard high-performing affiliates.",
      },
      {
        title: "Performance Tracking",
        body: "Monitor and analyze affiliate-generated traffic and sales.",
      },
      {
        title: "Commission Management",
        body: "Set up fair and effective commission structures.",
      },
      {
        title: "Content and Link Placement",
        body: "Optimize affiliate links for higher conversion rates.",
      },
    ],
    importance: {
      title: "Importance of Affiliate Marketing",
      body: "Affiliate marketing turns partnerships into profits. With the right affiliates, your brand gains instant credibility, wider visibility, and measurable growth — all while keeping costs under control. It drives growth by rewarding partners for performance, expanding reach, and boosting sales efficiently.",
    },
    topic: "affiliate marketing",
  },
  {
    slug: "video-marketing",
    name: "Video Marketing",
    group: "marketing",
    icon: VideoIcon,
    summary: "Tell your story with impactful videos that drive engagement.",
    metaTitle: "Video Marketing Services - WebTech Solutions",
    metaDescription:
      "WebTech Solutions creates quality, engaging video content strategies that align with your brand’s message and goals.",
    hero: {
      title: "Video",
      accent: "marketing",
      intro:
        "We create and promote videos that tell your story — from short social clips and explainers to product demos and YouTube campaigns that drive engagement.",
    },
    why: GENERIC_WHY,
    offersIntro: OFFERS_INTRO,
    offers: [
      {
        title: "Social Media Videos",
        body: "Create short, engaging videos for Instagram, Facebook, and TikTok.",
      },
      {
        title: "YouTube Marketing",
        body: "Optimize and promote branded content on YouTube for visibility.",
      },
      {
        title: "Explainer Videos",
        body: "Simplify complex ideas with informative, visually appealing videos.",
      },
      {
        title: "Product Videos",
        body: "Showcase features and benefits through high-quality product demonstrations.",
      },
      {
        title: "Testimonial Videos",
        body: "Build trust with real customer reviews and success stories.",
      },
    ],
    importance: {
      title: "Importance of Video Marketing",
      body: "People love watching videos — and that’s exactly why video marketing works. Whether it’s a product demo, a brand story, or customer testimonials, videos make complex ideas simple, engaging, and memorable. They help your audience connect with your brand on a deeper level and inspire action.",
    },
    topic: "video marketing",
  },
  {
    slug: "mobile-marketing",
    name: "Mobile Marketing",
    group: "marketing",
    icon: MegaphoneIcon,
    summary:
      "Reach customers on the go with mobile-first marketing strategies.",
    metaTitle: "Mobile Marketing Services - WebTech Solutions",
    metaDescription:
      "WebTech Solutions helps you design mobile marketing strategies that ensure your brand effectively reaches mobile users.",
    hero: {
      title: "Mobile",
      accent: "marketing",
      intro:
        "We help your brand reach customers on the go with SMS, push notifications, in-app ads, and location-based campaigns built for mobile-first audiences.",
    },
    why: GENERIC_WHY,
    offersIntro: OFFERS_INTRO,
    offers: [
      {
        title: "SMS Marketing",
        body: "Send promotional and transactional messages to mobile users.",
      },
      {
        title: "In-app Advertising",
        body: "Promote brands through targeted ads within mobile apps.",
      },
      {
        title: "Push Notifications",
        body: "Deliver real-time updates and offers to users.",
      },
      {
        title: "Geo Targeting Campaigns",
        body: "Target users based on their location for personalized marketing.",
      },
      {
        title: "Mobile-Friendly Content",
        body: "Optimize websites and ads for mobile devices.",
      },
    ],
    importance: {
      title: "Importance of Mobile Marketing",
      body: "Your customers are always on their phones — mobile marketing makes sure your brand is too. Whether it’s a quick text, a personalized app notification, or mobile-friendly ads, this strategy keeps your business connected, relevant, and top-of-mind, creating direct, personalized connections that drive growth.",
    },
    topic: "mobile marketing",
  },
];

export const serviceBySlug = (slug: string) =>
  SERVICES.find((service) => service.slug === slug);

export const servicesIn = (group: ServiceGroup) =>
  SERVICES.filter((service) => service.group === group);

export const GROUPS: Record<
  ServiceGroup,
  { title: string; accent: string; lede: string; href: string }
> = {
  core: {
    title: "Our",
    accent: "services",
    lede: "Search, content, websites and apps: the foundations of being found online.",
    href: "/services",
  },
  marketing: {
    title: "Digital",
    accent: "marketing",
    lede: "Campaigns that reach your audience now, alongside search work that compounds.",
    href: "/services/digital-marketing",
  },
};

export const OVERVIEW = {
  eyebrow: "Our services",
  title: "Accelerate your growth with our expert digital",
  accent: "marketing solutions.",
  intro:
    "Tailored digital marketing solutions — SEO, PPC, social media, app development and expert online strategies — from one team, since 2013.",
  why: {
    eyebrow: "Why choose us?",
    title: "Why choose WebTech Solutions for your",
    accent: "startup!",
    body: "We specialize in tailored digital marketing strategies that drive growth. Our expertise in SEO, social media, content marketing, and PPC ensures measurable results, helping your business stand out, engage customers, and achieve long-term success online.",
    badge: "Trusted and reliable!",
  },
};

export const DIGITAL_MARKETING = {
  eyebrow: "Digital marketing",
  title: "Digital marketing solutions built around your",
  accent: "goals.",
  intro:
    "We offer tailored digital marketing solutions, creating a custom strategy for each client based on their goals — then running the campaigns that reach the right people.",
  metaTitle: "Digital Marketing Services",
  metaDescription:
    "WebTech Solutions offers tailored digital marketing solutions, creating custom strategies for each client based on their goals.",
  why: OVERVIEW.why,
  approach: {
    title: "Digital marketing with strategic",
    accent: "depth",
    body: "Relevance over visibility. We learn the business economics, audience, and competition before choosing channels and messaging — and keep every effort tied to measurable progress.",
  },
};
