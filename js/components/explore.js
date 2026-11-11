import { ICON_PATHS, NAV_ITEMS, PAGE } from '../config/constants.js';
import { h, icon } from '../utils/dom.js';

/** One tile per page (everything except Home), in navigation order. Image, or an icon tile when there is no photo. */
const TILE_CONTENT = Object.freeze({
  [PAGE.ABOUT]: { text: 'My journey of growth and reinvention, and what drives me.', image: 'images/linkedin/career-journey-ghc.webp', position: 'center 30%' },
  [PAGE.EXPERIENCE]: { text: '7+ years from full-stack engineer to Staff Engineer building production AI.', image: 'images/intuit-picture.jpeg' },
  [PAGE.EDUCATION]: { text: 'MS CS (ML) at Georgia Tech, 4.0 GPA. Gold Medalist at IGDTUW.', image: 'images/georgia-tech-reeti-graduation-pic-1.jpg' },
  [PAGE.PROJECTS]: { text: 'Production AI systems, research and hackathon projects.', image: 'images/linkedin/ies-launch.webp' },
  [PAGE.RECOGNITION]: { text: 'Top awards and 100+ Spotlights, year by year.', image: 'images/awards/trophies/superstar-fy24q4.webp', position: 'center 30%' },
  [PAGE.FEATURED]: { text: 'Featured by Intuit.', image: 'images/linkedin/careers-feature.webp', position: 'center' },
  [PAGE.PUBLICATIONS]: { text: 'Best Industry Paper, a patent, GHC stages and tech webinars.', image: 'images/linkedin/ghc25-session.webp', position: 'center' },
  [PAGE.BLOGS]: { text: 'Tech blogs on engineering, AI and building great products.', image: 'images/intuit-internship-picture.jpeg', position: 'center' },
  [PAGE.SKILLS]: { text: 'From LLM agents and RL to React and GraphQL.', icon: 'code' },
  [PAGE.COMMUNITY]: { text: 'Mentoring, communities I co-lead, and volunteering.', image: 'images/linkedin/wids-emcee.webp', position: 'center 25%' },
});

function Tile(item, content) {
  const media = content.image
    ? h('img', { class: 'tile__img', src: content.image, alt: '', loading: 'lazy', decoding: 'async', style: content.position ? `object-position: ${content.position}` : null })
    : h('div', { class: 'tile__icon', 'aria-hidden': 'true' }, icon(ICON_PATHS[content.icon] ?? ICON_PATHS.star, { size: 56 }));
  return h('a', { class: 'tile reveal', href: item.href },
    media,
    h('span', { class: 'tile__body' },
      h('strong', {}, item.heroLabel ?? item.label),
      h('span', {}, content.text),
      h('span', { class: 'tile__go', 'aria-hidden': 'true' }, 'Explore →')));
}

/** Visual entry points to every other page. `exclude` hides the tile for the page you are already on. */
export function ExploreTiles({ exclude } = {}) {
  const items = NAV_ITEMS.filter((n) => TILE_CONTENT[n.id] && n.id !== exclude);
  return h('section', { class: 'section section--tint', 'aria-labelledby': 'explore-title' },
    h('div', { class: 'container' },
      h('header', { class: 'section__head reveal' },
        h('p', { class: 'eyebrow' }, 'Explore'),
        h('h2', { id: 'explore-title', class: 'section__title' }, 'More about my work'),
        h('p', { class: 'section__lead' }, 'Everything in one place: jump into any section.')),
      h('div', { class: 'grid grid--3 tiles' }, items.map((n) => Tile(n, TILE_CONTENT[n.id])))));
}
