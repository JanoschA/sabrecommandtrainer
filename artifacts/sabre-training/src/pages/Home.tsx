import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTrainingStore } from "@/store/use-training-store";
import { t } from "@/lib/i18n";
import {
  History, Play, Swords, ChevronDown,
  ListChecks, Settings2, Mic, BarChart3, BookOpen
} from "lucide-react";
import Footer from "@/components/Footer";
import { KontaktSection } from "@/pages/Kontakt";

const HOW_IT_WORKS = [
  {
    icon: ListChecks,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10 border-cyan-400/20",
    de: { title: "Trainingseinheit wählen", desc: "Wähle aus 6 Trainingstypen – vom Aufwärmen bis zum knallharten Drill Sergeant." },
    en: { title: "Choose your session", desc: "Pick from 6 training types – from a gentle warm-up to the intense Drill Sergeant." },
    fr: { title: "Choisir une séance", desc: "6 types d'entraînement – de l'échauffement au Drill Sergeant intense." },
  },
  {
    icon: Settings2,
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
    de: { title: "Einstellungen anpassen", desc: "Dauer, Schritte (Vor, Zurück, Ausfall…), Pausenzeit und Hintergrundmusik." },
    en: { title: "Customize settings", desc: "Set duration, moves (Advance, Retreat, Lunge…), pause time and background music." },
    fr: { title: "Personnaliser", desc: "Durée, mouvements, temps de pause et musique de fond." },
  },
  {
    icon: Mic,
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
    de: { title: "Drill Sergeant ruft!", desc: "Der Trainer ruft laut die Kommandos. Du reagierst – so schnell wie möglich." },
    en: { title: "Sergeant calls!", desc: "Your coach shouts the commands. You react – as fast as possible." },
    fr: { title: "Le sergent commande!", desc: "Votre coach crie les commandes. Vous réagissez – aussi vite que possible." },
  },
  {
    icon: BarChart3,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
    de: { title: "Auswertung einsehen", desc: "Zeit, Kalorien, Kommandoanzahl und Aufschlüsselung aller Schritte." },
    en: { title: "Review your stats", desc: "Time, calories, command count and a breakdown of every move performed." },
    fr: { title: "Voir les résultats", desc: "Temps, calories, commandes et détail de chaque mouvement." },
  },
];

const MOVE_DEMOS = [
  { id: "vor", emoji: "⬆️", de: "Vor", en: "Advance", fr: "Avancez" },
  { id: "zurueck", emoji: "⬇️", de: "Zurück", en: "Retreat", fr: "Reculez" },
  { id: "ausfall", emoji: "⚡", de: "Ausfall", en: "Lunge", fr: "Fente" },
  { id: "quart", emoji: "🛡️", de: "Quart", en: "Quarte", fr: "Quarte" },
  { id: "riposte", emoji: "🔄", de: "Riposte", en: "Riposte", fr: "Ripostez" },
];

export default function Home() {
  const { language } = useTrainingStore();
  const heroTitleClass =
    language === "de"
      ? "font-sans font-extrabold tracking-tight"
      : "font-display font-bold";

  return (
    <div className="relative w-full bg-background">
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-35 mix-blend-overlay"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}images/hero-fencing.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-background via-transparent to-background" />

        <header className="absolute top-0 w-full p-6 flex justify-end z-20">
          <LanguageToggle />
        </header>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl"
        >
          <div className="mb-6 p-4 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-md">
            <Swords className="w-12 h-12 text-primary" />
          </div>

          <h1 className={`max-w-4xl text-5xl md:text-7xl text-white mb-6 leading-[1.14] md:leading-[1.08] ${heroTitleClass}`}>
            {t('appTitle', language)}
          </h1>

          <p className="text-lg md:text-xl text-zinc-300 mb-12 max-w-xl leading-relaxed">
            {t('appDesc', language)}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/select" className="w-full sm:w-auto">
              <Button size="lg" className="w-full text-lg h-16 group">
                <Play className="w-5 h-5 mr-2 fill-current group-hover:scale-110 transition-transform" />
                {t('start', language)}
              </Button>
            </Link>
            <Link href="/history" className="w-full sm:w-auto">
              <Button size="lg" variant="glass" className="w-full text-lg h-16">
                <History className="w-5 h-5 mr-2" />
                {t('history', language)}
              </Button>
            </Link>
          </div>
          <div className="mt-4">
            <Link href="/guide">
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white gap-2 border border-white/10 hover:border-white/25 backdrop-blur-sm bg-white/3">
                <BookOpen className="w-4 h-4" />
                {t('guideButton' as any, language)}
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-zinc-500 cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => {
            document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-xs tracking-widest uppercase mb-1">
            {language === 'de' ? 'Mehr erfahren' : language === 'fr' ? 'En savoir plus' : 'Learn more'}
          </span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            {language === 'de' ? 'So funktioniert es' : language === 'fr' ? 'Comment ça marche' : 'How it works'}
          </h2>
          <p className="text-zinc-400 text-lg">
            {language === 'de'
              ? 'In 4 Schritten zum perfekten Säbelfecht-Training'
              : language === 'fr'
              ? 'En 4 étapes vers un entraînement parfait'
              : '4 simple steps to your perfect fencing workout'}
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
                <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl ${item.bg}`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold uppercase tracking-widest ${item.color}`}>
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-1">{content.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{content.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── MOVES SHOWCASE ── */}
      <section className="py-16 px-4 bg-white/2 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-3">
              {language === 'de' ? 'Trainierte Bewegungen' : language === 'fr' ? 'Mouvements entraînés' : 'Movements you train'}
            </h2>
            <p className="text-zinc-400">
              {language === 'de'
                ? 'Der Drill Sergeant ruft diese Kommandos – du reagierst sofort!'
                : language === 'fr'
                ? 'Le Drill Sergeant commande – vous réagissez immédiatement!'
                : 'The Drill Sergeant calls these commands – you react instantly!'}
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {MOVE_DEMOS.map((move, i) => (
              <Link key={i} href={`/guide#move-${move.id}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/8 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer w-28 min-w-[7rem]"
                >
                  <span className="text-4xl" role="img" aria-label={move.en}>{move.emoji}</span>
                  <span className="text-white font-bold text-sm text-center">
                    {move[language]}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            {language === 'de' ? 'Bereit für den Drill?' : language === 'fr' ? 'Prêt pour l\'exercice?' : 'Ready for the drill?'}
          </h2>
          <Link href="/select">
            <Button size="lg" className="text-xl h-16 px-12 group">
              <Play className="w-5 h-5 mr-2 fill-current group-hover:scale-110 transition-transform" />
              {t('start', language)}
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <KontaktSection />

      <Footer />
    </div>
  );
}
