import { NAV_ITEMS, ICON_PATHS } from '../config/constants.js';
import { PROFILE } from '../data/profile.js';
import { h, icon, qsa } from '../utils/dom.js';

export function SocialLinks(className = 'social') {
  return h('ul', { class: className, role: 'list' },
    PROFILE.links.map((l) => h('li', {},
      h('a', { href: l.href, target: '_blank', rel: 'noopener noreferrer', 'aria-label': l.label, title: l.label }, icon(ICON_PATHS[l.id], { size: 22 })))));
}

export function NavBar() {
  const list = h('ul', { class: 'nav__list', id: 'nav-list' },
    NAV_ITEMS.map((n) => h('li', {}, h('a', { href: `#${n.id}`, class: 'nav__link', dataset: { section: n.id } }, n.label))));

  const toggle = h('button', { class: 'nav__toggle', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'nav-list' },
    h('span', { class: 'sr-only' }, 'Toggle navigation'), h('span', { class: 'nav__bars', 'aria-hidden': 'true' }));

  const nav = h('nav', { class: 'nav', 'aria-label': 'Primary' }, h('div', { class: 'container nav__inner' }, toggle, list));

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  list.addEventListener('click', (e) => e.target.closest('a') && setOpen(false));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));
  window.addEventListener('scroll', () => nav.classList.toggle('is-solid', window.scrollY > 40), { passive: true });
  return nav;
}

export function setActiveNav(id) {
  qsa('.nav__link').forEach((a) => a.classList.toggle('is-active', a.dataset.section === id));
}
