import { CAREERS_FEATURE as C, JOURNEY_FEATURE as J } from '../data/features.js';
import { h } from '../utils/dom.js';
import { Block } from './page.js';
import { ExternalLink } from './section.js';
import { createLightbox } from './lightbox.js';

/** Features published by Intuit: the Careers page spotlight and the Intuit India career-journey post. */
export function FeaturesContent() {
  const lightbox = createLightbox();
  const zoomable = C.images.filter((i) => !i.static);
  const shots = zoomable.map((i) => ({ src: i.src, title: i.alt, caption: 'Intuit Careers' }));
  return Block({ id: 'features', tone: 'tint' },
    h('header', { class: 'section__head reveal' },
      h('p', { class: 'eyebrow' }, C.eyebrow), h('h2', { class: 'section__title' }, C.title), h('p', { class: 'section__lead' }, C.lead)),
    h('blockquote', { class: 'pullquote reveal' }, C.quote, h('footer', {}, 'Reeti Sarup, Intuit Careers')),
    h('div', { class: 'feature-shots' }, C.images.map((img) => {
      // Static images (e.g. the promoted post) are display-only: no button, no zoom.
      if (img.static) return h('div', { class: 'feature-shots__item feature-shots__item--static reveal' }, h('img', { src: img.src, alt: img.alt, loading: 'lazy', decoding: 'async' }));
      const i = zoomable.indexOf(img);
      const btn = h('button', { class: 'feature-shots__item reveal', type: 'button', 'aria-label': `Zoom: ${img.alt}` }, h('img', { src: img.src, alt: img.alt, loading: 'lazy', decoding: 'async' }));
      btn.addEventListener('click', () => lightbox.open(shots, i, btn));
      return btn;
    })),
    h('div', { class: 'feature-bio reveal' }, C.bio.map((p) => h('p', {}, p))),
    h('article', { class: 'webinar webinar--journey reveal' },
      h('div', { class: 'webinar__media' }, h('img', { class: 'webinar__single', src: J.image, alt: '', loading: 'lazy', decoding: 'async' })),
      h('div', { class: 'webinar__body' },
        h('p', { class: 'card__meta' }, 'Intuit India'),
        h('h3', { class: 'webinar__title' }, J.title),
        h('p', { class: 'webinar__text' }, J.text),
        h('p', { class: 'webinar__links' }, ExternalLink('Read the feature on LinkedIn ↗', J.href, 'btn btn--ghost')))));
}
