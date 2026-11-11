import { PUBLICATIONS, PATENTS, TALKS, BLOGS } from '../data/publications.js';
import { formatFullDate } from '../utils/format.js';
import { ICON_PATHS } from '../config/constants.js';
import { h, icon } from '../utils/dom.js';
import { Block } from './page.js';
import { Chip, ExternalLink } from './section.js';
import { Disclosure } from './disclosure.js';

const TYPE_ICON = Object.freeze({ Patent: 'bulb', 'Research Paper': 'doc', 'Book Chapter': 'doc', 'Conference Talk': 'mic', 'Innovation Showcase': 'mic', 'Tech Webinar': 'mic', Community: 'star', Blog: 'doc' });

/** Image if we have one, otherwise a colored tile with a type icon, so every card has a visual. */
function PubMedia(item) {
  if (item.image) return h('img', { class: 'pub__img', src: item.image, alt: '', loading: 'lazy', decoding: 'async' });
  return h('div', { class: 'pub__tile', 'aria-hidden': 'true' }, icon(ICON_PATHS[item.icon ?? TYPE_ICON[item.type] ?? 'doc'], { size: 34 }));
}

function PubCard(item) {
  return h('article', { class: 'card pub reveal' },
    PubMedia(item),
    h('div', { class: 'pub__top' }, Chip(item.type), item.badge && Chip(item.badge, 'chip--gold')),
    h('h4', { class: 'card__title' }, item.title),
    h('p', { class: 'pub__venue' }, h('strong', {}, item.venue), item.date && h('span', { class: 'pub__date' }, formatFullDate(item.date))),
    item.authors && h('p', { class: 'pub__authors' }, `Authors: ${item.authors}`),
    item.highlight && h('p', { class: 'pub__highlight' }, h('strong', {}, item.highlight.value), ` ${item.highlight.label}`),
    h('p', { class: 'card__text' }, item.summary),
    (item.details?.length || item.href) &&
      Disclosure({ label: 'More details' },
        item.details?.length > 0 && h('ul', { class: 'bullets' }, item.details.map((d) => h('li', {}, d))),
        item.href && ExternalLink('Open ↗', item.href)));
}

const Group = (title, items) => [h('h2', { class: 'subhead reveal' }, title), h('div', { class: 'grid grid--2' }, items.map(PubCard))];

export const PapersContent = () => Block({ id: 'papers', wide: true }, Group('Research papers & chapters', PUBLICATIONS));

export const PatentsContent = () => Block({ id: 'patents', wide: true }, Group('Patents', PATENTS));

export const TalksContent = () => Block({ id: 'talks', tone: 'tint', wide: true }, Group('Speaker sessions & talks', TALKS));

export const BlogsContent = () =>
  Block({ id: 'posts', wide: true },
    Group('Blogs on Medium', BLOGS),
    h('p', { class: 'center reveal' }, ExternalLink('Read all posts on Medium \u2197', 'https://reetisarup.medium.com/', 'btn btn--ghost')));
