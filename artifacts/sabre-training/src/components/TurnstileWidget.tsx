import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          language?: string;
          action?: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      remove?: (widgetId: string) => void;
    };
  }
}

const TURNSTILE_SCRIPT_ID = "cf-turnstile-script";
const TURNSTILE_SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let turnstileScriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Turnstile is only available in the browser."));
  }

  if (window.turnstile) {
    return Promise.resolve();
  }

  if (turnstileScriptPromise) {
    return turnstileScriptPromise;
  }

  turnstileScriptPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Failed to load Turnstile.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Turnstile."));
    document.head.appendChild(script);
  }).catch((error) => {
    turnstileScriptPromise = null;
    throw error;
  });

  return turnstileScriptPromise!;
}

interface TurnstileWidgetProps {
  siteKey: string;
  language: "de" | "en" | "fr";
  onTokenChange: (token: string) => void;
  onLoadError?: () => void;
}

export default function TurnstileWidget({
  siteKey,
  language,
  onTokenChange,
  onLoadError,
}: TurnstileWidgetProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const onLoadErrorRef = useRef(onLoadError);
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
  }, [onTokenChange]);

  useEffect(() => {
    onLoadErrorRef.current = onLoadError;
  }, [onLoadError]);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element || isVisible || typeof window === "undefined" || !("IntersectionObserver" in window)) {
      if (!element && !isVisible) return;
      if (!("IntersectionObserver" in window) && !isVisible) {
        setIsVisible(true);
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px 0px",
        threshold: 0.1,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    let cancelled = false;
    setStatus("loading");

    loadTurnstileScript()
      .then(() => {
        if (!cancelled) {
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus("error");
          onLoadErrorRef.current?.();
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isVisible]);

  useEffect(() => {
    if (status !== "ready" || !containerRef.current || !window.turnstile) {
      return;
    }

    onTokenChangeRef.current("");

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: "dark",
      language,
      action: "contact_form",
      callback: (token) => onTokenChangeRef.current(token),
      "expired-callback": () => onTokenChangeRef.current(""),
      "error-callback": () => {
        onTokenChangeRef.current("");
        setStatus("error");
        onLoadErrorRef.current?.();
      },
    });

    return () => {
      if (widgetIdRef.current && window.turnstile?.remove) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, [language, siteKey, status]);

  return (
    <div ref={wrapperRef} className="space-y-3">
      <div className="text-sm font-medium text-zinc-300">
        {language === "de"
          ? "Sicherheitsprüfung"
          : language === "fr"
            ? "Vérification de sécurité"
            : "Security check"}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        {(status === "idle" || status === "loading") && (
          <div className="h-[70px] w-full animate-pulse rounded-lg bg-white/5" />
        )}

        {status === "error" && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-red-300">
            {language === "de"
              ? "Die Sicherheitsprüfung konnte nicht geladen werden."
              : language === "fr"
                ? "La vérification de sécurité n'a pas pu être chargée."
                : "The security check could not be loaded."}
          </div>
        )}

        <div
          ref={containerRef}
          className={status === "ready" ? "min-h-[70px]" : "hidden"}
        />
      </div>
    </div>
  );
}
