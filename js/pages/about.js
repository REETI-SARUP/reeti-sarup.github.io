import { PageHero } from '../components/page.js';
import { AboutContent } from '../components/about.js';
import { ExploreTiles } from '../components/explore.js';
import { PAGE } from '../config/constants.js';

export const renderAbout = () => [
  PageHero({ eyebrow: 'About', title: 'About Reeti', lead: 'An experienced builder, speaker, lifelong learner, leader and tech community champion.' }),
  AboutContent(),
  ExploreTiles({ exclude: PAGE.ABOUT }),
];
