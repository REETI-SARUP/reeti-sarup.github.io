import { PROFILE } from '../data/profile.js';
import { h } from '../utils/dom.js';
import { Block } from './page.js';
import { SocialLinks } from './header.js';

/** Full "About" page: photo card on the side, the whole story beside it, then principles. */
export function AboutContent() {
  const { lead, paragraphs, more, callout } = PROFILE.story;
  return Block({ id: 'story' },
    h('div', { class: 'about-page' },
      h('aside', { class: 'about-page__side reveal' },
        h('img', { class: 'about-page__photo', src: PROFILE.photo, alt: `Portrait of ${PROFILE.name}`, decoding: 'async' }),
        h('h2', { class: 'about-page__name' }, PROFILE.name),
        h('p', { class: 'about-page__title' }, PROFILE.title),
        h('ul', { class: 'chips', role: 'list' }, PROFILE.focus.map((f) => h('li', {}, h('span', { class: 'chip chip--accent' }, f)))),
        SocialLinks('social about-page__social')),
      h('div', { class: 'about-page__main' },
        h('p', { class: 'about__lead reveal' }, lead),
        [...paragraphs, ...more].map((p) => h('p', { class: 'about__p reveal' }, p)),
        h('p', { class: 'about__callout reveal' }, callout),
        h('h3', { class: 'subhead reveal' }, 'How I work'),
        h('div', { class: 'principles' }, PROFILE.principles.map((x) => h('div', { class: 'principle reveal' }, h('strong', {}, x.title), h('span', {}, x.text)))))));
}
