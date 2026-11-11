import { SPOTLIGHT, STORAGE_KEYS, ICON_PATHS } from '../config/constants.js';
import { HONORS } from '../data/honors.js';
import { SPOTLIGHTS as ALL_SPOTLIGHTS } from '../data/spotlights.js';

/** Kudoboard notes live in their own sub-section below the Spotlights. */
const SPOTLIGHTS = ALL_SPOTLIGHTS.filter((s) => s.kind !== 'kudoboard' && s.kind !== 'winners');
const WINNER = ALL_SPOTLIGHTS.find((s) => s.kind === 'winners');
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
  const top = HONORS.filter((x) => x.top).sort((a, b) => b.year - a.year);
  const more = HONORS.filter((x) => !x.top);
  return Block({ id: 'top-awards', wide: true },
    h('h2', { class: 'subhead reveal' }, icon(ICON_PATHS.trophy, { size: 22 }), 'Top awards'),
    h('div', { class: 'grid grid--3' }, top.map((x) => HonorCard(x, (honor, t) => dialog.open(honor, t)))),
    h('h2', { class: 'subhead reveal' }, 'More Awards & Recognitions'),
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
  const featured = applyFilters(ALL_SPOTLIGHTS.filter((s) => s.featured && s.kind !== 'kudoboard'), DEFAULT_FILTERS);
  return Block({ id: 'top-spotlights', tone: 'tint', wide: true },
    h('h2', { class: 'subhead reveal' }, icon(ICON_PATHS.star, { size: 22 }), 'Top Spotlights'),
    h('p', { class: 'section__lead reveal' }, 'Standout recognition from leaders and peers, newest first.'),
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
    const search = h('input', { class: 'filter__search', type: 'search', placeholder: 'Search by project or theme…', value: filters.query, 'aria-label': 'Search recognition' });
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
          groupGrid));
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

/** Turn runs of \u2588 in a message into real black boxes, so hidden names look like a rectangle over the text. */
function withRedactions(text) {
  return text.split(/(\u2588+)/).map((part) => (/^\u2588+$/.test(part) ? h('span', { class: 'redacted', 'aria-label': 'name hidden' }, '\u00a0'.repeat(Math.max(4, part.length))) : part));
}

/** The FY23 Q4 Customer Obsession winners slide, shown as its own highlighted row (image plus the full write-up). */
export function WinnerRow(lightbox) {
  if (!WINNER) return null;
  const view = h('button', { class: 'winner__media', type: 'button', 'aria-label': 'Zoom the FY23 Q4 Customer Obsession winners slide' },
    h('img', { src: cardSrc(WINNER), alt: 'FY23 Q4 Customer Obsession Winners slide', loading: 'lazy', decoding: 'async' }),
    h('span', { class: 'spot__zoom' }, 'Click to zoom'));
  view.addEventListener('click', () => lightbox.open([WINNER], 0, view));
  return Block({ id: 'winner', tone: 'tint', wide: true },
    h('h2', { class: 'subhead reveal' }, icon(ICON_PATHS.star, { size: 22 }), 'Customer Obsession Winner, FY23 Q4'),
    h('article', { class: 'winner reveal' },
      view,
      h('div', { class: 'winner__body' },
        h('div', { class: 'spot__tags' }, h('span', { class: 'chip chip--accent' }, 'Customer Obsession'), h('span', { class: 'chip chip--gold' }, 'FY23 Q4')),
        h('h3', { class: 'winner__title' }, 'Recognized as a quarterly Customer Obsession winner'),
        h('p', { class: 'winner__text' }, withRedactions(WINNER.message)))));
}

const CEO_MESSAGE = 'Congratulations! I\u2019m proud to celebrate your Intuit anniversary and recognize your accomplishments. I want to personally thank you for your commitment to powering prosperity around the world. I hope we continue to celebrate many more years and successes together at Intuit.';
const MILESTONE_AWARD = 'images/awards/trophies/five-years.webp';
const MILESTONE_SLIDE = ALL_SPOTLIGHTS.find((s) => s.kind === 'milestone');
const KUDOS_PICKS = [
  { id: 85, caption: 'The Kudoboard cover' },
  { id: 111, caption: 'Notes from colleagues' },
  { id: 112, caption: 'More notes from colleagues' },
];

/**
 * "5 Years of Tech Excellence" section, after all Spotlights.
 * Row 1: the award photo and the milestone message from the CEO. Row 2: the distinct Kudoboard screenshots.
 */
export function MilestoneSection(lightbox) {
  const zoomable = (src, alt, items, index) => {
    const btn = h('button', { class: 'milestone__shot', type: 'button', 'aria-label': `Zoom: ${alt}` }, h('img', { src, alt, loading: 'lazy', decoding: 'async' }));
    btn.addEventListener('click', () => lightbox.open(items, index, btn));
    return btn;
  };
  const award = [{ src: MILESTONE_AWARD, title: '5 Years of Excellence Award', caption: 'Intuit, 2019 to 2024' }];
  const slide = MILESTONE_SLIDE ? [{ src: cardSrc(MILESTONE_SLIDE), title: '5 Year Milestone message from the CEO', caption: 'July 22, 2024' }] : [];
  const kudos = KUDOS_PICKS.map((k) => ALL_SPOTLIGHTS.find((s) => s.id === k.id)).filter(Boolean)
    .map((s, i) => ({ src: cardSrc(s), title: KUDOS_PICKS[i].caption, caption: 'Kudoboard' }));

  return Block({ id: 'milestone-5y', tone: 'tint', wide: true },
    h('h2', { class: 'subhead reveal' }, icon(ICON_PATHS.star, { size: 22 }), '5 Years of Tech Excellence Milestone at Intuit'),
    h('div', { class: 'milestone__row milestone__row--top reveal' },
      h('article', { class: 'milestone__card' },
        zoomable(MILESTONE_AWARD, '5 Years of Excellence Award', award, 0),
        h('div', { class: 'milestone__body' }, h('h3', {}, '5 Years of Excellence Award'), h('p', {}, 'Recognition for five years of tech excellence and contribution, 2019 to 2024.'))),
      h('article', { class: 'milestone__card' },
        slide.length ? zoomable(slide[0].src, 'Milestone message from the CEO', slide, 0) : null,
        h('div', { class: 'milestone__body' }, h('h3', {}, 'Message from the CEO'), h('p', { class: 'milestone__quote' }, CEO_MESSAGE)))),
    h('div', { class: 'milestone__row milestone__row--kudos reveal' },
      kudos.map((k, i) => h('figure', { class: 'milestone__card milestone__card--kudos' }, zoomable(k.src, k.title, kudos, i), h('figcaption', {}, `Kudoboard: ${k.title}`)))));
}
