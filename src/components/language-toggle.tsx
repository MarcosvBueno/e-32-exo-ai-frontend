'use client';

import { useLanguage } from '@/lib/i18n/language-context';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-sm">
      <Globe className="ml-2 h-3 w-3 text-cyan-300/70" />

      <div className="relative flex items-center">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 border border-cyan-400/40"
          initial={false}
          animate={{
            x: language === 'en' ? 0 : '100%',
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          style={{ width: '50%' }}
        />

        {/* EN Button */}
        <button
          onClick={() => setLanguage('en')}
          className={`relative z-10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
            language === 'en'
              ? 'text-cyan-100'
              : 'text-white/50 hover:text-white/70'
          }`}
        >
          EN
        </button>

        {/* PT Button */}
        <button
          onClick={() => setLanguage('pt')}
          className={`relative z-10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
            language === 'pt'
              ? 'text-cyan-100'
              : 'text-white/50 hover:text-white/70'
          }`}
        >
          PT
        </button>
      </div>
    </div>
  );
}
