'use client';

import { motion } from 'framer-motion';
import type { DetectionResult } from '@/types/exoplanet';
import { ANIMATION_CONFIG } from '@/constants/animation-data';

interface DetectionResultCardProps {
  detection: DetectionResult;
  isVisible: boolean;
  isMobile?: boolean;
  layout?: 'overlay' | 'inline';
}

export function DetectionResultCard({
  detection,
  isVisible,
  isMobile = false,
  layout = 'overlay',
}: DetectionResultCardProps) {
  if (!isVisible || !detection.isExoplanet) return null;

  const confidencePercent = `${Math.round((detection.confidence ?? 0) * 100)}%`;
  const methodConfidences = [
    { label: 'Random Forest', value: detection.probabilities.rf },
    { label: 'Hist. Gradient Boost', value: detection.probabilities.hgb },
    { label: 'Ensemble', value: detection.probabilities.ensemble },
  ].filter(method => method.value !== null);

  const containerClassName =
    layout === 'inline'
      ? 'relative z-20 w-full max-w-[420px]'
      : isMobile
      ? 'relative z-20 w-80 max-w-[90vw] mx-auto'
      : 'absolute left-1/2 top-1/2 z-20 w-80 max-w-[90vw] -translate-x-1/2 -translate-y-1/2 transform lg:w-[420px]';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{
        duration: ANIMATION_CONFIG.duration.medium,
        ease: ANIMATION_CONFIG.easing,
        delay: 1.8, // Appears after planet animations
      }}
      className={containerClassName}
    >
      <div className="relative">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-xl bg-cyan-400/8 blur-lg" />

        {/* Main card */}
        <div className="relative rounded-xl border border-cyan-400/20 bg-black/80 p-6 backdrop-blur-md">
          {/* Success indicator */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 2.0,
              type: 'spring',
              stiffness: 150,
            }}
            className="mb-6 text-center"
          >
            <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/20 ring-1 ring-cyan-400/40">
              <svg
                className="h-4 w-4 text-cyan-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 2.2 }}
              className="space-y-1"
            >
              <h3 className="text-lg font-medium text-cyan-100">
                {detection.label}
              </h3>
              <div className="text-2xl font-bold text-white">
                {confidencePercent}
              </div>
              <div className="text-xs text-cyan-300/80 uppercase tracking-wider">
                Ensemble confidence
              </div>
            </motion.div>
          </motion.div>

          {/* Analysis sections */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 2.4 }}
            className="space-y-3"
          >
            <div className="space-y-2 text-xs text-cyan-300">
              {methodConfidences.map(method => (
                <div
                  key={method.label}
                  className="flex items-center justify-between"
                >
                  <span>{method.label}</span>
                  <span>{`${Math.round(method.value! * 100)}%`}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p>Derived metrics:</p>
              <div className="flex items-center justify-between">
                <span>Equilibrium temp.</span>
                <span>
                  {detection.prediction.planet.equilibrium_temp_k !== null
                    ? `${detection.prediction.planet.equilibrium_temp_k.toFixed(
                        0
                      )} K`
                    : '—'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Insolation (Earth)</span>
                <span>
                  {detection.prediction.planet.insolation_earth !== null
                    ? detection.prediction.planet.insolation_earth.toFixed(2)
                    : '—'}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: confidencePercent }}
                transition={{ duration: 1, delay: 2.6, ease: 'easeOut' }}
                className="h-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300"
              />
            </div>
          </motion.div>

          {/* Recommendation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 2.8 }}
            className="mt-4 rounded-lg bg-cyan-400/5 p-3 text-center text-xs text-green-300"
          >
            {detection.prediction.comparison_to_earth.radius_ratio_earth !==
            null ? (
              <span>{`Radius compared to Earth: ${detection.prediction.comparison_to_earth.radius_ratio_earth.toFixed(
                2
              )} R⊕`}</span>
            ) : (
              <span>Promising candidate — schedule a deeper follow-up.</span>
            )}
          </motion.div>

          {/* Subtle border glow */}
          <div className="absolute inset-0 rounded-xl ring-1 ring-cyan-400/30" />
        </div>
      </div>
    </motion.div>
  );
}
