import { WEBINARS } from '../data/webinars.js';
import { h } from '../utils/dom.js';
import { Block } from './page.js';
import { ExternalLink } from './section.js';
import { createLightbox } from './lightbox.js';

function Webinar(w, lightbox) {
  const photos = w.images.map((src) => ({ src, title: w.title, caption: w.date }));
  return h('article', { class: 'webinar reveal' },
    h('div', { class: `webinar__media${photos.length > 1 ? ' webinar__media--multi' : ''}` }, photos.map((p, i) => {
      const btn = h('button', { class: 'webinar__img', type: 'button', 'aria-label': `Zoom poster: ${w.title}` }, h('img', { src: p.src, alt: '', loading: 'lazy', decoding: 'async' }));
      btn.addEventListener('click', () => lightbox.open(photos, i, btn));
      return btn;
    })),
    h('div', { class: 'webinar__body' },
      h('p', { class: 'card__meta' }, `${w.series} · ${w.date}`),
      h('h3', { class: 'webinar__title' }, w.title),
      h('p', { class: 'webinar__text' }, w.summary),
      w.panel && h('p', { class: 'webinar__panel' }, w.panel),
      h('p', { class: 'webinar__links' }, w.links.map((l) => ExternalLink(`${l.label} ↗`, l.href, 'btn btn--ghost')))));
}

export function WebinarsContent() {
  const lightbox = createLightbox();
  return Block({ id: 'webinars', wide: true },
    h('h2', { class: 'subhead reveal' }, 'Intuit Tech Webinars'),
    h('div', { class: 'stack' }, WEBINARS.map((w) => Webinar(w, lightbox))));
}
