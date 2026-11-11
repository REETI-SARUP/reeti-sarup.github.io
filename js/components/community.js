import { COMMUNITY_ROLES } from '../data/community.js';
import { h } from '../utils/dom.js';
import { Block } from './page.js';

export const CommunityContent = () =>
  Block({ id: 'leadership' },
    h('h2', { class: 'subhead reveal' }, 'Leadership & volunteering'),
    h('div', { class: 'grid grid--2' }, COMMUNITY_ROLES.map((r) => h('article', { class: 'card reveal' },
      h('p', { class: 'card__meta' }, r.period), h('h3', { class: 'card__title' }, r.title), h('p', { class: 'card__org' }, r.org), r.detail && h('p', { class: 'card__text' }, r.detail)))));
