import { SPOTLIGHT, STORAGE_KEYS, ICON_PATHS } from '../config/constants.js';
import { HONORS } from '../data/honors.js';
import { SPOTLIGHTS as ALL_SPOTLIGHTS } from '../data/spotlights.js';

/** Kudoboard notes live in their own sub-section below the Spotlights. */
const SPOTLIGHTS = ALL_SPOTLIGHTS.filter((s) => s.kind !== 'kudoboard');
const KUDOS = ALL_SPOTLIGHTS.filter((s) => s.kind === 'kudoboard');
import { applyFilters, DEFAULT_FILTERS, sanitizeFilters, yearFacets, themeFacets, valueFacets } from '../state/spotlightFilters.js';
import { formatMonthYear, pluralize, yearOf } from '../utils/format.js';
import { readJSON, writeJSON } from '../utils/storage.js';
import { h, icon, replaceChildren } from '../utils/dom.js';
import { initRevealOnScroll } from '../utils/observers.js';
import { Block } from './page.js';
import { createLightbox } from './lightbox.js';
import { createHonorDialog } from './honorDialog.js';

/** Full-size image so the screenshot text is legible directly on the card; clicking only zooms. */
const cardSrc = (item) => `${SPOTLIGHT.IMAGE_BASE}/full/${item.image}`;

/* ---------- Top honors: image cards in fixed columns ---------- */

function HonorMedia(honor) {
  if (honor.image) return h('img', { class: 'honor-card__img', src: honor.image, alt: '', loading: 'lazy', decoding: 'async' });
  return h('div', { class: 'honor-card__tile', 'aria-hidden': 'true' }, icon(ICON_PATHS[honor.icon] ?? ICON_PATHS.star, { size: 56 }));
}

function HonorCard(honor, onOpen) {
  const open = h('button', { class: 'honor-card__open', type: 'button', 'aria-label': `View details: ${honor.title}` }, honor.title);
  open.addEventListener('click', () => onOpen(honor, open));
  return h('article', { class: 'honor-card reveal' },
    h('div', { class: 'honor-card__media' }, HonorMedia(honor), h('span', { class: 'honor-card__year' }, honor.year)),
    h('div', { class: 'honor-card__body' },
      h('h3', { class: 'honor-card__title' }, open),
      h('p', { class: 'honor-card__org' }, honor.org),
      honor.detail && h('p', { class: 'honor-card__detail' }, honor.detail),
      h('span', { class: 'honor-card__more', 'aria-hidden': 'true' }, 'View details \u2192')));
}

export function TopHonors() {
  const dialog = createHonorDialog();
  const top = HONORS.filter((x) => x.top);
  const more = HONORS.filter((x) => !x.top);
  return Block({ id: 'top-awards', wide: true },
    h('h2', { class: 'subhead reveal' }, icon(ICON_PATHS.trophy, { size: 22 }), 'Top awards'),
    h('div', { class: 'grid grid--3' }, top.map((x) => HonorCard(x, (honor, t) => dialog.open(honor, t)))),
    h('h2', { class: 'subhead reveal' }, 'More honors'),
    h('ul', { class: 'honors', role: 'list' }, more.map((x) => h('li', { class: 'honor reveal' },
      h('span', { class: 'honor__year' }, x.year),
      h('div', {}, h('h3', { class: 'honor__title' }, x.title), h('p', { class: 'honor__org' }, x.org), x.detail && h('p', { class: 'honor__detail' }, x.detail))))));
}

/* ---------- Spotlight cards ---------- */

/** Gallery card: header (title, value, date) on top, then the full screenshot (it already contains the message). Click to zoom. */
function SpotlightCard(item, onOpen) {
  const view = h('button', { class: 'spot__media', type: 'button', 'aria-label': `Zoom screenshot: ${item.title}` },
    h('img', { src: cardSrc(item), alt: item.message || `Screenshot: ${item.title}`, loading: 'lazy', decoding: 'async' }),
    h('span', { class: 'spot__zoom' }, 'Click to zoom'));
  view.addEventListener('click', () => onOpen(view));
  return h('article', { class: 'spot reveal' },
    h('header', { class: 'spot__head' },
      h('div', { class: 'spot__tags' }, item.value && h('span', { class: 'chip chip--accent' }, item.value), h('time', { class: 'spot__date', datetime: item.date }, formatMonthYear(item.date))),
      h('h4', { class: 'spot__title' }, item.title)),
    view);
}

export function TopSpotlights(lightbox) {
  const featured = applyFilters(SPOTLIGHTS.filter((s) => s.featured), DEFAULT_FILTERS);
  return Block({ id: 'top-spotlights', tone: 'tint', wide: true },
    h('h2', { class: 'subhead reveal' }, icon(ICON_PATHS.star, { size: 22 }), 'Top Spotlights'),
    h('p', { class: 'section__lead reveal' }, 'Standout recognition from leaders and peers.'),
    h('div', { class: 'spot-grid spot-grid--top' }, featured.map((item, i) => SpotlightCard(item, (t) => lightbox.open(featured, i, t)))));
}

/* ---------- Archive: filters + year-grouped, infinitely scrolling grid ---------- */

function Chips({ label, facets, active, onSelect, total }) {
  const make = (value, text, count) =>
    h('button', { class: `filter__chip${active === value ? ' is-active' : ''}`, type: 'button', 'aria-pressed': String(active === value), onclick: () => onSelect(value) },
      text, count != null && h('small', {}, count));
  return h('div', { class: 'filter', role: 'group', 'aria-label': label },
    h('span', { class: 'filter__label' }, label),
    h('div', { class: 'filter__chips' }, make(SPOTLIGHT.ALL, 'All', total), facets.map(([v, c]) => make(v, v, c))));
}

