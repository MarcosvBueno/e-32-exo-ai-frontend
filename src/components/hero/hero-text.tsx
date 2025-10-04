"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from '@/lib/i18n/language-context';

type MotionDivProps = React.ComponentPropsWithoutRef<typeof motion.div>;

interface HeroSectionTextProps extends Omit<MotionDivProps, 'children'> {
  title: string;
  description: string;
}

const rootVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const descriptionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 },
  },
};

const glowVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 0.55,
    scale: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
};

const underlineVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0.3 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.9, ease: [0.33, 1, 0.68, 1], delay: 0.4 },
  },
};

const chipsVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.6 },
  },
};

export function HeroSectionText({
  title,
  description,
  className,
  transition,
  ...motionProps
}: HeroSectionTextProps) {
  const { t } = useLanguage();
  const isLeftAligned = className?.includes('text-left') ?? false;
  const isRightAligned = className?.includes('text-right') ?? false;

  const alignmentClass = isLeftAligned
    ? 'items-start text-left'
    : isRightAligned
    ? 'items-end text-right'
    : 'items-center text-center';

  const paragraphAlignment = isLeftAligned
    ? 'text-left'
    : isRightAligned
    ? 'text-right'
    : 'text-center';

  const chipsJustifyClass =
    paragraphAlignment === 'text-left'
      ? 'justify-start'
      : paragraphAlignment === 'text-right'
      ? 'justify-end'
      : 'justify-center';

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={rootVariants}
      transition={transition ?? { duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      {...motionProps}
      className={cn('space-y-10', className)}
    >
      <motion.div
        className={cn('relative flex flex-col gap-8', alignmentClass)}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
          animate={{ opacity: 0.45, scale: 1, rotate: [-4, 4, -4] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: 1,
          }}
          className="pointer-events-none absolute -bottom-20 right-0 -z-10 h-44 w-44 rounded-full bg-[radial-gradient(circle_at_center,_rgba(196,181,253,0.4),_transparent_60%)] blur-3xl"
          aria-hidden="true"
        />

        <motion.h1
          variants={titleVariants}
          className="relative text-balance text-4xl font-semibold sm:text-5xl md:text-6xl"
        >
          <motion.span
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
            className="bg-gradient-to-br from-sky-200 via-white to-indigo-200 bg-[length:220%_220%] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(56,189,248,0.35)]"
          >
            {title}
          </motion.span>

          <motion.span
            variants={underlineVariants}
            className="pointer-events-none absolute left-1/2 top-full mt-6 h-px w-40 -translate-x-1/2 origin-center bg-gradient-to-r from-transparent via-cyan-200 to-transparent"
            aria-hidden="true"
          />
        </motion.h1>
      </motion.div>

      <motion.p
        variants={descriptionVariants}
        className={cn(
          'mx-auto max-w-2xl text-base font-medium leading-relaxed text-muted-foreground/90 sm:text-lg md:text-xl',
          paragraphAlignment
        )}
      >
        {description}
      </motion.p>

      <motion.div
        variants={chipsVariants}
        className={cn(
          'flex flex-wrap gap-3 text-[0.65rem] uppercase tracking-[0.38em] text-white/75 sm:text-xs',
          chipsJustifyClass
        )}
      >
        <span className="rounded-full border border-white/20 bg_WHITE/5 px-5 py-2 backdrop-blur-sm">
          {t('hero.chip.mission')}
        </span>
        <span className="rounded-full border border-white/15 bg-white/5 px-5 py-2 backdrop-blur-sm">
          {t('hero.chip.telemetry')}
        </span>
        <span className="rounded-full border border-white/10 bg_WHITE/5 px-5 py-2 backdrop-blur-sm">
          {t('hero.chip.collaboration')}
        </span>
      </motion.div>
    </motion.div>
  );
}

