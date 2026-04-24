import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTrainingStore } from "@/store/use-training-store";
import { t, tDesc, tMove } from "@/lib/i18n";
import { useSpeech } from "@/hooks/use-speech";
import {
  History,
  Play,
  ChevronDown,
  ListChecks,
  Settings2,
  Mic,
  BarChart3,
  BookOpen,
  ArrowRight,
  Square,
} from "lucide-react";
import Footer from "@/components/Footer";
import { KontaktSection } from "@/pages/Kontakt";

const HOW_IT_WORKS = [
  {
    icon: ListChecks,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10 border-cyan-400/20",
    de: {
      title: "Trainingseinheit wählen",
      desc: "Wähle aus 6 Trainingstypen - vom Aufwärmen bis zum knallharten Drill Sergeant.",
    },
    en: {
      title: "Choose your session",
      desc: "Pick from 6 training types - from a gentle warm-up to the intense Drill Sergeant.",
    },
    fr: {
      title: "Choisir une séance",
      desc: "6 types d'entraînement - de l'échauffement au Drill Sergeant intense.",
    },
  },
  {
    icon: Settings2,
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
    de: {
      title: "Einstellungen anpassen",
      desc: "Dauer, Schritte, Pausenzeit und Hintergrundmusik passend für deine Einheit setzen.",
    },
    en: {
      title: "Customize settings",
      desc: "Set duration, movement mix, pauses, and background music for your session.",
    },
    fr: {
      title: "Personnaliser",
      desc: "Réglez la durée, les mouvements, les pauses et la musique de fond.",
    },
  },
  {
    icon: Mic,
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
    de: {
      title: "Kommandos hören",
      desc: "Der Trainer ruft die Kommandos laut und direkt. Du reagierst sofort im passenden Rhythmus.",
    },
    en: {
      title: "Hear the commands",
      desc: "The coach calls the commands clearly and directly. You react in rhythm right away.",
    },
    fr: {
      title: "Écouter les commandes",
      desc: "Le coach annonce les commandes clairement. Vous réagissez tout de suite au bon rythme.",
    },
  },
  {
    icon: BarChart3,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
    de: {
      title: "Auswertung einsehen",
      desc: "Zeit, Kalorien, Kommandos und die wichtigsten Bewegungen deiner Einheit im Überblick.",
    },
    en: {
      title: "Review your stats",
      desc: "Time, calories, command count, and your key movements at a glance.",
    },
    fr: {
      title: "Voir les résultats",
      desc: "Temps, calories, commandes et mouvements principaux de votre séance.",
    },
  },
] as const;

function FigureFrame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path
        d="M18 104H102"
        stroke="currentColor"
        strokeOpacity="0.22"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </g>
    </svg>
  );
}

function FigureArrow({
  d,
  opacity = 0.9,
  dash = false,
}: {
  d: string;
  opacity?: number;
  dash?: boolean;
}) {
  return (
    <path
      d={d}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dash ? "4 4" : undefined}
      opacity={opacity}
    />
  );
}

function FigureGhost({ children }: { children: React.ReactNode }) {
  return (
    <g opacity="0.16" strokeWidth="2.2">
      {children}
    </g>
  );
}

