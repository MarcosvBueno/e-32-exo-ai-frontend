'use client';

import { motion } from 'framer-motion';
import { PlanetInfoCard } from './planet-info-card';
import type { MotionPlanetProps } from '@/types/exoplanet';
import { ANIMATION_CONFIG } from '@/constants/animation-data';

export function MotionPlanet({
  globe,
  metrics,
  alignment,
  globeAnimation,
  delayOffset,
}: MotionPlanetProps) {
  return (
    <div className="flex w-full flex-col items-center gap-6 lg:flex-1">
      <motion.div
        initial={{
          opacity: 0,
          x: alignment === 'left' ? -32 : 32,
          scale: 0.92,
        }}
        animate={{ opacity: 1, x: 0, scale: 1, ...globeAnimation }}
        transition={{
          duration: ANIMATION_CONFIG.duration.globe,
          ease: ANIMATION_CONFIG.easing,
        }}
        className="relative flex items-center justify-center"
      >
        {globe}

        <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-4 lg:pt-6">
          {metrics.slice(0, 2).map((metric, index) => (
            <motion.div
              key={`${metric.title}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: ANIMATION_CONFIG.duration.fast,
                delay: delayOffset + index * ANIMATION_CONFIG.delay.increment,
              }}
            >
              <PlanetInfoCard title={metric.title} value={metric.value} />
            </motion.div>
          ))}
        </div>

        <div
          className={
            alignment === 'left'
              ? 'absolute left-0 top-1/2 hidden -translate-x-[118%] -translate-y-1/2 flex-col items-end gap-4 lg:flex'
              : 'absolute right-0 top-1/2 hidden translate-x-[118%] -translate-y-1/2 flex-col items-start gap-4 lg:flex'
          }
        >
          {metrics.slice(2, 4).map((metric, index) => (
            <motion.div
              key={`${metric.title}-${index}`}
              initial={{ opacity: 0, x: alignment === 'left' ? -12 : 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: ANIMATION_CONFIG.duration.fast,
                delay:
                  delayOffset + (index + 2) * ANIMATION_CONFIG.delay.increment,
              }}
            >
              <PlanetInfoCard
                title={metric.title}
                value={metric.value}
                align={alignment === 'left' ? 'right' : 'left'}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: ANIMATION_CONFIG.duration.fast,
            delay: delayOffset + 0.68,
          }}
          className="absolute bottom-full left-1/2 hidden -translate-x-1/2 pb-4 lg:block"
        >
          {metrics.slice(-1).map(metric => (
            <PlanetInfoCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
            />
          ))}
        </motion.div>
      </motion.div>

      <div className="grid w-full grid-cols-1 gap-4 lg:hidden">
        {metrics.map((metric, index) => (
          <motion.div
            key={`${metric.title}-${index}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: ANIMATION_CONFIG.duration.fast,
              delay: delayOffset + index * 0.12,
            }}
          >
            <PlanetInfoCard title={metric.title} value={metric.value} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
