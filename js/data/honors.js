/**
 * Honors. `top: true` items appear as image cards; the rest in the compact list.
 * Photos come from LinkedIn (trophies and certificates). Monetary values are intentionally omitted.
 */
const T = 'images/awards/trophies';

export const HONORS = Object.freeze([
  { id: 'best-paper-2026', top: true, year: 2026, icon: 'trophy', image: `${T}/best-paper.webp`, title: 'Best Industry Paper Award', org: 'AI-ML Systems 2026, Lecco (Lake Como), Italy',
    detail: 'For "Substitutes, Not Complements: Entity Features vs Fine-Tuned Embeddings for Expense Allocation". Co-authors: Sourav Karmakar, Deepak Gujraniya, Mithun Ghosh. Proceedings in IEEE Xplore.' },
  { id: 'patent-2025', top: true, year: 2025, icon: 'bulb', image: `${T}/patent.webp`, title: 'Patent Filed', org: 'Intuit, December 2025',
    detail: 'Deep Research System for Iterative Question Answering and Adaptive Report Generation (BizQuery: deep-research QnA agentic system for financial queries).' },
  { id: 'superstar-fy24q4', top: true, year: 2024, icon: 'star', image: `${T}/superstar-fy24q4.webp`, title: 'Intuit India Superstar Award', org: 'FY24 Q4, Customer Obsession',
    detail: 'For versatility across Project Profitability and AI work: front-end widgets for IES GA, a backend self-learning RL model, and representing Intuit AI at the GHC conference.' },
  { id: 'five-years', top: true, year: 2024, icon: 'star', image: `${T}/five-years.webp`, title: '5 Years of Excellence Award', org: 'Intuit, 2019 to 2024', detail: 'Milestone recognition for five years of service.' },
  { id: 'bb5-23q4', top: true, year: 2023, icon: 'star', image: `${T}/star-fy23q4.webp`, title: 'Star of the Quarter', org: 'Big Bet-5, FY23 Q4, Customer Obsession', detail: 'Star Employee recognition for Customer Obsession.' },
  { id: 'gatech-gpa', top: true, year: 2023, icon: 'cap', image: 'images/georgia-tech-reeti-graduation-pic-1.jpg', full: 'images/georgia-tech-reeti-graduation-pic-1.jpg', title: '4.0/4.0 Perfect GPA', org: 'MS Computer Science (ML), Georgia Tech',
    detail: 'Completed the Master of Science in Computer Science with the Machine Learning specialization from the Georgia Institute of Technology in August 2023, with a perfect 4.0/4.0 GPA.' },
  { id: 'superstar-fy23q1', top: true, year: 2022, icon: 'star', image: `${T}/superstar-fy23q1.webp`, title: 'Intuit India Superstar Award', org: 'FY23 Q1, Stronger Together', detail: 'Quarterly Superstar recognition for collaboration and teamwork.' },
  { id: 'star-22q2', top: true, year: 2022, icon: 'star', image: `${T}/star-fy22q2.webp`, title: 'Star of the Quarter', org: 'FY22 Q2, Above & Beyond', detail: '"You are Awesome!" recognition from the QBO Advanced team.' },
  { id: 'gold-medal', top: true, year: 2019, icon: 'medal', image: 'images/igdtuw-graduation.jpeg', title: "Vice-Chancellor's Gold Medal", org: 'IGDTUW, Delhi',
    detail: 'First in order of merit in B.Tech IT, presented by the Lt. Governor of Delhi and the Deputy Chief Minister of Delhi.' },
  { id: '100k', year: 2021, icon: 'trophy', image: `${T}/milestone-100k-b.webp`, title: 'Milestone: first 100K customers for QBO Advanced', org: 'Intuit', detail: 'Celebrating the newly launched QBO Advanced product for mid-market businesses.' },
  { id: 'sih', year: 2018, title: 'Smart India Hackathon: Protsahan Award for Innovation', org: 'Smart India Hackathon 2018', detail: '4th place at the 36-hour national grand finale with Startup Gauge.' },
  { id: 'interns-hack', year: 2018, title: 'Interns Hackathon: second runner-up', org: 'Intuit', detail: 'Classified Voice-of-Customer feedback to the right teams with machine learning.' },
  { id: 'cbse', year: 2015, title: 'CBSE Merit Certificate, top 0.1% in English', org: 'CBSE' },
  { id: 'cee', year: 2012, title: 'Top 20 National Champion on Climate Change', org: 'CEE & Ministry of Environment & Forests', detail: 'Also invited to Rashtrapati Bhavan for the Roshni green-sustainability programme.' },
  { id: 'igenius', year: 2010, title: 'All India iGenius Scholarship', org: 'Max New York Life' },
]);
