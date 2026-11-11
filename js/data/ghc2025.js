/** Grace Hopper Celebration 2025 (Chicago): photo collages and talk highlights. */
const G = 'images/ghc2025';

export const GHC2025 = Object.freeze({
  id: 'ghc2025',
  eyebrow: 'Grace Hopper Celebration 2025, Chicago',
  title: 'Agentic AI Masterclass',
  lead: 'Multi-agent system development with LangGraph, memory and human-in-the-loop. Friday, November 7, 1:00 to 1:45 PM, room S402.',
  facts: Object.freeze(['25th anniversary of GHC', 'Nov 4\u20137, McCormick Place', 'Theme: Unbound', '300+ in-person global audience']),
  link: { label: 'Session slides', href: 'https://docs.google.com/presentation/d/1mGNk455d2al3PCYB9udZN4r_ZNcN-vIIXQM4vXDZzlg/edit?usp=sharing' },
  highlights: Object.freeze([
    { title: 'Agentic AI architecture', text: 'Core concepts of agentic AI and multi-agent architecture patterns.' },
    { title: 'LangGraph + memory', text: 'Short-term conversational context and long-term knowledge persistence.' },
    { title: 'Human-in-the-loop', text: 'Building human-centered agentic AI with approve, edit and reject controls.' },
    { title: 'Secure & responsible AI', text: 'Best practices, including OWASP Top 10 risks, for production-ready agentic systems.' },
  ]),
  photos: Object.freeze([
    { src: `${G}/session-collage.webp`, title: 'The masterclass: stage, session board and slides' },
    { src: `${G}/packed-room-collage.webp`, title: 'A packed room for the Agentic AI masterclass' },
    { src: `${G}/intuit-team-and-booth.webp`, title: 'The Intuit team and booth at GHC 2025' },
    { src: `${G}/keynotes-and-speaker-badge.webp`, title: 'Keynotes, Speakers Reception and the speaker badge' },
  ]),
});
