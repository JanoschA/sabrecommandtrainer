import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useTrainingStore } from "@/store/use-training-store";
import { t, ALL_MOVES, tMove } from "@/lib/i18n";
import { TRAINING_CONFIGS, WARMUP_EXERCISE_LIST, COOLDOWN_EXERCISE_LIST, SpaceSize } from "@/lib/training-config";
import { ChevronLeft, Play, Clock, Settings2, Zap, Music, Volume2, VolumeX, Mic, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSpeech } from "@/hooks/use-speech";
import { useRef } from "react";
import Footer from "@/components/Footer";

export default function Settings() {
  const {
    language,
    selectedTrainingType,
    durationMinutes, setDurationMinutes,
    selectedMoves, toggleMove, setSelectedMoves,
    pauseSeconds, setPauseSeconds,
    warmupPauseSeconds, setWarmupPauseSeconds,
    cooldownPauseSeconds, setCooldownPauseSeconds,
    musicEnabled, setMusicEnabled, musicVolume, setMusicVolume,
    speechVolume, setSpeechVolume,
    disabledWarmupExercises, disabledCooldownExercises,
    toggleWarmupExercise, toggleCooldownExercise,
    spaceSize, setSpaceSize,
  } = useTrainingStore();

  const [, setLocation] = useLocation();
  const speechVolumeRef = useRef(speechVolume);
  const { initSpeech, preloadAudio } = useSpeech(language, speechVolumeRef);

  if (!selectedTrainingType) { setLocation('/select'); return null; }

  const config = TRAINING_CONFIGS[selectedTrainingType] ?? TRAINING_CONFIGS.complete;
  const hasFixedExercises = !!config.fixedExercises;

  const handleStart = () => { preloadAudio(language); initSpeech(); setLocation('/active'); };

  const durations = [5, 10, 15, 20, 30];
  const pauses = [
    { val: 2, label: t('fast', language) },
    { val: 3, label: t('medium', language) },
    { val: 5, label: t('slow', language) },
    { val: 8, label: language === 'de' ? 'Sehr langsam' : language === 'fr' ? 'Très lent' : 'Very slow' },
  ];

  // For phased training, show all phases' exercises as a preview
  const phasedExercisePreview = config.isPhased
    ? [
        { label: language === 'de' ? 'Aufwärmen (15%)' : language === 'fr' ? 'Échauffement (15%)' : 'Warm-up (15%)', moves: WARMUP_EXERCISE_LIST, isWarmup: true as const, isCooldown: false as const },
        { label: language === 'de' ? 'Fechttechnik (75%)' : language === 'fr' ? 'Technique (75%)' : 'Fencing technique (75%)', moves: config.defaultMoves, isWarmup: false as const, isCooldown: false as const },
        { label: language === 'de' ? 'Abkühlen (10%)' : language === 'fr' ? 'Récupération (10%)' : 'Cool-down (10%)', moves: COOLDOWN_EXERCISE_LIST, isWarmup: false as const, isCooldown: true as const },
      ]
    : null;

  // For fixed-exercise types (warmup/cooldown), show exercises as preview
  const fixedExercisePreview = hasFixedExercises && !config.isPhased ? config.fixedExercises : null;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 pt-20 relative" style={{ paddingBottom: '9rem' }}>
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/bg-texture.png)`, backgroundSize: 'cover' }} />

      <div className="max-w-3xl mx-auto relative z-10">
        <header className="mb-8 flex items-center">
          <Link href="/select">
            <Button variant="ghost" size="icon" className="mr-4 rounded-full">
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-display font-bold">{t('settings', language)}</h1>
            <p className="text-primary font-medium tracking-wider text-sm mt-0.5">
              {t(`type_${selectedTrainingType}` as any, language)}
            </p>
          </div>
        </header>

        <div className="space-y-5">

          {/* Duration */}
          <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="glass-panel p-5 rounded-3xl">
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 mr-2 text-primary" />
              <h2 className="text-lg font-display font-semibold">{t('duration', language)}</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {durations.map(m => (
                <button key={m} onClick={() => setDurationMinutes(m)}
                  className={cn("flex-1 min-w-[3.5rem] py-2.5 rounded-xl font-bold text-sm transition-all border",
                    durationMinutes === m
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                      : "bg-black/40 text-muted-foreground border-white/10 hover:border-white/30 hover:text-white"
                  )}>
                  {m} min
                </button>
              ))}
            </div>
          </motion.section>

          {/* Moves section — conditional based on training type */}
          <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="glass-panel p-5 rounded-3xl">
            <div className="flex items-center mb-4">
              <Settings2 className="w-5 h-5 mr-2 text-primary" />
              <h2 className="text-lg font-display font-semibold">
                {hasFixedExercises
                  ? (language === 'de' ? 'Übungen' : language === 'fr' ? 'Exercices' : 'Exercises')
                  : t('moves', language)}
              </h2>
            </div>

            {/* Phased (Complete Training): show 3 phases as info */}
            {phasedExercisePreview && (
              <div className="space-y-4">
                <div className="flex items-start gap-2 bg-primary/10 rounded-xl p-3 text-sm text-zinc-300">
                  <span>
                    {language === 'de' ? 'Das komplette Training läuft automatisch durch 3 Phasen. Klicke auf Übungen, um sie zu deaktivieren.'
                      : language === 'fr' ? 'L\'entraînement complet passe par 3 phases. Cliquez sur les exercices pour les désactiver.'
                      : 'Complete training runs through 3 phases. Click exercises to disable them.'}
                  </span>
                </div>
                {phasedExercisePreview.map(ph => {
                  const activeCount = ph.isWarmup
                    ? WARMUP_EXERCISE_LIST.filter(e => !disabledWarmupExercises.includes(e)).length
                    : ph.isCooldown
                    ? COOLDOWN_EXERCISE_LIST.filter(e => !disabledCooldownExercises.includes(e)).length
                    : null;
                  return (
                    <div key={ph.label}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{ph.label}</p>
                        {!ph.isWarmup && !ph.isCooldown && (
                          <button
                            onClick={() =>
                              selectedMoves.length === config.defaultMoves.length
                                ? setSelectedMoves([])
                                : setSelectedMoves([...config.defaultMoves])
                            }
                            className="text-xs font-medium text-zinc-400 hover:text-white transition-colors underline underline-offset-2"
                          >
                            {selectedMoves.length === config.defaultMoves.length
                              ? (language === 'de' ? 'Alle abwählen' : language === 'fr' ? 'Tout désélectionner' : 'Deselect all')
                              : (language === 'de' ? 'Alle auswählen' : language === 'fr' ? 'Tout sélectionner' : 'Select all')}
                          </button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {ph.moves.filter(move => move !== 'engarde').map(move => {
                          const isFencing = ALL_MOVES.includes(move as any);
                          const isWarmupEx = ph.isWarmup;
                          const isCooldownEx = ph.isCooldown;
                          const isDisabledWarmup = isWarmupEx && disabledWarmupExercises.includes(move);
                          const isDisabledCooldown = isCooldownEx && disabledCooldownExercises.includes(move);
                          const isActive = isFencing
                            ? selectedMoves.includes(move as any)
                            : isWarmupEx
                            ? !isDisabledWarmup
                            : isCooldownEx
                            ? !isDisabledCooldown
                            : true;
                          const isLastActiveWarmup = isWarmupEx && activeCount === 1 && !isDisabledWarmup;
                          const isLastActiveCooldown = isCooldownEx && activeCount === 1 && !isDisabledCooldown;
                          const canToggle = isFencing || isWarmupEx || isCooldownEx;
                          const handleClick = () => {
                            if (isFencing) return toggleMove(move as any);
                            if (isWarmupEx && !isLastActiveWarmup) return toggleWarmupExercise(move);
                            if (isCooldownEx && !isLastActiveCooldown) return toggleCooldownExercise(move);
                          };
                          return (
                            <button key={move}
                              onClick={canToggle ? handleClick : undefined}
                              title={isLastActiveWarmup || isLastActiveCooldown
                                ? (language === 'de' ? 'Mindestens eine Übung muss aktiv bleiben' : language === 'fr' ? 'Au moins un exercice doit rester actif' : 'At least one exercise must remain active')
                                : undefined}
                              className={cn(
                                "py-1.5 px-3 rounded-lg text-sm font-medium transition-all border",
                                canToggle ? "cursor-pointer" : "cursor-default",
                                isActive
                                  ? (isFencing
                                    ? "bg-white/10 text-white border-primary/50"
                                    : isWarmupEx
                                    ? "bg-orange-500/10 text-orange-200 border-orange-500/30"
                                    : isCooldownEx
                                    ? "bg-teal-500/10 text-teal-200 border-teal-500/30"
                                    : "bg-white/5 text-zinc-400 border-white/5")
                                  : "bg-black/20 text-zinc-600 border-white/5 opacity-50 hover:opacity-70"
                              )}>
                              {tMove(move, language)}
                            </button>
                          );
                        })}
                      </div>
                      {((ph.isWarmup && activeCount === 0) || (ph.isCooldown && activeCount === 0) || (!ph.isWarmup && !ph.isCooldown && selectedMoves.length === 0)) ? (
                        <p className="text-destructive text-xs mt-2 font-medium">
                          {language === 'de' ? 'Mindestens eine Übung wählen!' : language === 'fr' ? 'Sélectionnez au moins un exercice !' : 'Select at least one exercise!'}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Fixed exercises (Aufwärmen / Abkühlen) — toggleable */}
            {fixedExercisePreview && (
              <div>
                <div className="flex items-start gap-2 bg-teal-500/10 rounded-xl p-3 text-sm text-zinc-300 mb-3">
                  <span>
                    {language === 'de' ? 'Klicke auf eine Übung, um sie zu deaktivieren. Deaktivierte Übungen werden übersprungen.'
                      : language === 'fr' ? 'Cliquez sur un exercice pour le désactiver. Les exercices désactivés sont ignorés.'
                      : 'Click an exercise to disable it. Disabled exercises will be skipped.'}
                  </span>
                </div>
                {(() => {
                  const isWarmupType = selectedTrainingType === 'warmup';
                  const disabledSet = isWarmupType ? disabledWarmupExercises : disabledCooldownExercises;
                  const toggleFn = isWarmupType ? toggleWarmupExercise : toggleCooldownExercise;
                  const activeCount = fixedExercisePreview.filter(e => !disabledSet.includes(e)).length;
                  return (
                    <>
                      <div className="flex flex-wrap gap-1.5">
                        {fixedExercisePreview.map(move => {
                          const isActive = !disabledSet.includes(move);
                          const isLast = activeCount === 1 && isActive;
                          return (
                            <button key={move}
                              onClick={() => !isLast && toggleFn(move)}
                              title={isLast
                                ? (language === 'de' ? 'Mindestens eine Übung muss aktiv bleiben' : language === 'fr' ? 'Au moins un exercice doit rester actif' : 'At least one exercise must remain active')
                                : undefined}
                              className={cn(
                                "py-1.5 px-3 rounded-lg text-sm font-medium transition-all border cursor-pointer",
                                isActive
                                  ? (isWarmupType
                                    ? "bg-orange-500/10 text-orange-200 border-orange-500/30"
                                    : "bg-teal-500/10 text-teal-200 border-teal-500/30")
                                  : "bg-black/20 text-zinc-600 border-white/5 opacity-50 hover:opacity-70"
                              )}>
                              {tMove(move, language)}
                            </button>
                          );
                        })}
                      </div>
                      {activeCount === 0 && (
                        <p className="text-destructive text-xs mt-2 font-medium">
                          {language === 'de' ? 'Mindestens eine Übung wählen!' : language === 'fr' ? 'Sélectionnez au moins un exercice !' : 'Select at least one exercise!'}
                        </p>
                      )}
                    </>
                  );
                })()}
              </div>
            )}

            {/* Standard fencing moves selector */}
            {!hasFixedExercises && !phasedExercisePreview && (
              <>
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() =>
                      selectedMoves.length === ALL_MOVES.length
                        ? setSelectedMoves([])
                        : setSelectedMoves([...ALL_MOVES])
                    }
                    className="text-xs font-medium text-zinc-400 hover:text-white transition-colors underline underline-offset-2"
                  >
                    {selectedMoves.length === ALL_MOVES.length
                      ? (language === 'de' ? 'Alle abwählen' : language === 'fr' ? 'Tout désélectionner' : 'Deselect all')
                      : (language === 'de' ? 'Alle auswählen' : language === 'fr' ? 'Tout sélectionner' : 'Select all')}
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {ALL_MOVES.filter(move => move !== 'engarde').map(move => {
                    const isActive = selectedMoves.includes(move);
                    return (
                      <button key={move}
                        onClick={() => toggleMove(move)}
                        className={cn("py-2.5 px-2 rounded-xl text-sm font-semibold transition-all border",
                          isActive
                            ? "bg-white/10 text-white border-primary/50"
                            : "bg-black/20 text-zinc-500 border-white/5 opacity-50 hover:opacity-80"
                        )}>
                        {tMove(move, language)}
                      </button>
                    );
                  })}
                </div>
                {selectedMoves.length === 0 && (
                  <p className="text-destructive text-xs mt-2 font-medium">
                    {language === 'de' ? 'Mindestens eine Bewegung wählen!' : 'Select at least one move!'}
                  </p>
                )}
              </>
            )}
          </motion.section>

          {/* Pace — hidden for warmup/cooldown (fixed) */}
          {!hasFixedExercises && (
            <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="glass-panel p-5 rounded-3xl">
              <div className="flex items-center mb-4">
                <Zap className="w-5 h-5 mr-2 text-primary" />
                <h2 className="text-lg font-display font-semibold">{t('pause', language)}</h2>
              </div>
              <div className="flex gap-2">
                {pauses.map(p => (
                  <button key={p.val} onClick={() => setPauseSeconds(p.val)}
                    className={cn("flex-1 py-2.5 rounded-xl font-bold text-sm transition-all border flex flex-col items-center gap-0.5",
                      pauseSeconds === p.val
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                        : "bg-black/40 text-muted-foreground border-white/10 hover:border-white/30 hover:text-white"
                    )}>
                    <span>{p.label}</span>
                    <span className="text-xs opacity-60 font-normal">{p.val}s</span>
                  </button>
                ))}
              </div>
            </motion.section>
          )}

          {/* Warmup / Cooldown pause sliders */}
          {(hasFixedExercises || config.isPhased) && (
            <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.17 }}
              className="glass-panel p-5 rounded-3xl">
              <div className="flex items-center mb-4">
                <Zap className="w-5 h-5 mr-2 text-primary" />
                <h2 className="text-lg font-display font-semibold">
                  {language === 'de' ? 'Übungszeit' : language === 'fr' ? 'Durée d\'exercice' : 'Exercise Duration'}
                </h2>
              </div>
              <div className="space-y-5">
                {(selectedTrainingType === 'warmup' || config.isPhased) && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-zinc-300">
                        {language === 'de' ? 'Aufwärmen' : language === 'fr' ? 'Échauffement' : 'Warm-up'}
                      </span>
                      <span className="text-sm font-bold text-primary tabular-nums">{warmupPauseSeconds} s</span>
                    </div>
                    <input
                      type="range" min="4" max="20" step="1"
                      value={warmupPauseSeconds}
                      onChange={e => setWarmupPauseSeconds(parseInt(e.target.value))}
                      className="w-full accent-primary h-2 cursor-pointer"
                      style={{ touchAction: 'pan-x' }}
                    />
                    <div className="flex justify-between text-xs text-zinc-600 mt-1">
                      <span>4 s</span>
                      <span>20 s</span>
                    </div>
                  </div>
                )}
                {(selectedTrainingType === 'cooldown' || config.isPhased) && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-zinc-300">
                        {language === 'de' ? 'Abkühlen' : language === 'fr' ? 'Récupération' : 'Cool-down'}
                      </span>
                      <span className="text-sm font-bold text-primary tabular-nums">{cooldownPauseSeconds} s</span>
                    </div>
                    <input
                      type="range" min="4" max="20" step="1"
                      value={cooldownPauseSeconds}
                      onChange={e => setCooldownPauseSeconds(parseInt(e.target.value))}
                      className="w-full accent-primary h-2 cursor-pointer"
                      style={{ touchAction: 'pan-x' }}
                    />
                    <div className="flex justify-between text-xs text-zinc-600 mt-1">
                      <span>4 s</span>
                      <span>20 s</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.section>
          )}

          {/* Available Space — only for direction-based training (no fixedExercises) */}
          {!hasFixedExercises && (
            <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
              className="glass-panel p-5 rounded-3xl">
              <div className="flex items-center mb-4">
                <Ruler className="w-5 h-5 mr-2 text-primary" />
                <h2 className="text-lg font-display font-semibold">{t('spaceSize' as any, language)}</h2>
              </div>
              <div className="flex gap-2">
                {([
                  { key: 'small' as SpaceSize, labelKey: 'spaceSizeSmall', descKey: 'spaceSizeSmallDesc' },
                  { key: 'medium' as SpaceSize, labelKey: 'spaceSizeMedium', descKey: 'spaceSizeMediumDesc' },
                  { key: 'large' as SpaceSize, labelKey: 'spaceSizeLarge', descKey: 'spaceSizeLargeDesc' },
                ] as const).map(({ key, labelKey, descKey }) => (
                  <button key={key} onClick={() => setSpaceSize(key)}
                    className={cn("flex-1 py-2.5 rounded-xl font-bold text-sm transition-all border flex flex-col items-center gap-0.5",
                      spaceSize === key
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                        : "bg-black/40 text-muted-foreground border-white/10 hover:border-white/30 hover:text-white"
                    )}>
                    <span>{t(labelKey as any, language)}</span>
                    <span className="text-xs opacity-60 font-normal">{t(descKey as any, language)}</span>
                  </button>
                ))}
              </div>
            </motion.section>
          )}

          {/* Audio */}
          <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="glass-panel p-5 rounded-3xl space-y-5">
            <div className="flex items-center">
              <Music className="w-5 h-5 mr-2 text-primary" />
              <h2 className="text-lg font-display font-semibold">
                {language === 'de' ? 'Lautstärke' : language === 'fr' ? 'Volume' : 'Volume'}
              </h2>
            </div>

            {/* Speech volume */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Mic className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm text-zinc-300">
                    {language === 'de' ? 'Stimme' : language === 'fr' ? 'Voix' : 'Voice'}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{Math.round(speechVolume * 100)}%</span>
              </div>
              <div className="flex items-center gap-2">
                <VolumeX className="w-4 h-4 text-zinc-600 shrink-0" />
                <div className="flex-1 py-2">
                  <input type="range" min="0" max="1" step="0.05" value={speechVolume}
                    onChange={e => setSpeechVolume(parseFloat(e.target.value))}
                    className="w-full accent-primary h-2 cursor-pointer" style={{ touchAction: 'pan-x' }} />
                </div>
                <Volume2 className="w-4 h-4 text-zinc-600 shrink-0" />
              </div>
            </div>

            {/* Music */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Music className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm text-zinc-300">
                    {language === 'de' ? 'Hintergrundmusik' : language === 'fr' ? 'Musique de fond' : 'Background Music'}
                  </span>
                </div>
                <button onClick={() => setMusicEnabled(!musicEnabled)}
                  className={cn("relative w-14 h-7 rounded-full transition-colors border shrink-0 touch-manipulation",
                    musicEnabled ? "bg-primary border-primary" : "bg-black/40 border-white/10")}
                  style={{ minWidth: '3.5rem', minHeight: '1.75rem' }}>
                  <span className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all",
                    musicEnabled ? "left-8" : "left-1")} />
                </button>
              </div>
              {musicEnabled && (
                <div className="flex items-center gap-2">
                  <VolumeX className="w-4 h-4 text-zinc-600 shrink-0" />
                  <div className="flex-1 py-2">
                    <input type="range" min="0" max="0.5" step="0.01" value={musicVolume}
                      onChange={e => setMusicVolume(parseFloat(e.target.value))}
                      className="w-full accent-primary h-2 cursor-pointer" style={{ touchAction: 'pan-x' }} />
                  </div>
                  <Volume2 className="w-4 h-4 text-zinc-600 shrink-0" />
                  <span className="text-xs text-muted-foreground w-8 text-right">{Math.round(musicVolume * 200)}%</span>
                </div>
              )}
            </div>
          </motion.section>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full px-4 pb-4 pt-8 bg-gradient-to-t from-background to-transparent z-50">
        <div className="max-w-3xl mx-auto">
          <Button size="lg" className="w-full h-14 text-xl rounded-2xl" onClick={handleStart}
            disabled={
              (!hasFixedExercises && !config.isPhased && selectedMoves.length === 0) ||
              (selectedTrainingType === 'warmup' && WARMUP_EXERCISE_LIST.filter(e => !disabledWarmupExercises.includes(e)).length === 0) ||
              (selectedTrainingType === 'cooldown' && COOLDOWN_EXERCISE_LIST.filter(e => !disabledCooldownExercises.includes(e)).length === 0)
            }>
            <Play className="w-6 h-6 mr-2 fill-current" />
            {t('begin', language)}
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
