import { SPOTLIGHT } from '../config/constants.js';
import { yearOf } from '../utils/format.js';

/**
 * Pure filtering/sorting logic for the Spotlight gallery (no DOM, easy to unit test).
 * @typedef {{year:string, theme:string, value:string, query:string, sort:string}} Filters
 */

export const DEFAULT_FILTERS = Object.freeze({
  year: SPOTLIGHT.ALL,
  theme: SPOTLIGHT.ALL,
  value: SPOTLIGHT.ALL,
  query: '',
  sort: SPOTLIGHT.SORT_NEWEST,
});

/** @param {object} item @param {Filters} f */
export function matchesFilters(item, f) {
  if (f.year !== SPOTLIGHT.ALL && String(yearOf(item.date)) !== String(f.year)) return false;
  if (f.theme !== SPOTLIGHT.ALL && !item.themes.includes(f.theme)) return false;
  if (f.value !== SPOTLIGHT.ALL && item.value !== f.value) return false;
  const q = f.query.trim().toLowerCase();
  if (q) {
    const haystack = [item.title, item.value, item.giver, item.text, ...item.themes].filter(Boolean).join(' ').toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  return true;
}

export function sortItems(items, sort) {
  const dir = sort === SPOTLIGHT.SORT_OLDEST ? 1 : -1;
  return [...items].sort((a, b) => dir * String(a.date).localeCompare(String(b.date)));
}

export function applyFilters(items, filters) {
  return sortItems(items.filter((item) => matchesFilters(item, filters)), filters.sort);
}

/** Count items per facet so chips can show "2024 (23)". Returns [value, count][] */
export function facetCounts(items, pick) {
  const counts = new Map();
  for (const item of items) {
    for (const key of [pick(item)].flat().filter(Boolean)) counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()];
}

export const yearFacets = (items) => facetCounts(items, (i) => String(yearOf(i.date))).sort((a, b) => b[0].localeCompare(a[0]));
export const themeFacets = (items) => facetCounts(items, (i) => i.themes).sort((a, b) => b[1] - a[1]);
export const valueFacets = (items) => facetCounts(items, (i) => i.value).sort((a, b) => b[1] - a[1]);

/** Merge possibly-stale saved filters with defaults. */
export function sanitizeFilters(saved) {
  return { ...DEFAULT_FILTERS, ...(saved && typeof saved === 'object' ? saved : {}) };
}
