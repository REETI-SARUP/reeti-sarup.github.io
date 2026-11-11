import { ICON_PATHS } from '../config/constants.js';
import { PROFILE } from '../data/profile.js';
import { h, icon } from '../utils/dom.js';
import { SocialLinks } from './header.js';

export function Footer() {
  return h('footer', { id: 'contact', class: 'footer' },
    h('div', { class: 'container footer__inner' },
      h('h2', { class: 'footer__title' }, 'Let’s connect'),
      h('p', { class: 'footer__text' }, 'Glad to talk about applied AI, agents and building trustworthy products. Join 1,500+ followers on LinkedIn.'),
      h('div', { class: 'hero__actions' },
        h('a', { class: 'btn btn--primary', href: PROFILE.links[0].href, target: '_blank', rel: 'noopener noreferrer' }, 'Connect on LinkedIn'),
        h('a', { class: 'btn btn--ghost', href: PROFILE.resume, target: '_blank', rel: 'noopener' }, icon(ICON_PATHS.download, { size: 18 }), 'Resume')),
      SocialLinks('social'),
      h('p', { class: 'footer__copy' }, `© ${new Date().getFullYear()} ${PROFILE.name}`)));
}
