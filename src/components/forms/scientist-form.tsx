'use client';

import { useMemo, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence } from 'framer-motion';
import axios, { type AxiosResponse } from 'axios';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { LoadingScreen } from './components/loading-page';
import { PlanetDisplay } from '../planet-display';
import { NotPlanetCandidateCard } from '../not-planet-candidate-card';
import type {
  DetectionResult,
  PlanetMetric,
  ExoplanetPredictionResponse,
  ExoplanetPredictionComparisonResponse,
  DashboardResponse,
} from '@/types/exoplanet';
import { scientistFormSchema } from './schemas/scientist-form-schema';
import { useLanguage } from '@/lib/i18n/language-context';
import { instance } from '@/lib/api';
import { DashboardCards } from '../dashboard-cards';

type ScientistFormValues = z.infer<typeof scientistFormSchema>;

const defaultValues: ScientistFormValues = {
  orbital_period_days: 32.9,
  transit_depth: 2140,
  transit_duration: 3.84,
  planet_radius_re: 2.37,
  planet_mass_me: 8.92,
  stellar_teff_k: 3457.0,
  stellar_radius_rsun: 0.469,
  stellar_mass_msun: 0.495,

  radius_ratio: 0.046263006396588494,
  semi_major_axis_au: 0.1429,
  equilibrium_temp_recalc_k: 276,
  log_orbital_period: 1.5171958979499742,
  period_mass_interaction: 293.368,
  stellar_teff_bin: 3457,
};

function getFieldConfigs(t: (key: string) => string): Array<{
  name: keyof ScientistFormValues;
  label: string;
  placeholder: string;
}> {
  return [
    {
      name: 'orbital_period_days',
      label: t('form.field.orbital_period'),
      placeholder: '289.9',
    },
    {
      name: 'transit_depth',
      label: t('form.field.transit_depth'),
      placeholder: '192',
    },
    {
      name: 'transit_duration',
      label: t('form.field.transit_duration'),
      placeholder: '7.5',
    },
    {
      name: 'planet_radius_re',
      label: t('form.field.planet_radius'),
      placeholder: '2.4',
    },
    {
      name: 'planet_mass_me',
      label: t('form.field.planet_mass'),
      placeholder: '66.0',
    },
    {
      name: 'stellar_teff_k',
      label: t('form.field.stellar_temperature'),
      placeholder: '5518',
    },
    {
      name: 'stellar_radius_rsun',
      label: t('form.field.stellar_radius'),
      placeholder: '0.98',
    },
    {
      name: 'stellar_mass_msun',
      label: t('form.field.stellar_mass'),
      placeholder: '0.97',
    },
    {
      name: 'radius_ratio',
      label: t('form.field.radius_ratio'),
      placeholder: '0.0245',
    },
    {
      name: 'semi_major_axis_au',
      label: t('form.field.semi_major_axis'),
      placeholder: '0.85',
    },
    {
      name: 'equilibrium_temp_recalc_k',
      label: t('form.field.equilibrium_temp'),
      placeholder: '295',
    },
    {
      name: 'log_orbital_period',
      label: t('form.field.log_orbital_period'),
      placeholder: '2.46',
    },
    {
      name: 'period_mass_interaction',
      label: t('form.field.period_mass_interaction'),
      placeholder: '281.6',
    },
    {
      name: 'stellar_teff_bin',
      label: t('form.field.stellar_teff_bin'),
      placeholder: '5518',
    },
  ];
}

