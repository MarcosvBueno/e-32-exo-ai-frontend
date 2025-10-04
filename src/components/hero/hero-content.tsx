"use client";

import { Suspense } from "react";
import { useScrollSpaceShuttle } from "./scroll-space-shuttle";
import { HeroSectionText } from "./hero-text";
import { useLanguage } from '@/lib/i18n/language-context';

export function HeroContent() {
  const { isMidpoint, hasPassedMidpoint } = useScrollSpaceShuttle();
  const shouldShowFinalMessage = isMidpoint || hasPassedMidpoint;
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-6 text-center">
      <Suspense
        fallback={
          <div className="space-y-4">
            <div className="mx-auto h-12 w-2/3 animate-pulse rounded-full bg-white/20" />
            <div className="mx-auto h-5 w-3/4 animate-pulse rounded-full bg-white/10" />
          </div>
        }
      >
        <HeroSectionText
          title={
            shouldShowFinalMessage
              ? t('hero.title.midpoint')
              : t('hero.title.initial')
          }
          description={
            shouldShowFinalMessage
              ? t('hero.description.midpoint')
              : t('hero.description.initial')
          }
          className="text-center"
        />
      </Suspense>
    </div>
  );
}