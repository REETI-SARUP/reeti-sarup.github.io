import { PageHero } from '../components/page.js';
import { BlogsContent } from '../components/publications.js';

export const renderBlogs = () => [
  PageHero({ wide: true, eyebrow: 'Blogs', title: 'Writing on Medium', lead: 'Tech blogs on engineering, AI and building great products.' }),
  BlogsContent(),
];
