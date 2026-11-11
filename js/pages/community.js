import { PageHero } from '../components/page.js';
import { CommunityContent } from '../components/community.js';

export const renderCommunity = () => [
  PageHero({ eyebrow: 'Mentoring & Community Leadership', title: 'Mentoring & Community Leadership Initiatives, Volunteering', lead: 'Communities I help run, people I mentor, and the causes I volunteer for.' }),
  CommunityContent(),
];
