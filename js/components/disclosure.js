import { ICON_PATHS } from '../config/constants.js';
import { h, icon } from '../utils/dom.js';

let uid = 0;

/**
 * Accessible expand/collapse region (button + panel).
 * @param {{label:string, defaultOpen?:boolean, className?:string}} opts
 */
export function Disclosure({ label, defaultOpen = false, className = '' }, ...content) {
  const id = `disc-${++uid}`;
  const panel = h('div', { class: 'disclosure__panel', id, hidden: !defaultOpen }, ...content);
  const btn = h('button', { class: 'disclosure__btn', type: 'button', 'aria-expanded': String(defaultOpen), 'aria-controls': id },
    h('span', {}, label), icon(ICON_PATHS.chevron, { size: 20 }));
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
  });
  return h('div', { class: `disclosure ${className}`.trim() }, btn, panel);
}
