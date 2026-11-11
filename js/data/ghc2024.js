/** Grace Hopper Celebration 2024 (Philadelphia): photos and highlights from the reflections post. */
const G = 'images/ghc2024';

export const GHC2024 = Object.freeze({
  id: 'ghc2024',
  eyebrow: 'Grace Hopper Celebration 2024, Philadelphia',
  title: 'AI Chatbot Masterclass',
  lead: 'Building LLM-powered RAG chatbots with LangChain and Knowledge Graphs, co-hosted with Rishupreet Kaur at the Pennsylvania Convention Center.',
  stat: { value: 'Packed', label: 'ballroom, in person' },
  highlights: Object.freeze([
    { title: 'Hands-on workshop', text: 'Live coding plus core concepts: GenAI, LLMs, prompt engineering, RAG, vector embeddings, Knowledge Graphs and LangChain.' },
    { title: 'A fully packed ballroom', text: 'Great in-person turnout, with interactive Q&A and follow-up discussions long after the session.' },
    { title: 'Amazing response', text: 'Attendees keep sharing how it helped them apply these skills to their own projects.' },
    { title: 'Me + We', text: 'Speakers Reception with inspiring leaders, the Intuit booth in the Expo Hall, and reconnecting with Georgia Tech alumni.' },
  ]),
  photos: Object.freeze([
    { src: `${G}/on-stage.webp`, title: 'On stage at the GHC 2024 masterclass' },
    { src: `${G}/packed-ballroom.webp`, title: 'A packed ballroom at the Pennsylvania Convention Center' },
    { src: `${G}/masterclass-slide.webp`, title: 'AI Chatbot Masterclass session slide' },
    { src: `${G}/session-schedule.webp`, title: 'Session schedule: Thursday, October 10, 2:15 PM' },
    { src: `${G}/expo-hall-intuit-team.webp`, title: 'The Intuit team at the Expo Hall' },
    { src: `${G}/conference-moments.webp`, title: 'Speakers Reception and conference moments' },
    { src: `${G}/session-catalog.webp`, title: 'The official GHC 2024 session catalog listing' },
  ]),
});
