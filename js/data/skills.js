export const SKILL_GROUPS = Object.freeze([
  { id: 'ai', title: 'AI & Machine Learning', items: ['Generative AI', 'Agentic AI', 'AI Agents', 'LLMs', 'RAG', 'LangChain', 'LangGraph', 'Reinforcement Learning', 'Multi-Armed Bandits', 'Deep Learning', 'Machine Learning', 'Recommendation Systems', 'Knowledge Graphs', 'Time-Series Forecasting', 'Anomaly Detection', 'Evals'] },
  { id: 'data', title: 'Data & Cloud', items: ['Python', 'PySpark', 'Apache Spark', 'Databricks', 'Kubeflow', 'Apache Kafka', 'Redis', 'AWS', 'SQL', 'MySQL', 'Firebase', 'CI/CD', 'Data Visualization'] },
  { id: 'web', title: 'Full-Stack & Web', items: ['React.js', 'TypeScript', 'JavaScript', 'GraphQL', 'Apollo Client', 'HTML', 'CSS', 'Web Accessibility', 'Web Performance', 'Java', 'JSP & Servlets', 'C++', 'C', 'R', 'PHP', 'Ruby on Rails'] },
  { id: 'eng', title: 'Engineering Craft', items: ['System Architecture', 'Software Architectural Design', 'Algorithms & Data Structures', 'Object-Oriented Programming', 'Problem Solving', 'HCI', 'Agile Methodologies'] },
  { id: 'lead', title: 'Leadership', items: ['Team Leadership', 'Mentoring', 'Stakeholder Management', 'Public Speaking', 'Communication', 'Teamwork'] },
]);

/** Skills that passed a LinkedIn Skill Assessment. */
export const VERIFIED_SKILLS = Object.freeze(['Python', 'React.js', 'JavaScript', 'C++', 'HTML', 'Object-Oriented Programming', 'Machine Learning']);
