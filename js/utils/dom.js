/** Tiny DOM helpers. Elements are built without innerHTML, so content is always escaped. */

const SVG_NS = 'http://www.w3.org/2000/svg';

/**
 * Create an element.
 * @param {string} tag
 * @param {Record<string, unknown>} [props] class, dataset, on* handlers, attributes
 * @param {...(Node|string|null|false|undefined|Array)} children
 * @returns {HTMLElement}
 */
export function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(props ?? {})) {
    if (value == null || value === false) continue;
    if (key === 'class') el.className = value;
    else if (key === 'dataset') Object.assign(el.dataset, value);
    else if (key.startsWith('on') && typeof value === 'function') el.addEventListener(key.slice(2).toLowerCase(), value);
    else el.setAttribute(key, value === true ? '' : String(value));
  }
  append(el, children);
  return el;
}

/** Append children, flattening arrays and skipping empty values. */
export function append(parent, children) {
  for (const child of children.flat(Infinity)) {
    if (child == null || child === false) continue;
    parent.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return parent;
}

/** Replace all children of `parent`. */
export function replaceChildren(parent, ...children) {
  parent.replaceChildren();
  return append(parent, children);
}

/** Inline SVG icon from a single path. */
export function icon(path, { size = 20, label } = {}) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('fill', 'currentColor');
  if (label) {
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', label);
  } else {
    svg.setAttribute('aria-hidden', 'true');
  }
  const p = document.createElementNS(SVG_NS, 'path');
  p.setAttribute('d', path);
  svg.append(p);
  return svg;
}

export const qs = (selector, root = document) => root.querySelector(selector);
export const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
