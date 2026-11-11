import { EDUCATION } from '../data/education.js';
import { h } from '../utils/dom.js';
import { Block } from './page.js';
import { Chip } from './section.js';

function EduCard(e) {
  return h('article', { class: 'card edu reveal' },
    h('img', { class: 'edu__img', src: e.image, alt: `${e.school}`, loading: 'lazy', decoding: 'async' }),
    h('div', { class: 'edu__body' },
      h('p', { class: 'card__meta' }, e.period),
      h('h3', { class: 'card__title' }, e.school),
      h('p', { class: 'edu__degree' }, e.degree),
      Chip(e.grade, 'chip--gold'),
      h('ul', { class: 'bullets' }, e.points.map((p) => h('li', {}, p))),
      e.gallery && h('div', { class: 'edu__gallery' }, e.gallery.map((src) => h('img', { src, alt: 'Graduation photo', loading: 'lazy', decoding: 'async' })))));
}

export const EducationContent = () =>
  Block({ id: 'degrees' }, h('div', { class: 'stack' }, EDUCATION.map(EduCard)));
