import { h } from '../utils/dom.js';

/** Compact gradient banner at the top of every inner page (same look as the home hero). */
export function PageHero({ eyebrow, title, lead, image, wide = false }) {
  return h('header', { class: 'page-hero' },
    h('div', { class: `container page-hero__inner${wide ? ' container--wide' : ''}` },
      h('div', {},
        eyebrow && h('p', { class: 'page-hero__eyebrow' }, eyebrow),
        h('h1', { class: 'page-hero__title' }, title),
        lead && h('p', { class: 'page-hero__lead' }, lead)),
      image && h('img', { class: 'page-hero__img', src: image, alt: '', decoding: 'async' })));
}

/** Content block for an inner page. */
export function Block({ tone = 'light', id, wide = false }, ...children) {
  return h('section', { class: `section section--${tone}`, id }, h('div', { class: `container${wide ? ' container--wide' : ''}` }, ...children));
}
