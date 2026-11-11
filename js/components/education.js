import { SECTION } from '../config/constants.js';
import { EDUCATION } from '../data/education.js';
import { h } from '../utils/dom.js';
import { Section, Chip } from './section.js';

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

export const EducationSection = () =>
  Section({ id: SECTION.EDUCATION, tone: 'tint', eyebrow: 'Education', title: 'Academic foundation', lead: 'Top-of-class results from school through a 4.0 GPA master’s in machine learning.' },
    h('div', { class: 'stack' }, EDUCATION.map(EduCard)));
