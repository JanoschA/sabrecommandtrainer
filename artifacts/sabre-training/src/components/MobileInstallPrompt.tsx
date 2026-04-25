import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, Share2, Smartphone } from "lucide-react";
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
  const [isInstalling, setIsInstalling] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const refreshState = () => {
      setIsEligibleDevice(isPhoneLikeDevice());
      setIsStandalone(isStandaloneMode());
    };

    refreshState();

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
      setIsOpen(false);
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
          button: "App installieren",
          title: "Ajouter l'app",
          body:
            deferredPrompt !== null
              ? "Vous pouvez installer Sabre Command Trainer sur votre écran d'accueil et l'ouvrir comme une vraie app."
              : isIosSafari()
                ? "Sur iPhone, ouvrez la page dans Safari puis ajoutez-la à l'écran d'accueil."
                : "Selon le navigateur, l'installation se fait via le menu du navigateur.",
          primary:
            deferredPrompt !== null
              ? "Installer maintenant"
              : isIosSafari()
                ? "Compris"
                : "Compris",
          helper: isIosSafari()
            ? "Safari -> Partager -> Sur l'écran d'accueil"
            : "Menu du navigateur -> Installer l'app",
        };
      case "en":
        return {
          button: "Install app",
          title: "Add the app",
          body:
            deferredPrompt !== null
              ? "You can install Sabre Command Trainer on your home screen so it opens like a proper app."
              : isIosSafari()
                ? "On iPhone, open the site in Safari and then add it to your home screen."
                : "Depending on the browser, installation is available from the browser menu.",
          primary:
            deferredPrompt !== null
              ? "Install now"
              : isIosSafari()
                ? "Got it"
                : "Got it",
          helper: isIosSafari()
            ? "Safari -> Share -> Add to Home Screen"
            : "Browser menu -> Install app",
        };
      default:
        return {
          button: "App installieren",
          title: "App hinzufügen",
          body:
            deferredPrompt !== null
              ? "Du kannst Sabre Command Trainer auf deinen Startbildschirm legen und wie eine echte App öffnen."
              : isIosSafari()
                ? "Auf dem iPhone die Seite in Safari öffnen und dann zum Home-Bildschirm hinzufügen."
                : "Je nach Browser findest du die Installation direkt im Browser-Menü.",
          primary:
            deferredPrompt !== null
              ? "Jetzt installieren"
              : isIosSafari()
                ? "Verstanden"
                : "Verstanden",
          helper: isIosSafari()
            ? "Safari -> Teilen -> Zum Home-Bildschirm"
            : "Browser-Menü -> App installieren",
        };
    }
  }, [deferredPrompt, language]);

  if (!isEligibleDevice || isStandalone) return null;

  const helperIcon = isIosSafari() ? Share2 : isAndroid() ? Download : Smartphone;
  const HelperIcon = helperIcon;

  const handleInstall = async () => {
    if (!deferredPrompt) {
      setIsOpen(false);
      return;
    }

    setIsInstalling(true);
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setDeferredPrompt(null);
        setIsOpen(false);
      }
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <>
      <div className="mt-3 sm:hidden">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="text-zinc-400 hover:text-white gap-2 border border-white/10 hover:border-white/25 backdrop-blur-sm bg-white/3 text-xs"
        >
          <Smartphone className="w-4 h-4" />
          {copy.button}
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-sm rounded-2xl border-white/10 bg-[#111625] text-white p-5">
          <DialogHeader className="text-left">
            <DialogTitle className="flex items-center gap-2 text-white">
              <Smartphone className="h-5 w-5 text-primary" />
              {copy.title}
            </DialogTitle>
            <DialogDescription className="text-zinc-300 leading-relaxed">
              {copy.body}
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-xl border border-white/8 bg-black/15 px-3 py-3 text-sm text-zinc-300">
            <HelperIcon className="mr-2 inline h-4 w-4 text-primary" />
            <span>{copy.helper}</span>
          </div>

          <DialogFooter className="sm:justify-start">
            <Button type="button" size="sm" onClick={handleInstall} disabled={isInstalling} className="w-full sm:w-auto gap-2">
              {deferredPrompt ? <Download className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />}
              {isInstalling ? "..." : copy.primary}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
