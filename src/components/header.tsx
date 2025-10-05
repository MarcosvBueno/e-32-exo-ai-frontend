'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n/language-context';
import { LanguageToggle } from './language-toggle';
import { RiveLogo } from './rive-logo';

interface HeaderProps extends HTMLMotionProps<'header'> {
  links?: Array<{ href: string; label: string }>;
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const navVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.08,
    },
  },
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function Header({ links, className, ...props }: HeaderProps) {
  const { t } = useLanguage();

  const navLinks = links ?? [
    { href: '#home', label: t('header.nav.home') },
    { href: '#insights', label: t('header.nav.insights') },
    { href: '#form', label: t('header.nav.form') },
  ];

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className={cn(
        'fixed top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl',
        className
      )}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4">
        <RiveLogo className="flex items-center" />

        <motion.nav
          variants={navVariants}
          initial="hidden"
          animate="visible"
          className="hidden items-center gap-6 text-xs font-medium uppercase tracking-[0.3em] text-white/70 md:flex"
        >
          {navLinks.map(link => (
            <motion.div key={link.href} variants={navItemVariants}>
              <Link
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <LanguageToggle />
          <Link
            href="#form"
            className="hidden md:block rounded-full border border-cyan-400/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100 transition-all hover:border-cyan-200 hover:text-white"
          >
            {t('header.cta')}
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
}

export { Header };

