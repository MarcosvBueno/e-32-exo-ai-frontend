'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { ANIMATION_CONFIG } from '@/constants/animation-data';
import { MinGlobe } from './min-globe';

const EXOPLANET_INSIGHTS: ExoplanetInsight[] = [
  {
    title: 'What are exoplanets?',
    description:
      'Exoplanets are worlds orbiting stars beyond our Sun. They range from rocky Earth-like bodies to gas giants larger than Jupiter, revealing the staggering diversity of the cosmos.',
    facts: [
      {
        title: 'First confirmed discovery',
        summary: 'In 1992, astronomers detected the first exoplanets orbiting a pulsar, a highly magnetized neutron star.',
      },
      {
        title: 'Expanding catalog',
        summary: 'More than five thousand exoplanets are confirmed, with thousands of additional candidates awaiting validation from space agencies.',
      },
    ],
  },
  {
    title: 'How are they detected?',
    description:
      'Astronomers rely on methods like transit photometry and radial velocity measurements. Each technique uncovers unique clues about a planet’s size, mass, and orbit.',
    facts: [
      {
        title: 'Transit method',
        summary: 'Monitors periodic dips in a star’s brightness when a planet crosses in front, enabling estimates of the planet’s radius.',
      },
      {
        title: 'Radial velocity',
        summary: 'Measures tiny shifts in the stellar spectrum caused by a planet’s gravity, which helps calculate an approximate mass.',
      },
    ],
  },
  {
    title: 'Cosmic curiosities',
    description:
      'Exoplanets display remarkable traits, from ultra-fast worlds orbiting within hours to planets blanketed by endless global oceans.',
    facts: [
      {
        title: 'Super-Earths',
        summary: 'Some exoplanets exceed Earth’s size yet remain smaller than Neptune, potentially hosting towering mountain chains and solid surfaces.',
      },
      {
        title: 'Habitable zones',
        summary: 'Planets positioned at the right distance from their stars can retain liquid water, a key ingredient for life as we know it.',
      },
    ],
  },
];


export function ExoplanetKnowledgeSection() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const activeInsight = EXOPLANET_INSIGHTS[currentIndex];

  function handleNext() {
    setCurrentIndex(index => Math.min(index + 1, EXOPLANET_INSIGHTS.length - 1));
  }

  function handlePrevious() {
    setCurrentIndex(index => Math.max(index - 1, 0));
  }

  return (
    <section className="flex w-full justify-center bg-gradient-to-b from-black via-black to-slate-950 px-4 py-16 text-foreground" id="insights">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300/80">
            Knowledge in Orbit
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Explore the universe of exoplanets
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Learn what they are, how we detect them, and uncover surprising insights about worlds orbiting distant stars.
          </p>
        </header>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm sm:p-10">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeInsight.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{
                duration: ANIMATION_CONFIG.duration.medium,
                ease: ANIMATION_CONFIG.easing,
              }}
              className="flex flex-col gap-6"
            >
              <div>
                <MinGlobe />
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/80">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(EXOPLANET_INSIGHTS.length).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
                  {activeInsight.title}
                </h3>
                <p className="mt-3 text-base text-muted-foreground sm:text-lg">
                  {activeInsight.description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {activeInsight.facts.map(fact => (
                  <motion.div
                    key={fact.summary}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: ANIMATION_CONFIG.delay.base,
                      duration: ANIMATION_CONFIG.duration.fast,
                      ease: ANIMATION_CONFIG.easing,
                    }}
                    className="rounded-2xl border border-white/10 bg-black/40 p-5"
                  >
                    <p className="text-sm font-semibold text-cyan-200">
                      {fact.title}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {fact.summary}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.article>
          </AnimatePresence>

          <KnowledgeStepIndicator
            currentIndex={currentIndex}
            totalSteps={EXOPLANET_INSIGHTS.length}
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Step through these discoveries and get ready to run your own detection analysis.
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white transition hover:border-cyan-200 hover:text-cyan-200 disabled:border-white/10 disabled:text-white/40"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex === EXOPLANET_INSIGHTS.length - 1}
              className="inline-flex items-center justify-center rounded-full border border-cyan-400/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100 transition hover:border-cyan-200 hover:text-white disabled:border-cyan-400/20 disabled:text-cyan-200/40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function KnowledgeStepIndicator({ currentIndex, totalSteps }: KnowledgeStepIndicatorProps) {
  return (
    <div
      aria-label={`Insight ${currentIndex + 1} of ${totalSteps}`}
      className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-4"
      role="status"
    >
      {EXOPLANET_INSIGHTS.map((_, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={`step-${index}`}
            aria-hidden
            className={
              isActive
                ? 'h-2 w-8 rounded-full bg-cyan-300'
                : 'h-2 w-2 rounded-full bg-white/30'
            }
          />
        );
      })}
    </div>
  );
}



interface ExoplanetInsightFact {
  title: string;
  summary: string;
}

interface ExoplanetInsight {
  title: string;
  description: string;
  facts: ExoplanetInsightFact[];
}

interface KnowledgeStepIndicatorProps {
  currentIndex: number;
  totalSteps: number;
}

