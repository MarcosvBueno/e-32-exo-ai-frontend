'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { ANIMATION_CONFIG } from '@/constants/animation-data';
import { MinGlobe } from './min-globe';
import { useLanguage } from '@/lib/i18n/language-context';

export function ExoplanetKnowledgeSection() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const EXOPLANET_INSIGHTS = [
    {
      title: t('knowledge.insight1.title'),
      description: t('knowledge.insight1.description'),
      facts: [
        {
          title: t('knowledge.insight1.fact1.title'),
          summary: t('knowledge.insight1.fact1.summary'),
        },
        {
          title: t('knowledge.insight1.fact2.title'),
          summary: t('knowledge.insight1.fact2.summary'),
        },
      ],
    },
    {
      title: t('knowledge.insight2.title'),
      description: t('knowledge.insight2.description'),
      facts: [
        {
          title: t('knowledge.insight2.fact1.title'),
          summary: t('knowledge.insight2.fact1.summary'),
        },
        {
          title: t('knowledge.insight2.fact2.title'),
          summary: t('knowledge.insight2.fact2.summary'),
        },
      ],
    },
    {
      title: t('knowledge.insight3.title'),
      description: t('knowledge.insight3.description'),
      facts: [
        {
          title: t('knowledge.insight3.fact1.title'),
          summary: t('knowledge.insight3.fact1.summary'),
        },
        {
          title: t('knowledge.insight3.fact2.title'),
          summary: t('knowledge.insight3.fact2.summary'),
        },
      ],
    },
  ];

  const activeInsight = EXOPLANET_INSIGHTS[currentIndex];

  function handleNext() {
    setCurrentIndex(index =>
      Math.min(index + 1, EXOPLANET_INSIGHTS.length - 1)
    );
  }

  function handlePrevious() {
    setCurrentIndex(index => Math.max(index - 1, 0));
  }

  return (
    <section
      className="flex w-full justify-center bg-gradient-to-b from-black via-black to-slate-950 px-4 py-16 text-foreground"
      id="insights"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300/80">
            {t('knowledge.subtitle')}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            {t('knowledge.title')}
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            {t('knowledge.description')}
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
                  {String(currentIndex + 1).padStart(2, '0')} /{' '}
                  {String(EXOPLANET_INSIGHTS.length).padStart(2, '0')}
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
            {t('knowledge.footer')}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white transition hover:border-cyan-200 hover:text-cyan-200 disabled:border-white/10 disabled:text-white/40"
            >
              {t('knowledge.button.previous')}
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex === EXOPLANET_INSIGHTS.length - 1}
              className="inline-flex items-center justify-center rounded-full border border-cyan-400/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100 transition hover:border-cyan-200 hover:text-white disabled:border-cyan-400/20 disabled:text-cyan-200/40"
            >
              {t('knowledge.button.next')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function KnowledgeStepIndicator({
  currentIndex,
  totalSteps,
}: KnowledgeStepIndicatorProps) {
  return (
    <div
      aria-label={`Insight ${currentIndex + 1} of ${totalSteps}`}
      className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-4"
      role="status"
    >
      {Array.from({ length: totalSteps }).map((_, index) => {
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

