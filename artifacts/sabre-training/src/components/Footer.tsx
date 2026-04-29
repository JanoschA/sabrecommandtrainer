import { ExternalLink, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { useTrainingStore } from "@/store/use-training-store";
import { t } from "@/lib/i18n";

const DISCORD_URL = "https://discord.gg/56H8fQBxZF";
const JSA_FORGE_URL = "https://jsaforge.com";

export default function Footer() {
  const { language } = useTrainingStore();

  const labels = {
    contact: language === "de" ? "Kontakt" : "Contact",
    imprint: language === "de" ? "Impressum" : language === "fr" ? "Mentions legales" : "Imprint",
    privacy: language === "de" ? "Datenschutz" : language === "fr" ? "Confidentialite" : "Privacy Policy",
    operatedBy: language === "de" ? "Betrieben von" : language === "fr" ? "Cree par" : "Built by",
    discord: "Discord",
  };

  return (
    <footer className="mt-auto w-full border-t border-white/8 bg-background/95 px-4 py-6 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-sm text-zinc-500 md:flex-row">
        <div className="text-center md:text-left">
          <span className="block font-semibold text-zinc-400">{t("appTitle", language)}</span>
          <a
            href={JSA_FORGE_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="JSA Forge"
            className="group mt-1 inline-flex items-center justify-center gap-2 text-zinc-500 transition-colors hover:text-zinc-200 md:justify-start"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600 transition-colors group-hover:text-zinc-400">
              {labels.operatedBy}
            </span>
            <span className="font-semibold text-zinc-300 transition-colors group-hover:text-white">
              jsaforge.com
            </span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-[#5865F2]/35 bg-[#5865F2]/10 px-4 font-semibold text-[#B8C0FF] transition-colors hover:border-[#5865F2]/55 hover:bg-[#5865F2]/15 hover:text-white"
          >
            <MessageCircle className="h-4 w-4" />
            {labels.discord}
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/kontakt">
              <span className="cursor-pointer transition-colors hover:text-zinc-300">{labels.contact}</span>
            </Link>
            <Link href="/impressum">
              <span className="cursor-pointer transition-colors hover:text-zinc-300">{labels.imprint}</span>
            </Link>
            <Link href="/datenschutz">
              <span className="cursor-pointer transition-colors hover:text-zinc-300">{labels.privacy}</span>
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
