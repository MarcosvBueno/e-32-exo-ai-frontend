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
  import { useLanguage } from '@/lib/i18n/language-context';
  import { NotPlanetCandidateCard } from '../not-planet-candidate-card';

  import { userFormSchema } from './schemas/user-form-schema';
  import {
    DetectionResult,
    ExoplanetPredictionComparisonResponse,
    ExoplanetPredictionResponse,
    PlanetMetric,
  } from '@/types/exoplanet';
  import { PlanetDisplay } from '../planet-display';

  type ExoplanetFormValues = z.infer<typeof userFormSchema>;

  const defaultValues: ExoplanetFormValues = {
    orbital_period_days: 41.69,
    transit_depth_ppm: 0.1,
    planet_radius_re: 2.58,
    planet_mass_me: 22.25,
    stellar_teff_k: 5766.0,
    stellar_radius_rsun: 1.0,
    stellar_mass_msun: 1.0,
  };

  function getFieldConfigs(t: (key: string) => string): Array<{
    name: keyof ExoplanetFormValues;
    label: string;
    placeholder: string;
  }> {
    return [
      {
        name: 'orbital_period_days',
        label: t('form.field.orbital_period'),
        placeholder: '365',
      },
      {
        name: 'transit_depth_ppm',
        label: t('form.field.transit_depth_ppm'),
        placeholder: '1500',
      },
      {
        name: 'planet_radius_re',
        label: t('form.field.planet_radius'),
        placeholder: '1.05',
      },
      {
        name: 'planet_mass_me',
        label: t('form.field.planet_mass'),
        placeholder: '1.00',
      },
      {
        name: 'stellar_teff_k',
        label: t('form.field.stellar_temperature'),
        placeholder: '5778',
      },
      {
        name: 'stellar_radius_rsun',
        label: t('form.field.stellar_radius'),
        placeholder: '1.0',
      },
      {
        name: 'stellar_mass_msun',
        label: t('form.field.stellar_mass'),
        placeholder: '1.0',
      },
    ];
  }

  export function ExoplanetForm() {
    const { t } = useLanguage();
    const [prediction, setPrediction] =
      useState<ExoplanetPredictionResponse | null>(null);
    const [detection, setDetection] = useState<DetectionResult | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const [nasaVideoLink, setNasaVideoLink] = useState<string | null>(null);

    const {
      register,
      handleSubmit,
      reset,
      watch,
      formState: { errors, isSubmitting },
    } = useForm<ExoplanetFormValues>({
      resolver: zodResolver(userFormSchema),
      defaultValues,
    });

    const formValues = watch();
    const orbitalPeriod = String(formValues.orbital_period_days);
    const transitDepth = String(formValues.transit_depth_ppm);

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
      reset();
      setPrediction(null);
      setDetection(null);
      setApiError(null);
      setNasaVideoLink(null);
    }

    const formatLinkToNasaVideo = (planetName: string) => {
      const formattedPlanetName = planetName.replace(/ /g, '_');
      console.log(formattedPlanetName);
      return `https://eyes.nasa.gov/apps/exo/#/planet/${formattedPlanetName}`;
    };

    async function onSubmit(values: ExoplanetFormValues): Promise<void> {
      setApiError(null);
      setPrediction(null);
      setDetection(null);
      setNasaVideoLink(null);

      try {
        // Chamadas com Axios e tipagem AxiosResponse
        const predictResponse: AxiosResponse<ExoplanetPredictionResponse> =
          await axios.post(
            'https://exo-ai-api-dcctg6emdmd4dfd2.canadacentral-01.azurewebsites.net/api/v1/predict/user',
            values
          );

        const compareResponse: AxiosResponse<ExoplanetPredictionComparisonResponse> =
          await axios.post(
            'https://exo-ai-api-dcctg6emdmd4dfd2.canadacentral-01.azurewebsites.net/api/v1/compare/user',
            values
          );

        // Acessar dados tipados através de .data
        const compareData = compareResponse.data;
        setNasaVideoLink(
          formatLinkToNasaVideo(compareData.similar_exoplanets[0].planet_name)
        );

        const data = predictResponse.data;
        setPrediction(data);
        setDetection(mapPredictionToDetection(data));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Tratamento específico de erros do Axios
          const message = error.response?.data?.message || error.message;
          setApiError(message);
        } else {
          setApiError('An unknown error occurred while contacting the API.');
        }
      }
    }

    return (
      <section className="bg-black w-full px-4  text-foreground">
        <AnimatePresence mode="wait">
          {isSubmitting && <LoadingScreen key="loading" className="h-screen" />}
        </AnimatePresence>

        <div className="mx-auto flex w-full  flex-col gap-12 lg:gap-0 lg:flex-row lg:items-center lg:justify-center">
          <div
            className={`${
              !hasDetectedExoplanet &&
              'flex w-full flex-col lg:flex-row items-center justify-center gap-6 lg:max-w-xl '
            }`}
          >
            {hasDetectedExoplanet ? null : (
              <div className="flex w-full flex-col items-center  gap-6 lg:max-w-xl px-4">
                <header className="space-y-3">
                  <p className="text-[10px] xl:text-xs 2xl:text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
                    {t('form.user.subtitle')}
                  </p>
                  <h2 className="text-2xl xl:text-3xl 2xl:text-4xl font-semibold tracking-tight">
                    {t('form.user.title')}
                  </h2>
                  <p className="text-xs xl:text-sm 2xl:text-base text-muted-foreground">
                    {t('form.user.description')}
                  </p>
                </header>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 shadow-2xl backdrop-blur"
                >
                  {getFieldConfigs(t).map(field => {
                    const fieldError = errors[field.name];

                    return (
                      <div
                        key={field.name as string}
                        className="flex flex-col gap-2"
                      >
                        <Label
                          htmlFor={field.name as string}
                          className="text-[10px] xl:text-xs 2xl:text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200 min-h-[2rem] xl:min-h-[2.25rem] flex items-end"
                        >
                          {field.label}
                        </Label>
                        <Input
                          id={field.name as string}
                          type="number"
                          step="any"
                          placeholder={field.placeholder}
                          className="rounded-2xl border border-white/20 bg-white/5 px-3 xl:px-4 py-2 xl:py-3 text-xs xl:text-sm 2xl:text-sm text-foreground transition focus:border-cyan-300 focus:bg-white/10"
                          {...register(field.name, { valueAsNumber: true })}
                        />
                        {fieldError ? (
                          <span className="text-[10px] xl:text-xs 2xl:text-xs text-red-400">
                            {fieldError.message}
                          </span>
                        ) : null}
                      </div>
                    );
                  })}

                  <div className="sm:col-span-2 flex flex-col gap-4">
                    {apiError ? (
                      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 xl:p-4 text-xs xl:text-sm 2xl:text-sm text-red-200">
                        {apiError}
                      </div>
                    ) : null}

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center rounded-full border border-cyan-400/60 px-4 xl:px-6 py-2 xl:py-3 text-[10px] xl:text-xs 2xl:text-xs font-semibold uppercase tracking-[0.32em] text-cyan-100 transition hover:border-cyan-200 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSubmitting
                          ? t('form.button.submitting')
                          : t('form.button.submit')}
                      </button>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="text-[10px] xl:text-xs 2xl:text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground transition hover:text-white"
                      >
                        {t('form.button.clear')}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div
            className={`flex w-full flex-col items-center gap-6 justify-center ${
              !hasDetectedExoplanet && !detection && 'hidden lg:flex'
            }`}
          >
            {/* NotPlanetCandidateCard Modal */}
            <NotPlanetCandidateCard
              probabilities={
                detection?.probabilities || {
                  rf: null,
                  hgb: null,
                  ensemble: null,
                }
              }
              labels={
                detection?.labels || { rf: null, hgb: null, ensemble: null }
              }
              onReset={handleReset}
              isOpen={!!detection && !hasDetectedExoplanet}
            />

            {/* Show PlanetDisplay if it's an exoplanet or no detection yet */}
            {(!detection || hasDetectedExoplanet) && (
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
                  <div className="w-full flex justify-center p-4 flex-col gap-4 items-center">
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

                {hasDetectedExoplanet ? (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 xl:px-6 py-2 xl:py-3 text-[10px] xl:text-xs 2xl:text-xs font-semibold uppercase tracking-[0.32em] text-white transition hover:border-cyan-100 hover:text-cyan-100"
                  >
                    {t('form.button.reset')}
                  </button>
                ) : null}
              </>
            )}
          </div>
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
