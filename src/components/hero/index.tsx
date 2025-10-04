import { HeroContent } from './hero-content';
import { ScrollSpaceShuttle } from './scroll-space-shuttle';

export function Hero() {
  return (
    <div className="w-full bg-black text-foreground h-full ">
      <ScrollSpaceShuttle
        imageUrl="/space-shuttle.png"
        imageClassName="w-auto h-auto max-w-3xl"
        imageAlt="Top view of a private jet flying across the screen"
        midpointRange={[0.55, 0.55]}
      >
        <HeroContent />
      </ScrollSpaceShuttle>
    </div>
  );
}
