/** Intuit Tech Stories webinars where Reeti was a panelist. Posts are public LinkedIn posts. */
const P = 'https://www.linkedin.com/posts';

export const WEBINARS = Object.freeze([
  {
    id: 'ai-first-2025',
    title: "The AI-First Approach: Intuit's Engineering Transformation",
    series: 'Intuit Tech Stories',
    date: 'July 3, 2025 · 9 PM IST',
    summary: 'How Intuit embeds AI into every layer of product development and developer experience: democratizing AI tools, accelerating engineering velocity and scaling smarter systems, from agentic systems to developer tooling and feedback loops.',
    panel: 'Panelists: Reeti Sarup, Sid Kumar (Principal AI Scientist) and Uttam Ramamurthy (Principal Software Engineer, Builder), with host Radhika Kannan (Group Manager, TPM).',
    images: ['images/linkedin/webinar-ai-first.webp', 'images/linkedin/webinar-ai-first-poster.webp'],
    links: [
      { label: 'Intuit India announcement', href: `${P}/engineering-ai-artificialintelligence-share-7341022329566613504-g0bs/` },
      { label: 'My post', href: `${P}/reeti-sarup_intuittechstories-aiengineering-share-7341336725232807937-aHMI/` },
    ],
  },
  {
    id: 'modern-app-2022',
    title: 'Ingredients of a Stellar Modern Application',
    series: 'Intuit Tech Stories',
    date: 'November 22, 2022 · 6:30 PM IST',
    summary: 'Panel decoding the nitty-gritty of a modern web app built with state-of-the-art technologies, discussing our work on tech.',
    images: ['images/linkedin/webinar-modern-app.webp'],
    links: [{ label: 'My post', href: `${P}/reeti-sarup_join-us-for-our-november-22-webinar-ingredients-share-7000680849645998080-f8ep/` }],
  },
]);
