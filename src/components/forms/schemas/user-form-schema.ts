import { z } from 'zod';

export const userFormSchema = z.object({
  orbital_period_days: z
    .number({ error: 'Enter a number' })
    .min(0.01, 'Minimum value 0.01'),
  transit_depth_ppm: z
    .number({ error: 'Enter a number' })
    .min(0.01, 'Minimum value 0.01'),
  planet_radius_re: z
    .number({ error: 'Enter a number' })
    .min(0.01, 'Minimum value 0.01'),
  planet_mass_me: z
    .number({ error: 'Enter a number' })
    .min(0.01, 'Minimum value 0.01'),
  stellar_teff_k: z
    .number({ error: 'Enter a number' })
    .min(500, 'Minimum temperature 500 K'),
  stellar_radius_rsun: z
    .number({ error: 'Enter a number' })
    .min(0.01, 'Minimum value 0.01'),
  stellar_mass_msun: z
    .number({ error: 'Enter a number' })
    .min(0.01, 'Minimum value 0.01'),
});