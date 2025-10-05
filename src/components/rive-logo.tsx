'use client';

import { useRive } from '@rive-app/react-canvas';
import { motion } from 'framer-motion';

interface RiveLogoProps {
  className?: string;
}

export function RiveLogo({ className }: RiveLogoProps) {
  const { RiveComponent } = useRive({
    src: '/logo.riv',
    autoplay: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className={className}
    >
      <RiveComponent
        style={{
          width: '100px',
          height: '30px',
        }}
      />
    </motion.div>
  );
}
