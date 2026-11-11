# Reeti Sarup | Portfolio

Static, dependency-free portfolio for GitHub Pages (ES modules, no build step).

## Run locally
```bash
npm start        # serves http://localhost:8080
npm test         # unit tests (node:test) for filtering logic and data integrity
```

## Structure
```
index.html + 6 pages        one HTML file per page (experience, recognition, publications, education, skills, community);
                            each sets <body data-page="..."> and loads js/main.js
css/                        tokens > base > layout > components > spotlights > responsive
js/main.js                  mounts nav + page + footer using a page registry
js/pages/*.js               one renderer per page (composes components)
js/config/constants.js      pages, nav items, storage keys, batch size, icon paths
js/data/*.js                content only (profile, experience, education, honors, publications, skills, community, spotlights)
js/state/                   pure filter logic (unit tested, no DOM)
js/utils/                   dom helper (no innerHTML), formatting, storage, observers
js/components/              reusable UI: header, hero, page banner, disclosure, lightbox, spotlights, ...
images/awards/              redacted Spotlight screenshots (full + thumb, WebP)
tools/                      offline scripts that produced assets (OCR redaction, curation, resume)
tests/                      node --test suites (logic, data and page integrity)
sitemap.xml, robots.txt, 404.html   SEO and hosting basics
```

## Editing content
Edit the matching file in `js/data/`. No other file needs to change.

## Spotlight screenshots
`tools/ocr.swift` (macOS Vision OCR) locates text, `tools/build_awards.py` paints over the Spotlight prize value (pixels are replaced, then flattened to WebP) and writes the images, and `tools/curate.py` adds themes. Award amounts are never stored in data or shown on the site. Source screenshots are not committed.

## Video
The GHC 2025 reflections video is self-hosted as a 1080p file (~86 MB, used by default) and a 720p fallback (~45 MB, for phones and data-saver). Both were encoded with `tools/transcode.swift` (macOS AVFoundation) to stay under GitHub's 100 MB file limit. For adaptive full-quality streaming without large files, upload the original to YouTube (unlisted) or Vimeo and set `embedUrl` in `js/pages/publications.js`.

## Resume
`python3 tools/build_resume.py <outdir>` writes a one-page PDF (headless Chrome) and a DOCX from one content dict. Copy `resume.pdf` to `documents/`.
