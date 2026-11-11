import { ICON_PATHS } from '../config/constants.js';
import { KEY_PROJECTS, PRODUCT_FEATURES, RESEARCH_PROJECTS } from '../data/projects.js';
import { h, icon } from '../utils/dom.js';
import { Block } from './page.js';
import { Chip } from './section.js';

/** Click-to-load YouTube embed: nothing from YouTube loads until the viewer presses play (faster and more private). */
function VideoEmbed({ id, title }) {
  const play = h('button', { class: 'embed__play', type: 'button', 'aria-label': `Play video: ${title}` },
    h('img', { class: 'embed__thumb', src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, alt: '', loading: 'lazy', decoding: 'async' }),
    h('span', { class: 'embed__btn', 'aria-hidden': 'true' }, icon(ICON_PATHS.play, { size: 36 })));
  const frame = h('div', { class: 'embed' }, play);
  play.addEventListener('click', () => {
    frame.replaceChildren(h('iframe', {
      src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`, title, allowfullscreen: true,
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture', referrerpolicy: 'strict-origin-when-cross-origin',
    }));
  });
  return frame;
}

function ProjectCard(p) {
  return h('article', { class: `project reveal${p.video ? ' project--video' : ''}` },
    h('div', { class: 'project__top' },
      h('span', { class: 'project__icon' }, icon(ICON_PATHS[p.icon] ?? ICON_PATHS.code, { size: 26 })),
      h('div', {}, h('span', { class: 'project__tag' }, p.tag), h('span', { class: 'project__period' }, p.period))),
    h('h3', { class: 'project__title' }, p.title),
    h('p', { class: 'project__org' }, p.org),
    h('p', { class: 'project__text' }, p.text),
    p.note && h('p', { class: 'project__note' }, h('strong', {}, `${p.note.label}: `), p.note.text),
    p.video && VideoEmbed(p.video),
    h('ul', { class: 'chips', role: 'list' }, p.tech.map((t) => h('li', {}, Chip(t)))));
}

const Group = (title, items) => [h('h2', { class: 'subhead reveal' }, title), h('div', { class: 'grid grid--4 project-grid' }, items.map(ProjectCard))];

export const ProjectsContent = () =>
  Block({ id: 'projects', wide: true },
    Group('Key Recent Production AI systems Delivered', KEY_PROJECTS),
    Group('More production systems & product features Launched', PRODUCT_FEATURES),
    Group('More Research & hackathon projects', RESEARCH_PROJECTS));
