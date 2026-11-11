import { SECTION, SPOTLIGHT, STORAGE_KEYS, ICON_PATHS } from '../config/constants.js';
import { HONORS } from '../data/honors.js';
import { SPOTLIGHTS } from '../data/spotlights.js';
import { applyFilters, DEFAULT_FILTERS, sanitizeFilters, yearFacets, themeFacets, valueFacets } from '../state/spotlightFilters.js';
import { formatMonthYear, pluralize } from '../utils/format.js';
import { readJSON, writeJSON } from '../utils/storage.js';
import { h, icon, replaceChildren } from '../utils/dom.js';
import { Section } from './section.js';
import { createLightbox } from './lightbox.js';

const thumbSrc = (item) => `${SPOTLIGHT.IMAGE_BASE}/thumb/${item.image}`;

function HonorCard(honor) {
  return h('li', { class: `honor reveal${honor.featured ? ' honor--featured' : ''}` },
    h('span', { class: 'honor__year' }, honor.year),
    h('div', {},
      h('h4', { class: 'honor__title' }, honor.featured && icon(ICON_PATHS.star, { size: 16 }), honor.title),
      h('p', { class: 'honor__org' }, honor.org),
      honor.detail && h('p', { class: 'honor__detail' }, honor.detail)));
}

function SpotlightCard(item, onOpen, { compact = false } = {}) {
  const btn = h('button', { class: `spot${compact ? ' spot--compact' : ''}`, type: 'button', 'aria-label': `View: ${item.title}, ${formatMonthYear(item.date)}` },
    h('img', { src: thumbSrc(item), alt: '', loading: 'lazy', decoding: 'async', width: 320, height: 220 }),
    h('span', { class: 'spot__meta' },
      h('strong', { class: 'spot__title' }, item.title),
      h('span', { class: 'spot__sub' }, [formatMonthYear(item.date), item.giver].filter(Boolean).join(' · '))));
  btn.addEventListener('click', () => onOpen(btn));
  return btn;
}

function Chips({ label, facets, active, onSelect, total }) {
  const make = (value, text, count) =>
    h('button', { class: `filter__chip${active === value ? ' is-active' : ''}`, type: 'button', 'aria-pressed': String(active === value), onclick: () => onSelect(value) },
      text, count != null && h('small', {}, count));
  return h('div', { class: 'filter', role: 'group', 'aria-label': label },
    h('span', { class: 'filter__label' }, label),
    h('div', { class: 'filter__chips' }, make(SPOTLIGHT.ALL, 'All', total), facets.map(([v, c]) => make(v, v, c))));
}

export function SpotlightSection() {
  const lightbox = createLightbox();
  let filters = sanitizeFilters(readJSON(STORAGE_KEYS.SPOTLIGHT_FILTERS, null));
  let visible = SPOTLIGHT.PAGE_SIZE;

  const controls = h('div', { class: 'filters reveal' });
  const summary = h('p', { class: 'results', 'aria-live': 'polite' });
  const grid = h('div', { class: 'spot-grid' });
  const more = h('button', { class: 'btn btn--ghost', type: 'button' }, 'Load more');
  more.addEventListener('click', () => { visible += SPOTLIGHT.PAGE_SIZE; renderGrid(); });

  const update = (patch) => {
    filters = { ...filters, ...patch };
    visible = SPOTLIGHT.PAGE_SIZE;
    writeJSON(STORAGE_KEYS.SPOTLIGHT_FILTERS, filters);
    renderControls();
    renderGrid();
  };

  function renderControls() {
    const search = h('input', { class: 'filter__search', type: 'search', placeholder: 'Search recognition…', value: filters.query, 'aria-label': 'Search recognition' });
    search.addEventListener('input', () => {
      filters = { ...filters, query: search.value };
      visible = SPOTLIGHT.PAGE_SIZE;
      writeJSON(STORAGE_KEYS.SPOTLIGHT_FILTERS, filters);
      renderGrid();
    });
    const sort = h('select', { class: 'filter__select', 'aria-label': 'Sort order' },
      h('option', { value: SPOTLIGHT.SORT_NEWEST, selected: filters.sort === SPOTLIGHT.SORT_NEWEST }, 'Newest first'),
      h('option', { value: SPOTLIGHT.SORT_OLDEST, selected: filters.sort === SPOTLIGHT.SORT_OLDEST }, 'Oldest first'));
    sort.addEventListener('change', () => update({ sort: sort.value }));
    const reset = h('button', { class: 'link-btn', type: 'button', onclick: () => update({ ...DEFAULT_FILTERS }) }, 'Reset filters');
    replaceChildren(controls,
      h('div', { class: 'filters__row' }, search, sort, reset),
      Chips({ label: 'Year', facets: yearFacets(SPOTLIGHTS), active: filters.year, total: SPOTLIGHTS.length, onSelect: (year) => update({ year }) }),
      Chips({ label: 'Theme', facets: themeFacets(SPOTLIGHTS), active: filters.theme, total: SPOTLIGHTS.length, onSelect: (theme) => update({ theme }) }),
      Chips({ label: 'Value', facets: valueFacets(SPOTLIGHTS), active: filters.value, total: SPOTLIGHTS.length, onSelect: (value) => update({ value }) }));
  }

  function renderGrid() {
    const results = applyFilters(SPOTLIGHTS, filters);
    const shown = results.slice(0, visible);
    summary.textContent = `Showing ${shown.length} of ${pluralize(results.length, 'recognition')}`;
    const open = (trigger, i) => lightbox.open(results, i, trigger);
    replaceChildren(grid, shown.length
      ? shown.map((item, i) => SpotlightCard(item, (t) => open(t, i)))
      : h('p', { class: 'empty' }, 'No recognition matches these filters.'));
    more.hidden = shown.length >= results.length;
  }

  renderControls();
  renderGrid();

  const featured = SPOTLIGHTS.filter((s) => s.featured);
  const featuredList = applyFilters(featured, { ...DEFAULT_FILTERS });

  return Section({ id: SECTION.RECOGNITION, eyebrow: 'Recognition', title: 'Awards, honors & Spotlights', lead: `Top honors pinned first, followed by ${SPOTLIGHTS.length} peer and leadership Spotlight recognitions from 2018 to today. Filter by year, theme or company value.` },
    h('h3', { class: 'subhead reveal' }, icon(ICON_PATHS.star, { size: 20 }), 'Top honors'),
    h('ul', { class: 'honors', role: 'list' }, HONORS.map(HonorCard)),
    h('h3', { class: 'subhead reveal' }, icon(ICON_PATHS.star, { size: 20 }), 'Pinned Spotlights'),
    h('div', { class: 'pinned', role: 'list' }, featuredList.map((item, i) => h('div', { role: 'listitem' }, SpotlightCard(item, (t) => lightbox.open(featuredList, i, t), { compact: true })))),
    h('h3', { class: 'subhead reveal' }, 'All Spotlights'),
    controls, summary, grid, h('p', { class: 'center' }, more),
    h('p', { class: 'fineprint' }, 'Award amounts are intentionally hidden throughout.'));
}

