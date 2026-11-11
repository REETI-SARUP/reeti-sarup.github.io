import { SECTION } from '../config/constants.js';
import { COMMUNITY_ROLES, PROJECTS } from '../data/community.js';
import { h } from '../utils/dom.js';
import { Section } from './section.js';

export const CommunitySection = () =>
  Section({ id: SECTION.COMMUNITY, tone: 'tint', eyebrow: 'Community & Projects', title: 'Leading, mentoring and building', lead: 'Communities I help run, and projects from research and hackathons.' },
    h('h3', { class: 'subhead reveal' }, 'Leadership & volunteering'),
    h('div', { class: 'grid grid--2' }, COMMUNITY_ROLES.map((r) => h('article', { class: 'card reveal' },
      h('p', { class: 'card__meta' }, r.period), h('h4', { class: 'card__title' }, r.title), h('p', { class: 'card__org' }, r.org), r.detail && h('p', { class: 'card__text' }, r.detail)))),
    h('h3', { class: 'subhead reveal' }, 'Selected projects'),
    h('div', { class: 'grid grid--2' }, PROJECTS.map((p) => h('article', { class: 'card reveal' },
      h('h4', { class: 'card__title' }, p.title), h('p', { class: 'card__org' }, p.org), h('p', { class: 'card__text' }, p.detail)))));
