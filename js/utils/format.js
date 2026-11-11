const MONTH_YEAR = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
const FULL_DATE = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/** @param {string} iso e.g. "2025-11-07" */
export const formatMonthYear = (iso) => (iso ? MONTH_YEAR.format(new Date(`${iso}T00:00:00Z`)) : '');
export const formatFullDate = (iso) => (iso ? FULL_DATE.format(new Date(`${iso}T00:00:00Z`)) : '');
export const yearOf = (iso) => (iso ? Number(iso.slice(0, 4)) : null);
export const pluralize = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