function HomeMoveFigure({ moveId }: { moveId: string }) {
  if (moveId === "engarde") {
    return (
      <FigureFrame>
        <circle cx="52" cy="16" r="7" />
        <path d="M52 24L54 58" />
        <path d="M54 38L40 48" />
        <path d="M54 40L82 34" />
        <path d="M54 58L40 80L34 100" />
        <path d="M54 58L70 76L80 100" />
        <path d="M82 34L100 30" />
        <FigureArrow d="M26 102C38 100 48 100 60 100" opacity={0.25} />
        <FigureArrow d="M62 102C72 100 82 100 94 102" opacity={0.25} />
      </FigureFrame>
    );
  }

  if (moveId === "vor") {
    return (
      <FigureFrame>
        <FigureGhost>
          <circle cx="42" cy="16" r="7" />
          <path d="M42 24L44 58" />
          <path d="M44 36L28 46" />
          <path d="M44 38L74 38" />
          <path d="M44 58L34 80L30 100" />
          <path d="M44 58L60 76L66 100" />
        </FigureGhost>
        <circle cx="50" cy="16" r="7" />
        <path d="M50 24L52 58" />
        <path d="M52 36L34 46" />
        <path d="M52 38L86 38" />
        <path d="M52 58L40 78L34 100" />
        <path d="M52 58L72 74L82 100" />
        <FigureArrow d="M24 92C34 84 42 82 50 82" opacity={0.45} dash />
        <FigureArrow d="M74 24L92 38L84 40" />
      </FigureFrame>
    );
  }

  if (moveId === "zurueck") {
    return (
      <FigureFrame>
        <FigureGhost>
          <circle cx="56" cy="16" r="7" />
          <path d="M56 24L58 58" />
          <path d="M58 36L40 46" />
          <path d="M58 38L88 38" />
          <path d="M58 58L44 80L40 100" />
          <path d="M58 58L74 78L78 100" />
        </FigureGhost>
        <circle cx="48" cy="16" r="7" />
        <path d="M48 24L50 58" />
        <path d="M50 36L34 48" />
        <path d="M50 38L82 38" />
        <path d="M50 58L34 78L28 100" />
        <path d="M50 58L68 76L74 100" />
        <FigureArrow d="M36 26L18 38L26 40" />
        <FigureArrow d="M60 88C52 84 44 82 34 82" opacity={0.45} dash />
      </FigureFrame>
    );
  }

  return (
    <FigureFrame>
      <FigureGhost>
        <circle cx="44" cy="18" r="7" />
        <path d="M44 26L48 56" />
        <path d="M46 38L28 46" />
        <path d="M46 40L76 38" />
        <path d="M48 56L34 78L30 98" />
        <path d="M48 56L66 74L72 98" />
      </FigureGhost>
      <circle cx="38" cy="16" r="7" />
      <path d="M38 24L46 56" />
      <path d="M42 38L26 48" />
      <path d="M42 40L92 36" />
      <path d="M46 56L26 74L18 100" />
      <path d="M46 56L82 70L96 100" />
      <FigureArrow d="M86 28L104 34L96 40" />
      <FigureArrow d="M56 92C66 84 74 80 84 78" opacity={0.45} dash />
    </FigureFrame>
  );
}

const FEATURED_MOVES = [
  {
    id: "engarde",
    accent: "text-fuchsia-300",
    panel: "border-fuchsia-400/20 bg-fuchsia-400/5",
    de: { title: "En Garde", desc: "Stabil einrichten und sauber bereit sein." },
    en: { title: "En Garde", desc: "Set your stance and be ready to react." },
    fr: { title: "En garde", desc: "Placez-vous proprement et soyez prêt." },
  },
  {
    id: "vor",
    accent: "text-sky-300",
    panel: "border-sky-400/20 bg-sky-400/5",
    de: { title: "Vor", desc: "Kontrolliert Druck nach vorne aufbauen." },
    en: { title: "Advance", desc: "Build forward pressure with control." },
    fr: { title: "Avancez", desc: "Mettez de la pression vers l'avant avec contrôle." },
  },
  {
    id: "zurueck",
    accent: "text-cyan-300",
    panel: "border-cyan-400/20 bg-cyan-400/5",
    de: { title: "Zurück", desc: "Distanz lösen und direkt stabil bleiben." },
    en: { title: "Retreat", desc: "Create space and stay balanced." },
    fr: { title: "Reculez", desc: "Créez de la distance et restez stable." },
  },
  {
    id: "ausfall",
    accent: "text-amber-300",
    panel: "border-amber-400/20 bg-amber-400/5",
    de: { title: "Ausfall", desc: "Explosiv beschleunigen und kontrolliert verlängern." },
    en: { title: "Lunge", desc: "Explode forward and extend with control." },
    fr: { title: "Fente", desc: "Accélérez et allongez l'action avec contrôle." },
  },
] as const;

const DEMO_SEQUENCE: ReadonlyArray<{ moveId: (typeof FEATURED_MOVES)[number]["id"]; fileKey?: string }> = [
  { moveId: "engarde", fileKey: "en_garde" },
  { moveId: "zurueck" },
  { moveId: "vor" },
  { moveId: "ausfall" },
  { moveId: "zurueck" },
  { moveId: "zurueck" },
] as const;

const HERO_BACKGROUND_IMAGE = "background.jpg";

