import { useEffect, useState } from "react";
import { Link } from "wouter";
import { AlertCircle, CheckCircle, ChevronLeft, Mail, Send } from "lucide-react";
import TurnstileWidget from "@/components/TurnstileWidget";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useTrainingStore } from "@/store/use-training-store";

const DISCORD_URL = "https://discord.gg/56H8fQBxZF";

interface ContactConfigResponse {
  configured?: boolean;
  turnstileSiteKey?: string | null;
}

function KontaktForm({ apiBase }: { apiBase: string }) {
  const { language } = useTrainingStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileSiteKey, setTurnstileSiteKey] = useState<string | null>(null);
  const [turnstileResetCounter, setTurnstileResetCounter] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());

  useEffect(() => {
    fetch(`${apiBase}/contact/config`)
      .then((response) => response.json())
      .then((data: ContactConfigResponse) => {
        setIsConfigured(Boolean(data.configured));
        setTurnstileSiteKey(
          typeof data.turnstileSiteKey === "string" && data.turnstileSiteKey.trim()
            ? data.turnstileSiteKey
            : null,
        );
      })
      .catch(() => {
        setIsConfigured(false);
        setTurnstileSiteKey(null);
      });
  }, [apiBase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    if (!turnstileToken) {
      setStatus("error");
      setErrorMsg(
        language === "de"
          ? "Bitte bestätige die Sicherheitsprüfung."
          : language === "fr"
            ? "Veuillez confirmer la vérification de sécurité."
            : "Please complete the security check.",
      );
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${apiBase}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          turnstileToken,
          website,
          startedAt: formStartedAt,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
        setWebsite("");
        setTurnstileToken("");
        setTurnstileResetCounter((value) => value + 1);
        setFormStartedAt(Date.now());
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (data.fallback) {
        setIsConfigured(false);
        return;
      }

      setStatus("error");
      setErrorMsg(data.error ?? (language === "de" ? "Unbekannter Fehler" : "Unknown error"));

      if (data.turnstile) {
        setTurnstileToken("");
        setTurnstileResetCounter((value) => value + 1);
      }
    } catch (_err) {
      setStatus("error");
      setErrorMsg(
        language === "de"
          ? "Netzwerkfehler - bitte versuche es später erneut."
          : language === "fr"
            ? "Erreur réseau - veuillez réessayer plus tard."
            : "Network error - please try again later.",
      );
    }
  };

  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL ?? "";

  if (isConfigured === null) {
    return <div className="h-72 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]" />;
  }

  if (isConfigured === false) {
    return (
      <div className="glass-panel space-y-4 rounded-2xl border border-white/10 p-6 text-center">
        <Mail className="mx-auto h-10 w-10 text-primary" />
        <p className="text-sm leading-relaxed text-zinc-300">
          {language === "de"
            ? "Das Kontaktformular ist momentan nicht konfiguriert. Bitte schreibe uns direkt eine E-Mail:"
            : language === "fr"
              ? "Le formulaire de contact n'est pas configuré. Veuillez nous envoyer un e-mail directement :"
              : "The contact form is not configured. Please send us an e-mail directly:"}
        </p>
        {contactEmail ? (
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/20 px-4 py-2 font-semibold text-primary transition-colors hover:bg-primary/30"
          >
            <Mail className="h-4 w-4" />
            {contactEmail}
          </a>
        ) : (
          <p className="text-sm italic text-zinc-500">
            {language === "de" ? "E-Mail-Adresse im Impressum" : "Email address in the Impressum"}
          </p>
        )}
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="glass-panel space-y-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-emerald-400" />
        <h3 className="text-xl font-bold text-white">
          {language === "de" ? "Nachricht gesendet!" : language === "fr" ? "Message envoyé !" : "Message sent!"}
        </h3>
        <p className="text-sm text-zinc-400">
          {language === "de"
            ? "Vielen Dank für deine Nachricht. Wir melden uns so bald wie möglich bei dir."
            : language === "fr"
              ? "Merci pour votre message. Nous vous répondrons dans les plus brefs délais."
              : "Thank you for your message. We will get back to you as soon as possible."}
        </p>
        <Button
          variant="ghost"
          onClick={() => {
            setStatus("idle");
            setTurnstileToken("");
            setTurnstileResetCounter((value) => value + 1);
            setFormStartedAt(Date.now());
          }}
          className="mt-2"
        >
          {language === "de"
            ? "Weitere Nachricht senden"
            : language === "fr"
              ? "Envoyer un autre message"
              : "Send another message"}
        </Button>
      </div>
    );
  }

  const inputClass =
    "w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white transition-all placeholder-zinc-500 focus:bg-white/8 focus:border-primary/60 focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-400">
          {language === "de" ? "Name" : "Name"} <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          required
          maxLength={200}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={language === "de" ? "Dein Name" : language === "fr" ? "Votre nom" : "Your name"}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-400">
          E-Mail <span className="text-primary">*</span>
        </label>
        <input
          type="email"
          required
          maxLength={300}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={language === "de" ? "deine@email.de" : language === "fr" ? "votre@email.fr" : "your@email.com"}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-400">
          {language === "de" ? "Nachricht" : "Message"} <span className="text-primary">*</span>
        </label>
        <textarea
          required
          maxLength={5000}
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={language === "de" ? "Deine Nachricht..." : language === "fr" ? "Votre message..." : "Your message..."}
          className={inputClass}
        />
        <p className="mt-1 text-right text-xs text-zinc-600">{message.length}/5000</p>
      </div>

      {turnstileSiteKey ? (
        <TurnstileWidget
          key={`${language}-${turnstileResetCounter}`}
          siteKey={turnstileSiteKey}
          language={language}
          onTokenChange={(token) => {
            setTurnstileToken(token);
            if (token) {
              setErrorMsg("");
              setStatus((current) => (current === "error" ? "idle" : current));
            }
          }}
          onLoadError={() => {
            setTurnstileToken("");
          }}
        />
      ) : (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-red-300">
          {language === "de"
            ? "Die Sicherheitsprüfung ist noch nicht eingerichtet."
            : language === "fr"
              ? "La vérification de sécurité n'est pas encore configurée."
              : "The security check is not configured yet."}
        </div>
      )}

      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-red-300">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            {errorMsg ||
              (language === "de"
                ? "Fehler beim Senden. Bitte versuche es erneut."
                : language === "fr"
                  ? "Erreur lors de l'envoi. Veuillez réessayer."
                  : "Error sending message.")}
          </span>
        </div>
      )}

      <Button
        type="submit"
        disabled={status === "loading" || !turnstileToken}
        className="h-12 w-full text-base"
      >
        {status === "loading" ? (
          <span className="animate-pulse">
            {language === "de" ? "Wird gesendet..." : language === "fr" ? "Envoi..." : "Sending..."}
          </span>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            {language === "de" ? "Nachricht senden" : language === "fr" ? "Envoyer" : "Send message"}
          </>
        )}
      </Button>

      <p className="text-center text-xs text-zinc-500">
        {language === "de"
          ? "Das Formular wird durch Cloudflare Turnstile gegen Missbrauch geschützt."
          : language === "fr"
            ? "Ce formulaire est protégé contre les abus par Cloudflare Turnstile."
            : "This form is protected against abuse by Cloudflare Turnstile."}
      </p>

      <p className="text-center text-xs text-zinc-600">
        {language === "de"
          ? "Deine Daten werden ausschließlich zur Beantwortung deiner Anfrage verwendet."
          : language === "fr"
            ? "Vos données sont utilisées uniquement pour répondre à votre demande."
            : "Your data is used solely to respond to your inquiry."}{" "}
        <Link href="/datenschutz">
          <span className="cursor-pointer underline hover:text-zinc-400">
            {language === "de"
              ? "Datenschutzerklärung"
              : language === "fr"
                ? "Politique de confidentialité"
                : "Privacy Policy"}
          </span>
        </Link>
      </p>
    </form>
  );
}

