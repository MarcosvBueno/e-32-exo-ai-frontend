"use client";

import { Suspense } from "react";
import { useScrollSpaceShuttle } from "./scroll-space-shuttle";
import { HeroSectionText } from "./hero-text";

export function HeroContent() {
  const { isMidpoint, hasPassedMidpoint } = useScrollSpaceShuttle();
  const shouldShowFinalMessage = isMidpoint || hasPassedMidpoint;

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
              ? 'Charting Detection Probabilities'
              : 'Decoding Exoplanet Signatures'
          }
          description={
            shouldShowFinalMessage
              ? 'Our upcoming analysis form will translate your mission inputs into precise exoplanet likelihood percentages for every candidate.'
              : 'Surface the hidden patterns inside stellar light curves and forecast how likely each dataset reveals a new world.'
          }
          className="text-center"
        />
      </Suspense>
    </div>
  );
}