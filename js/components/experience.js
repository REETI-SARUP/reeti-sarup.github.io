import { EXPERIENCE, EARLY_CAREER, INTUIT } from '../data/experience.js';
import { h } from '../utils/dom.js';
import { Block } from './page.js';
import { Chip, ExternalLink } from './section.js';
import { Disclosure } from './disclosure.js';

/** First four-digit year in a period string, e.g. "May 2025 \u2013 Aug 2026" -> "2025". */
const startYear = (period) => period.match(/\d{4}/)?.[0] ?? '';

function IntuitHeader() {
  return h('article', { class: 'org-card reveal' },
    h('img', { class: 'org-card__img', src: INTUIT.image, alt: 'Reeti at Intuit', decoding: 'async' }),
    h('div', { class: 'org-card__body' },
      h('div', { class: 'org-card__head' },
        h('h2', { class: 'org-card__title' }, INTUIT.org),
        h('p', { class: 'org-card__meta' }, `${INTUIT.period} · ${INTUIT.duration} · ${INTUIT.location}`)),
      h('p', { class: 'org-card__text' }, INTUIT.summary)));
}

function RoleCard(role) {
  return h('article', { class: `role reveal${role.current ? ' role--current' : ''}` },
    h('span', { class: 'role__year', 'aria-hidden': 'true' }, startYear(role.period)),
    h('div', { class: 'role__head' },
      h('div', {}, h('h3', { class: 'role__title' }, role.role), h('p', { class: 'role__org' }, role.team)),
      h('span', { class: 'role__period' }, role.period, role.current && Chip('Current', 'chip--accent'))),
    h('p', { class: 'role__summary' }, role.summary),
    Disclosure({ label: 'Key Highlights', defaultOpen: role.current },
      h('ul', { class: 'bullets' }, role.highlights.map((t) => h('li', {}, t))),
      role.tech.length > 0 && h('ul', { class: 'chips', role: 'list' }, role.tech.map((t) => h('li', {}, Chip(t))))));
}

function EarlyCard(item) {
  return h('article', { class: 'role role--early reveal' },
    h('span', { class: 'role__year', 'aria-hidden': 'true' }, startYear(item.period)),
    item.image && h('img', { class: 'role__thumb', src: item.image, alt: '', loading: 'lazy', decoding: 'async' }),
    h('div', { class: 'role__main' },
      h('div', { class: 'role__head' },
        h('div', {}, h('h3', { class: 'role__title' }, item.role), h('p', { class: 'role__org' }, item.org)),
        h('span', { class: 'role__period' }, item.period)),
      h('p', { class: 'role__summary' }, item.summary),
      item.link && ExternalLink(`${item.link.label} ↗`, item.link.href)));
}

export const ExperienceContent = () =>
  Block({ id: 'career' },
    IntuitHeader(),
    h('div', { class: 'timeline' }, EXPERIENCE.map(RoleCard)),
    h('h2', { class: 'subhead reveal' }, 'Internships & early experience'),
    h('div', { class: 'timeline timeline--early' }, EARLY_CAREER.map(EarlyCard)));
