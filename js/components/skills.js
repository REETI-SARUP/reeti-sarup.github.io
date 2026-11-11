import { SKILL_GROUPS, VERIFIED_SKILLS, TOP_SKILLS } from '../data/skills.js';
import { ICON_PATHS } from '../config/constants.js';
import { h, icon } from '../utils/dom.js';
import { Block } from './page.js';
import { Chip } from './section.js';

const TopSkillTile = (skill, i) =>
  h('article', { class: 'top-skill reveal' },
    h('span', { class: 'top-skill__rank', 'aria-hidden': 'true' }, String(i + 1).padStart(2, '0')),
    h('span', { class: 'top-skill__icon', 'aria-hidden': 'true' }, icon(ICON_PATHS[skill.icon] ?? ICON_PATHS.star, { size: 26 })),
    h('h3', { class: 'top-skill__name' }, skill.name),
    h('p', { class: 'top-skill__text' }, skill.text));

export const SkillsContent = () =>
  Block({ id: 'toolbox', wide: true },
    h('h2', { class: 'subhead reveal' }, icon(ICON_PATHS.star, { size: 22 }), 'Top skills'),
    h('div', { class: 'top-skills' }, TOP_SKILLS.map(TopSkillTile)),
    h('h2', { class: 'subhead reveal' }, 'All skills'),
    h('div', { class: 'grid grid--3' },
      SKILL_GROUPS.map((g) => h('article', { class: 'card reveal' },
        h('h3', { class: 'card__title' }, g.title, h('span', { class: 'skill-count' }, g.items.length)),
        h('ul', { class: 'chips', role: 'list' }, g.items.map((s) => h('li', {}, Chip(s, VERIFIED_SKILLS.includes(s) ? 'chip--accent' : ''))))))),
    h('p', { class: 'fineprint' }, 'Highlighted skills passed a LinkedIn Skill Assessment.'));
