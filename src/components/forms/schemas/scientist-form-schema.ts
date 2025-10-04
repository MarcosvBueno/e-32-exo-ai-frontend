import z from "zod";

export const scientistFormSchema = z.object({
  orbital_period_days: z
    .number({ error: 'Enter a number' })
    .min(0.01, 'Minimum value 0.01'),
  transit_depth: z
    .number({ error: 'Enter a number' })
    .min(0.01, 'Minimum value 0.01'),
  transit_duration: z
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
  radius_ratio: z
    .number({ error: 'Enter a number' })
    .min(0.0001, 'Minimum value 0.0001'),
  semi_major_axis_au: z
    .number({ error: 'Enter a number' })
    .min(0.01, 'Minimum value 0.01'),
  equilibrium_temp_recalc_k: z
    .number({ error: 'Enter a number' })
    .min(0, 'Minimum value 0'),
  log_orbital_period: z
    .number({ error: 'Enter a number' }),
  period_mass_interaction: z
    .number({ error: 'Enter a number' })
    .min(0, 'Minimum value 0'),
  stellar_teff_bin: z
    .number({ error: 'Enter a number' })
    .min(500, 'Minimum temperature 500 K'),
});