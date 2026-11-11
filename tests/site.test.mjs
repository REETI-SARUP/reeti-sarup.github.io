import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { NAV_ITEMS } from '../js/config/constants.js';
import { SPOTLIGHTS } from '../js/data/spotlights.js';
import { HONORS } from '../js/data/honors.js';

test('every nav item points to an HTML page whose data-page matches', () => {
  for (const { id, href } of NAV_ITEMS) {
    assert.ok(existsSync(href), `${href} missing`);
    assert.match(readFileSync(href, 'utf8'), new RegExp(`data-page="${id}"`), `${href} has wrong data-page`);
  }
});

test('every spotlight has full and thumbnail images on disk', () => {
  for (const s of SPOTLIGHTS) {
    assert.ok(existsSync(`images/awards/full/${s.image}`), `full ${s.image}`);
    assert.ok(existsSync(`images/awards/thumb/${s.image}`), `thumb ${s.image}`);
  }
});

test('honor images exist and top honors are present', () => {
  assert.ok(HONORS.filter((h) => h.top).length >= 3);
  for (const h of HONORS) if (h.image) assert.ok(existsSync(h.image), h.image);
});

test('spotlights are unique by id and sortable newest first', () => {
  assert.equal(new Set(SPOTLIGHTS.map((s) => s.id)).size, SPOTLIGHTS.length);
  const dates = SPOTLIGHTS.map((s) => s.date);
  assert.deepEqual(dates, [...dates].sort().reverse());
});

test('GHC video and WiDS photo exist; video is under GitHub\'s 100 MB limit', async () => {
  const { statSync } = await import('node:fs');
  assert.ok(existsSync('images/linkedin/wids-emcee.webp'));
  for (const f of ['videos/ghc2025-reflections-1080p.mp4', 'videos/ghc2025-reflections-720p.mp4']) assert.ok(statSync(f).size < 95 * 1024 * 1024, f);
});

test('no LinkedIn reaction counts are shown on the site', () => {
  for (const f of ['js/data/publications.js', 'js/data/featured.js', 'js/data/profile.js']) {
    assert.ok(!/reactions|reposts/i.test(readFileSync(f, 'utf8')), `${f} mentions reactions`);
  }
});
