import { useEffect, useState, useRef, useCallback, MutableRefObject } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useTrainingStore } from "@/store/use-training-store";
import { t, tDesc, tMove } from "@/lib/i18n";
import { formatTime } from "@/lib/utils";
import { useSpeech } from "@/hooks/use-speech";
import { useMusic } from "@/hooks/use-music";
import { TRAINING_CONFIGS, WARMUP_EXERCISE_LIST, COOLDOWN_EXERCISE_LIST, PHASE_BOUNDARIES, MOVE_DISPLACEMENT, SPACE_STEP_LIMITS } from "@/lib/training-config";
import { Square, Activity, Volume2, VolumeX, Pause, Play, BookOpen, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { EXERCISES } from "@/pages/Guide";

type Phase = 'warmup' | 'main' | 'cooldown';

function getPhase(elapsed: number, total: number): Phase {
  const frac = total > 0 ? elapsed / total : 0;
  if (frac < PHASE_BOUNDARIES.warmupEnd) return 'warmup';
  if (frac < PHASE_BOUNDARIES.mainEnd) return 'main';
  return 'cooldown';
}

const PHASE_COLORS: Record<Phase, string> = {
  warmup: 'text-orange-400',
  main: 'text-primary',
  cooldown: 'text-teal-400',
};

const HELP_COPY = {
  de: {
    badge: "Technikhilfe",
    currentMove: "Aktuelle Übung",
    quickTip: "Kurz erklärt",
    openGuide: "Im Guide öffnen",
    pauseHint: "Das Training bleibt pausiert, bis du wieder auf Weiter gehst.",
    ariaOpen: "Hilfe zur aktuellen Übung öffnen",
    ariaClose: "Technikhilfe schließen",
  },
  en: {
    badge: "Move Help",
    currentMove: "Current move",
    quickTip: "Quick cue",
    openGuide: "Open guide",
    pauseHint: "Training stays paused until you resume.",
    ariaOpen: "Open help for the current move",
    ariaClose: "Close move help",
  },
  fr: {
    badge: "Aide mouvement",
    currentMove: "Mouvement actuel",
    quickTip: "Repère rapide",
    openGuide: "Ouvrir le guide",
    pauseHint: "L'entraînement reste en pause jusqu'à la reprise.",
    ariaOpen: "Ouvrir l'aide du mouvement actuel",
    ariaClose: "Fermer l'aide du mouvement",
  },
} as const;

function getLeadSentence(text: string) {
  const [firstSentence] = text.split(/(?<=[.!?])\s+/);
  return firstSentence ?? text;
}

function getHelpAccent(moveId: string | null) {
  if (!moveId) {
    return {
      border: "border-primary/25",
      glow: "shadow-[0_20px_60px_rgba(255,35,94,0.18)]",
      badge: "bg-primary/15 text-primary border-primary/25",
      icon: "bg-primary/15 text-primary border-primary/25",
    };
  }

  if (moveId.startsWith("w_")) {
    return {
      border: "border-orange-400/25",
      glow: "shadow-[0_20px_60px_rgba(251,146,60,0.16)]",
      badge: "bg-orange-400/15 text-orange-300 border-orange-400/25",
      icon: "bg-orange-400/12 text-orange-300 border-orange-400/25",
    };
  }

  if (moveId.startsWith("c_")) {
    return {
      border: "border-teal-400/25",
      glow: "shadow-[0_20px_60px_rgba(45,212,191,0.16)]",
      badge: "bg-teal-400/15 text-teal-300 border-teal-400/25",
      icon: "bg-teal-400/12 text-teal-300 border-teal-400/25",
    };
  }

  return {
    border: "border-primary/25",
    glow: "shadow-[0_20px_60px_rgba(255,35,94,0.18)]",
    badge: "bg-primary/15 text-primary border-primary/25",
    icon: "bg-primary/15 text-primary border-primary/25",
  };
}

export default function ActiveTraining() {
  const [, setLocation] = useLocation();
  const {
    language, durationMinutes, selectedMoves, pauseSeconds,
    warmupPauseSeconds, cooldownPauseSeconds,
    selectedTrainingType, setLastSessionStats,
    musicEnabled, musicVolume, speechVolume, setMusicVolume, setSpeechVolume,
    disabledWarmupExercises, disabledCooldownExercises,
    spaceSize,
  } = useTrainingStore();

  const speechVolumeRef = useRef(speechVolume);
  useEffect(() => { speechVolumeRef.current = speechVolume; }, [speechVolume]);

  const { speak, stopAll, resetCancelled } = useSpeech(language, speechVolumeRef);
  const music = useMusic();

  const totalSeconds = durationMinutes * 60;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const timeLeftRef = useRef(totalSeconds);
  useEffect(() => { timeLeftRef.current = timeLeft; }, [timeLeft]);

  const [currentCommand, setCurrentCommand] = useState<string | null>(null);
  const [currentMoveId, setCurrentMoveId] = useState<string | null>(null);
  const [currentPhase, setCurrentPhase] = useState<Phase>('warmup');
  const [isPaused, setIsPaused] = useState(false);
  const [showPauseDialog, setShowPauseDialog] = useState(false);
  const [showHelpSheet, setShowHelpSheet] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(musicEnabled);

  const activeRef = useRef(true);
  const pausedRef = useRef(false);
  const resumeCallbackRef = useRef<(() => void) | null>(null);
  const commandsCalled = useRef(0);
  const lastMotivationAt = useRef(0);
  const nextMotivationGap = useRef(5);
  const moveCountsRef = useRef<Record<string, number>>({});
  const loopStarted = useRef(false);
  const lastPhaseRef = useRef<Phase | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const warmupIndexRef = useRef(0);
  const cooldownIndexRef = useRef(0);
  const positionRef = useRef(0);
  const historyGuardRef = useRef(false);
  const resumeAfterHelpRef = useRef(false);

  const config = TRAINING_CONFIGS[selectedTrainingType ?? 'complete'] ?? TRAINING_CONFIGS.complete;

  useEffect(() => {
    if (!selectedTrainingType) setLocation('/');
  }, [selectedTrainingType, setLocation]);

  useEffect(() => {
    resetCancelled();
    if (isMusicOn) { music.start(); music.setVolume(musicVolume); }
    return () => { music.stop(); };
  }, []); // eslint-disable-line

  // Countdown timer — pauses when isPaused
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current!); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused]);

  // Update current phase label (phased complete training)
  useEffect(() => {
    if (config.isPhased) {
      const elapsed = totalSeconds - timeLeft;
      setCurrentPhase(getPhase(elapsed, totalSeconds));
    }
  }, [timeLeft, totalSeconds, config.isPhased]);

  // Auto-finish when time runs out
  useEffect(() => {
    if (timeLeft <= 0 && activeRef.current) doFinish();
  }, [timeLeft]); // eslint-disable-line

  const doFinish = useCallback(() => {
    if (!activeRef.current) return;
    activeRef.current = false;
    stopAll();
    music.stop();
    setCurrentCommand(null);

    const durationTrained = totalSeconds - timeLeftRef.current;
    setLastSessionStats({
      durationSeconds: Math.max(durationTrained, 5),
      caloriesBurned: Math.round((Math.max(durationTrained, 5) / 60) * config.caloriesPerMinute),
      commandsCalled: commandsCalled.current,
      moveCounts: moveCountsRef.current,
    });
    setLocation('/summary');
  }, [stopAll, music, totalSeconds, config, setLastSessionStats, setLocation]);

  const doPause = useCallback(() => {
    pausedRef.current = true;
    setIsPaused(true);
    setShowPauseDialog(true);
    window.speechSynthesis.cancel();
    if (isMusicOn) music.stop();
  }, [isMusicOn, music]);

  const doResume = () => {
    pausedRef.current = false;
    setIsPaused(false);
    setShowPauseDialog(false);
    if (isMusicOn) { music.start(); music.setVolume(musicVolume); }
    if (resumeCallbackRef.current) {
      const cb = resumeCallbackRef.current;
      resumeCallbackRef.current = null;
      cb();
    }
  };

  const doPauseRef = useRef(doPause);
  useEffect(() => { doPauseRef.current = doPause; }, [doPause]);

  useEffect(() => {
    const currentUrl = window.location.href;
    window.history.pushState({ trainingGuard: true }, "", currentUrl);

    const handlePopState = () => {
      if (!activeRef.current) return;

      if (historyGuardRef.current) {
        historyGuardRef.current = false;
        return;
      }

      historyGuardRef.current = true;

      if (pausedRef.current) setShowPauseDialog(true);
      else doPauseRef.current();

      window.history.go(1);
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!activeRef.current) return;
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const doStop = () => {
    setShowPauseDialog(false);
    doFinish();
  };

  const openMoveHelp = useCallback(() => {
    if (!currentMoveId) return;
    if (!pausedRef.current) {
      resumeAfterHelpRef.current = true;
      pausedRef.current = true;
      setIsPaused(true);
      window.speechSynthesis.cancel();
      if (isMusicOn) music.stop();
    } else {
      resumeAfterHelpRef.current = false;
    }
    setShowPauseDialog(false);
    setShowHelpSheet(true);
  }, [currentMoveId, isMusicOn, music]);

  const closeMoveHelp = useCallback(() => {
    setShowHelpSheet(false);
    setShowPauseDialog(false);

    if (resumeAfterHelpRef.current) {
      resumeAfterHelpRef.current = false;
      doResume();
    }
  }, [doResume]);

  const openGuideForCurrentMove = useCallback(() => {
    const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
    const target = currentMoveId ? `${basePath}/guide#move-${currentMoveId}` : `${basePath}/guide`;
    window.open(target, "_blank", "noopener,noreferrer");
  }, [currentMoveId]);

  useEffect(() => {
    if (!showHelpSheet) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMoveHelp();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [closeMoveHelp, showHelpSheet]);

  const waitIfPaused = (): Promise<void> => {
    if (!pausedRef.current) return Promise.resolve();
    return new Promise<void>(resolve => { resumeCallbackRef.current = resolve; });
  };

  // ─── Command loop ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (loopStarted.current) return;
    loopStarted.current = true;

    const activeWarmupList = WARMUP_EXERCISE_LIST.filter(e => !disabledWarmupExercises.includes(e));
    const activeCooldownList = COOLDOWN_EXERCISE_LIST.filter(e => !disabledCooldownExercises.includes(e));

    const getNextSequentialMove = (list: string[], indexRef: MutableRefObject<number>): string => {
      const idx = indexRef.current % list.length;
      indexRef.current = idx + 1;
      return list[idx];
    };

    const spaceLimit = SPACE_STEP_LIMITS[spaceSize];

    const filterByPosition = (moves: string[]): string[] => {
      if (spaceLimit === Infinity) return moves;
      const pos = positionRef.current;
      const filtered = moves.filter(move => {
        const displacement = MOVE_DISPLACEMENT[move as keyof typeof MOVE_DISPLACEMENT] ?? 0;
        const newPos = pos + displacement;
        return Math.abs(newPos) <= spaceLimit;
      });
      return filtered.length > 0 ? filtered : moves;
    };

    const getMoves = (): string[] => {
      if (!config.isPhased) {
        // Fixed exercises (warmup/cooldown types) — sequential, filtered
        if (config.fixedExercises && config.fixedExercises.length > 0) {
          const isWarmup = selectedTrainingType === 'warmup';
          const list = isWarmup
            ? (activeWarmupList.length > 0 ? activeWarmupList : WARMUP_EXERCISE_LIST)
            : (activeCooldownList.length > 0 ? activeCooldownList : COOLDOWN_EXERCISE_LIST);
          const indexRef = isWarmup ? warmupIndexRef : cooldownIndexRef;
          return [getNextSequentialMove(list, indexRef)];
        }
        // Regular fencing moves from selection — apply space filtering
        const rawPool = (selectedMoves.length > 0 ? [...selectedMoves] : [...config.defaultMoves]).filter(m => m !== 'engarde');
        const pool = rawPool.length > 0 ? rawPool : config.defaultMoves.filter(m => m !== 'engarde');
        return filterByPosition(pool);
      }
      // Phased: determine by elapsed time
      const elapsed = totalSeconds - timeLeftRef.current;
      const phase = getPhase(elapsed, totalSeconds);
      if (phase === 'warmup') {
        const list = activeWarmupList.length > 0 ? activeWarmupList : WARMUP_EXERCISE_LIST;
        return [getNextSequentialMove(list, warmupIndexRef)];
      }
      if (phase === 'cooldown') {
        const list = activeCooldownList.length > 0 ? activeCooldownList : COOLDOWN_EXERCISE_LIST;
        return [getNextSequentialMove(list, cooldownIndexRef)];
      }
      // Main fencing phase — apply space filtering
      const rawPool = (selectedMoves.length > 0 ? [...selectedMoves] : [...config.defaultMoves]).filter(m => m !== 'engarde');
      const pool = rawPool.length > 0 ? rawPool : config.defaultMoves.filter(m => m !== 'engarde');
      return filterByPosition(pool);
    };

    const getPauseMs = (): number => {
      if (!config.isPhased) {
        if (selectedTrainingType === 'warmup') return warmupPauseSeconds * 1000;
        if (selectedTrainingType === 'cooldown') return cooldownPauseSeconds * 1000;
        return pauseSeconds * 1000;
      }
      const elapsed = totalSeconds - timeLeftRef.current;
      const phase = getPhase(elapsed, totalSeconds);
      if (phase === 'warmup') return warmupPauseSeconds * 1000;
      if (phase === 'cooldown') return cooldownPauseSeconds * 1000;
      return pauseSeconds * 1000;
    };

    const runLoop = async () => {
      await new Promise(r => setTimeout(r, 1000));

      // Start non-warmup/cooldown training types with "En Garde"
      if (activeRef.current && selectedTrainingType !== 'warmup' && selectedTrainingType !== 'cooldown') {
        const enGardeLabel = tMove('engarde', language);
        setCurrentCommand(enGardeLabel);
        setCurrentMoveId('engarde');
        commandsCalled.current += 1;
        moveCountsRef.current['engarde'] = 1;
        await speak(enGardeLabel);
        if (activeRef.current) {
          const chunk = 100;
          let elapsed = 0;
          const pauseMs = pauseSeconds * 1000;
          while (elapsed < pauseMs && activeRef.current) {
            await new Promise(r => setTimeout(r, chunk));
            elapsed += chunk;
            if (pausedRef.current) await waitIfPaused();
          }
        }
      }

      while (activeRef.current) {
        await waitIfPaused();
        if (!activeRef.current) break;

        // ── Phase transition announcement (phased mode only) ──
        if (config.isPhased) {
          const elapsed = totalSeconds - timeLeftRef.current;
          const phase = getPhase(elapsed, totalSeconds);
          if (phase !== lastPhaseRef.current) {
            lastPhaseRef.current = phase;
            const phaseKey = phase === 'warmup' ? 'phase_warmup' : phase === 'main' ? 'phase_main' : 'phase_cooldown';
            const phaseLabel = t(phaseKey as any, language);
            setCurrentCommand(phaseLabel);
            await speak(phaseLabel);
            if (!activeRef.current) break;
            await new Promise(r => setTimeout(r, 800));
            if (!activeRef.current) break;
          }
        }

        const moves = getMoves();
        if (moves.length === 0) {
          await new Promise(r => setTimeout(r, 500));
          continue;
        }

        if (config.isCombination) {
          // ── Coordination: 2-move sequence ──
          const pick = () => moves[Math.floor(Math.random() * moves.length)];
          const move1 = pick();
          let move2 = pick();
          if (moves.length > 1) while (move2 === move1) move2 = pick();
          const loc1 = tMove(move1, language);
          const loc2 = tMove(move2, language);

          setCurrentCommand(`${loc1} → ${loc2}`);
          setCurrentMoveId(move1);
          commandsCalled.current += 2;
          moveCountsRef.current[move1] = (moveCountsRef.current[move1] || 0) + 1;
          moveCountsRef.current[move2] = (moveCountsRef.current[move2] || 0) + 1;

          await speak(loc1);
          if (!activeRef.current) break;
          await new Promise(r => setTimeout(r, 600));
          if (!activeRef.current) break;
          await speak(loc2);
        } else {
          // ── Standard single command ──
          const move = moves[Math.floor(Math.random() * moves.length)];
          const label = tMove(move, language);
          setCurrentCommand(label);
          setCurrentMoveId(move);
          commandsCalled.current += 1;
          moveCountsRef.current[move] = (moveCountsRef.current[move] || 0) + 1;

          // Update position tracking
          const disp = MOVE_DISPLACEMENT[move as keyof typeof MOVE_DISPLACEMENT] ?? 0;
          positionRef.current += disp;

          await speak(label);
          if (!activeRef.current) break;

          // Drill Sergeant motivation: first at 5+ commands, then every 5–10 commands
          if (config.isDrill) {
            if (
              commandsCalled.current >= 5 &&
              commandsCalled.current - lastMotivationAt.current >= nextMotivationGap.current
            ) {
              const m = Math.floor(Math.random() * 6) + 1;
              await speak(t(`motiv_${m}` as any, language), `motiv_${m}`);
              if (!activeRef.current) break;
              lastMotivationAt.current = commandsCalled.current;
              nextMotivationGap.current = Math.floor(Math.random() * 6) + 5;
            }
          }
        }

        // ── Pause between commands (chunked so pausing works) ──
        const pauseMs = getPauseMs();
        const chunk = 100;
        let elapsed = 0;
        while (elapsed < pauseMs && activeRef.current) {
          await new Promise(r => setTimeout(r, chunk));
          elapsed += chunk;
          if (pausedRef.current) await waitIfPaused();
        }
      }
      loopStarted.current = false;
    };

    runLoop();
    return () => { activeRef.current = false; };
  }, []); // eslint-disable-line — run once on mount

  const toggleMusic = () => {
    if (isMusicOn) { music.stop(); setIsMusicOn(false); }
    else { music.start(); music.setVolume(musicVolume); setIsMusicOn(true); }
  };

  const handleMusicVolumeChange = (v: number) => {
    setMusicVolume(v);
    music.setVolume(v);
    if (v > 0 && !isMusicOn) { music.start(); setIsMusicOn(true); }
    if (v === 0) { music.stop(); setIsMusicOn(false); }
  };

  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;
  const helpCopy = HELP_COPY[language];
  const helpAccent = getHelpAccent(currentMoveId);
  const currentMoveDescription = currentMoveId ? getLeadSentence(tDesc(currentMoveId, language)) : "";
  const helpTapHint = language === "de"
    ? "Tippen für Details"
    : language === "fr"
      ? "Touchez pour détails"
      : "Tap for details";
  const currentExercise = currentMoveId ? EXERCISES.find((exercise) => exercise.id === currentMoveId) ?? null : null;
  const CurrentMoveSvg = currentExercise?.svgComponent ?? null;

  const phaseLabel = config.isPhased
    ? (currentPhase === 'warmup'
        ? (language === 'de' ? 'Aufwärmen' : language === 'fr' ? 'Échauffement' : 'Warm-up')
        : currentPhase === 'main'
          ? (language === 'de' ? 'Haupttraining' : language === 'fr' ? 'Entraînement' : 'Main training')
          : (language === 'de' ? 'Abkühlen' : language === 'fr' ? 'Récupération' : 'Cool-down'))
    : null;

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden select-none">
      <motion.div
        className="absolute inset-0 z-0 bg-primary/5 pointer-events-none"
        animate={{ opacity: isPaused ? 0 : [0.05, 0.2, 0.05] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="flex-1 flex flex-col items-center p-4 md:p-6 pb-16 md:pb-20 relative z-10 w-full max-w-4xl mx-auto gap-5">

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "linear" }}
          />
        </div>

        {/* Phase indicator (phased mode) */}
        {config.isPhased && phaseLabel && (
          <motion.div
            key={phaseLabel}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 ${PHASE_COLORS[currentPhase]}`}
          >
            {phaseLabel}
          </motion.div>
        )}

        {/* Timer */}
        <div className="flex flex-col items-center">
          <Activity className={`w-6 h-6 text-primary mb-2 ${isPaused ? '' : 'animate-pulse'}`} />
          <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tight text-white leading-none tabular-nums">
            {formatTime(timeLeft)}
          </h2>
          {isPaused && (
            <span className="text-primary text-sm font-semibold mt-2 tracking-widest uppercase animate-pulse">
              {language === 'de' ? '— Pause —' : '— Pause —'}
            </span>
          )}
        </div>

        {/* Command display */}
        <div className="flex-1 flex items-center justify-center w-full min-h-[160px] relative">
          <AnimatePresence mode="wait">
            {currentCommand ? (
              <motion.div
                key={currentCommand + commandsCalled.current}
                initial={{ scale: 0.55, opacity: 0, y: 12 }}
                animate={{ scale: 1, opacity: isPaused ? 0.35 : 1, y: 0 }}
                exit={{ scale: 1.08, opacity: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 24 }}
                className="text-center px-4"
              >
                <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 uppercase leading-none">
                  {currentCommand}
                </h1>
              </motion.div>
            ) : (
              <motion.p key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl text-muted-foreground">
                {language === 'de' ? 'Bereit...' : language === 'fr' ? 'Prêt...' : 'Ready...'}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {currentMoveId && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            onClick={openMoveHelp}
            aria-label={helpCopy.ariaOpen}
            className={`w-full max-w-sm flex items-start gap-3 px-4 py-4 rounded-2xl bg-zinc-900/88 backdrop-blur-xl border ${helpAccent.border} text-left transition-all hover:bg-zinc-900/96`}
          >
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${helpAccent.icon}`}>
              {CurrentMoveSvg ? (
                <span className="w-8 h-8">
                  <CurrentMoveSvg />
                </span>
              ) : (
                <BookOpen className="w-4.5 h-4.5" />
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-[0.24em] ${helpAccent.badge} border rounded-full px-2 py-1 mb-2`}>
                {helpCopy.badge}
              </span>
              <span className="block text-sm font-semibold text-white">
                {tMove(currentMoveId, language)}
              </span>
                {currentMoveDescription && (
                  <span className="block mt-1.5 text-sm leading-relaxed text-zinc-400">
                    {currentMoveDescription}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-zinc-300">
                  {helpTapHint}
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </span>
            </motion.button>
          )}

        {/* Volume controls */}
        <div className="w-full max-w-sm space-y-3 bg-white/5 rounded-2xl p-4 border border-white/8">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-14 shrink-0">{t('voiceVolume' as any, language)}</span>
            <VolumeX className="w-4 h-4 text-zinc-600 shrink-0" />
            <input type="range" min="0" max="1" step="0.05" value={speechVolume}
              onChange={e => setSpeechVolume(parseFloat(e.target.value))}
              className="flex-1 accent-primary h-1.5 cursor-pointer" />
            <Volume2 className="w-4 h-4 text-zinc-600 shrink-0" />
            <span className="text-xs text-muted-foreground w-8 text-right">{Math.round(speechVolume * 100)}%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-14 shrink-0">{t('musicVolume' as any, language)}</span>
            <button onClick={toggleMusic} className="shrink-0">
              {isMusicOn ? <Volume2 className="w-4 h-4 text-primary" /> : <VolumeX className="w-4 h-4 text-zinc-600" />}
            </button>
            <input type="range" min="0" max="0.5" step="0.01" value={isMusicOn ? musicVolume : 0}
              onChange={e => handleMusicVolumeChange(parseFloat(e.target.value))}
              className="flex-1 accent-primary h-1.5 cursor-pointer" />
            <span className="text-xs text-muted-foreground w-8 text-right">{isMusicOn ? Math.round(musicVolume * 200) : 0}%</span>
          </div>
        </div>

        {/* Pause / Resume button */}
        <div className="w-full max-w-sm pb-4">
          {isPaused ? (
            <Button size="lg" className="w-full h-14 text-lg rounded-full" onClick={doResume}>
              <Play className="w-5 h-5 mr-2 fill-current" />
              {t('resumeTraining' as any, language)}
            </Button>
          ) : (
            <Button variant="outline" size="lg" className="w-full h-14 text-lg rounded-full border-white/20 hover:bg-white/10" onClick={doPause}>
              <Pause className="w-5 h-5 mr-2" />
              {t('pauseTraining' as any, language)}
            </Button>
          )}
        </div>
      </div>

      <Footer />

      {/* Pause / Stop dialog */}
      <AnimatePresence>
        {showPauseDialog && !showHelpSheet && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="w-full max-w-sm bg-[#1a1a2e] border border-white/10 rounded-3xl p-6 space-y-4"
            >
              <h2 className="text-xl font-bold text-center text-white">{t('continueQuestion' as any, language)}</h2>
              <Button size="lg" className="w-full h-14 rounded-2xl" onClick={doResume}>
                <Play className="w-5 h-5 mr-2 fill-current" />
                {t('resumeTraining' as any, language)}
              </Button>
              <Button size="lg" variant="destructive" className="w-full h-14 rounded-2xl" onClick={doStop}>
                <Square className="w-5 h-5 mr-2 fill-current" />
                {t('stopTraining' as any, language)}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHelpSheet && currentMoveId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={closeMoveHelp}
          >
            <motion.div
              initial={{ y: 32, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={`w-full max-w-md rounded-3xl border ${helpAccent.border} bg-[#121622]/95 backdrop-blur-xl ${helpAccent.glow} overflow-hidden`}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-start justify-between gap-4 p-5 border-b border-white/8">
                <div className="flex items-start gap-4">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${helpAccent.icon}`}>
                    {CurrentMoveSvg ? (
                      <span className="w-10 h-10">
                        <CurrentMoveSvg />
                      </span>
                    ) : (
                      <BookOpen className="w-5 h-5" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.24em] ${helpAccent.badge}`}>
                      {helpCopy.currentMove}
                    </span>
                    <h2 className="text-2xl font-bold text-white">
                      {tMove(currentMoveId, language)}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeMoveHelp}
                  aria-label={helpCopy.ariaClose}
                  className="rounded-full p-2 text-zinc-500 hover:bg-white/8 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-5">
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-zinc-500">
                    {helpCopy.quickTip}
                  </p>
                  <p className="text-base leading-relaxed text-zinc-200">
                    {currentMoveDescription}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {helpCopy.pauseHint}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="button"
                    className="flex-1 h-12 rounded-2xl"
                    onClick={openGuideForCurrentMove}
                  >
                    <BookOpen className="w-4.5 h-4.5 mr-2" />
                    {helpCopy.openGuide}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-12 rounded-2xl border-white/15 hover:bg-white/8"
                    onClick={closeMoveHelp}
                  >
                    {t('closeCard' as any, language)}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
