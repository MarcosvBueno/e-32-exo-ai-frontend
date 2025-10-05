'use client';

import { motion } from 'framer-motion';
import type { DashboardResponse } from '@/types/exoplanet';
import { useLanguage } from '@/lib/i18n/language-context';

interface DashboardCardsProps {
  dashboardData: DashboardResponse;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  delay?: number;
}

function MetricCard({ title, value, description, delay = 0 }: MetricCardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      // Converte para porcentagem (multiplica por 100 e adiciona %)
      return `${(val * 100).toFixed(1)}%`;
    }
    return val;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
    >
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
          {title}
        </h3>
        <div className="text-2xl font-bold text-white">
          {formatValue(value)}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function ExoplanetInfoCard({
  title,
  value,
  delay = 0,
}: {
  title: string;
  value: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur"
    >
      <div className="text-center space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-200">
          {title}
        </p>
        <p className="text-lg font-bold text-white">{value}</p>
      </div>
    </motion.div>
  );
}

export function DashboardCards({ dashboardData }: DashboardCardsProps) {
  const { t } = useLanguage();
  const { model_metrics, prediction, explainability } = dashboardData;

  // Dados das métricas do modelo
  const modelMetrics = [
    {
      title: 'ROC AUC',
      value: model_metrics.roc_auc,
      description: t('dashboard.metrics.roc_auc.description'),
    },
    {
      title: 'PR AUC',
      value: model_metrics.pr_auc,
      description: t('dashboard.metrics.pr_auc.description'),
    },
    {
      title: t('dashboard.metrics.recall.title'),
      value: model_metrics.recall,
      description: t('dashboard.metrics.recall.description'),
    },
    {
      title: 'F1-Score',
      value: model_metrics.f1_score,
      description: t('dashboard.metrics.f1_score.description'),
    },
    {
      title: t('dashboard.metrics.accuracy.title'),
      value: model_metrics.accuracy,
      description: t('dashboard.metrics.accuracy.description'),
    },
    {
      title: t('dashboard.metrics.precision.title'),
      value: model_metrics.precision,
      description: t('dashboard.metrics.precision.description'),
    },
  ];

  // Dados do exoplaneta
  const planetData = prediction.planet;
  const starData = prediction.star;
  const exoplanetInfo = [
    {
      title: t('dashboard.planet.radius'),
      value:
        planetData.radius_re !== null
          ? `${planetData.radius_re.toFixed(2)}`
          : '--',
    },
    {
      title: t('dashboard.planet.mass'),
      value:
        planetData.mass_me !== null ? `${planetData.mass_me.toFixed(2)}` : '--',
    },
    {
      title: t('dashboard.planet.stellar_temperature'),
      value:
        starData.teff_k !== null ? `${starData.teff_k.toFixed(0)} K` : '--',
    },
    {
      title: t('dashboard.planet.orbital_period'),
      value:
        planetData.orbital_period_days !== null
          ? `${planetData.orbital_period_days.toFixed(1)} ${t(
              'dashboard.planet.days'
            )}`
          : '--',
    },
    {
      title: t('dashboard.planet.equilibrium_temp'),
      value:
        planetData.equilibrium_temp_k !== null
          ? `${planetData.equilibrium_temp_k.toFixed(0)} K`
          : '--',
    },
    {
      title: t('dashboard.planet.ai_confidence'),
      value: `${(explainability.confidence_score * 100).toFixed(1)}%`,
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Header dos Cards */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center space-y-3"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300/80">
          {t('dashboard.header.subtitle')}
        </p>
        <h2 className="text-2xl xl:text-3xl font-semibold tracking-tight">
          {t('dashboard.header.title')}
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          {t('dashboard.header.description')}
        </p>
      </motion.header>

      {/* Métricas do Modelo */}
      <div className="space-y-4">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-lg font-semibold text-white"
        >
          {t('dashboard.sections.model_performance')}
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modelMetrics.map((metric, index) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              description={metric.description}
              delay={0.1 * (index + 3)}
            />
          ))}
        </div>
      </div>

      {/* Dados do Exoplaneta */}
      <div className="space-y-4">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="text-lg font-semibold text-white"
        >
          {t('dashboard.sections.exoplanet_characteristics')}
        </motion.h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {exoplanetInfo.map((info, index) => (
            <ExoplanetInfoCard
              key={info.title}
              title={info.title}
              value={info.value}
              delay={0.05 * (index + 15)}
            />
          ))}
        </div>
      </div>

      {/* Informações Adicionais */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
        className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6 backdrop-blur"
      >
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            {t('dashboard.sections.analysis_summary')}
          </h4>
          <p className="text-sm text-white leading-relaxed">
            {explainability.overall_summary}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {explainability.key_factors.slice(0, 3).map((factor, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-400/10 text-cyan-200 border border-cyan-400/20"
              >
                {factor}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
