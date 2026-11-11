import { NAV_ITEMS } from './config/constants.js';
import { NavBar, setActiveNav } from './components/header.js';
import { Hero, Highlights, About } from './components/hero.js';
import { ExperienceSection } from './components/experience.js';
import { SpotlightSection } from './components/spotlights.js';
import { PublicationsSection } from './components/publications.js';
import { EducationSection } from './components/education.js';
import { SkillsSection } from './components/skills.js';
import { CommunitySection } from './components/community.js';
import { Footer } from './components/footer.js';
import { initRevealOnScroll, initScrollSpy } from './utils/observers.js';

function mount() {
  const root = document.getElementById('app');
  root.replaceChildren(
    NavBar(),
    Hero(),
    Highlights(),
    About(),
    ExperienceSection(),
    SpotlightSection(),
    PublicationsSection(),
    EducationSection(),
    SkillsSection(),
    CommunitySection(),
    Footer(),
  );
  initRevealOnScroll(root);
  initScrollSpy(NAV_ITEMS.map((n) => n.id), setActiveNav);
}

mount();
