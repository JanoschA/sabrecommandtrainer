import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft, Send, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { useTrainingStore } from "@/store/use-training-store";

function KontaktForm({ apiBase }: { apiBase: string }) {
  const { language } = useTrainingStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch(`${apiBase}/contact/config`)
      .then(r => r.json())
      .then(data => setIsConfigured(data.configured))
      .catch(() => setIsConfigured(false));
  }, [apiBase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${apiBase}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const data = await res.json().catch(() => ({}));
        if (data.fallback) {
          setIsConfigured(false);
        } else {
          setStatus("error");
          setErrorMsg(data.error ?? "Unbekannter Fehler");
        }
      }
    } catch (_err) {
      setStatus("error");
      setErrorMsg("Netzwerkfehler – bitte versuche es später erneut.");
    }
  };

  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL ?? "";

  if (isConfigured === false) {
    return (
      <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center space-y-4">
        <Mail className="w-10 h-10 text-primary mx-auto" />
        <p className="text-zinc-300 text-sm leading-relaxed">
          {language === 'de'
            ? 'Das Kontaktformular ist momentan nicht konfiguriert. Bitte schreibe uns direkt eine E-Mail:'
            : language === 'fr'
            ? 'Le formulaire de contact n\'est pas configuré. Veuillez nous envoyer un e-mail directement:'
            : 'The contact form is not configured. Please send us an e-mail directly:'}
        </p>
        {contactEmail ? (
          <a href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 transition-colors font-semibold">
            <Mail className="w-4 h-4" />
            {contactEmail}
          </a>
        ) : (
          <p className="text-zinc-500 text-sm italic">
            {language === 'de' ? 'E-Mail-Adresse im Impressum' : 'Email address in the Impressum'}
          </p>
        )}
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="glass-panel p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 text-center space-y-3">
        <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
        <h3 className="text-xl font-bold text-white">
          {language === 'de' ? 'Nachricht gesendet!' : language === 'fr' ? 'Message envoyé!' : 'Message sent!'}
        </h3>
        <p className="text-zinc-400 text-sm">
          {language === 'de'
            ? 'Vielen Dank für deine Nachricht. Wir melden uns so bald wie möglich bei dir.'
            : language === 'fr'
            ? 'Merci pour votre message. Nous vous répondrons dans les plus brefs délais.'
            : 'Thank you for your message. We will get back to you as soon as possible.'}
        </p>
        <Button variant="ghost" onClick={() => setStatus("idle")} className="mt-2">
          {language === 'de' ? 'Weitere Nachricht senden' : language === 'fr' ? 'Envoyer un autre message' : 'Send another message'}
        </Button>
      </div>
    );
  }

  const inputClass = "w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-primary/60 focus:bg-white/8 transition-all resize-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-1.5">
          {language === 'de' ? 'Name' : 'Name'} <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          required
          maxLength={200}
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={language === 'de' ? 'Dein Name' : language === 'fr' ? 'Votre nom' : 'Your name'}
          className={inputClass}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-1.5">
          E-Mail <span className="text-primary">*</span>
        </label>
        <input
          type="email"
          required
          maxLength={300}
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={language === 'de' ? 'deine@email.de' : language === 'fr' ? 'votre@email.fr' : 'your@email.com'}
          className={inputClass}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-1.5">
          {language === 'de' ? 'Nachricht' : language === 'fr' ? 'Message' : 'Message'} <span className="text-primary">*</span>
        </label>
        <textarea
          required
          maxLength={5000}
          rows={6}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder={language === 'de' ? 'Deine Nachricht...' : language === 'fr' ? 'Votre message...' : 'Your message...'}
          className={inputClass}
        />
        <p className="text-xs text-zinc-600 mt-1 text-right">{message.length}/5000</p>
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-sm text-red-300">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{errorMsg || (language === 'de' ? 'Fehler beim Senden. Bitte versuche es erneut.' : 'Error sending message.')}</span>
        </div>
      )}

      <Button type="submit" disabled={status === "loading"} className="w-full h-12 text-base">
        {status === "loading" ? (
          <span className="animate-pulse">
            {language === 'de' ? 'Wird gesendet...' : language === 'fr' ? 'Envoi...' : 'Sending...'}
          </span>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            {language === 'de' ? 'Nachricht senden' : language === 'fr' ? 'Envoyer' : 'Send message'}
          </>
        )}
      </Button>

      <p className="text-xs text-zinc-600 text-center">
        {language === 'de'
          ? 'Deine Daten werden ausschließlich zur Beantwortung deiner Anfrage verwendet.'
          : language === 'fr'
          ? 'Vos données sont utilisées uniquement pour répondre à votre demande.'
          : 'Your data is used solely to respond to your inquiry.'}
        {' '}<Link href="/datenschutz"><span className="underline hover:text-zinc-400 cursor-pointer">
          {language === 'de' ? 'Datenschutzerklärung' : language === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy'}
        </span></Link>
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

  return (
    <section className={asPage ? undefined : "py-16 px-4 border-t border-white/8"} id="kontakt">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-3">
            {language === 'de' ? 'Kontakt' : language === 'fr' ? 'Contact' : 'Contact'}
          </h2>
          <p className="text-zinc-400">
            {language === 'de'
              ? 'Fragen, Feedback oder Anregungen? Schreib uns gerne!'
              : language === 'fr'
              ? 'Questions, retours ou suggestions? Écrivez-nous!'
              : 'Questions, feedback or suggestions? Write to us!'}
          </p>
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
      <div className="flex-1 p-4 md:p-8 pt-12">
        <div className="max-w-3xl mx-auto">
          <header className="mb-8 flex items-center">
            <Link href="/">
              <Button variant="ghost" size="icon" className="mr-4 rounded-full">
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </Link>
            <h1 className="text-3xl font-display font-bold text-white">
              {language === 'de' ? 'Kontakt' : language === 'fr' ? 'Contact' : 'Contact'}
            </h1>
          </header>
          <KontaktSection asPage />
        </div>
      </div>
      <Footer />
    </div>
  );
}
