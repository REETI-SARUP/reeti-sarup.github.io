import { PAGE } from './config/constants.js';
import { h } from './utils/dom.js';
import { NavBar } from './components/header.js';
import { Footer } from './components/footer.js';
import { renderHome } from './pages/home.js';
import { renderAbout } from './pages/about.js';
import { renderExperience } from './pages/experience.js';
import { renderRecognition } from './pages/recognition.js';
import { renderFeaturedPage } from './pages/featured.js';
import { renderPublications } from './pages/publications.js';
import { renderBlogs } from './pages/blogs.js';
import { renderProjects } from './pages/projects.js';
import { renderEducation } from './pages/education.js';
import { renderSkills } from './pages/skills.js';
import { renderCommunity } from './pages/community.js';
import { initRevealOnScroll } from './utils/observers.js';

/** Each HTML file sets <body data-page="...">; this registry maps it to a page renderer. */
const PAGES = {
  [PAGE.HOME]: renderHome,
  [PAGE.ABOUT]: renderAbout,
  [PAGE.EXPERIENCE]: renderExperience,
  [PAGE.RECOGNITION]: renderRecognition,
  [PAGE.FEATURED]: renderFeaturedPage,
  [PAGE.PUBLICATIONS]: renderPublications,
  [PAGE.BLOGS]: renderBlogs,
  [PAGE.PROJECTS]: renderProjects,
  [PAGE.EDUCATION]: renderEducation,
  [PAGE.SKILLS]: renderSkills,
  [PAGE.COMMUNITY]: renderCommunity,
};

function mount() {
  const page = document.body.dataset.page ?? PAGE.HOME;
  const render = PAGES[page] ?? renderHome;
  const root = document.getElementById('app');
  root.replaceChildren(NavBar(page), h('main', { id: 'content' }, ...render()), Footer());
  initRevealOnScroll(root);
}

mount();
