import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { useTrainingStore } from "@/store/use-training-store";

const LEGAL_NAME = "Janosch Schickel-Adams";
const LEGAL_STREET = "Dorfstr. 6";
const LEGAL_CITY = "34633 Ottrau";
const LEGAL_EMAIL = "janosch.adams@runbox.com";
const CONTENT_RESPONSIBLE = `${LEGAL_NAME}, ${LEGAL_STREET}, ${LEGAL_CITY}`;

const content = {
  de: {
    title: "Impressum",
    s1h: "Angaben gemäß § 5 DDG",
    s1country: "Deutschland",
    s2h: "Kontakt",
    s3label: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
    s4h: "Haftung für Inhalte",
    s4p1:
      "Als Diensteanbieter sind wir nach den allgemeinen Gesetzen für eigene Inhalte auf diesen Seiten verantwortlich. Für fremde Inhalte gelten die gesetzlichen Haftungsbeschränkungen, insbesondere nach dem Digitale-Dienste-Gesetz (DDG) und der Verordnung (EU) 2022/2065.",
    s4p2:
      "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
    s5h: "Haftung für Links",
    s5p:
      "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.",
    s6h: "Urheberrecht",
    s6p:
      "Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.",
    updated: "Letzte Aktualisierung: April 2026",
  },
  en: {
    title: "Imprint",
    s1h: "Information pursuant to § 5 DDG (German Digital Services Act)",
    s1country: "Germany",
    s2h: "Contact",
    s3label: "Responsible for content pursuant to § 18 para. 2 MStV",
    s4h: "Liability for Content",
    s4p1:
      "As a service provider, we are responsible for our own content on these pages under the general laws. Statutory limitations of liability apply to third-party content, in particular under the German Digital Services Act (DDG) and Regulation (EU) 2022/2065.",
    s4p2:
      "Obligations to remove or block the use of information under general law remain unaffected. Liability in this regard is only possible from the point in time at which a concrete infringement becomes known. Upon becoming aware of such violations, we will remove the relevant content immediately.",
    s5h: "Liability for Links",
    s5p:
      "Our website contains links to external third-party websites over whose content we have no control. We therefore cannot accept any liability for this third-party content. The respective provider or operator of the linked pages is always responsible for the content of those pages. The linked pages were checked for possible legal violations at the time of linking. No illegal content was apparent at the time of linking.",
    s6h: "Copyright",
    s6p:
      "The content and works created by the site operator on these pages are subject to German copyright law. Reproduction, processing, distribution and any form of commercialisation beyond the scope of copyright law require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use.",
    updated: "Last updated: April 2026",
  },
  fr: {
    title: "Mentions légales",
    s1h: "Informations conformément au § 5 DDG (loi allemande sur les services numériques)",
    s1country: "Allemagne",
    s2h: "Contact",
    s3label: "Responsable du contenu conformément au § 18 al. 2 MStV",
    s4h: "Responsabilité pour le contenu",
    s4p1:
      "En tant que prestataire de services, nous sommes responsables de notre propre contenu sur ces pages conformément aux lois générales. Les limitations légales de responsabilité s'appliquent aux contenus de tiers, notamment en vertu du Digitale-Dienste-Gesetz (DDG) et du règlement (UE) 2022/2065.",
    s4p2:
      "Les obligations de supprimer ou de bloquer l'utilisation d'informations conformément aux lois générales restent inchangées. Une responsabilité à cet égard n'est toutefois possible qu'à partir du moment où une violation concrète du droit est connue. Dès que nous avons connaissance de telles violations, nous supprimons immédiatement le contenu concerné.",
    s5h: "Responsabilité pour les liens",
    s5p:
      "Notre site contient des liens vers des sites tiers externes sur le contenu desquels nous n'avons aucune influence. Nous ne pouvons donc assumer aucune responsabilité pour ces contenus tiers. Le fournisseur ou opérateur respectif des pages liées est toujours responsable de leur contenu. Les pages liées ont été vérifiées pour d'éventuelles violations légales au moment du lien. Aucun contenu illégal n'était apparent au moment du lien.",
    s6h: "Droit d'auteur",
    s6p:
      "Le contenu et les œuvres créés par l'opérateur du site sur ces pages sont soumis au droit d'auteur allemand. La reproduction, l'édition, la distribution et toute forme d'exploitation au-delà des limites du droit d'auteur nécessitent le consentement écrit de l'auteur ou du créateur concerné. Les téléchargements et copies de ce site ne sont autorisés qu'à des fins privées et non commerciales.",
    updated: "Dernière mise à jour : avril 2026",
  },
};

export default function Impressum() {
  const { language } = useTrainingStore();
  const c = content[language] ?? content.de;

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
            <h1 className="text-3xl font-display font-bold text-white">{c.title}</h1>
          </header>

          <div className="prose prose-invert max-w-none space-y-6 text-zinc-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">{c.s1h}</h2>
              <p>
                {LEGAL_NAME}
                <br />
                {LEGAL_STREET}
                <br />
                {LEGAL_CITY}
                <br />
                {c.s1country}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">{c.s2h}</h2>
              <p>
                E-Mail:{" "}
                <a href={`mailto:${LEGAL_EMAIL}`} className="text-primary hover:underline">
                  {LEGAL_EMAIL}
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">{c.s3label}</h2>
              <p>{CONTENT_RESPONSIBLE}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">{c.s4h}</h2>
              <p>{c.s4p1}</p>
              <p className="mt-2">{c.s4p2}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">{c.s5h}</h2>
              <p>{c.s5p}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">{c.s6h}</h2>
              <p>{c.s6p}</p>
            </section>

            <p className="text-xs text-zinc-600 pt-4 border-t border-white/8">{c.updated}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