interface KontaktSectionProps {
  asPage?: boolean;
}

export function KontaktSection({ asPage = false }: KontaktSectionProps) {
  const { language } = useTrainingStore();
  const apiBase = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/api`;
  const discordCopy = {
    title: language === "de" ? "Schneller auf Discord" : language === "fr" ? "Faster on Discord" : "Faster on Discord",
    text:
      language === "de"
        ? "Wenn du Fragen hast, Feedback teilen willst oder Updates mitbekommen moechtest, komm gern direkt in den JSA Forge Discord."
        : language === "fr"
          ? "If you have questions, want to share feedback, or want updates, join the JSA Forge Discord directly."
          : "If you have questions, want to share feedback, or want updates, join the JSA Forge Discord directly.",
    action: language === "de" ? "Discord beitreten" : language === "fr" ? "Join Discord" : "Join Discord",
    secondary:
      language === "de"
        ? "Fuer vertrauliche Themen bleibt das Kontaktformular natuerlich der bessere Weg."
        : language === "fr"
          ? "For private topics, the contact form is still the better path."
          : "For private topics, the contact form is still the better path.",
  };

  return (
    <section className={asPage ? undefined : "border-t border-white/8 px-4 py-16"} id="kontakt">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-2xl font-display font-bold text-white md:text-4xl">
            {language === "de" ? "Kontakt" : "Contact"}
          </h2>
          <p className="text-zinc-400">
            {language === "de"
              ? "Fragen, Feedback oder Anregungen? Schreib uns gerne!"
              : language === "fr"
                ? "Questions, retours ou suggestions? Écrivez-nous!"
              : "Questions, feedback or suggestions? Write to us!"}
          </p>
        </div>
        <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">{discordCopy.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-300">{discordCopy.text}</p>
              <p className="text-xs text-zinc-500">{discordCopy.secondary}</p>
            </div>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl border border-[#5865F2]/35 bg-[#5865F2]/12 px-5 text-sm font-semibold text-[#B8C0FF] transition-colors hover:border-[#5865F2]/55 hover:bg-[#5865F2]/18 hover:text-white"
            >
              {discordCopy.action}
            </a>
          </div>
        </div>
        <KontaktForm apiBase={apiBase} />
      </div>
    </section>
  );
}

export default function KontaktPage() {
  const { language } = useTrainingStore();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 p-4 pt-12 md:p-8">
        <div className="mx-auto max-w-3xl">
          <header className="mb-8 flex items-center">
            <Link href="/">
              <Button variant="ghost" size="icon" className="mr-4 rounded-full">
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </Link>
            <h1 className="text-3xl font-display font-bold text-white">
              {language === "de" ? "Kontakt" : "Contact"}
            </h1>
          </header>
          <KontaktSection asPage />
        </div>
      </div>
      <Footer />
    </div>
  );
}
