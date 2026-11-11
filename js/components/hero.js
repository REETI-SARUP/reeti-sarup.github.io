import { ICON_PATHS } from '../config/constants.js';
import { PROFILE } from '../data/profile.js';
import { h, icon } from '../utils/dom.js';
import { SocialLinks } from './header.js';

export function Hero() {
  return h('header', { id: 'home', class: 'hero' },
    h('div', { class: 'container hero__inner' },
      h('div', { class: 'hero__photo' },
        h('img', { src: PROFILE.photo, alt: `Portrait of ${PROFILE.name}`, width: 200, height: 200, decoding: 'async', fetchpriority: 'high' })),
      h('div', { class: 'hero__text' },
        h('h1', { class: 'hero__name' }, PROFILE.name),
        h('p', { class: 'hero__title' }, PROFILE.title),
        h('p', { class: 'hero__tagline' }, PROFILE.tagline),
        h('p', { class: 'hero__meta' }, `${PROFILE.location} · ${PROFILE.pronouns}`),
        h('div', { class: 'hero__actions' },
          h('a', { class: 'btn btn--primary', href: PROFILE.resume, download: 'Reeti-Sarup-Resume.pdf' }, icon(ICON_PATHS.download, { size: 18 }), 'Download Résumé'),
          h('a', { class: 'btn btn--ghost', href: '#recognition' }, icon(ICON_PATHS.trophy, { size: 18 }), 'View recognition')),
        SocialLinks('social hero__social'))),
    h('a', { class: 'hero__scroll', href: '#about', 'aria-label': 'Scroll to about' }, icon(ICON_PATHS.chevron, { size: 34 })));
}

export function Highlights() {
  return h('div', { class: 'container' },
    h('ul', { class: 'stats reveal', role: 'list' },
      PROFILE.highlights.map((s) => h('li', { class: 'stat' }, h('strong', { class: 'stat__value' }, s.value), h('span', { class: 'stat__label' }, s.label)))));
}

export function About() {
  return h('section', { id: 'about', class: 'section section--light about', 'aria-labelledby': 'about-title' },
    h('div', { class: 'container about__inner reveal' },
      h('p', { class: 'eyebrow' }, 'About'),
      h('h2', { id: 'about-title', class: 'section__title' }, 'Building AI people can trust'),
      PROFILE.about.map((p) => h('p', { class: 'about__p' }, p))));
}
