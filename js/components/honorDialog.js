import { ICON_PATHS } from '../config/constants.js';
import { h, icon, replaceChildren } from '../utils/dom.js';

/** Detail dialog for a top award: large image (or icon tile) plus the full description. */
export function createHonorDialog() {
  const body = h('div', { class: 'honor-dialog__body' });
  const close = h('button', { class: 'lightbox__btn lightbox__close', type: 'button', 'aria-label': 'Close' }, icon(ICON_PATHS.close, { size: 26 }));
  const dialog = h('dialog', { class: 'lightbox honor-dialog', 'aria-label': 'Award details' }, close, body);
  let opener = null;

  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => e.target === dialog && dialog.close());
  dialog.addEventListener('close', () => opener?.focus());
  document.body.append(dialog);

  return {
    open(honor, trigger) {
      opener = trigger ?? null;
      const src = honor.full ?? honor.image;
      replaceChildren(body,
        src
          ? h('img', { class: 'honor-dialog__img', src, alt: honor.title })
          : h('div', { class: 'honor-dialog__tile', 'aria-hidden': 'true' }, icon(ICON_PATHS[honor.icon] ?? ICON_PATHS.star, { size: 84 })),
        h('div', { class: 'honor-dialog__text' },
          h('p', { class: 'honor-dialog__year' }, honor.year),
          h('h3', { class: 'honor-dialog__title' }, honor.title),
          h('p', { class: 'honor-dialog__org' }, honor.org),
          honor.detail && h('p', { class: 'honor-dialog__detail' }, honor.detail)));
      dialog.showModal();
    },
  };
}
