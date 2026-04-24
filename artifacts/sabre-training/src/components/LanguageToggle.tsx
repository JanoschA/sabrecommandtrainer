import { useTrainingStore } from "@/store/use-training-store";
import { Language } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { language, setLanguage } = useTrainingStore();
  
  const langs: {code: Language, label: string}[] = [
    { code: 'de', label: 'DE' },
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
  ];

  return (
    <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/10">
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => setLanguage(l.code)}
          className={cn(
            "px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all min-w-[2.4rem] sm:min-w-[2.75rem]",
            language === l.code 
              ? "bg-primary text-white shadow-md shadow-primary/30" 
              : "text-muted-foreground hover:text-white hover:bg-white/5"
          )}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
