import { Link } from "wouter";
import { useTrainingStore } from "@/store/use-training-store";
import { t } from "@/lib/i18n";

export default function Footer() {
  const { language } = useTrainingStore();

  const labels = {
    contact: language === 'de' ? 'Kontakt' : language === 'fr' ? 'Contact' : 'Contact',
    imprint: language === 'de' ? 'Impressum' : language === 'fr' ? 'Mentions légales' : 'Imprint',
    privacy: language === 'de' ? 'Datenschutz' : language === 'fr' ? 'Confidentialité' : 'Privacy Policy',
  };

  return (
    <footer className="w-full border-t border-white/8 bg-background/80 backdrop-blur-sm py-6 px-4 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-500">
        <span className="font-medium text-zinc-600">{t('appTitle', language)}</span>
        <nav className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/kontakt">
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">{labels.contact}</span>
          </Link>
          <Link href="/impressum">
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">{labels.imprint}</span>
          </Link>
          <Link href="/datenschutz">
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">{labels.privacy}</span>
          </Link>
        </nav>
      </div>
    </footer>
  );
}
