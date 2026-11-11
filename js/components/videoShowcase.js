import { ICON_PATHS } from '../config/constants.js';
import { h, icon } from '../utils/dom.js';

/** Small screens and data-saver connections get the lighter file; everyone else gets full 1080p. */
function pickSource({ hd, sd }) {
  const conn = navigator.connection;
  const lean = conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? '') || window.matchMedia('(max-width: 800px)').matches;
  return lean && sd ? sd : hd;
}

/**
 * Full-width "big screen" video row.
 * - `embedUrl` (YouTube/Vimeo/etc.) wins when provided: adaptive streaming keeps full quality without repo bloat.
 * - Otherwise a self-hosted file: 1080p for most viewers, 720p fallback for small or data-saver screens.
 * Self-hosted video is never muted: a big play button starts it with sound (browsers only allow sound after a click).
 */
export function VideoShowcase({ eyebrow, title, lead, stat, sources, embedUrl, poster, hint }) {
  let player;
  let overlay = null;
  if (embedUrl) {
    player = h('iframe', { class: 'showcase__video', src: embedUrl, title, loading: 'lazy', allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture', allowfullscreen: true, referrerpolicy: 'strict-origin-when-cross-origin' });
  } else {
    player = h('video', { class: 'showcase__video', controls: true, playsinline: true, preload: 'metadata', poster },
      h('source', { src: pickSource(sources), type: 'video/mp4' }), 'Your browser does not support embedded video.');
    player.muted = false;
    player.volume = 1;
    overlay = h('button', { class: 'showcase__play', type: 'button', 'aria-label': `Play video: ${title}` },
      h('span', { class: 'showcase__play-icon', 'aria-hidden': 'true' }, icon(ICON_PATHS.play, { size: 44 })),
      h('span', { class: 'showcase__play-label' }, 'Play with sound'));
    overlay.addEventListener('click', () => { player.muted = false; player.play().catch(() => {}); player.focus(); });
    player.addEventListener('play', () => { overlay.hidden = true; });
    player.addEventListener('ended', () => { overlay.hidden = false; });
  }

  return h('section', { class: 'showcase', 'aria-label': title },
    h('div', { class: 'showcase__inner' },
      h('div', { class: 'showcase__head' },
        h('div', {}, eyebrow && h('p', { class: 'showcase__eyebrow' }, eyebrow), h('h2', { class: 'showcase__title' }, title), lead && h('p', { class: 'showcase__lead' }, lead)),
        stat && h('p', { class: 'showcase__stat' }, h('strong', {}, stat.value), h('span', {}, stat.label))),
      h('div', { class: 'showcase__frame' }, player, overlay),
      hint && h('p', { class: 'showcase__hint' }, hint)));
}
