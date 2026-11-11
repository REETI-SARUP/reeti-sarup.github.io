import { ICON_PATHS, SPOTLIGHT } from '../config/constants.js';
import { formatFullDate } from '../utils/format.js';
import { h, icon, replaceChildren } from '../utils/dom.js';

/** Modal image viewer built on <dialog>; supports arrow keys and focus return. */
export function createLightbox() {
  let items = [];
  let index = 0;
  let opener = null;

  const img = h('img', { class: 'lightbox__img', alt: '' });
  const caption = h('div', { class: 'lightbox__caption' });
  const counter = h('span', { class: 'lightbox__count', 'aria-live': 'polite' });
  const btn = (cls, path, label, onClick) =>
    h('button', { class: `lightbox__btn ${cls}`, type: 'button', 'aria-label': label, onclick: onClick }, icon(path, { size: 26 }));

  const dialog = h('dialog', { class: 'lightbox', 'aria-label': 'Recognition viewer' },
    btn('lightbox__close', ICON_PATHS.close, 'Close', () => dialog.close()),
    btn('lightbox__prev', ICON_PATHS.prev, 'Previous', () => go(-1)),
    btn('lightbox__next', ICON_PATHS.next, 'Next', () => go(1)),
    h('figure', { class: 'lightbox__fig' }, img, h('figcaption', {}, caption, counter)));

  function render() {
    const item = items[index];
    img.src = item.src ?? `${SPOTLIGHT.IMAGE_BASE}/full/${item.image}`;
    img.alt = [item.title, item.date && formatFullDate(item.date)].filter(Boolean).join(', ');
    replaceChildren(caption,
      h('strong', {}, item.title),
      ' ',
      h('span', {}, item.date ? formatFullDate(item.date) : item.caption ?? ''));
    counter.textContent = `${index + 1} / ${items.length}`;
  }

  function go(step) {
    index = (index + step + items.length) % items.length;
    render();
  }

  dialog.addEventListener('click', (e) => e.target === dialog && dialog.close());
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });
  dialog.addEventListener('close', () => opener?.focus());
  document.body.append(dialog);

  return {
    open(list, i, trigger) {
      items = list;
      index = i;
      opener = trigger ?? null;
      render();
      dialog.showModal();
    },
  };
}
