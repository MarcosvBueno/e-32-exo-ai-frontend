import { PlanetMetric } from '@/types/exoplanet';

export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.6,
    medium: 0.8,
    slow: 1.2,
    globe: 1.15,
  },
  delay: {
    base: 0.15,
    increment: 0.16,
  },
  easing: [0.22, 1, 0.36, 1] as const,
} as const;

export const EARTH_METRICS: PlanetMetric[] = [
  { title: 'Planet', value: 'Earth' },
  { title: 'Mass', value: '5.97 × 10²⁴ kg' },
  { title: 'Diameter', value: '12,742 km' },
  { title: 'Temperature', value: '15°C' },
  { title: 'Orbital period', value: '365 days' },
];
