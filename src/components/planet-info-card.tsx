"use client"

import { motion } from "framer-motion"

interface PlanetInfoCardProps {
  title: string
  value: string
  delay?: number
  align?: 'left' | 'center' | 'right'
}

export function PlanetInfoCard({ title, value, delay = 0, align = 'center' }: PlanetInfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="rounded-lg border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-sm"
      style={{
        textAlign: align,
      }}
    >
      <div className="text-xs font-medium uppercase tracking-wider text-cyan-300/70">{title}</div>
      <div className="mt-1 text-sm font-semibold text-white">{value}</div>
    </motion.div>
  )
}
