# Reeti Sarup | Portfolio

Static, dependency-free portfolio for GitHub Pages (ES modules, no build step).

## Run locally
```bash
npm start        # serves http://localhost:8080
npm test         # unit tests (node:test) for filtering logic and data integrity
```

## Structure
```
index.html                  shell: meta, fonts, CSS links, <script type="module">
css/                        tokens (design tokens) > base > layout > components > spotlights > responsive
js/main.js                  entry: composes components and starts observers
js/config/constants.js      section ids, nav items, storage keys, paging, icon paths
js/data/*.js                content only (profile, experience, education, honors, publications, skills, community, spotlights)
js/state/                   pure filter/sort logic (unit tested, no DOM)
js/utils/                   dom helper (no innerHTML), formatting, storage, observers
js/components/              one file per UI section; Disclosure + Lightbox are reusable
images/awards/              redacted Spotlight screenshots (full + thumb, WebP)
tools/                      offline scripts used to produce assets (OCR redaction, curation, résumé)
tests/                      node --test suites
```

## Editing content
Edit the matching file in `js/data/`. No other file needs to change.

## Spotlight screenshots
`tools/ocr.swift` (macOS Vision OCR) locates text, `tools/build_awards.py` covers every monetary amount and writes WebP images, and `tools/curate.py` adds themes. Award amounts are never stored in data or shown on the site. Source screenshots are not committed.

## Résumé
`python3 tools/build_resume.py <outdir>` writes a one-page PDF (headless Chrome) and a DOCX from one content dict. Copy `resume.pdf` to `documents/`.
