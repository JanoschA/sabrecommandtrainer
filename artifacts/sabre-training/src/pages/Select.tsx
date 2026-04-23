import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useTrainingStore } from "@/store/use-training-store";
import { t } from "@/lib/i18n";
import { TRAINING_CONFIGS } from "@/lib/training-config";
import { ChevronLeft, Zap, Target, Thermometer, Wind, GitBranch, Footprints, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";

const TYPE_META = [
  {
    id: 'complete',
    icon: Target,
    color: 'text-blue-400',
    ring: 'border-blue-400/30 hover:border-blue-400/60',
    ringExpanded: 'border-blue-400/70',
    bg: 'bg-blue-400/10',
    btnBg: 'bg-blue-500 hover:bg-blue-400',
    badge: { de: 'Alle Moves', en: 'All moves', fr: 'Tous les mouvements' },
  },
  {
    id: 'drill',
    icon: Zap,
    color: 'text-primary',
    ring: 'border-primary/30 hover:border-primary/60',
    ringExpanded: 'border-primary/70',
    bg: 'bg-primary/10',
    btnBg: 'bg-primary hover:bg-primary/80',
    badge: { de: '⚡ Intensiv', en: '⚡ Intense', fr: '⚡ Intensif' },
  },
  {
    id: 'warmup',
    icon: Thermometer,
    color: 'text-orange-400',
    ring: 'border-orange-400/30 hover:border-orange-400/60',
    ringExpanded: 'border-orange-400/70',
    bg: 'bg-orange-400/10',
    btnBg: 'bg-orange-500 hover:bg-orange-400',
    badge: { de: '3 Moves · Langsam', en: '3 Moves · Slow', fr: '3 Mouvements · Lent' },
  },
  {
    id: 'cooldown',
    icon: Wind,
    color: 'text-teal-400',
    ring: 'border-teal-400/30 hover:border-teal-400/60',
    ringExpanded: 'border-teal-400/70',
    bg: 'bg-teal-400/10',
    btnBg: 'bg-teal-600 hover:bg-teal-500',
    badge: { de: '3 Moves · Sehr langsam', en: '3 Moves · Very slow', fr: '3 Mouvements · Très lent' },
  },
  {
    id: 'coord',
    icon: GitBranch,
    color: 'text-purple-400',
    ring: 'border-purple-400/30 hover:border-purple-400/60',
    ringExpanded: 'border-purple-400/70',
    bg: 'bg-purple-400/10',
    btnBg: 'bg-purple-600 hover:bg-purple-500',
    badge: { de: '2er Kombinationen', en: '2-move combos', fr: 'Combos de 2' },
  },
  {
    id: 'footwork',
    icon: Footprints,
    color: 'text-green-400',
    ring: 'border-green-400/30 hover:border-green-400/60',
    ringExpanded: 'border-green-400/70',
    bg: 'bg-green-400/10',
    btnBg: 'bg-green-600 hover:bg-green-500',
    badge: { de: 'Nur Fußarbeit', en: 'Footwork only', fr: 'Jeu de jambes' },
  },
];

export default function SelectTraining() {
  const { language, setSelectedTrainingType, setSelectedMoves, setPauseSeconds } = useTrainingStore();
  const [, setLocation] = useLocation();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleSelect = (id: string) => {
    setSelectedTrainingType(id);
    const cfg = TRAINING_CONFIGS[id];
    if (cfg) {
      setSelectedMoves([...cfg.defaultMoves]);
      setPauseSeconds(cfg.defaultPauseSeconds);
    }
    setLocation('/settings');
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 pt-20 relative">
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/bg-texture.png)`, backgroundSize: 'cover' }}
      />

      {expandedId !== null && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setExpandedId(null)}
          aria-hidden="true"
        />
      )}

      <div className="max-w-5xl mx-auto relative z-30 pb-16 md:pb-20">
        <header className="mb-10 flex items-center">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-4 rounded-full">
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-3xl font-display font-bold">{t('selectTraining', language)}</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 items-start">
          {TYPE_META.map((meta, i) => {
            const Icon = meta.icon;
            const badge = meta.badge[language] ?? meta.badge.en;
            const isExpanded = expandedId === meta.id;

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                key={meta.id}
                className={cn(
                  "relative rounded-2xl border bg-white/3 backdrop-blur-sm transition-colors duration-200",
                  isExpanded ? meta.ringExpanded : meta.ring,
                  isExpanded ? "bg-white/6" : ""
                )}
              >
                {isExpanded && (
                  <button
                    onClick={() => setExpandedId(null)}
                    aria-label={t('closeCard' as any, language)}
                    className="absolute top-3 right-3 z-10 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleCardClick(meta.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(meta.id); }}
                  className="group w-full text-left p-6 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-2xl"
                >
                  <div className={cn("mb-4 p-3 rounded-xl inline-block border border-white/5", meta.bg)}>
                    <Icon className={cn("w-8 h-8", meta.color)} />
                  </div>
                  <h3 className={cn("text-xl font-display font-semibold mb-1", meta.color)}>
                    {t(`type_${meta.id}` as any, language)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {t(`desc_${meta.id}` as any, language)}
                  </p>
                  <span className={cn(
                    "text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full",
                    meta.bg, meta.color
                  )}>
                    {badge}
                  </span>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0, transition: { duration: 0 } }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className={cn("w-full h-px mb-4 opacity-30", meta.color, "bg-current")} />

                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {t(`longdesc_${meta.id}` as any, language)}
                        </p>

                        <ul className="space-y-2 mb-5">
                          {(['bullet1', 'bullet2', 'bullet3'] as const).map(b => (
                            <li key={b} className="flex items-start gap-2 text-sm text-foreground/80">
                              <CheckCircle2 className={cn("w-4 h-4 mt-0.5 shrink-0", meta.color)} />
                              <span>{t(`${b}_${meta.id}` as any, language)}</span>
                            </li>
                          ))}
                        </ul>

                        <button
                          onClick={() => handleSelect(meta.id)}
                          className={cn(
                            "w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white transition-colors duration-150",
                            meta.btnBg
                          )}
                        >
                          {t('selectTraining', language)}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
