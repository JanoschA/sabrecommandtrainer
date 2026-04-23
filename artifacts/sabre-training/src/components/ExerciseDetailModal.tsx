import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Language, tMove, tDesc, tSteps, tTips, tModalLabel } from "@/lib/i18n";

type Category = 'fencing' | 'warmup' | 'cooldown';

interface Exercise {
  id: string;
  category: Category;
  svgComponent: React.FC;
}

const CATEGORY_CONFIG: Record<Category, { color: string; badge: string; dot: string }> = {
  fencing: {
    color: 'text-primary',
    badge: 'bg-primary/15 text-primary border-primary/25',
    dot: 'bg-primary',
  },
  warmup: {
    color: 'text-orange-400',
    badge: 'bg-orange-400/15 text-orange-400 border-orange-400/25',
    dot: 'bg-orange-400',
  },
  cooldown: {
    color: 'text-teal-400',
    badge: 'bg-teal-400/15 text-teal-400 border-teal-400/25',
    dot: 'bg-teal-400',
  },
};

const CATEGORY_LABELS: Record<Language, Record<Category, string>> = {
  de: { fencing: 'Fechttechnik', warmup: 'Aufwärmen', cooldown: 'Abkühlen' },
  en: { fencing: 'Fencing Technique', warmup: 'Warm-up', cooldown: 'Cool-down' },
  fr: { fencing: "Technique d'escrime", warmup: 'Échauffement', cooldown: 'Récupération' },
};

interface ExerciseDetailModalProps {
  exercise: Exercise | null;
  language: Language;
  onClose: () => void;
}

export function ExerciseDetailModal({ exercise, language, onClose }: ExerciseDetailModalProps) {
  useEffect(() => {
    if (!exercise) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [exercise, onClose]);

  useEffect(() => {
    if (exercise) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [exercise]);

  return (
    <AnimatePresence>
      {exercise && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="relative z-10 w-full sm:max-w-lg max-h-[92dvh] sm:max-h-[85dvh] flex flex-col bg-zinc-900 border border-white/10 rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl"
            role="dialog"
            aria-modal="true"
            onClick={e => e.stopPropagation()}
          >
            {(() => {
              const cfg = CATEGORY_CONFIG[exercise.category];
              const SvgComp = exercise.svgComponent;
              const steps = tSteps(exercise.id, language);
              const tips = tTips(exercise.id, language);

              return (
                <>
                  <div className={`relative flex items-center justify-center bg-zinc-800/60 ${cfg.color}`} style={{ minHeight: 180 }}>
                    <div className="w-32 h-32 my-6">
                      <SvgComp />
                    </div>
                    <button
                      onClick={onClose}
                      aria-label={tModalLabel('close', language)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/8 hover:bg-white/16 text-zinc-400 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="overflow-y-auto flex-1 px-5 py-5 space-y-5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-white font-bold text-2xl leading-tight">
                        {tMove(exercise.id, language)}
                      </h2>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cfg.badge}`}>
                        {CATEGORY_LABELS[language][exercise.category]}
                      </span>
                    </div>

                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {tDesc(exercise.id, language)}
                    </p>

                    {steps.length > 0 && (
                      <div>
                        <h3 className="text-white font-semibold text-base mb-3">
                          {tModalLabel('steps', language)}
                        </h3>
                        <ol className="space-y-2.5">
                          {steps.map((step, i) => (
                            <li key={i} className="flex gap-3">
                              <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${cfg.badge} border`}>
                                {i + 1}
                              </span>
                              <span className="text-zinc-300 text-sm leading-relaxed pt-0.5">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {tips.length > 0 && (
                      <div>
                        <h3 className="text-white font-semibold text-base mb-3">
                          {tModalLabel('tips', language)}
                        </h3>
                        <ul className="space-y-2">
                          {tips.map((tip, i) => (
                            <li key={i} className="flex gap-2.5">
                              <span className={`shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                              <span className="text-zinc-400 text-sm leading-relaxed">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="h-2" />
                  </div>
                </>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
