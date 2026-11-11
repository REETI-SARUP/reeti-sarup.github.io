/** Site-wide constants. Keep magic strings and numbers here. */

export const PAGE = Object.freeze({
  HOME: 'home',
  ABOUT: 'about',
  EXPERIENCE: 'experience',
  RECOGNITION: 'recognition',
  FEATURED: 'featured',
  PUBLICATIONS: 'publications',
  BLOGS: 'blogs',
  PROJECTS: 'projects',
  EDUCATION: 'education',
  SKILLS: 'skills',
  COMMUNITY: 'community',
});

/** Primary navigation: one real page per item. */
export const NAV_ITEMS = Object.freeze([
  { id: PAGE.HOME, label: 'Home', href: 'index.html' },
  { id: PAGE.ABOUT, label: 'About', href: 'about.html', icon: 'people' },
  { id: PAGE.EXPERIENCE, label: 'Experience', href: 'experience.html', icon: 'briefcase' },
  { id: PAGE.EDUCATION, label: 'Education', href: 'education.html', icon: 'cap' },
  { id: PAGE.PROJECTS, label: 'Project Highlights', href: 'projects.html', icon: 'code' },
  { id: PAGE.RECOGNITION, label: 'Recognition', href: 'recognition.html', icon: 'trophy' },
  { id: PAGE.FEATURED, label: 'Featured', href: 'featured.html', icon: 'star' },
  { id: PAGE.PUBLICATIONS, label: 'Research Publications & Speaker Sessions', shortLabel: 'Research & Sessions', href: 'publications.html', icon: 'doc' },
  { id: PAGE.BLOGS, label: 'Blogs', href: 'blogs.html', icon: 'doc' },
  { id: PAGE.SKILLS, label: 'Skills', href: 'skills.html', icon: 'code' },
  { id: PAGE.COMMUNITY, label: 'Mentoring & Community Leadership Initiatives, Volunteering', shortLabel: 'Mentoring & Leadership', heroLabel: 'Mentoring & Community Leadership, Volunteering', href: 'community.html', icon: 'people' },
]);

export const STORAGE_KEYS = Object.freeze({
  SPOTLIGHT_FILTERS: 'rs.spotlight.filters.v1',
});

export const SPOTLIGHT = Object.freeze({
  BATCH_SIZE: 12,
  ALL: 'All',
  SORT_NEWEST: 'newest',
  SORT_OLDEST: 'oldest',
  IMAGE_BASE: 'images/awards',
});

export const ICON_PATHS = Object.freeze({
  linkedin: 'M4.98 3.5a2.5 2.5 0 11-.01 5 2.5 2.5 0 01.01-5zM3 9.75h4V21H3V9.75zM9.5 9.75h3.8v1.54h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.63 4.75 6.05V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.32-1.96 2.69V21h-4V9.75z',
  github: 'M12 .5a11.5 11.5 0 00-3.64 22.4c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 015.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0012 .5z',
  medium: 'M13.54 12a6.8 6.8 0 11-6.77-6.82A6.77 6.77 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42S14.2 15.54 14.2 12s1.52-6.42 3.38-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75S21.62 15.17 21.62 12s.54-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z',
  twitter: 'M18.9 2H22l-7.4 8.5L23.3 22h-6.8l-5.3-7-6.1 7H2l7.9-9.1L1.5 2h7l4.8 6.4L18.9 2zm-1.2 18h1.9L7.2 3.9H5.2L17.7 20z',
  download: 'M12 3v10.2l3.6-3.6 1.4 1.4-6 6-6-6 1.4-1.4 3.6 3.6V3h2zM5 19h14v2H5z',
  external: 'M14 3h7v7h-2V6.4l-8.3 8.3-1.4-1.4L17.6 5H14V3zM5 5h6v2H5v12h12v-6h2v8H3V5h2z',
  chevron: 'M7.4 8.6L12 13.2l4.6-4.6L18 10l-6 6-6-6z',
  close: 'M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4 6.4 19 5 17.6 10.6 12 5 6.4z',
  prev: 'M15.4 6.4 14 5l-7 7 7 7 1.4-1.4L9.8 12z',
  next: 'M8.6 6.4 10 5l7 7-7 7-1.4-1.4L14.2 12z',
  star: 'M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17l-6.1 3.4 1.5-6.8L2.2 9l6.9-.7z',
  briefcase: 'M10 4h4a2 2 0 012 2v1h4a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1h4V6a2 2 0 012-2zm0 2v1h4V6h-4z',
  trend: 'M3 17l6-6 4 4 8-8v5h2V4h-8v2h5l-6 6-4-4-8 8z',
  cap: 'M12 3L1 9l11 6 9-4.9V17h2V9L12 3zM5 13.2v4L12 21l7-3.8v-4L12 17l-7-3.8z',
  doc: 'M6 2h9l5 5v15H6V2zm8 1.5V8h4.5L14 3.5zM8 12h8v1.5H8V12zm0 3.5h8V17H8v-1.5z',
  bulb: 'M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2zM9 19h6v1.5a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 20.5V19z',
  mic: 'M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 006 6.9V21h2v-3.1A7 7 0 0019 11h-2z',
  play: 'M8 5v14l11-7z',
  medal: 'M12 2l-2.5 5h5L12 2zm0 7a6 6 0 100 12 6 6 0 000-12zm0 2.2l1.2 2.5 2.7.4-2 1.9.5 2.7-2.4-1.3-2.4 1.3.5-2.7-2-1.9 2.7-.4z',
  code: 'M8.6 16.6L4 12l4.6-4.6L10 8.8 6.8 12l3.2 3.2-1.4 1.4zm6.8 0l-1.4-1.4 3.2-3.2L14 8.8l1.4-1.4L20 12l-4.6 4.6zM13 5l-2 14h-2l2-14h2z',
  people: 'M16 11a3 3 0 100-6 3 3 0 000 6zm-8 0a3 3 0 100-6 3 3 0 000 6zm0 2c-2.3 0-7 1.2-7 3.5V19h14v-2.5C15 14.2 10.3 13 8 13zm8 0c-.3 0-.6 0-1 .1 1.2.8 2 1.9 2 3.4V19h6v-2.5c0-2.3-4.7-3.5-7-3.5z',
  trophy: 'M6 3h12v2h3v3a4 4 0 01-4 4h-.3A5 5 0 0113 14.9V17h3v2H8v-2h3v-2.1A5 5 0 017.3 12H7a4 4 0 01-4-4V5h3V3zm-1 4v1a2 2 0 002 2V7H5zm14 0h-2v3a2 2 0 002-2V7z',
});
