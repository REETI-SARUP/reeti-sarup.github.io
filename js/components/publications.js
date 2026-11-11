import { SECTION } from '../config/constants.js';
import { PUBLICATIONS, TALKS, BLOGS } from '../data/publications.js';
import { formatFullDate } from '../utils/format.js';
import { h } from '../utils/dom.js';
import { Section, Chip, ExternalLink } from './section.js';
import { Disclosure } from './disclosure.js';

function ResponseStrip(response) {
  return h('dl', { class: 'response' },
    response.map((r) => h('div', { class: 'response__item' }, h('dt', {}, r.label), h('dd', {}, r.value))));
}

function PubCard(item) {
  return h('article', { class: 'card pub reveal' },
    h('div', { class: 'pub__top' }, Chip(item.type), item.badge && Chip(item.badge, 'chip--gold')),
    h('h4', { class: 'card__title' }, item.title),
    h('p', { class: 'card__meta' }, [item.venue, item.date && formatFullDate(item.date)].filter(Boolean).join(' · ')),
    item.authors && h('p', { class: 'card__org' }, `Authors: ${item.authors}`),
    h('p', { class: 'card__text' }, item.summary),
    (item.details?.length || item.response || item.href) &&
      Disclosure({ label: 'More details' },
        item.details?.length > 0 && h('ul', { class: 'bullets' }, item.details.map((d) => h('li', {}, d))),
        item.response && [h('p', { class: 'card__meta' }, 'Response on LinkedIn'), ResponseStrip(item.response)],
        item.href && ExternalLink('Open ↗', item.href)));
}

const Group = (title, items) => [h('h3', { class: 'subhead reveal' }, title), h('div', { class: 'grid grid--2' }, items.map(PubCard))];

export function PublicationsSection() {
  return Section({ id: SECTION.PUBLICATIONS, tone: 'tint', eyebrow: 'Publications & Talks', title: 'Research, speaking and writing', lead: 'Peer-reviewed papers, a patent filing, Grace Hopper stages and blogs. Open any card for details.' },
    Group('Research papers & chapters', PUBLICATIONS),
    Group('Speaker sessions & talks', TALKS),
    Group('Blogs on Medium', BLOGS),
    h('p', { class: 'center reveal' }, ExternalLink('Read all posts on Medium ↗', 'https://reetisarup.medium.com/', 'btn btn--ghost')));
}
