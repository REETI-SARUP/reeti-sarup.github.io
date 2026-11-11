import { PageHero } from '../components/page.js';
import { TopHonors, TopSpotlights, SpotlightArchive } from '../components/spotlights.js';
import { createLightbox } from '../components/lightbox.js';
import { SPOTLIGHTS } from '../data/spotlights.js';

export function renderRecognition() {
  const lightbox = createLightbox();
  return [
    PageHero({ wide: true, eyebrow: 'Recognition', title: 'Awards, Honors & Spotlights', lead: `Top awards first, then ${SPOTLIGHTS.filter((s) => s.kind !== 'kudoboard').length} Spotlight recognitions from 2026 back to 2018.` }),
    TopHonors(),
    TopSpotlights(lightbox),
    SpotlightArchive(lightbox),
  ];
}
