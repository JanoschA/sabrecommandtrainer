import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2, Smartphone, X } from "lucide-react";
import type { Language } from "@/lib/i18n";

declare global {
  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
    prompt(): Promise<void>;
  }

  interface Navigator {
    standalone?: boolean;
  }
}

const DISMISS_KEY = "mobile-install-prompt-dismissed";

function isPhoneLikeDevice() {
  if (typeof window === "undefined") return false;

  const userAgent = navigator.userAgent || navigator.vendor || "";
  const isMobileUa =
    /Android|iPhone|iPod|IEMobile|Opera Mini|Mobile/i.test(userAgent) ||
    (/iPad/i.test(userAgent) && window.innerWidth < 1024);
  const hasTouch = navigator.maxTouchPoints > 0;
  const isSmallViewport = window.matchMedia("(max-width: 767px)").matches;

  return isMobileUa && hasTouch && isSmallViewport;
}

function isStandaloneMode() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches ||
    navigator.standalone === true
  );
}

function isIosSafari() {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent;
  const isIos = /iPhone|iPad|iPod/i.test(ua);
  const isWebkit = /WebKit/i.test(ua);
  const isOtherIosBrowser = /CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua);
  return isIos && isWebkit && !isOtherIosBrowser;
}

function isAndroid() {
  if (typeof window === "undefined") return false;
  return /Android/i.test(navigator.userAgent);
}

export function MobileInstallPrompt({ language }: { language: Language }) {
  const [isEligibleDevice, setIsEligibleDevice] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const dismissed = window.localStorage.getItem(DISMISS_KEY) === "1";
    const refreshState = () => {
      setIsEligibleDevice(isPhoneLikeDevice());
      setIsStandalone(isStandaloneMode());
    };

    refreshState();
    setIsDismissed(dismissed);

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
      setIsDismissed(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("resize", refreshState);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("resize", refreshState);
    };
  }, []);

  const copy = useMemo(() => {
    switch (language) {
      case "fr":
        return {
          title: "Ajouter l'app",
          body:
            deferredPrompt !== null
              ? "Installez Sabre Command Trainer sur votre écran d'accueil pour l'ouvrir comme une vraie app."
              : isIosSafari()
                ? "Dans Safari, touchez Partager puis « Sur l'écran d'accueil » pour installer l'app."
                : "Ajoutez l'app depuis le menu du navigateur pour l'avoir sur l'écran d'accueil.",
          action:
            deferredPrompt !== null
              ? "Installer"
              : isIosSafari()
                ? "Ouvrir Safari"
                : "Voir comment faire",
          iosHint: "Safari -> Partager -> Sur l'écran d'accueil",
          androidHint: "Menu du navigateur -> Installer l'app",
        };
      case "en":
        return {
          title: "Add the app",
          body:
            deferredPrompt !== null
              ? "Install Sabre Command Trainer on your home screen so it opens like a real app."
              : isIosSafari()
                ? "In Safari, tap Share and then “Add to Home Screen” to install the app."
                : "Add the app from your browser menu so it lives on your home screen.",
          action:
            deferredPrompt !== null
              ? "Install"
              : isIosSafari()
                ? "Open in Safari"
                : "How to install",
          iosHint: "Safari -> Share -> Add to Home Screen",
          androidHint: "Browser menu -> Install app",
        };
      default:
        return {
          title: "App hinzufügen",
          body:
            deferredPrompt !== null
              ? "Installiere Sabre Command Trainer auf deinem Startbildschirm, damit es sich wie eine echte App öffnet."
              : isIosSafari()
                ? "In Safari auf „Teilen“ und dann „Zum Home-Bildschirm“ tippen, um die App zu installieren."
                : "Füge die App über das Browser-Menü hinzu, damit sie direkt auf deinem Startbildschirm liegt.",
          action:
            deferredPrompt !== null
              ? "Installieren"
              : isIosSafari()
                ? "In Safari öffnen"
                : "So geht's",
          iosHint: "Safari -> Teilen -> Zum Home-Bildschirm",
          androidHint: "Browser-Menü -> App installieren",
        };
    }
  }, [deferredPrompt, language]);

  if (!isEligibleDevice || isStandalone || isDismissed) return null;

  const hint = isIosSafari() ? copy.iosHint : isAndroid() ? copy.androidHint : copy.androidHint;

  const handleDismiss = () => {
    window.localStorage.setItem(DISMISS_KEY, "1");
    setIsDismissed(true);
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    setIsInstalling(true);
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <div className="mt-4 w-full max-w-sm rounded-2xl border border-white/12 bg-white/[0.05] backdrop-blur-md px-4 py-4 text-left shadow-[0_16px_40px_rgba(0,0,0,0.22)] sm:hidden">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
            {deferredPrompt ? <Download className="h-5 w-5" /> : <Smartphone className="h-5 w-5" />}
          </div>
          <div>
            <div className="text-white font-semibold">{copy.title}</div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              PWA
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="rounded-full p-1 text-zinc-500 transition-colors hover:text-white"
          aria-label="Dismiss install prompt"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-zinc-300">{copy.body}</p>

      <div className="mt-3 rounded-xl border border-white/8 bg-black/10 px-3 py-2 text-xs text-zinc-400">
        {isIosSafari() ? <Share2 className="mr-2 inline h-3.5 w-3.5" /> : <Download className="mr-2 inline h-3.5 w-3.5" />}
        <span>{hint}</span>
      </div>

      {deferredPrompt ? (
        <Button
          type="button"
          size="sm"
          onClick={handleInstall}
          disabled={isInstalling}
          className="mt-4 w-full gap-2"
        >
          <Download className="h-4 w-4" />
          {isInstalling ? "..." : copy.action}
        </Button>
      ) : null}
    </div>
  );
}
