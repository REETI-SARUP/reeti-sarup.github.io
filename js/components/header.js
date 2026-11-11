import { NAV_ITEMS, ICON_PATHS } from '../config/constants.js';
import { PROFILE } from '../data/profile.js';
import { h, icon } from '../utils/dom.js';

export function SocialLinks(className = 'social') {
  return h('ul', { class: className, role: 'list' },
    PROFILE.links.map((l) => h('li', {},
      h('a', { href: l.href, target: '_blank', rel: 'noopener noreferrer', 'aria-label': l.label, title: l.label }, icon(ICON_PATHS[l.id], { size: 22 })))));
}

/** Primary navigation. Each item is a page; the current page is marked with aria-current. */
export function NavBar(currentPage) {
  const list = h('ul', { class: 'nav__list', id: 'nav-list' },
    NAV_ITEMS.map((n) => h('li', {},
      h('a', { href: n.href, class: `nav__link${n.id === currentPage ? ' is-active' : ''}`, 'aria-current': n.id === currentPage ? 'page' : null, title: n.label }, n.shortLabel ?? n.label))),
    h('li', { class: 'nav__cta' }, h('a', { class: 'nav__resume', href: PROFILE.resume, target: '_blank', rel: 'noopener' }, icon(ICON_PATHS.download, { size: 15 }), 'Resume')));

  const toggle = h('button', { class: 'nav__toggle', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'nav-list' },
    h('span', { class: 'sr-only' }, 'Toggle navigation'), h('span', { class: 'nav__bars', 'aria-hidden': 'true' }));

  const nav = h('nav', { class: 'nav is-solid', 'aria-label': 'Primary' }, h('div', { class: 'container container--wide nav__inner' }, toggle, list));

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));
  return nav;
}
