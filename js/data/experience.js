export const INTUIT = Object.freeze({
  org: 'Intuit',
  location: 'Bengaluru, India',
  period: 'Jul 2019 \u2013 Present',
  duration: '7 yrs 5 mos',
  image: 'images/intuit-picture.jpeg',
  summary: 'Building products for mid-market businesses, from full-stack product features to AI-native experiences and agents.',
  path: Object.freeze(['Software Engineer 1', 'Software Engineer 2', 'Senior Software Engineer', 'Staff Software Engineer']),
});

export const EXPERIENCE = Object.freeze([
  {
    id: 'staff-2026',
    role: 'Staff Software Engineer',
    org: 'Intuit',
    team: 'Mid-Market AI Team',
    period: 'Aug 2026 – Present',
    current: true,
    summary:
      'Building Mid-Market AI intelligence and an AI-native ERP for enterprise-grade FinTech, empowering the financial lives of mid-market businesses.',
    highlights: [
      'Building Mid-Market AI intelligence and an AI-native ERP for enterprise-grade FinTech.',
      'Best Industry Paper Award, AI-ML Systems 2026 (Italy).',
      'Co-Lead, Builder Culture Champions Community (Feb 2026 – Present).',
      'Internal AI trainer and mentor, AI Adoption Accelerator (Jul 2024 – Present).',
    ],
    tech: [],
  },
  {
    id: 'senior-2025',
    role: 'Senior Software Engineer, AI/ML Builder',
    org: 'Intuit',
    team: 'AI Sciences & AI Smart Products, later the Mid-Market AI Org',
    period: 'May 2025 – Aug 2026',
    summary:
      'Part of the A2D (AI, Data & Analytics) org, which merged into a dedicated Mid-Market AI org combining breakthrough research with customer-driven, AI-native product development.',
    highlights: [
      'Architected event-driven, explainable AI/ML systems with hybrid batch and real-time inference serving millions of transactions.',
      'Launched models for Project Profitability, cost-allocation predictions, categorization and budget forecasting.',
      'Built reusable AI patterns: event-based predictions, distributed inference, ANN retrieval, low-latency real-time inference.',
      'Built Data QnA and Deep Think experiences; patent filed for BizQuery.',
      'Prototyped self-learning with online RL from live user feedback.',
    ],
    tech: ['Kubeflow', 'Spark', 'Databricks', 'Redis', 'Python', 'LangChain', 'LangGraph', 'RAG', 'Knowledge Graphs', 'Multi-Armed Bandits', 'AWS'],
  },
  {
    id: 'senior-2023',
    role: 'Senior Software Engineer',
    org: 'Intuit',
    team: 'Mid-Market AI Mission Team, GBSG (Global Business Solutions Group)',
    period: 'Aug 2023 – May 2025',
    summary: 'Built the AI-powered platform and AI-native experiences for the newly launched Intuit Enterprise Suite.',
    highlights: [
      'Launched GenAI Management Report Summary to ~800 beta customers, and Project Profitability with AI Goals and Insights for IES.',
      'Built a RAG-based, LLM-powered solution with a Knowledge Graph, keeping users in control of AI actions.',
      'Drove a self-learning platform: online RL (multi-armed bandits) scoring, pipelines and Redis for personalized top-K insights.',
      'Core contributor to the Mid-Market AI Agents platform and launches (M8 mission team).',
      'Worked ~2 months with a QBO Advanced customer through the Adopt a Small Business programme.',
    ],
    tech: ['RAG', 'LLMs', 'Knowledge Graph', 'Reinforcement Learning', 'Redis', 'React', 'TypeScript', 'AI Agents'],
  },
  {
    id: 'swe2',
    role: 'Software Engineer 2',
    org: 'Intuit',
    team: 'QuickBooks Online Advanced',
    period: 'Aug 2021 – Aug 2023',
    summary: 'Launched key customer-centric features for QuickBooks Online Advanced.',
    highlights: [
      'Shipped Recurring Tasks, Attachments, In-App Notifications, Data Import and personalized onboarding.',
      'Delivered AI anomaly detection (Financial Error Detection Service), including in the new Rethink experience.',
      'Led the Get-to-Know-Me onboarding upgrader flow with an AI-based intent picker.',
    ],
    tech: ['React', 'TypeScript', 'GraphQL', 'Apollo', 'Anomaly Detection'],
  },
  {
    id: 'swe1',
    role: 'Software Engineer 1',
    org: 'Intuit',
    team: 'Product Development Core Team, QuickBooks Online Advanced',
    period: 'Jul 2019 – Jul 2021',
    summary:
      'Full-stack engineer on QuickBooks Online Advanced, a cloud accounting product for mid-market businesses.',
    highlights: [
      'Improved page-load time (TP99) by ~30% on top accounting workflows.',
      'Built Batch Transactions: invoices, sales receipts, automatic sales tax, reclassify, CSV import.',
      'Beta-launched Smart Custom Workflow Templates and AI workflow recommendations.',
    ],
    tech: ['React', 'TypeScript', 'GraphQL', 'Apollo Client', 'A11y', 'Web Performance'],
  },
]);

export const EARLY_CAREER = Object.freeze([
  {
    id: 'intern-intuit',
    role: 'Software Engineering Intern',
    org: 'Intuit',
    period: 'Jun – Jul 2018',
    image: 'images/intuit-internship-picture.jpeg',
    summary:
      'Logit–Kafka integration: decomposed a monolith using Kafka. Won Spotlight awards for Deliver Awesome and Win Together, and was second runner-up in the Interns Hackathon, classifying Voice-of-Customer feedback with machine learning.',
    link: { label: 'Internship blog', href: 'https://reetisarup.medium.com/an-insight-into-the-incredible-internship-experience-at-intuit-7aebc650e3c2' },
  },
  {
    id: 'intern-cn',
    role: 'Problem Setter & Curator Intern',
    org: 'Coding Ninjas',
    period: 'Jun – Jul 2017',
    image: 'images/coding-ninjas.jpeg',
    summary:
      'Built problem statements with C++ and Java solutions, wrote tutorials, and set up automated test-case checks and scaffolds for the CodeZen coding platform.',
  },
  {
    id: 'trainee-gmr',
    role: 'Summer Industrial Project Trainee',
    org: 'GMR Group, Delhi International Airport',
    period: 'Jun 2016',
    image: 'images/gmr-igi-airport.jpeg',
    summary:
      'Built a full-stack web app (Java, JSP, Servlets) to centralize IGI Airport flight-schedule data, with search by terminal, departures, arrivals, origin and destination.',
  },
]);