export function SpotlightArchive(lightbox) {
  let filters = sanitizeFilters(readJSON(STORAGE_KEYS.SPOTLIGHT_FILTERS, null));
  let results = [];
  let cursor = 0;
  let groupYear = null;
  let groupGrid = null;
  let observer = null;
  let batchSize = SPOTLIGHT.BATCH_SIZE;

  const controls = h('div', { class: 'filters' });
  const summary = h('p', { class: 'results', 'aria-live': 'polite' });
  const archive = h('div', { class: 'archive' });
  const sentinel = h('div', { class: 'archive__sentinel', 'aria-hidden': 'true' });

  const persist = () => writeJSON(STORAGE_KEYS.SPOTLIGHT_FILTERS, filters);
  const update = (patch) => {
    filters = { ...filters, ...patch, sort: SPOTLIGHT.SORT_NEWEST };
    persist();
    renderControls();
    reset();
  };

  function renderControls() {
    const search = h('input', { class: 'filter__search', type: 'search', placeholder: 'Search by project, person or theme…', value: filters.query, 'aria-label': 'Search recognition' });
    let timer;
    search.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => { filters = { ...filters, query: search.value }; persist(); reset(); }, 150);
    });
    replaceChildren(controls,
      h('div', { class: 'filters__row' }, search, h('button', { class: 'link-btn', type: 'button', onclick: () => update({ ...DEFAULT_FILTERS }) }, 'Reset filters')),
      Chips({ label: 'Year', facets: yearFacets(SPOTLIGHTS), active: filters.year, total: SPOTLIGHTS.length, onSelect: (year) => update({ year }) }),
      Chips({ label: 'Theme', facets: themeFacets(SPOTLIGHTS), active: filters.theme, total: SPOTLIGHTS.length, onSelect: (theme) => update({ theme }) }),
      Chips({ label: 'Value', facets: valueFacets(SPOTLIGHTS), active: filters.value, total: SPOTLIGHTS.length, onSelect: (value) => update({ value }) }));
  }

  /** Append the next batch, opening a new year section whenever the year changes. */
  function appendBatch() {
    const end = Math.min(cursor + batchSize, results.length);
    for (; cursor < end; cursor += 1) {
      const item = results[cursor];
      const year = yearOf(item.date);
      if (year !== groupYear) {
        groupYear = year;
        const count = results.filter((r) => yearOf(r.date) === year).length;
        groupGrid = h('div', { class: 'spot-grid' });
        archive.append(h('section', { class: 'year-group', 'aria-label': `${year} recognition` },
          h('h3', { class: 'year-group__title' }, String(year), h('small', {}, pluralize(count, 'recognition'))),
          year === KUDOS_YEAR && KudoboardRow(lightbox, filters), groupGrid));
      }
      const index = cursor;
      groupGrid.append(SpotlightCard(item, (t) => lightbox.open(results, index, t)));
    }
    initRevealOnScroll(archive);
    const done = cursor >= results.length;
    sentinel.hidden = done;
    if (!done && observer) { observer.unobserve(sentinel); observer.observe(sentinel); }
  }

  function reset() {
    results = applyFilters(SPOTLIGHTS, filters);
    cursor = 0; groupYear = null; groupGrid = null;
    summary.textContent = `${pluralize(results.length, 'recognition')}, newest first`;
    replaceChildren(archive);
    if (!results.length) { archive.append(h('p', { class: 'empty' }, 'No recognition matches these filters.')); sentinel.hidden = true; return; }
    appendBatch();
  }

  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && appendBatch(), { rootMargin: '800px 0px' });
    observer.observe(sentinel);
  } else {
    batchSize = Infinity; // no IntersectionObserver: render everything at once
  }

  renderControls();
  reset();
  return Block({ id: 'all-spotlights', wide: true },
    h('h2', { class: 'subhead reveal' }, `All Spotlights (${SPOTLIGHTS.length})`),
    controls, summary, archive, sentinel);
}

const KUDOS_YEAR = 2024;

/** Horizontal Kudoboard sub-section shown inside the 2024 group (the 5-year milestone, Aug 2024). */
function KudoboardRow(lightbox, filters) {
  const kudos = applyFilters(KUDOS, filters);
  if (!kudos.length) return null;
  return h('div', { class: 'kudos' },
    h('h4', { class: 'kudos__title' }, icon(ICON_PATHS.people, { size: 20 }), 'Kudoboard: 5 years at Intuit',
      h('small', {}, `Aug 2024 \u00b7 ${pluralize(kudos.length, 'note')}`)),
    h('div', { class: 'kudos__row' }, kudos.map((item, i) => SpotlightCard(item, (t) => lightbox.open(kudos, i, t)))));
}

export function KudoboardSection(lightbox) {
  return Block({ id: 'kudoboard', tone: 'tint', wide: true },
    h('h2', { class: 'subhead reveal' }, icon(ICON_PATHS.people, { size: 22 }), 'Kudoboard: 5 years at Intuit'),
    h('p', { class: 'section__lead reveal' }, 'Notes from colleagues celebrating my 5-year milestone, August 2024.'),
    h('div', { class: 'spot-grid' }, KUDOS.map((item, i) => SpotlightCard(item, (t) => lightbox.open(KUDOS, i, t)))));
}
