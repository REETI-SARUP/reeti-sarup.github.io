import { h } from '../utils/dom.js';
import { Block } from './page.js';
import { createLightbox } from './lightbox.js';

/** Conference recap: highlights plus a natural-aspect photo gallery that opens in the lightbox. */
export function ConferenceStory(story) {
  const lightbox = createLightbox();
  const photos = story.photos.map((p) => ({ src: p.src, title: p.title, caption: '' }));
  return Block({ id: story.id, tone: story.tone ?? 'tint', wide: true },
    h('header', { class: 'section__head reveal' },
      h('p', { class: 'eyebrow' }, story.eyebrow),
      h('h2', { class: 'section__title' }, story.title),
      h('p', { class: 'section__lead' }, story.lead),
      story.facts && h('ul', { class: 'chips', role: 'list' }, story.facts.map((f) => h('li', {}, h('span', { class: 'chip chip--accent' }, f)))),
      story.link && h('p', { class: 'story__link' }, h('a', { class: 'btn btn--ghost', href: story.link.href, target: '_blank', rel: 'noopener noreferrer' }, `${story.link.label} \u2197`))),
    h('div', { class: 'story__points' }, story.highlights.map((x) =>
      h('div', { class: 'story__point reveal' }, h('strong', {}, x.title), h('span', {}, x.text)))),
    h('div', { class: 'gallery-masonry' }, photos.map((photo, i) => {
      const btn = h('button', { class: 'gallery-masonry__item reveal', type: 'button', 'aria-label': `Zoom photo: ${photo.title}` },
        h('img', { src: photo.src, alt: photo.title, loading: 'lazy', decoding: 'async' }),
        h('span', { class: 'gallery-masonry__cap' }, photo.title));
      btn.addEventListener('click', () => lightbox.open(photos, i, btn));
      return btn;
    })));
}
