/**
 * Appreciation and feedback from attendees of the GHC 2025 Agentic AI masterclass, quoted from their public LinkedIn posts.
 * Optional `image`: a snapshot of the post (e.g. 'images/ghc2025/feedback/emily-johnson.webp'); it renders beside the quote.
 * Source: the GHC 2025 session highlights document. `name` is left generic where the post author's name was not stated.
 */
const L = 'https://www.linkedin.com/posts';

export const GHC2025_FEEDBACK = Object.freeze([
  { name: 'Emily Johnson', source: 'LinkedIn', image: 'images/ghc2025/feedback/emily-johnson.webp',
    quote: 'My favorite session was on Agentic AI with Reeti Sarup (Intuit). It felt like a return to the high-level university lectures I attended at Johns Hopkins. She provided clear, tangible insights and instructions on how to orchestrate complex multi-agent workflows and crucial agent capabilities. She discussed short-term conversational context as well as long-term knowledge persistence. She emphasized the continued need for Human-In-The-Loop mechanisms to enforce control and safety within agentic systems.',
    href: `${L}/emily-johnson-9b752b82_ghc25-womenintechnology-activity-7393704863018381312-VEpE` },
  { name: 'Jamie Crosby', source: 'LinkedIn', image: 'images/ghc2025/feedback/jamie-crosby.webp',
    quote: 'An advanced AI masterclass on Agentic AI and Multi-Agent System Development with Reeti Sarup, which provided a deep dive into the architecture of multi-agent systems and the process of developing agents.',
    href: `${L}/jamiecrosby1_gracehoppercelebration-womenintech-leadership-activity-7393980900176379905-Z0uy` },
  { name: 'Anshika Bajpai', source: 'LinkedIn', image: 'images/ghc2025/feedback/anshika-bajpai.webp',
    quote: 'A standout session for me was the AI Agentic Masterclass by Reeti Sarup, which offered practical insights into building multi-agent systems with LangGraph, memory, and HITL. And the theme "Unbound" captured the entire experience: thinking bigger, breaking limits, and building with empathy.',
    href: `${L}/anshikabajpai23_ghc2025-unbound-womenintech-activity-7395837501527076864-WCrN` },
  { name: 'Bhumijaa Balaji', source: 'LinkedIn', image: 'images/ghc2025/feedback/bhumijaa-balaji.webp',
    quote: 'Agentic AI Deep Dive: LangGraph + human-in-the-loop + OWASP Top 10 risks. Building AI isn’t about what’s possible, it’s about what’s responsible. Thank you, Reeti Sarup, for the eye-opening session!',
    href: `${L}/bhumijaa-balaji_ghc25-womenintech-gracehoppercelebration-activity-7393880467424501761-1s2X` },
  { name: 'Aarya Soni', source: 'LinkedIn', image: 'images/ghc2025/feedback/aarya-soni.webp',
    quote: 'A highlight for me was attending Reeti Sarup’s Agentic AI Masterclass on multi-agent systems with LangGraph, memory, and human-in-the-loop workflows. As someone passionate about AI systems and real-world automation, this session felt like a glimpse into the next era of human-AI collaboration.',
    href: `${L}/aaryasoni_ghc2025-gracehoppercelebration-womenintech-activity-7393412127299911680-BMi-` },
  { name: 'Trisha Gupta', source: 'LinkedIn', image: 'images/ghc2025/feedback/trisha-gupta.webp',
    quote: 'One standout moment was Reeti Sarup’s Agentic AI Masterclass, where she delved into multi-agent systems, LangGraph, memory, and human-in-the-loop workflows. For someone like me who’s passionate about AI systems and practical automation, it felt like witnessing the early blueprint of the next generation of human–AI collaboration.',
    href: `${L}/trishaguptaa_ghc25-gracehoppercelebration-womenintech-activity-7394443228822847488-VI0r` },
  { name: 'Azure Hsiao', source: 'LinkedIn', image: 'images/ghc2025/feedback/azure-hsiao.webp',
    quote: 'AI Agentic Masterclass: Multi-Agent System Development with LangGraph, Memory & HITL, Reeti Sarup. Very insightful overview of multi-agent architecture and real applications of AI agents.',
    href: `${L}/azure-hsiao_ghc2025-gracehoppercelebration-womenintech-activity-7394516872412450816-KxgM` },
  { name: 'Marie Lou Panthagani', source: 'LinkedIn', image: 'images/ghc2025/feedback/marie-lou-panthagani.webp',
    quote: 'Over the next few days, I attended sessions that blended technical depth with creativity: "AI Agentic Masterclass: Multi-Agent System Development with LangGraph, Memory & HITL" by Reeti Sarup.',
    href: `${L}/marie-lou-panthagani_ghc25-ghc25-womenintech-activity-7392781079688015872-73nz` },
  { name: 'Navya Arora', source: 'LinkedIn', image: 'images/ghc2025/feedback/navya-arora.webp',
    quote: 'Some of the other sessions that really stood out for me were: AI Agentic Masterclass: Multi-Agent System Development with LangGraph, Memory & HITL, Reeti Sarup (Intuit).',
    href: `${L}/n22arora_inside-ghc25-lessons-inspiration-and-activity-7395165090376765440-5CwI` },
  { name: 'Nilaa Raghunathan', source: 'LinkedIn', image: 'images/ghc2025/feedback/nilaa-raghunathan.webp',
    quote: 'These conversations flowed naturally into the sessions I attended, each offering a new perspective and pushing me to think differently: AI Agentic Masterclass by Reeti Sarup.',
    href: `${L}/nilaaraghunathan_ghc25-womenintech-datascience-activity-7394527260453679105-jy12` },
  { name: 'Jinal Prakash Devadiga', source: 'LinkedIn', image: 'images/ghc2025/feedback/jinal-devadiga.webp',
    quote: 'I also had the privilege of attending impactful sessions such as: AI Agentic Masterclass by Reeti Sarup.',
    href: `${L}/jinaldevadiga_ghc25-womenintech-datascience-activity-7394087330124300288-4GQZ` },
  { name: 'Suchitra Rajagopalan', source: 'LinkedIn', image: 'images/ghc2025/feedback/suchitra-rajagopalan.webp',
    quote: 'Some of my favorite sessions included: Agentic AI Masterclass by Reeti Sarup.',
    href: `${L}/suchitrar_ghc25-gracehoppercelebration-womenintech-activity-7394869856602554368-shCg` },

  // Other appreciation, as captured in the reflections video: comments, direct messages and the session survey.
  { name: 'LinkedIn comments', role: 'Session attendees', source: 'Comments', image: 'images/ghc2025/feedback/comments.webp',
    quote: 'I really enjoyed how you explained the role of memory and human-in-the-loop mechanisms in multi-agent workflows, it made the concept of trust and control in AI systems so much clearer.' },
  { name: 'LinkedIn messages', role: 'Session attendees', source: 'Messages', image: 'images/ghc2025/feedback/messages.webp',
    quote: 'Thank you Reeti for your amazing presentation on agentic AI! You broke down complex technical concepts into easy to understand examples. This was my favorite GHC session by far!' },
  { name: 'Session feedback survey', role: 'Attendee responses, 100% rated the content very relevant', source: 'Survey', image: 'images/ghc2025/feedback/survey.webp',
    quote: 'This was the best presentation I attended at GHC, thank you! It demystified the agentic AI in an easy to understand way. I loved the comprehensive deep-dive into architectural patterns and use-cases.' },
]);
