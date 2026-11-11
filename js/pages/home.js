import { Hero, Highlights, About } from '../components/hero.js';
import { ExploreTiles } from '../components/explore.js';

export const renderHome = () => [Hero(), Highlights(), About(), ExploreTiles()];
