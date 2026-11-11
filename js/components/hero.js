import { ICON_PATHS, NAV_ITEMS, PAGE } from '../config/constants.js';
import { PROFILE } from '../data/profile.js';
import { h, icon } from '../utils/dom.js';
import { SocialLinks } from './header.js';

export function Hero() {
  return h('header', { id: 'home', class: 'hero' },
    h('div', { class: 'container hero__inner' },
      h('div', { class: 'hero__photo' },
        h('img', { src: PROFILE.photo, alt: `Portrait of ${PROFILE.name}`, width: 200, height: 200, decoding: 'async', fetchpriority: 'high' })),
      h('div', { class: 'hero__text' },
        h('h1', { class: 'hero__name' }, PROFILE.name, h('span', { class: 'hero__pronouns' }, PROFILE.pronouns)),
        h('p', { class: 'hero__title' }, PROFILE.title),
        h('p', { class: 'hero__tagline' }, PROFILE.tagline),
        h('ul', { class: 'hero__chips', role: 'list' }, PROFILE.expertise.map((x) => h('li', {}, x))),
        h('nav', { class: 'hero__nav', 'aria-label': 'Explore sections' },
          NAV_ITEMS.filter((n) => n.id !== PAGE.HOME).map((n) =>
            h('a', { class: 'hero__nav-link', href: n.href }, icon(ICON_PATHS[n.icon], { size: 20 }), h('span', {}, n.heroLabel ?? n.label)))),
        h('div', { class: 'hero__actions' },
          h('a', { class: 'btn btn--primary', href: PROFILE.resume, download: 'Reeti-Sarup-Resume.pdf' }, icon(ICON_PATHS.download, { size: 18 }), 'Download Resume')),
        SocialLinks('social hero__social'))));
}

/** Tinted band holding the highlight cards, so cards never blend into the page background. */
export function Highlights() {
  return h('section', { class: 'highlights', 'aria-label': 'Key highlights' },
    h('div', { class: 'container' },
      h('ul', { class: 'stats', role: 'list' },
        PROFILE.highlights.map((s) => h('li', { class: 'stat reveal' },
          h('span', { class: 'stat__icon' }, icon(ICON_PATHS[s.icon], { size: 24 })),
          h('div', { class: 'stat__body' }, h('strong', { class: 'stat__value' }, s.value), h('span', { class: 'stat__label' }, s.label)))))));
}

/** Short teaser on the home page; the full story lives on the About page. */
export function About() {
  const { lead, paragraphs, callout } = PROFILE.story;
  return h('section', { class: 'section section--light about', 'aria-labelledby': 'about-title' },
    h('div', { class: 'container about__grid reveal' },
      h('div', { class: 'about__text' },
        h('p', { class: 'eyebrow' }, 'About'),
        h('h2', { id: 'about-title', class: 'section__title' }, 'A journey of growth and reinvention'),
        h('p', { class: 'about__lead' }, lead),
        h('p', { class: 'about__p' }, paragraphs[0]),
        h('ul', { class: 'chips', role: 'list' }, PROFILE.focus.map((f) => h('li', {}, h('span', { class: 'chip chip--accent' }, f)))),
        h('p', { class: 'about__callout' }, callout),
        h('p', { class: 'about__more' }, h('a', { class: 'btn btn--ghost', href: 'about.html' }, 'Read my full story \u2192'))),
      h('figure', { class: 'about__figure' },
        h('img', { src: 'images/linkedin/career-journey-ghc.webp', alt: 'Reeti Sarup at Grace Hopper Celebration 2025 beside her Agentic AI masterclass session board', loading: 'lazy', decoding: 'async' }),
        h('figcaption', {}, 'Speaking at Grace Hopper Celebration 2025'))));
}
