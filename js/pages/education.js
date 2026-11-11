import { PageHero } from '../components/page.js';
import { EducationContent } from '../components/education.js';

export const renderEducation = () => [
  PageHero({ eyebrow: 'Education', title: 'Academic Foundation', lead: 'A 4.0 GPA master’s in machine learning and a gold medal in B.Tech IT.' }),
  EducationContent(),
];
