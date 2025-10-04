'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/language-context';

interface NotPlanetCandidateCardProps {
  probabilities: {
    rf: number | null;
    hgb: number | null;
    ensemble: number | null;
  };
  labels: {
    rf: string | null;
    hgb: string | null;
    ensemble: string | null;
  };
  onReset: () => void;
  isOpen: boolean;
}

export function NotPlanetCandidateCard({
  probabilities,
  onReset,
  isOpen,
}: NotPlanetCandidateCardProps) {
  const { t } = useLanguage();

  const averageProbability =
    ((probabilities.rf || 0) +
      (probabilities.hgb || 0) +
      (probabilities.ensemble || 0)) /
    3;

  const percentageValue = (averageProbability * 100).toFixed(1);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={onReset}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl"
            >
              <div className="relative overflow-hidden rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/40 via-black to-red-950/20 p-6 sm:p-8 shadow-2xl backdrop-blur">
                <div className="pointer-events-none absolute -top-10 left-1/2 h-24 w-48 -translate-x-1/2 rounded-full bg-red-500/20 blur-3xl" />

                {/* Close Button */}
                <button
                  onClick={onReset}
                  className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-white/5 p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>

        {/* Header */}
        <div className="relative flex flex-col items-center gap-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4, type: 'spring' }}
            className="flex h-16 w-16 items-center justify-center rounded-full border border-red-400/40 bg-red-500/10"
          >
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </motion.div>

          <div className="space-y-3">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-xs font-semibold uppercase tracking-[0.35em] text-red-300/70"
            >
              {t('detection.not_candidate.subtitle')}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-semibold text-white sm:text-3xl"
            >
              {t('detection.not_candidate.title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mx-auto max-w-xl text-sm text-red-100/60 sm:text-base"
            >
              {t('detection.not_candidate.description')}
            </motion.p>
          </div>
        </div>

        {/* Probability Display */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-8 flex flex-col items-center gap-5"
        >
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-bold text-red-400">
                {percentageValue}
              </span>
              <span className="text-2xl font-semibold text-red-400/70">%</span>
            </div>
            <p className="mt-2 text-xs uppercase tracking-wider text-red-300/60">
              {t('detection.not_candidate.confidence')}
            </p>
          </div>

          {/* Individual Model Probabilities */}
          <div className="grid w-full gap-4 sm:grid-cols-3">
            <ProbabilityCard
              label="Random Forest"
              probability={probabilities.rf}
              delay={0.45}
            />
            <ProbabilityCard
              label="Gradient Boost"
              probability={probabilities.hgb}
              delay={0.5}
            />
            <ProbabilityCard
              label="Ensemble"
              probability={probabilities.ensemble}
              delay={0.55}
              isEnsemble
            />
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={onReset}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-white transition-all hover:border-cyan-300 hover:text-cyan-300"
          >
            {t('form.button.reset')}
          </button>
        </motion.div>
      </div>
    </motion.div>
  </div>
        </>
      )}
    </AnimatePresence>
  );
}

interface ProbabilityCardProps {
  label: string;
  probability: number | null;
  delay: number;
  isEnsemble?: boolean;
}

function ProbabilityCard({
  label,
  probability,
  delay,
  isEnsemble = false,
}: ProbabilityCardProps) {
  const percentage = probability ? (probability * 100).toFixed(1) : '--';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`rounded-xl border p-4 ${
        isEnsemble
          ? 'border-amber-500/30 bg-amber-950/20'
          : 'border-red-500/20 bg-red-950/10'
      }`}
    >
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/60">
        {label}
      </p>
      <div className="flex items-baseline gap-1">
        <span
          className={`text-2xl font-bold ${
            isEnsemble ? 'text-amber-400' : 'text-red-400'
          }`}
        >
          {percentage}
        </span>
        <span
          className={`text-sm ${
            isEnsemble ? 'text-amber-400/70' : 'text-red-400/70'
          }`}
        >
          %
        </span>
      </div>
    </motion.div>
  );
}

