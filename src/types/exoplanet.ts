export interface TransitData {
  orbitalPeriod: number;
  transitDepthPpm: number;
  transitDuration: number;
  planetRadius: number;
  planetMass: number;
  stellarTemperature: number;
  stellarRadius: number;
  stellarMass: number;
}

export interface DetectionResult {
  isExoplanet: boolean;
  label: string;
  surfaceTexture: string;
  confidence: number;
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
  prediction: ExoplanetPredictionResponse;
}

export interface PlanetMetric {
  title: string;
  value: string;
}

export interface MotionPlanetProps {
  globe: React.ReactNode;
  metrics: PlanetMetric[];
  alignment: 'left' | 'right';
  globeAnimation: Record<string, unknown>;
  delayOffset: number;
}

export interface ExoplanetPredictionPlanet {
  radius_re: number | null;
  mass_me: number | null;
  density_gcm3: number | null;
  orbital_period_days: number | null;
  semi_major_axis_au: number | null;
  equilibrium_temp_k: number | null;
  insolation_earth: number | null;
}

export interface ExoplanetPredictionStar {
  teff_k: number | null;
  radius_rsun: number | null;
  mass_msun: number | null;
  luminosity_lsun: number | null;
  teff_bin: string | null;
  teff_label: string | null;
}

export interface ExoplanetPredictionTransit {
  depth_ppm: number | null;
  duration_hours: number | null;
  radius_ratio: number | null;
}

export interface ExoplanetPredictionDerivedFeatures {
  period_mass_interaction: number | null;
  log_orbital_period: number | null;
}

export interface ExoplanetPredictionQualityFlags {
  planet_mass_imputed: boolean | null;
  stellar_mass_imputed: boolean | null;
  planet_radius_imputed: boolean | null;
}

export interface ExoplanetPredictionComparisonToEarth {
  radius_ratio_earth: number | null;
  insolation_ratio_earth: number | null;
}

export interface ExoplanetPredictionResponse {
  prob_rf: number | null;
  label_rf: string | null;
  prob_hgb: number | null;
  label_hgb: string | null;
  prob_ens: number | null;
  label_ens: string | null;
  planet: ExoplanetPredictionPlanet;
  star: ExoplanetPredictionStar;
  transit: ExoplanetPredictionTransit;
  derived_features: ExoplanetPredictionDerivedFeatures;
  quality_flags: ExoplanetPredictionQualityFlags;
  comparison_to_earth: ExoplanetPredictionComparisonToEarth;
  prediction_id: string | null;
}

export interface ExoplanetPredictionComparisonResponse {
  similar_exoplanets: [
    {
      planet_name: string;
      similarity_score: number;
      distance: number | null;
      stellar_type: string;
      planet_type: string;
      orbital_period_days: number;
      planet_radius_re: number;
      equilibrium_temp_k: number;
      habitability_score: number;
      discovery_year: number | null;
    }
  ];
  comparison_summary: string;
  uniqueness_score: number;
  scientific_interest: string;
}
