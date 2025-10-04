'use client';

import { HeroContent } from './hero-content';
import { ScrollSpaceShuttle } from './scroll-space-shuttle';
import { LanguageProvider } from '@/lib/i18n/language-context';
import { heroTranslations } from '@/lib/i18n/translations';
import { LanguageToggle } from '@/components/language-toggle';

export function Hero() {
  return (
    <LanguageProvider translations={heroTranslations}>
      <div className="w-full bg-black text-foreground h-full " id="home">
        <LanguageToggle />
        <ScrollSpaceShuttle
          imageUrl="/space-shuttle.png"
          imageClassName="w-auto h-auto max-w-3xl"
          imageAlt="Top view of a private jet flying across the screen"
          midpointRange={[0.55, 0.55]}
        >
          <HeroContent />
        </ScrollSpaceShuttle>
      </div>
    </LanguageProvider>
  );
}
