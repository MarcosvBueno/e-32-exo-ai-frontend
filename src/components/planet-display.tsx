'use client';

import { motion } from 'framer-motion';
import { Globe } from './globe';
import { PlanetInfoCard } from './planet-info-card';
import { MotionPlanet } from './motion-planet';
import { DetectionResultCard } from './detection-result-card';
import type { DetectionResult, PlanetMetric } from '@/types/exoplanet';
import { EARTH_METRICS, ANIMATION_CONFIG } from '@/constants/animation-data';

interface PlanetDisplayProps {
  hasDetectedExoplanet: boolean;
  detection: DetectionResult | null;
  exoplanetMetrics: PlanetMetric[];
  stellarTemperature: string;
  transitDepth: string;
  orbitalPeriod: string;
}

export function PlanetDisplay({
  hasDetectedExoplanet,
  detection,
  exoplanetMetrics,
  stellarTemperature,
  transitDepth,
  orbitalPeriod,
}: PlanetDisplayProps) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-10 lg:px-20">
      {/* Mobile Layout */}
      <div className="relative flex w-full flex-col items-center justify-center gap-10 lg:hidden py-10 mx-auto">
        {/* Detection Result Card - positioned between planets on mobile */}
        {hasDetectedExoplanet && detection && (
          <div className="relative z-10 my-6">
            <DetectionResultCard
              detection={detection}
              isVisible={hasDetectedExoplanet}
              isMobile={true}
            />
          </div>
        )}
        <MotionPlanet
          globe={
            <Globe
              size={hasDetectedExoplanet ? 260 : 320}
              className="mx-auto"
              imageUrl="/earth-surface-map.jpg"
            />
          }
          metrics={EARTH_METRICS}
          alignment="right"
          globeAnimation={hasDetectedExoplanet ? { x: 0 } : {}}
          delayOffset={0.6}
        />

        {hasDetectedExoplanet ? (
          <MotionPlanet
            globe={
              <Globe
                size={260}
                rotationDuration={24}
                imageUrl={detection?.surfaceTexture ?? '/surface-map.jpg'}
                className="drop-shadow-[0_0_32px_rgba(14,165,233,0.55)]"
              />
            }
            metrics={exoplanetMetrics}
            alignment="right"
            globeAnimation={{ x: 0 }}
            delayOffset={1.0}
          />
        ) : null}
      </div>

      {/* Desktop Layout */}
      <div className="relative hidden w-full flex-col items-center justify-center gap-8 lg:flex lg:flex-row ">
        {/* Detection Result Card - positioned between planets */}
        {detection && (
          <DetectionResultCard
            detection={detection}
            isVisible={hasDetectedExoplanet}
          />
        )}
        {/* Earth container with 5 info cards */}
        <div
          className="relative flex items-center justify-center mx-auto"
          style={{ width: 500, height: 600 }}
        >
          <motion.div
            initial={{ x: 0 }}
            animate={{
              x: hasDetectedExoplanet ? -100 : 0,
            }}
            transition={{
              duration: ANIMATION_CONFIG.duration.slow,
              ease: ANIMATION_CONFIG.easing,
            }}
            className="flex items-center justify-center"
          >
            <Globe
              size={hasDetectedExoplanet ? 260 : 320}
              className="mx-auto"
              imageUrl="/earth-surface-map.jpg"
            />
          </motion.div>

          {hasDetectedExoplanet ? (
            <>
              {/* Top card - Planet */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: ANIMATION_CONFIG.duration.medium,
                  delay: 0.6,
                }}
                className="absolute"
                style={{
                  top: '10%',
                  left: '30%',
                  transform: 'translateX(-50%)',
                }}
              >
                <svg
                  className="absolute left-1/2 top-full w-0.5 -translate-x-1/2"
                  style={{ height: 50 }}
                >
                  <motion.line
                    x1="1"
                    y1="0"
                    x2="1"
                    y2="100"
                    stroke="rgba(103, 232, 249, 0.3)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  />
                </svg>
                <PlanetInfoCard title="Planet" value="Earth" delay={0.8} />
              </motion.div>

              {/* Top-left card - Mass */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: ANIMATION_CONFIG.duration.medium,
                  delay: 0.65,
                }}
                className="absolute"
                style={{ top: '30%', left: '-15%' }}
              >
                <svg
                  className="absolute left-full top-1/2 h-0.5 -translate-y-1/2"
                  style={{ width: 80 }}
                >
                  <motion.line
                    x1="0"
                    y1="1"
                    x2="80"
                    y2="1"
                    stroke="rgba(103, 232, 249, 0.3)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.65 }}
                  />
                </svg>
                <PlanetInfoCard
                  title="Mass"
                  value="5.97 × 10²⁴ kg"
                  delay={0.85}
                />
              </motion.div>

              {/* Left card - Diameter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: ANIMATION_CONFIG.duration.medium,
                  delay: 0.7,
                }}
                className="absolute"
                style={{
                  top: '50%',
                  left: '-15%',
                  transform: 'translateY(-50%)',
                }}
              >
                <svg
                  className="absolute left-full top-1/2 h-0.5 -translate-y-1/2"
                  style={{ width: 90 }}
                >
                  <motion.line
                    x1="0"
                    y1="1"
                    x2="90"
                    y2="1"
                    stroke="rgba(103, 232, 249, 0.3)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  />
                </svg>
                <PlanetInfoCard
                  title="Diameter"
                  value="12.742 km"
                  delay={0.9}
                />
              </motion.div>

              {/* Bottom-left card - Temperature */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: ANIMATION_CONFIG.duration.medium,
                  delay: 0.75,
                }}
                className="absolute"
                style={{ bottom: '30%', left: '-15%' }}
              >
                <svg
                  className="absolute left-full top-1/2 h-0.5 -translate-y-1/2"
                  style={{ width: 80 }}
                >
                  <motion.line
                    x1="0"
                    y1="1"
                    x2="80"
                    y2="1"
                    stroke="rgba(103, 232, 249, 0.3)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.75 }}
                  />
                </svg>
                <PlanetInfoCard title="Temperature" value="15°C" delay={0.95} />
              </motion.div>

              {/* Bottom card - Orbital period */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: ANIMATION_CONFIG.duration.medium,
                  delay: 0.8,
                }}
                className="absolute"
                style={{
                  bottom: '15%',
                  left: '30%',
                  transform: 'translateX(-50%)',
                }}
              >
                <svg
                  className="absolute bottom-full left-1/2 w-0.5 -translate-x-1/2"
                  style={{ height: 20 }}
                >
                  <motion.line
                    x1="1"
                    y1="0"
                    x2="1"
                    y2="100"
                    stroke="rgba(103, 232, 249, 0.3)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  />
                </svg>
                <PlanetInfoCard
                  title="Orbital period"
                  value="365 days"
                  delay={1.0}
                />
              </motion.div>
            </>
          ) : null}
        </div>

        {/* Exoplanet container with 5 info cards */}
        {hasDetectedExoplanet ? (
          <div
            className="relative flex items-center justify-center mx-auto"
            style={{ width: 500, height: 600 }}
          >
            <motion.div
              initial={{ opacity: 0, x: 200, scale: 0.85 }}
              animate={{
                opacity: hasDetectedExoplanet ? 1 : 0,
                x: hasDetectedExoplanet ? 100 : 200,
                scale: hasDetectedExoplanet ? 1 : 0.85,
              }}
              transition={{
                duration: ANIMATION_CONFIG.duration.slow,
                ease: ANIMATION_CONFIG.easing,
              }}
              className="flex items-center justify-center w-full h-full"
            >
              {hasDetectedExoplanet ? (
                <div className="flex items-center justify-center">
                  <Globe
                    size={260}
                    rotationDuration={24}
                    imageUrl={detection?.surfaceTexture ?? '/surface-map.jpg'}
                    className="drop-shadow-[0_0_32px_rgba(14,165,233,0.55)]"
                  />
                </div>
              ) : null}
            </motion.div>

            {hasDetectedExoplanet ? (
              <>
                {/* Top card - Type */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: ANIMATION_CONFIG.duration.medium,
                    delay: 1.0,
                  }}
                  className="absolute"
                  style={{
                    top: '12%',
                    left: '70%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <svg
                    className="absolute left-1/2 top-full w-0.5 -translate-x-1/2"
                    style={{ height: 40 }}
                  >
                    <motion.line
                      x1="1"
                      y1="0"
                      x2="1"
                      y2="100"
                      stroke="rgba(103, 232, 249, 0.3)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 1.0 }}
                    />
                  </svg>
                  <PlanetInfoCard
                    title="Type"
                    value={detection?.label ?? 'Exoplanet'}
                    delay={1.2}
                  />
                </motion.div>

                {/* Top-right card - Stellar temperature */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: ANIMATION_CONFIG.duration.medium,
                    delay: 1.05,
                  }}
                  className="absolute"
                  style={{ top: '30%', right: '-15%' }}
                >
                  <svg
                    className="absolute right-full top-1/2 h-0.5 -translate-y-1/2"
                    style={{ width: 70 }}
                  >
                    <motion.line
                      x1="20"
                      y1="1"
                      x2="80"
                      y2="1"
                      stroke="rgba(103, 232, 249, 0.3)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 1.05 }}
                    />
                  </svg>
                  <PlanetInfoCard
                    title="Stellar temp."
                    value={`${Number.parseFloat(stellarTemperature).toFixed(
                      0
                    )} K`}
                    delay={1.25}
                  />
                </motion.div>

                {/* Right card - Transit depth */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: ANIMATION_CONFIG.duration.medium,
                    delay: 1.1,
                  }}
                  className="absolute"
                  style={{
                    top: '50%',
                    right: '-15%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <svg
                    className="absolute right-full top-1/2 h-0.5 -translate-y-1/2"
                    style={{ width: 70 }}
                  >
                    <motion.line
                      x1="0"
                      y1="1"
                      x2="90"
                      y2="1"
                      stroke="rgba(103, 232, 249, 0.3)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 1.1 }}
                    />
                  </svg>
                  <PlanetInfoCard
                    title="Transit depth"
                    value={`${Number.parseFloat(transitDepth).toFixed(2)}%`}
                    delay={1.3}
                  />
                </motion.div>

                {/* Bottom card - Orbital period */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: ANIMATION_CONFIG.duration.medium,
                    delay: 1.2,
                  }}
                  className="absolute"
                  style={{
                    bottom: '10%',
                    left: '70%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <svg
                    className="absolute bottom-full left-1/2 w-0.5 -translate-x-1/2"
                    style={{ height: 60 }}
                  >
                    <motion.line
                      x1="1"
                      y1="0"
                      x2="1"
                      y2="200"
                      stroke="rgba(103, 232, 249, 0.3)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                    />
                  </svg>
                  <PlanetInfoCard
                    title="Orbital period"
                    value={`${Number.parseFloat(orbitalPeriod).toFixed(
                      1
                    )} days`}
                    delay={1.4}
                  />
                </motion.div>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}