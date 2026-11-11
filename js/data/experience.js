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
      'Won the Best Industry Paper Award at the International Conference on AI-ML Systems 2026, Italy.',
      'Co-lead of the Builder Culture Champions Community (BCCC), the Intuit India site-wide tech community for emerging tech initiatives and strategy, working alongside Principal and Distinguished Engineers (Feb 2026 – Present).',
      'Internal AI instructor, mentor and volunteer for the AI Adoption Accelerator (AAA), a site-wide learn-teach-learn programme (Jul 2024 – Present).',
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
      'Built, evaluated and innovated on approaches, models, algorithms and AI tools for agent use cases.',
      'Architected intelligent AI/ML systems: event-driven pipelines, explainable AI, and hybrid batch + real-time architectures deployed for large-scale inference serving millions of transactions.',
      'Launched models and ML pipelines for Project Profitability, cost-allocation predictions, categorization, and budget-overage and project-cost forecasting.',
      'Created reusable AI patterns: event-based predictions, distributed inference at scale, an optimized ANN-search retrieval layer, and a low-latency real-time inference system.',
      'Built a reimagined Data QnA and Deep Think research experience. Patent filed for BizQuery, a deep-research QnA agentic system for financial queries.',
      'Experimented with self-learning mechanisms using online RL to fold real-time user feedback into AI recommendations.',
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
      'Launched the Management Report AI Summary (GenAI) to ~800 beta customers, and Project Profitability with QB AI Goals and Insights for IES.',
      'Completed an immersive Adopt a Small Business programme: worked ~2 months with a QBO Advanced customer, resolving key pain points first-hand.',
      'Led and contributed to both front end and back end for Project Profitability, with users staying in control of approving or dismissing AI-recommended actions.',
      'Core member of the QB AI Project Leap mission team: a RAG-based, LLM-powered solution with a Knowledge Graph for entity representation.',
      'Drove a novel personalized self-learning and feedback platform: online RL scoring (including multi-armed bandits), data pipelines and Redis, serving hyper-personalized top-K insights from financial KPIs and live user feedback.',
      'Core contributor to the M8 mission team from the earliest stages of Mid-Market AI Agents: shared platform, experiments and launches of AI agents for QBO and IES, enabling multiple teams.',
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
      'Shipped Recurring Tasks, Task Attachments, In-App Task Notifications, Data Import, and personalized first-time onboarding.',
      'Delivered Smart Suggestions: Anomaly Detection that catches financial data-entry errors using AI (Financial Error Detection Service), including in the new Rethink transactions experience.',
      'Led end-to-end creation of the Mid-Market Advanced Get-to-Know-Me (GTKM) onboarding upgrader flow with an AI-based intent picker.',
      'Drove tech tracks such as migration to a consolidated global setting key across Classic and Rethink transactions, and operational-excellence initiatives.',
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
      'Analyzed and optimized web performance for top accounting workflows, improving page-load time (TP99) by ~30%.',
      'Built power-tools for advanced users from the very first phase, including Batch Transactions: invoices, sales receipts, automatic sales tax, reclassify and CSV import.',
      'Beta-launched Smart Automated Custom Workflow Templates and AI-driven workflow recommendations.',
      'Strong in HTML, CSS, JavaScript, React, TypeScript, GraphQL and Apollo Client, with a focus on accessibility, analytics, code coverage and web performance.',
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
