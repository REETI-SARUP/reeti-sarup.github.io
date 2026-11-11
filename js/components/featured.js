import { FEATURED, LINKEDIN_PROFILE } from '../data/featured.js';
import { h } from '../utils/dom.js';
import { Block } from './page.js';
import { ExternalLink } from './section.js';

function FeaturedCard(item) {
  const body = [
    h('img', { class: 'feat__img', src: item.image, alt: '', loading: 'lazy', decoding: 'async' }),
    h('div', { class: 'feat__body' },
      h('h3', { class: 'feat__title' }, item.title),
      h('p', { class: 'feat__text' }, item.text)),
  ];
  return item.href
    ? h('a', { class: 'card feat reveal', href: item.href, target: '_blank', rel: 'noopener noreferrer' }, ...body)
    : h('article', { class: 'card feat reveal' }, ...body);
}

export const FeaturedSection = () =>
  Block({ id: 'featured', tone: 'tint', wide: true },
    h('h2', { class: 'subhead reveal' }, 'Featured on LinkedIn'),
    h('div', { class: 'grid grid--3' }, FEATURED.map(FeaturedCard)),
    h('p', { class: 'center reveal' }, ExternalLink('See more on LinkedIn ↗', LINKEDIN_PROFILE, 'btn btn--ghost')));
