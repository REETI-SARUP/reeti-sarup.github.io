import { h } from '../utils/dom.js';

/** Standard section wrapper with eyebrow, heading and optional lead text. */
export function Section({ id, eyebrow, title, lead, tone = 'light' }, ...children) {
  return h(
    'section',
    { id, class: `section section--${tone}`, 'aria-labelledby': `${id}-title` },
    h(
      'div',
      { class: 'container' },
      h('header', { class: 'section__head reveal' },
        eyebrow && h('p', { class: 'eyebrow' }, eyebrow),
        h('h2', { id: `${id}-title`, class: 'section__title' }, title),
        lead && h('p', { class: 'section__lead' }, lead)),
      ...children,
    ),
  );
}

export const Chip = (text, extra = '') => h('span', { class: `chip ${extra}`.trim() }, text);

export function ExternalLink(label, href, className = 'link') {
  return h('a', { class: className, href, target: '_blank', rel: 'noopener noreferrer' }, label);
}