export default function Home() {
  const { language, speechVolume } = useTrainingStore();
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);
  const [isPreparingDemo, setIsPreparingDemo] = useState(false);
  const [activeDemoStepIndex, setActiveDemoStepIndex] = useState<number | null>(null);
  const speechVolumeRef = useRef(speechVolume);
  const demoRunRef = useRef(0);
  const demoAssetsReadyRef = useRef<null | typeof language>(null);
  const { speak, stopAll, resetCancelled, initSpeech, preloadAudio } = useSpeech(language, speechVolumeRef);

  const heroTitleClass =
    language === "de"
      ? "font-sans font-extrabold tracking-tight"
      : "font-display font-bold";

  const heroTitle =
    language === "de" ? (
      <>
        Säbelfechten
        <br />
        Kommandotraining
      </>
    ) : language === "en" ? (
      <>
        Sabre Fencing
        <br />
        Command Training
      </>
    ) : (
      <>
        Escrime au sabre
        <br />
        Entraînement aux commandes
      </>
    );

  const sectionCopy =
    language === "de"
      ? {
          title: "Was dich im Training erwartet",
          subtitle:
            "Kurze Kommandosequenzen, klare Bewegungen und sofortige Reaktion - genau darauf ist die App gebaut.",
          drillEyebrow: "Beispiel-Drill",
          drillTitle: "So kann eine Runde klingen",
          drillDesc:
            "Kommandos kommen nacheinander, ohne langes Erklären. Du hörst, reagierst und bleibst im Rhythmus.",
          playDemo: "Beispiel abspielen",
          stopDemo: "Demo stoppen",
          metrics: [
            { label: "Kommandos", value: "6 Kommandos" },
            { label: "Rhythmus", value: "Direkt" },
            { label: "Ziel", value: "Timing & Reaktion" },
          ],
          guideCta: "Zum Übungsguide",
          finalCta: "Bereit für den Drill?",
        }
      : language === "fr"
        ? {
            title: "Ce qui vous attend",
            subtitle:
              "Des séquences courtes, des consignes claires et une réaction immédiate - c'est exactement le cœur de l'app.",
            drillEyebrow: "Exemple de drill",
            drillTitle: "Une série peut commencer ainsi",
            drillDesc:
              "Les commandes arrivent l'une après l'autre, sans explication inutile. Vous écoutez, réagissez et gardez le rythme.",
            playDemo: "Lancer l'exemple",
            stopDemo: "Arrêter l'exemple",
            metrics: [
              { label: "Commandes", value: "6 Appels" },
              { label: "Rythme", value: "Direct" },
              { label: "But", value: "Timing & Réaction" },
            ],
            guideCta: "Voir le guide",
            finalCta: "Prêt pour le drill ?",
          }
        : {
            title: "What Training Feels Like",
            subtitle:
              "Short command sequences, clear movement cues, and immediate reaction - that is what the app is built for.",
            drillEyebrow: "Sample Drill",
            drillTitle: "A round can sound like this",
            drillDesc:
              "Commands come one after another without long explanations. You hear, react, and stay in rhythm.",
            playDemo: "Play sample",
            stopDemo: "Stop sample",
            metrics: [
              { label: "Commands", value: "6 Calls" },
              { label: "Tempo", value: "Direct" },
              { label: "Goal", value: "Timing & Reaction" },
            ],
            guideCta: "Open Exercise Guide",
            finalCta: "Ready for the drill?",
          };

  const featuredMovesById = Object.fromEntries(
    FEATURED_MOVES.map((move) => [move.id, move]),
  ) as Record<(typeof FEATURED_MOVES)[number]["id"], (typeof FEATURED_MOVES)[number]>;

  const drillSequence = DEMO_SEQUENCE.map((step, index) => ({
    key: `${step.moveId}-${index}`,
    id: step.moveId,
    content: featuredMovesById[step.moveId][language],
  }));
  const guideCardCta =
    language === "de"
      ? "Im Guide ansehen"
      : language === "fr"
        ? "Voir dans le guide"
        : "View in guide";

  useEffect(() => {
    speechVolumeRef.current = speechVolume;
  }, [speechVolume]);

  useEffect(() => {
    demoAssetsReadyRef.current = null;
  }, [language]);

  useEffect(() => {
    return () => stopAll();
  }, [stopAll]);

  const getLeadSentence = (text: string) => {
    const trimmed = text.trim();
    const match = trimmed.match(/^(.+?[.!?])(?:\s|$)/);
    return match ? match[1] : trimmed;
  };

  const preloadDemoAssets = async () => {
    if (demoAssetsReadyRef.current === language) return;

    preloadAudio(language);

    const base = import.meta.env.BASE_URL ?? "/";
    const files = [...new Set(DEMO_SEQUENCE.map((step) => step.fileKey ?? step.moveId))].map(
      (key) => `${base}audio/${language}/training/${key}.mp3`,
    );

    await Promise.all(
      files.map(async (url) => {
        try {
          const res = await fetch(url, { cache: "force-cache" });
          if (!res.ok) return;
          await res.blob();
        } catch {
          // If a fetch fails we still allow the normal speech fallback path.
        }
      }),
    );

    demoAssetsReadyRef.current = language;
  };

  const handlePlayDemo = async () => {
    if (isDemoPlaying) {
      demoRunRef.current += 1;
      stopAll();
      setActiveDemoStepIndex(null);
      setIsDemoPlaying(false);
      return;
    }

    const runId = demoRunRef.current + 1;
    demoRunRef.current = runId;
    setIsPreparingDemo(true);
    setIsDemoPlaying(true);
    resetCancelled();

    await preloadDemoAssets();
    if (demoRunRef.current !== runId) {
      setIsPreparingDemo(false);
      setIsDemoPlaying(false);
      setActiveDemoStepIndex(null);
      return;
    }

    initSpeech();
    setIsPreparingDemo(false);

    try {
      for (const [index, step] of DEMO_SEQUENCE.entries()) {
        if (demoRunRef.current !== runId) return;
        setActiveDemoStepIndex(index);
        await speak(tMove(step.moveId, language), step.fileKey);
        if (demoRunRef.current !== runId) return;
        await new Promise((resolve) => window.setTimeout(resolve, 450));
      }
    } finally {
      if (demoRunRef.current === runId) {
        setIsPreparingDemo(false);
        setIsDemoPlaying(false);
        setActiveDemoStepIndex(null);
      }
    }
  };

  return (
    <div className="relative w-full bg-background">
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-78"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}images/${HERO_BACKGROUND_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "64% center",
          }}
        />
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-screen">
          <div className="absolute right-[12%] top-[18%] w-32 md:w-44 text-white/18">
            <HomeMoveFigure moveId="engarde" />
          </div>
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/68 to-background/10" />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-background via-background/28 to-background/76" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_62%_42%,transparent_0%,rgba(8,10,20,0.08)_24%,rgba(8,10,20,0.62)_82%)]" />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(8,10,20,0.1)_0%,rgba(8,10,20,0.24)_32%,rgba(8,10,20,0.58)_100%)]" />

        <header className="absolute top-0 w-full p-4 sm:p-6 flex justify-end z-20">
          <LanguageToggle />
        </header>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-3xl w-full"
        >
          <h1
            className={`max-w-[13rem] sm:max-w-4xl text-[1.72rem] sm:text-5xl md:text-7xl text-white mb-4 sm:mb-6 leading-[1.02] sm:leading-[1.12] md:leading-[1.08] drop-shadow-[0_8px_30px_rgba(0,0,0,0.28)] ${heroTitleClass}`}
          >
            {language === "de" ? (
              <>
                <span className="block sm:hidden">{"S\u00E4belfechten"}</span>
                <span className="block sm:hidden">Kommando-</span>
                <span className="block sm:hidden">training</span>
                <span className="hidden sm:block">{heroTitle}</span>
              </>
            ) : (
              heroTitle
            )}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-zinc-300 mb-8 sm:mb-12 max-w-[22rem] sm:max-w-xl leading-relaxed">
            {t("appDesc", language)}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none sm:w-auto">
            <Link href="/select" className="w-full sm:w-auto">
              <Button size="lg" className="w-full text-base sm:text-lg h-14 sm:h-16 group">
                <Play className="w-5 h-5 mr-2 fill-current group-hover:scale-110 transition-transform" />
                {t("start", language)}
              </Button>
            </Link>
            <Link href="/history" className="w-full sm:w-auto">
              <Button size="lg" variant="glass" className="w-full text-base sm:text-lg h-14 sm:h-16">
                <History className="w-5 h-5 mr-2" />
                {t("history", language)}
              </Button>
            </Link>
          </div>
          <div className="mt-3 sm:mt-4">
            <Link href="/guide">
              <Button
                variant="ghost"
                size="sm"
                className="text-zinc-400 hover:text-white gap-2 border border-white/10 hover:border-white/25 backdrop-blur-sm bg-white/3 text-xs sm:text-sm"
              >
                <BookOpen className="w-4 h-4" />
                {t("guideButton" as any, language)}
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-zinc-500 cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => {
            document
              .getElementById("how-it-works")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[11px] sm:text-xs tracking-[0.22em] uppercase mb-1">
            {language === "de"
              ? "Mehr erfahren"
              : language === "fr"
                ? "En savoir plus"
                : "Learn more"}
          </span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      <section id="how-it-works" className="py-24 px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            {language === "de"
              ? "So funktioniert es"
              : language === "fr"
                ? "Comment ça marche"
                : "How it works"}
          </h2>
          <p className="text-zinc-400 text-lg">
            {language === "de"
              ? "In 4 Schritten zum perfekten Säbelfecht-Training"
              : language === "fr"
                ? "En 4 étapes vers un entraînement parfait"
                : "4 simple steps to your perfect fencing workout"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {HOW_IT_WORKS.map((item, i) => {
            const Icon = item.icon;
            const content = item[language] ?? item.en;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex gap-5 p-6 rounded-2xl border bg-white/3 backdrop-blur-sm ${item.bg}`}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl ${item.bg}`}
                >
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-bold uppercase tracking-widest ${item.color}`}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {content.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {content.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="py-20 px-4 bg-white/2 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              {sectionCopy.title}
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              {sectionCopy.subtitle}
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 md:p-8"
            >
              <div className="flex items-center gap-2 mb-3 text-primary">
                <Mic className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-[0.22em]">
                  {sectionCopy.drillEyebrow}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                {sectionCopy.drillTitle}
              </h3>

              <p className="text-zinc-400 leading-relaxed max-w-xl">
                {sectionCopy.drillDesc}
              </p>

              <div className="mt-6">
                <Button
                  type="button"
                  variant={isDemoPlaying ? "glass" : "default"}
                  size="sm"
                  onClick={handlePlayDemo}
                  disabled={isPreparingDemo}
                  className="gap-2"
                >
                  {isDemoPlaying ? (
                    <Square className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 fill-current" />
                  )}
                  {isPreparingDemo
                    ? "..."
                    : isDemoPlaying
                      ? sectionCopy.stopDemo
                      : sectionCopy.playDemo}
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {drillSequence.map((step, index) => (
                  <div key={step.key} className="flex items-center gap-3">
                    <Link href={`/guide#move-${step.id}`}>
                      <div
                        className={`rounded-2xl border px-4 py-3 min-w-[8.5rem] transition-all cursor-pointer ${
                          activeDemoStepIndex === index
                            ? "border-primary/35 bg-primary/5"
                            : "border-white/10 bg-white/[0.03] hover:border-primary/35 hover:bg-primary/5"
                        }`}
                      >
                        <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-1">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div className={`font-semibold ${activeDemoStepIndex === index ? "text-primary" : "text-white"}`}>
                          {step.content.title}
                        </div>
                      </div>
                    </Link>
                    {index < drillSequence.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-zinc-600 hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mt-8">
                {sectionCopy.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-white/8 bg-black/10 px-4 py-4"
                  >
                    <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-1">
                      {metric.label}
                    </div>
                    <div className="text-white font-semibold">{metric.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link href="/guide">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-zinc-300 hover:text-white gap-2 border border-white/10 hover:border-white/25 backdrop-blur-sm bg-white/3"
                  >
                    <BookOpen className="w-4 h-4" />
                    {sectionCopy.guideCta}
                  </Button>
                </Link>
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {FEATURED_MOVES.map((move, i) => {
                  const content = move[language];
                  const guideLead = getLeadSentence(tDesc(move.id, language));
                  return (
                    <Link key={move.id} href={`/guide#move-${move.id}`}>
                      <motion.div
                      initial={{ opacity: 0, scale: 0.96, y: 18 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      whileHover={{ y: -2 }}
                      className={`h-full rounded-3xl border backdrop-blur-sm p-5 transition-all cursor-pointer hover:border-white/20 ${move.panel}`}
                      >
                        <div className={`w-16 h-16 mb-4 ${move.accent}`}>
                          <HomeMoveFigure moveId={move.id} />
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-2">
                          {content.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-zinc-400">
                          {guideLead}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-zinc-500">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{guideCardCta}</span>
                        </div>
                      </motion.div>
                    </Link>
                  );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            {sectionCopy.finalCta}
          </h2>
          <Link href="/select">
            <Button size="lg" className="text-xl h-16 px-12 group">
              <Play className="w-5 h-5 mr-2 fill-current group-hover:scale-110 transition-transform" />
              {t("start", language)}
            </Button>
          </Link>
        </motion.div>
      </section>

      <KontaktSection />

      <Footer />
    </div>
  );
}
