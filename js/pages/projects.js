import { PageHero } from '../components/page.js';
import { ProjectsContent } from '../components/projects.js';

export const renderProjects = () => [
  PageHero({ eyebrow: 'Project Highlights', title: 'Project Highlights', lead: 'Production AI systems, plus research and hackathon work.' }),
  ProjectsContent(),
];
