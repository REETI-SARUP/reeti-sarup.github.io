import { PageHero } from '../components/page.js';
import { SkillsContent } from '../components/skills.js';

export const renderSkills = () => [
  PageHero({ eyebrow: 'Skills', title: 'Toolbox', lead: 'From LLM agents and reinforcement learning to React and GraphQL.' }),
  SkillsContent(),
];
