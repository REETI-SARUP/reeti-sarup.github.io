import { ICON_PATHS } from '../config/constants.js';
import { h, icon } from '../utils/dom.js';
import { Block } from './page.js';
import { createLightbox } from './lightbox.js';

/** Post snapshot thumbnail; click to zoom. */
function SnapshotButton(it, shots, lightbox) {
  const btn = h('button', { class: 'quote__shot', type: 'button', 'aria-label': `Zoom ${it.name}'s post` }, h('img', { src: it.image, alt: `Snapshot of ${it.name}'s LinkedIn post`, loading: 'lazy', decoding: 'async' }));
  btn.addEventListener('click', () => lightbox.open(shots, shots.findIndex((x) => x.src === it.image), btn));
  return btn;
}

/** Scroll-snap carousel of feedback cards with prev/next buttons and position dots. */
export function FeedbackCarousel({ id, eyebrow, title, lead, items }) {
  if (!items.length) return null;
  const lightbox = createLightbox();
  const shots = items.filter((it) => it.image).map((it) => ({ src: it.image, title: `${it.name}'s LinkedIn post`, caption: 'LinkedIn post snapshot' }));
  const track = h('div', { class: 'carousel__track', tabindex: '0', role: 'group', 'aria-label': title },
    items.map((it) => h('figure', { class: `quote${it.image ? ' quote--shot' : ''}` },
      it.image && SnapshotButton(it, shots, lightbox),
      h('blockquote', { class: 'quote__text' }, it.quote),
      h('figcaption', { class: 'quote__by' },
        h('strong', {}, it.name), it.role && h('span', {}, it.role), it.source && h('span', { class: 'chip chip--accent' }, it.source),
        it.href && h('a', { class: 'quote__link', href: it.href, target: '_blank', rel: 'noopener noreferrer' }, 'View post \u2197')))));
  const dots = h('div', { class: 'carousel__dots', 'aria-hidden': 'true' }, items.map(() => h('span', { class: 'carousel__dot' })));
  const step = (dir) => track.scrollBy({ left: dir * track.clientWidth * 0.9, behavior: 'smooth' });
  const btn = (cls, path, label, dir) => h('button', { class: `carousel__btn ${cls}`, type: 'button', 'aria-label': label, onclick: () => step(dir) }, icon(path, { size: 24 }));

  const sync = () => {
    const cards = [...track.children];
    const i = cards.findIndex((c) => c.offsetLeft + c.offsetWidth / 2 > track.scrollLeft + track.clientWidth / 2 - 1);
    [...dots.children].forEach((d, k) => d.classList.toggle('is-active', k === Math.max(0, i)));
  };
  track.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
  track.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); });
  queueMicrotask(sync);

  return Block({ id, tone: 'light', wide: true },
    h('header', { class: 'section__head reveal' },
      eyebrow && h('p', { class: 'eyebrow' }, eyebrow), h('h2', { class: 'section__title' }, title), lead && h('p', { class: 'section__lead' }, lead)),
    h('div', { class: 'carousel reveal' }, btn('carousel__prev', ICON_PATHS.prev, 'Previous feedback', -1), track, btn('carousel__next', ICON_PATHS.next, 'Next feedback', 1)),
    dots);
}
