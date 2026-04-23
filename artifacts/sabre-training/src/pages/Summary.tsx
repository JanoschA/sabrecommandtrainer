import { useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useTrainingStore } from "@/store/use-training-store";
import { t, tMove } from "@/lib/i18n";
import { formatTime } from "@/lib/utils";
import { Trophy, Clock, Flame, Activity, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

/** Ascending major arpeggio using Web Audio API */
function playFanfare(volume: number) {
  try {
    const ctx = new AudioContext();
    // C5 E5 G5 C6 — quick ascending arpeggio
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const s = ctx.currentTime + i * 0.14;
      gain.gain.setValueAtTime(0, s);
      gain.gain.linearRampToValueAtTime(volume * 0.45, s + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, s + 0.55);
      osc.start(s); osc.stop(s + 0.6);
    });
    // Final chord hit
    [523.25, 659.25, 783.99].forEach(freq => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      const s = ctx.currentTime + 0.72;
      gain.gain.setValueAtTime(0, s);
      gain.gain.linearRampToValueAtTime(volume * 0.28, s + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, s + 1.3);
      osc.start(s); osc.stop(s + 1.4);
    });
    setTimeout(() => ctx.close(), 2500);
  } catch (_) {}
}

export default function Summary() {
  const { language, lastSessionStats, selectedTrainingType, speechVolume, addToLocalHistory, resetSettings } = useTrainingStore();
  const [, setLocation] = useLocation();
  const savedRef = useRef(false);

  useEffect(() => {
    if (!lastSessionStats) { setLocation('/'); return; }

    // Auto-save to local device history immediately
    if (!savedRef.current) {
      savedRef.current = true;
      const session = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        trainingType: selectedTrainingType || 'unknown',
        durationSeconds: lastSessionStats.durationSeconds,
        caloriesBurned: lastSessionStats.caloriesBurned,
        commandsCalled: lastSessionStats.commandsCalled,
        language,
        completedAt: new Date().toISOString(),
        moveCounts: lastSessionStats.moveCounts,
      };
      addToLocalHistory(session);
    }

    // Fanfare + confetti
    playFanfare(speechVolume);
    const end = Date.now() + 3500;
    const colors = ['#ff2a2a', '#ffffff', '#cccccc', '#ff6b6b'];
    const frame = () => {
      confetti({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0 }, colors });
      confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []); // eslint-disable-line — run once

  if (!lastSessionStats) return null;

  const statCards = [
    { icon: Clock, label: t('timeTrained', language), val: formatTime(lastSessionStats.durationSeconds), color: "text-blue-400" },
    { icon: Flame, label: t('calories', language), val: `~${lastSessionStats.caloriesBurned}`, color: "text-orange-400" },
    { icon: Activity, label: t('commandsCalled', language), val: lastSessionStats.commandsCalled, color: "text-primary" },
  ];

  const moveBreakdownLabel = language === 'de' ? 'Ausgeführte Bewegungen'
    : language === 'fr' ? 'Mouvements effectués' : 'Moves performed';

  const hasMoveCounts = Object.keys(lastSessionStats.moveCounts).length > 0;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 pt-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/bg-texture.png)`, backgroundSize: 'cover' }} />

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.55 }}
          className="bg-primary/20 p-6 rounded-full border-2 border-primary/50 shadow-[0_0_50px_rgba(255,42,42,0.3)] mb-6"
        >
          <Trophy className="w-16 h-16 text-primary" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-display font-bold mb-10 text-center uppercase tracking-wider">
          {t('summary', language)}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">
          {statCards.map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center">
              <stat.icon className={`w-8 h-8 mb-3 ${stat.color}`} />
              <p className="text-muted-foreground text-sm uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.val}</p>
            </motion.div>
          ))}
        </div>

        {hasMoveCounts && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            className="w-full glass-panel p-6 rounded-2xl mb-10">
            <h3 className="font-display text-xl font-bold mb-4 border-b border-white/10 pb-3">{moveBreakdownLabel}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6">
              {Object.entries(lastSessionStats.moveCounts)
                .filter(([move]) => move !== 'engarde')
                .sort(([, a], [, b]) => b - a)
                .map(([move, count]) => (
                  <div key={move} className="flex justify-between items-center">
                    <span className="text-zinc-300 text-sm font-medium">{tMove(move, language)}</span>
                    <span className="font-bold text-xl text-primary tabular-nums">{count}×</span>
                  </div>
                ))}
            </div>
          </motion.div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:justify-center mb-10">
          <Button size="lg" className="min-w-[220px] h-14 text-lg rounded-2xl"
            onClick={() => { resetSettings(); setLocation('/select'); }}>
            <ArrowRight className="w-5 h-5 mr-2" />
            {t('newTraining', language)}
          </Button>
          <Link href="/">
            <Button variant="ghost" size="lg" className="w-full h-14 text-lg rounded-2xl border border-white/10">
              <Home className="w-5 h-5 mr-2" />
              {language === 'de' ? 'Startseite' : language === 'fr' ? 'Accueil' : 'Home'}
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
