export const SKILL_GROUPS = Object.freeze([
  { id: 'ai', title: 'AI & Machine Learning', items: ['Generative AI', 'Agentic AI', 'AI Agents', 'LLMs', 'RAG', 'LangChain', 'LangGraph', 'Reinforcement Learning', 'Multi-Armed Bandits', 'Deep Learning', 'Machine Learning', 'Recommendation Systems', 'Knowledge Graphs', 'Time-Series Forecasting', 'Anomaly Detection', 'Evals', 'Artificial Intelligence', 'Core ML', 'Machine Learning Algorithms'] },
  { id: 'data', title: 'Data & Cloud', items: ['Python', 'PySpark', 'Apache Spark', 'Databricks', 'Kubeflow', 'Apache Kafka', 'Redis', 'AWS', 'SQL', 'MySQL', 'Firebase', 'CI/CD', 'Data Visualization', 'Data Analysis', 'Data Analytics', 'Database Management Systems (DBMS)'] },
  { id: 'web', title: 'Full-Stack & Web', items: ['React.js', 'TypeScript', 'JavaScript', 'GraphQL', 'Apollo Client', 'HTML', 'CSS', 'Web Accessibility', 'Web Performance', 'Java', 'JSP & Servlets', 'C++', 'C', 'R', 'PHP', 'Ruby on Rails', 'Full-Stack Development', 'Front-End Development', 'Web Development', 'Software Development', 'Android Development', 'Core Java'] },
  { id: 'eng', title: 'Engineering Craft', items: ['System Architecture', 'Software Architectural Design', 'Algorithms & Data Structures', 'Object-Oriented Programming', 'Problem Solving', 'HCI', 'Agile Methodologies', 'Architecture', 'Product Development', 'Computer Science', 'Discrete Mathematics', 'Educational Technology', 'Research Skills', 'Microsoft Office'] },
  { id: 'lead', title: 'Leadership', items: ['Team Leadership', 'Mentoring', 'Stakeholder Management', 'Public Speaking', 'Communication', 'Teamwork', 'Leadership'] },
]);

/** Skills that passed a LinkedIn Skill Assessment. */
export const VERIFIED_SKILLS = Object.freeze(['Python', 'React.js', 'JavaScript', 'C++', 'HTML', 'Object-Oriented Programming', 'Machine Learning']);

/** LinkedIn "Top skills", shown as feature tiles on the Skills page. */
export const TOP_SKILLS = Object.freeze([
  { name: 'Artificial Intelligence', icon: 'bulb', text: 'Agentic AI, LLMs, RAG and AI agents in production.' },
  { name: 'Machine Learning', icon: 'trend', text: 'From deep learning to reinforcement learning at scale.' },
  { name: 'Full-Stack Development', icon: 'code', text: 'React, TypeScript and GraphQL through Python services.' },
  { name: 'Problem Solving', icon: 'medal', text: 'Algorithms, system architecture and clear trade-offs.' },
  { name: 'Leadership', icon: 'people', text: 'Leading teams, mentoring and speaking globally.' },
]);
