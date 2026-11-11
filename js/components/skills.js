import { SKILL_GROUPS, VERIFIED_SKILLS } from '../data/skills.js';
import { h } from '../utils/dom.js';
import { Block } from './page.js';
import { Chip } from './section.js';

export const SkillsContent = () =>
  Block({ id: 'toolbox' },
    h('div', { class: 'grid grid--3' },
      SKILL_GROUPS.map((g) => h('article', { class: 'card reveal' },
        h('h3', { class: 'card__title' }, g.title),
        h('ul', { class: 'chips', role: 'list' }, g.items.map((s) => h('li', {}, Chip(s, VERIFIED_SKILLS.includes(s) ? 'chip--accent' : '')))))),
    ),
    h('p', { class: 'fineprint' }, 'Highlighted skills passed a LinkedIn Skill Assessment.'));
