import { PageHero } from '../components/page.js';
import { PapersContent, PatentsContent, TalksContent } from '../components/publications.js';
import { FeaturedSection } from '../components/featured.js';
import { VideoShowcase } from '../components/videoShowcase.js';
import { WebinarsContent } from '../components/webinars.js';
import { ConferenceStory } from '../components/conferenceStory.js';
import { GHC2024 } from '../data/ghc2024.js';
import { GHC2025 } from '../data/ghc2025.js';
import { GHC2025_FEEDBACK } from '../data/ghc2025Feedback.js';
import { FeedbackCarousel } from '../components/feedbackCarousel.js';

export const renderPublications = () => [
  PageHero({ wide: true, eyebrow: 'Research & Speaking', title: 'Research Publications & Speaker Sessions', lead: 'Papers, a patent, tech webinars and Grace Hopper stages. Open any card for more.' }),
  PapersContent(),
  PatentsContent(),
  TalksContent(),
  WebinarsContent(),
  ConferenceStory(GHC2024),
  ConferenceStory({ ...GHC2025, tone: 'light' }),
  FeedbackCarousel({ id: 'ghc2025-feedback', eyebrow: 'GHC 2025', title: 'Appreciation Messages and Posts from Session Attendees', lead: 'Appreciation from attendees, quoted from their public LinkedIn posts about the Agentic AI masterclass.', items: GHC2025_FEEDBACK }),
  VideoShowcase({
    eyebrow: 'Grace Hopper Celebration 2025, Chicago',
    title: 'Agentic AI Masterclass: reflections & feedback',
    lead: 'Multi-agent system development with LangGraph, memory and human-in-the-loop, and the response from the room.',
    stat: { value: '300+', label: 'In-person global audience' },
    // Set embedUrl (e.g. an unlisted YouTube/Vimeo link) to stream adaptively instead of the self-hosted files.
    embedUrl: null,
    sources: { hd: 'videos/ghc2025-reflections-1080p.mp4', sd: 'videos/ghc2025-reflections-720p.mp4' },
    poster: 'images/linkedin/ghc25-speaker.webp',
    hint: 'Press play to watch with sound. Use the player controls for volume and full screen.',
  }),
  FeaturedSection(),
];
