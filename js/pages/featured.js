import { PageHero } from '../components/page.js';
import { FeaturesContent, JourneyContent } from '../components/features.js';
import { WebinarsContent } from '../components/webinars.js';
import { FeaturedSection } from '../components/featured.js';

export const renderFeaturedPage = () => [
  PageHero({ wide: true, eyebrow: 'Featured', title: 'Featured', lead: 'Where my work has been featured by Intuit: the Careers page, my career journey, tech webinars and more.' }),
  FeaturesContent(),
  JourneyContent(),
  WebinarsContent(),
  FeaturedSection(),
];