export function ScientistForm() {
  const { t } = useLanguage();
  const [detection, setDetection] = useState<DetectionResult | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [nasaVideoLink, setNasaVideoLink] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(
    null
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ScientistFormValues>({
    resolver: zodResolver(scientistFormSchema),
    defaultValues,
  });

  const formValues = watch();
  const orbitalPeriod = String(formValues.orbital_period_days);
  const transitDepth = String(formValues.transit_depth);
  const stellarTemperature = String(formValues.stellar_teff_k);

  const hasDetectedExoplanet = detection?.isExoplanet ?? false;

  const exoplanetMetrics = useMemo<PlanetMetric[]>(() => {
    if (!detection?.prediction) {
      return [];
    }

    const planet = detection.prediction.planet;

    return [
      { title: t('metrics.classification'), value: detection.label },
      {
        title: t('metrics.radius'),
        value: planet.radius_re !== null ? planet.radius_re.toFixed(2) : '--',
      },
      {
        title: t('metrics.mass'),
        value: planet.mass_me !== null ? planet.mass_me.toFixed(2) : '--',
      },
      {
        title: t('metrics.equilibrium_temp'),
        value:
          planet.equilibrium_temp_k !== null
            ? `${planet.equilibrium_temp_k.toFixed(0)} K`
            : '--',
      },
      {
        title: t('metrics.insolation'),
        value:
          planet.insolation_earth !== null
            ? planet.insolation_earth.toFixed(2)
            : '--',
      },
    ];
  }, [detection, t]);

  function handleReset() {
    reset(defaultValues);
    setDetection(null);
    setApiError(null);
    setNasaVideoLink(null);
    setDashboardData(null);
  }

  const formatLinkToNasaVideo = (planetName: string) => {
    const formattedPlanetName = planetName.replace(' ', '_');
    return `https://eyes.nasa.gov/apps/exo/#/planet/${formattedPlanetName}`;
  };

  async function onSubmit(values: ScientistFormValues): Promise<void> {
    setApiError(null);
    setDetection(null);
    setNasaVideoLink(null);
    setDashboardData(null);

    try {
      // 1. Primeiro: Fazer a predição
      const predictResponse: AxiosResponse<ExoplanetPredictionResponse> =
        await instance.post('/predict/scientist', values);

      const compareResponse: AxiosResponse<ExoplanetPredictionComparisonResponse> =
        await instance.post('/compare/scientist', values);

      if (predictResponse.data.prediction_id) {
        const dashboardResponse: AxiosResponse<DashboardResponse> =
          await instance.get(
            `/dashboard/scientific/${predictResponse.data.prediction_id}`
          );

        const data = predictResponse.data;
        setDetection(mapPredictionToDetection(data));

        const compareData = compareResponse.data;
        setNasaVideoLink(
          formatLinkToNasaVideo(compareData.similar_exoplanets[0].planet_name)
        );

        setDashboardData(dashboardResponse.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        setApiError(message);
      } else {
        setApiError('An unknown error occurred while contacting the API.');
      }
    }
  }

  return (
    <section className="bg-black w-full px-4 text-foreground">
      <AnimatePresence mode="wait">
        {isSubmitting && <LoadingScreen key="loading" className="h-screen" />}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl">
        {!hasDetectedExoplanet && (
          <>
            {/* Header */}
            <header className="mb-8 space-y-4 text-center">
              <p className="text-[10px] xl:text-xs 2xl:text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
                {t('form.scientist.subtitle')}
              </p>
              <h2 className="text-3xl xl:text-3xl 2xl:text-3xl font-semibold tracking-tight">
                {t('form.scientist.title')}
              </h2>
              <p className="mx-auto max-w-3xl text-sm xl:text-sm 2xl:text-sm text-muted-foreground">
                {t('form.scientist.description')}
              </p>
            </header>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10 lg:p-12 shadow-2xl backdrop-blur"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
                {getFieldConfigs(t).map(field => {
                  const fieldError = errors[field.name];

                  return (
                    <div
                      key={field.name as string}
                      className="flex flex-col gap-2"
                    >
                      <Label
                        htmlFor={field.name as string}
                        className="text-[9px] xl:text-[10px] 2xl:text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-200 min-h-[1.75rem] xl:min-h-[1.75rem] flex items-end"
                      >
                        {field.label}
                      </Label>
                      <Input
                        id={field.name as string}
                        type="number"
                        step="any"
                        placeholder={field.placeholder}
                        className="rounded-2xl border border-white/20 bg-white/5 px-3 xl:px-3 py-1.5 xl:py-2 text-xs xl:text-xs 2xl:text-xs text-foreground transition focus:border-cyan-300 focus:bg-white/10"
                        {...register(field.name, { valueAsNumber: true })}
                      />
                      {fieldError ? (
                        <span className="text-[9px] xl:text-[10px] 2xl:text-[10px] text-red-400">
                          {fieldError.message}
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col gap-4">
                {apiError ? (
                  <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 xl:p-3 text-xs xl:text-xs 2xl:text-xs text-red-200">
                    {apiError}
                  </div>
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center rounded-full border border-cyan-400/60 px-6 xl:px-6 py-2.5 xl:py-2.5 text-xs xl:text-xs 2xl:text-xs font-semibold uppercase tracking-[0.32em] text-cyan-100 transition hover:border-cyan-200 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting
                      ? t('form.button.submitting')
                      : t('form.button.submit')}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs xl:text-xs 2xl:text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground transition hover:text-white"
                  >
                    {t('form.button.clear')}
                  </button>
                </div>
              </div>
            </form>
          </>
        )}

        {/* NotPlanetCandidateCard Modal */}
        <NotPlanetCandidateCard
          probabilities={
            detection?.probabilities || { rf: null, hgb: null, ensemble: null }
          }
          labels={detection?.labels || { rf: null, hgb: null, ensemble: null }}
          onReset={handleReset}
          isOpen={!!detection && !hasDetectedExoplanet}
        />

        {/* Results Section */}
        {detection && hasDetectedExoplanet && (
          <div className="space-y-8">
            <>
              <PlanetDisplay
                hasDetectedExoplanet={hasDetectedExoplanet}
                detection={detection}
                exoplanetMetrics={exoplanetMetrics}
                stellarTemperature={stellarTemperature}
                transitDepth={transitDepth}
                orbitalPeriod={orbitalPeriod}
              />

              {nasaVideoLink ? (
                <div className="w-full flex justify-center p-4 flex-col gap-4 py-20">
                  <header className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300/80">
                      {t('nasa.subtitle')}
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                      {t('nasa.title')}
                    </h2>
                    <p className="mt-3 text-base text-muted-foreground sm:text-lg">
                      {t('nasa.description')}
                    </p>
                  </header>
                  <div className="w-full max-w-7xl rounded-2xl border border-border">
                    <iframe
                      src={nasaVideoLink}
                      width="800"
                      height="500"
                      style={{ border: 'none' }}
                      className="w-full max-w-7xl rounded-2xl border border-red-500"
                    ></iframe>
                  </div>
                </div>
              ) : null}

              {dashboardData ? (
                <div className="w-full p-4 py-20">
                  <DashboardCards dashboardData={dashboardData} />
                </div>
              ) : null}

              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 xl:px-8 py-3 xl:py-4 text-xs xl:text-sm 2xl:text-sm font-semibold uppercase tracking-[0.32em] text-white transition hover:border-cyan-100 hover:text-cyan-100"
                >
                  {t('form.button.reset')}
                </button>
              </div>
            </>
          </div>
        )}
      </div>
    </section>
  );
}

function mapPredictionToDetection(
  prediction: ExoplanetPredictionResponse
): DetectionResult {
  const confidence =
    prediction.prob_ens ?? prediction.prob_hgb ?? prediction.prob_rf ?? 0;
  const label =
    prediction.label_ens ??
    prediction.label_hgb ??
    prediction.label_rf ??
    'No detection';
  const isExoplanet = confidence >= 0.5;

  return {
    isExoplanet,
    label,
    surfaceTexture: isExoplanet ? '/surface-map.jpg' : '/earth-surface-map.jpg',
    confidence,
    probabilities: {
      rf: prediction.prob_rf,
      hgb: prediction.prob_hgb,
      ensemble: prediction.prob_ens,
    },
    labels: {
      rf: prediction.label_rf,
      hgb: prediction.label_hgb,
      ensemble: prediction.label_ens,
    },
    prediction,
  };
}

