import { SECTION } from '../config/constants.js';
import { EXPERIENCE, EARLY_CAREER } from '../data/experience.js';
import { h } from '../utils/dom.js';
import { Section, Chip, ExternalLink } from './section.js';
import { Disclosure } from './disclosure.js';

function RoleCard(role) {
  return h('article', { class: `role reveal${role.current ? ' role--current' : ''}` },
    h('div', { class: 'role__head' },
      h('div', {}, h('h3', { class: 'role__title' }, role.role), h('p', { class: 'role__org' }, `${role.org} · ${role.team}`)),
      h('span', { class: 'role__period' }, role.period, role.current && Chip('Current', 'chip--accent'))),
    h('p', { class: 'role__summary' }, role.summary),
    Disclosure({ label: 'Key contributions', defaultOpen: role.current }, h('ul', { class: 'bullets' }, role.highlights.map((t) => h('li', {}, t))),
      role.tech.length > 0 && h('ul', { class: 'chips', role: 'list' }, role.tech.map((t) => h('li', {}, Chip(t))))));
}

function EarlyCard(item) {
  return h('article', { class: 'card early reveal' },
    item.image && h('img', { class: 'early__img', src: item.image, alt: '', loading: 'lazy', decoding: 'async' }),
    h('div', { class: 'early__body' },
      h('p', { class: 'card__meta' }, item.period),
      h('h3', { class: 'card__title' }, item.role),
      h('p', { class: 'card__org' }, item.org),
      h('p', { class: 'card__text' }, item.summary),
      item.link && ExternalLink(`${item.link.label} ↗`, item.link.href)));
}

export function ExperienceSection() {
  return Section({ id: SECTION.EXPERIENCE, eyebrow: 'Experience', title: 'Career at Intuit', lead: '7 years 5 months of building: from QuickBooks Online Advanced to the AI-native Intuit Enterprise Suite.' },
    h('div', { class: 'timeline' }, EXPERIENCE.map(RoleCard)),
    h('h3', { class: 'subhead reveal' }, 'Early experience'),
    h('div', { class: 'grid grid--3' }, EARLY_CAREER.map(EarlyCard)));
}
