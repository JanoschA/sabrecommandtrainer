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
    operatedBy: language === "de" ? "Betrieben von" : language === "fr" ? "Built by" : "Built by",
    discord: "Discord",
  };

  return (
    <footer className="mt-auto w-full border-t border-white/8 bg-background/80 px-4 py-6 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-col gap-5 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <span className="font-medium text-zinc-500">{t("appTitle", language)}</span>
          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <a
              href={JSA_FORGE_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="JSA Forge"
              className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
            >
              <img
                src="/branding/jsa-forge-logo-colored.svg"
                alt="JSA Forge"
                className="h-8 w-auto shrink-0"
              />
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 transition-colors group-hover:text-zinc-300">
                  {labels.operatedBy}
                </span>
                <span className="mt-1 text-sm font-semibold text-zinc-200 transition-colors group-hover:text-white">
                  JSA Forge
                </span>
              </div>
            </a>

            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-[#5865F2]/30 bg-[#5865F2]/10 px-4 py-2 text-sm font-semibold text-[#B8C0FF] transition-colors hover:border-[#5865F2]/50 hover:bg-[#5865F2]/15 hover:text-white"
            >
              {labels.discord}
            </a>
          </div>
        </div>

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
    </footer>
  );
}
