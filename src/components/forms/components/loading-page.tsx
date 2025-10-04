'use client';

import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from '@/constants/animation-data';
import { cn } from '@/lib/utils';

export function LoadingScreen({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: ANIMATION_CONFIG.duration.fast,
        ease: ANIMATION_CONFIG.easing,
      }}
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-black h-screen',
        className
      )}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Animated scanning effect */}
        <div className="relative">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
              scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="h-24 w-24 rounded-full border-2 border-cyan-400/30"
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2 rounded-full border-2 border-cyan-300/50"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 rounded-full border-2 border-cyan-200/70"
              />
            </motion.div>
          </motion.div>

          {/* Center dot */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300"
          />
        </div>

        {/* Loading text */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: ANIMATION_CONFIG.duration.medium,
              ease: ANIMATION_CONFIG.easing,
            }}
            className="text-2xl font-semibold text-cyan-100 sm:text-3xl"
          >
            Analyzing data...
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.4,
              duration: ANIMATION_CONFIG.duration.fast,
            }}
            className="mt-4 flex items-center justify-center gap-1"
          >
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
                className="h-2 w-2 rounded-full bg-cyan-300"
              />
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.6,
              duration: ANIMATION_CONFIG.duration.fast,
            }}
            className="mt-4 text-sm text-cyan-200/70"
          >
            Processing planetary transit data
          </motion.p>
        </div>

        {/* Scanning lines effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: ['-100%', '100vw'],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: 'linear',
              }}
              className="absolute top-1/2 h-px w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              style={{ transform: `translateY(${i * 20 - 20}px)` }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
