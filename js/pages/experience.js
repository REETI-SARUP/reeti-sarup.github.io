import { PageHero } from '../components/page.js';
import { ExperienceContent } from '../components/experience.js';
import { FeaturesContent } from '../components/features.js';

export const renderExperience = () => [
  PageHero({ eyebrow: 'Experience', title: 'Professional Experience', lead: 'From full-stack engineer to Staff Engineer building production AI.' }),
  ExperienceContent(),
  FeaturesContent(),
];
