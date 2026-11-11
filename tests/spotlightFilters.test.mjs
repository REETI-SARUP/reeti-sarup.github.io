import test from 'node:test';
import assert from 'node:assert/strict';
import { applyFilters, DEFAULT_FILTERS, yearFacets, sanitizeFilters } from '../js/state/spotlightFilters.js';
import { SPOTLIGHTS } from '../js/data/spotlights.js';

test('no filters returns every item, newest first', () => {
  const out = applyFilters(SPOTLIGHTS, DEFAULT_FILTERS);
  assert.equal(out.length, SPOTLIGHTS.length);
  assert.ok(out[0].date >= out.at(-1).date);
});

test('year filter only returns that year', () => {
  const out = applyFilters(SPOTLIGHTS, { ...DEFAULT_FILTERS, year: '2024' });
  assert.ok(out.length > 0 && out.every((i) => i.date.startsWith('2024')));
});

test('query search is case-insensitive', () => {
  const out = applyFilters(SPOTLIGHTS, { ...DEFAULT_FILTERS, query: 'CUSTOMER obsession' });
  assert.ok(out.length > 0);
});

test('year facets add up to the total', () => {
  assert.equal(yearFacets(SPOTLIGHTS).reduce((n, [, c]) => n + c, 0), SPOTLIGHTS.length);
});

test('sanitizeFilters tolerates junk', () => {
  assert.deepEqual(sanitizeFilters(null), DEFAULT_FILTERS);
  assert.equal(sanitizeFilters({ year: '2020' }).year, '2020');
});

test('spotlight data never contains a Spotlight prize amount (INR / rupee values)', () => {
  // Project figures mentioned inside a message (e.g. a programme budget) are allowed; prize values are not.
  assert.ok(!/\b(inr|usd)\b|₹/i.test(JSON.stringify(SPOTLIGHTS)));
});

test('every spotlight has a date, title and image', () => {
  for (const s of SPOTLIGHTS) assert.ok(s.date && s.title && s.image, `incomplete: ${s.id}`);
});
