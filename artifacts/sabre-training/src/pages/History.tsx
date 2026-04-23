import { Link } from "wouter";
import { useTrainingStore } from "@/store/use-training-store";
import { t, tMove } from "@/lib/i18n";
import { formatTime } from "@/lib/utils";
import { ChevronLeft, Calendar, Flame, Clock, Trash2, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function History() {
  const { language, localHistory, clearLocalHistory } = useTrainingStore();

  const historyLabel = language === 'de' ? 'Dein Verlauf' : language === 'fr' ? 'Votre historique' : 'Your History';
  const privateLabel = language === 'de' ? 'Nur auf diesem Gerät gespeichert'
    : language === 'fr' ? 'Enregistré uniquement sur cet appareil'
    : 'Stored on this device only';
  const clearLabel = language === 'de' ? 'Verlauf löschen' : language === 'fr' ? 'Effacer' : 'Clear history';
  const confirmLabel = language === 'de' ? 'Verlauf wirklich löschen?' : language === 'fr' ? 'Effacer l\'historique?' : 'Clear history?';

  const handleClear = () => {
    if (window.confirm(confirmLabel)) clearLocalHistory();
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 pt-20 relative">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/bg-texture.png)`, backgroundSize: 'cover' }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="icon" className="mr-4 rounded-full">
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-display font-bold">{historyLabel}</h1>
              <p className="text-xs text-muted-foreground mt-0.5">{privateLabel}</p>
            </div>
          </div>
          {localHistory.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleClear}
              className="text-muted-foreground hover:text-destructive gap-2">
              <Trash2 className="w-4 h-4" />
              {clearLabel}
            </Button>
          )}
        </header>

        {localHistory.length === 0 && (
          <div className="glass-panel p-12 rounded-3xl text-center">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
            <p className="text-xl text-muted-foreground font-medium">{t('noHistory', language)}</p>
            <p className="text-sm text-muted-foreground mt-2 opacity-60">
              {language === 'de' ? 'Absolviere dein erstes Training, um es hier zu sehen.'
                : language === 'fr' ? 'Terminez votre premier entraînement pour le voir ici.'
                : 'Complete your first session to see it here.'}
            </p>
          </div>
        )}

        {localHistory.length > 0 && (
          <div className="space-y-3">
            {localHistory.map((session) => {
              const date = new Date(session.completedAt);
              const dateStr = date.toLocaleDateString(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US', {
                day: '2-digit', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit',
              });
              const topMoves = Object.entries(session.moveCounts)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 4)
                .map(([move]) => tMove(move, language))
                .join(', ');

              return (
                <div key={session.id}
                  className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-white/20 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="bg-primary/20 text-primary px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
                        {t(`type_${session.trainingType}` as any, language)}
                      </span>
                      <span className="text-muted-foreground text-xs">{dateStr}</span>
                    </div>
                    {topMoves && (
                      <p className="text-sm text-zinc-500 truncate">
                        {topMoves}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-5 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="font-bold text-lg tabular-nums">{formatTime(session.durationSeconds)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-orange-400 shrink-0" />
                      <span className="font-bold text-lg tabular-nums">{session.caloriesBurned}</span>
                      <span className="text-xs text-muted-foreground">cal</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-primary shrink-0" />
                      <span className="font-bold text-lg tabular-nums">{session.commandsCalled}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
