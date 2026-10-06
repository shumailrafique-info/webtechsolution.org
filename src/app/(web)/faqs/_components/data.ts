export type Faq = { question: string; answer: string };

export type FaqGroup = {
  id: string;
  title: string;
  accent: string;
  faqs: Faq[];
};

export const INTRO = {
  eyebrow: "Help and FAQs",
  title: "Frequently asked",
  accent: "questions.",
  body: "Everything you need to know about SEO and about working with WebTech Solutions. Can’t find your answer? Ask us directly.",
};

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "seo",
    title: "About",
    accent: "SEO",
    faqs: [
      {
        question: "What is SEO and why is it important?",
        answer:
          "SEO, or Search Engine Optimization, is the practice of optimizing your website to rank higher in search engine results. It’s important because higher rankings lead to increased visibility, more traffic, and ultimately, more business.",
      },
      {
        question: "What SEO services do you offer?",
        answer:
          "At WebTech Solutions, we provide a comprehensive range of SEO services, including keyword research, on-page and technical optimization, link building, and content creation. We also specialize in local SEO to enhance your visibility in regional searches. Our team conducts thorough SEO audits to assess performance and identify areas for improvement, while our analytics and reporting services keep you informed about progress and results. Our goal is to create a tailored SEO strategy that drives sustainable growth for your business.",
      },
      {
        question: "How do you stay updated with SEO trends?",
        answer:
          "Join our newsletter or sign up to get the latest updates from WebTech Solutions, one of the most popular SEO agencies, to stay informed about the latest trends and insights in the SEO world!",
      },
    ],
  },
  {
    id: "learning-and-careers",
    title: "Learning &",
    accent: "careers",
    faqs: [
      {
        question: "How can I learn SEO from WebTech Solutions?",
        answer:
          "You can learn SEO from WebTech Solutions through our comprehensive online courses, engaging webinars, and insightful blog articles. Additionally, you can contact us to schedule a one-on-one meeting with our top SEO experts, where you can receive personalized tips and tricks tailored to your needs. We also have a community forum where you can network and ask questions about SEO best practices.",
      },
      {
        question: "How can I join WebTech Solutions?",
        answer:
          "To join WebTech Solutions, please send us an email detailing your interest, experience, and any relevant projects, along with your resume. We’re always looking for talented individuals who are passionate about SEO.",
      },
    ],
  },
  {
    id: "submissions",
    title: "Your",
    accent: "submissions",
    faqs: [
      {
        question: "Why didn’t you showcase my submission?",
        answer:
          "We appreciate every submission we receive and review them thoroughly. However, we prioritize showcasing content that aligns closely with our current focus and audience interests. If your submission wasn’t featured, it may be due to timing or relevance. We encourage you to keep sharing your ideas, as we value your contributions and may consider them for future showcases!",
      },
    ],
  },
];

export const MORE_ANSWERS = [
  {
    title: "Pricing",
    body: "Plans, what each includes and how to get started.",
    href: "/pricing#faq",
  },
  {
    title: "Advertising",
    body: "Sponsored articles, placements and what to send us.",
    href: "/advertisement-with-us",
  },
  {
    title: "Our team",
    body: "Who you will work with, and how to join us.",
    href: "/our-team",
  },
];
