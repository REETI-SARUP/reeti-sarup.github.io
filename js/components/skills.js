import { SECTION } from '../config/constants.js';
import { SKILL_GROUPS, VERIFIED_SKILLS } from '../data/skills.js';
import { h } from '../utils/dom.js';
import { Section, Chip } from './section.js';

export const SkillsSection = () =>
  Section({ id: SECTION.SKILLS, eyebrow: 'Skills', title: 'Toolbox', lead: 'From LLM agents and RL to React and GraphQL.' },
    h('div', { class: 'grid grid--3' },
      SKILL_GROUPS.map((g) => h('article', { class: 'card reveal' },
        h('h3', { class: 'card__title' }, g.title),
        h('ul', { class: 'chips', role: 'list' }, g.items.map((s) => h('li', {}, Chip(s, VERIFIED_SKILLS.includes(s) ? 'chip--accent' : '')))))),
    ),
    h('p', { class: 'fineprint' }, 'Highlighted skills passed a LinkedIn Skill Assessment.'));
