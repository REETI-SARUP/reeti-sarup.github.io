/** Fade-in elements with `.reveal` when they scroll into view. */
export function initRevealOnScroll(root = document) {
  const targets = [...root.querySelectorAll('.reveal:not(.is-visible)')];
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  );
  targets.forEach((el) => io.observe(el));
}

/** Highlight the nav link whose section is currently in view. */
export function initScrollSpy(sectionIds, onChange) {
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && onChange(e.target.id)),
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sectionIds.map((id) => document.getElementById(id)).filter(Boolean).forEach((el) => io.observe(el));
}
