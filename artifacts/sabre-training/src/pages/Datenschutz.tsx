import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { useTrainingStore } from "@/store/use-training-store";

const content = {
  de: {
    title: "Datenschutzerklärung",
    s1h: "1. Verantwortlicher",
    s1intro: "Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:",
    s1country: "Deutschland",
    s1email: "E-Mail:",
    nameHint: "Vorname Nachname",
    streetHint: "Straße Hausnummer",
    cityHint: "PLZ Ort",
    emailHint: "ihre@email.de",
    s2h: "2. Allgemeines zur Datenverarbeitung",
    s2p1: "Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Datenschutzerklärung klärt Sie über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten auf dieser Website auf.",
    s2p2a: "Diese App verarbeitet ",
    s2p2b: "keine personenbezogenen Daten",
    s2p2c: " außer beim freiwilligen Versenden einer Kontaktanfrage. Es werden keine Cookies eingesetzt und kein Web-Tracking oder Analytics-Dienst genutzt.",
    s3h: "3. Lokale Datenspeicherung (LocalStorage)",
    s3p: "Diese Anwendung speichert Trainingseinstellungen und Ihren Trainingsverlauf ausschließlich lokal auf Ihrem Gerät im sogenannten LocalStorage Ihres Webbrowsers. Dabei werden gespeichert:",
    s3li: ["Bevorzugte Trainingssprache", "Ausgewählte Trainingseinstellungen (Dauer, Schritte, Lautstärke)", "Lokaler Trainingsverlauf (Datum, Dauer, Kalorien, Schrittzählung)"],
    s3p2: "Diese Daten verlassen Ihr Gerät nicht und werden nicht an unsere Server übertragen. Sie können diese Daten jederzeit über die Verlauf-Seite löschen oder Ihren Browser-Cache leeren.",
    s3legal: "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Bereitstellung der App-Funktionalität).",
    s4h: "4. Kontaktformular",
    s4p: "Wenn Sie uns über das Kontaktformular eine Nachricht senden, werden die folgenden Daten verarbeitet:",
    s4li: ["Ihr Name", "Ihre E-Mail-Adresse", "Ihr Nachrichtentext"],
    s4p2a: "Diese Angaben werden ausschließlich verwendet, um Ihre Anfrage zu beantworten. Die Daten werden per E-Mail an uns weitergeleitet und ",
    s4p2b: "nicht dauerhaft auf unseren Servern gespeichert",
    s4p2c: ".",
    s4legal: "Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung/vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).",
    s5h: "5. Serverseitige Speicherung von Trainingssitzungen",
    s5p: "Abgeschlossene Trainingseinheiten können optional auf unseren Servern gespeichert werden (Trainingstyp, Dauer, Kalorien, ausgeführte Schritte, Datum). Es werden dabei keine personenbezogenen Daten wie Name oder E-Mail übermittelt. Die gespeicherten Daten sind keiner Person zuordenbar.",
    s6h: "6. Hosting und Datentransfer in Drittländer",
    s6p1: "Diese Anwendung wird gehostet bei Replit Inc., 1 Hacker Way, Menlo Park, CA 94025, USA.",
    s6p2: "Bei Aufruf der Website werden technische Verbindungsdaten (IP-Adresse, Browsertyp, Zeitstempel) durch den Hosting-Anbieter kurzzeitig verarbeitet. Dies ist technisch erforderlich und liegt im berechtigten Interesse des Betriebs der Website (Art. 6 Abs. 1 lit. f DSGVO).",
    s6p3: "Da Replit Inc. seinen Sitz in den USA hat, kann es zu einer Übermittlung Ihrer Daten in die USA kommen. Der Datentransfer erfolgt auf Grundlage von Art. 44 ff. DSGVO. Replit Inc. ist nach dem EU-U.S. Data Privacy Framework zertifiziert, was ein angemessenes Datenschutzniveau gewährleistet.",
    s7h: "7. Ihre Rechte als betroffene Person",
    s7intro: "Sie haben gemäß DSGVO folgende Rechte:",
    s7li: [
      ["Auskunftsrecht", "(Art. 15 DSGVO): Recht auf Auskunft über die über Sie gespeicherten Daten"],
      ["Berichtigungsrecht", "(Art. 16 DSGVO): Recht auf Berichtigung unrichtiger Daten"],
      ["Löschungsrecht", "(Art. 17 DSGVO): Recht auf Löschung Ihrer Daten"],
      ["Einschränkung der Verarbeitung", "(Art. 18 DSGVO)"],
      ["Widerspruchsrecht", "(Art. 21 DSGVO): Widerspruch gegen die Verarbeitung Ihrer Daten"],
      ["Datenübertragbarkeit", "(Art. 20 DSGVO)"],
    ],
    s7p2: "Zur Ausübung Ihrer Rechte wenden Sie sich bitte an die oben genannte Kontaktadresse.",
    s8h: "8. Beschwerderecht bei der Aufsichtsbehörde",
    s8p: "Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren. Die zuständige Aufsichtsbehörde richtet sich nach Ihrem Wohnort bzw. dem Sitz des Verantwortlichen. Eine Liste der Datenschutzbehörden in Deutschland finden Sie unter:",
    s9h: "9. Aktualität und Änderung dieser Datenschutzerklärung",
    s9p: "Diese Datenschutzerklärung ist aktuell gültig und hat den Stand März 2026. Durch die Weiterentwicklung der Website oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.",
    updated: "Letzte Aktualisierung: März 2026",
  },
  en: {
    title: "Privacy Policy",
    s1h: "1. Controller",
    s1intro: "The controller within the meaning of the General Data Protection Regulation (GDPR) is:",
    s1country: "Germany",
    s1email: "Email:",
    nameHint: "First name Last name",
    streetHint: "Street Number",
    cityHint: "Postcode City",
    emailHint: "your@email.com",
    s2h: "2. General Information on Data Processing",
    s2p1: "We take the protection of your personal data very seriously. This privacy policy informs you about the nature, scope and purpose of the processing of personal data on this website.",
    s2p2a: "This app processes ",
    s2p2b: "no personal data",
    s2p2c: " except when you voluntarily submit a contact request. No cookies are used and no web tracking or analytics services are employed.",
    s3h: "3. Local Data Storage (LocalStorage)",
    s3p: "This application stores training settings and your training history exclusively on your device in the so-called LocalStorage of your web browser. The following data is stored:",
    s3li: ["Preferred training language", "Selected training settings (duration, moves, volume)", "Local training history (date, duration, calories, step count)"],
    s3p2: "This data does not leave your device and is not transmitted to our servers. You can delete this data at any time via the History page or by clearing your browser cache.",
    s3legal: "Legal basis: Art. 6(1)(f) GDPR (legitimate interest in providing app functionality).",
    s4h: "4. Contact Form",
    s4p: "When you send us a message via the contact form, the following data is processed:",
    s4li: ["Your name", "Your email address", "Your message text"],
    s4p2a: "This information is used solely to respond to your enquiry. The data is forwarded to us by email and is ",
    s4p2b: "not stored permanently on our servers",
    s4p2c: ".",
    s4legal: "Legal basis: Art. 6(1)(b) GDPR (performance of a contract/pre-contractual measures) or Art. 6(1)(f) GDPR (legitimate interest in responding to enquiries).",
    s5h: "5. Server-Side Storage of Training Sessions",
    s5p: "Completed training sessions may optionally be stored on our servers (training type, duration, calories, steps performed, date). No personal data such as name or email is transmitted. The stored data cannot be attributed to any individual.",
    s6h: "6. Hosting and Data Transfer to Third Countries",
    s6p1: "This application is hosted by Replit Inc., 1 Hacker Way, Menlo Park, CA 94025, USA.",
    s6p2: "When you access the website, technical connection data (IP address, browser type, timestamp) is briefly processed by the hosting provider. This is technically necessary and is in the legitimate interest of operating the website (Art. 6(1)(f) GDPR).",
    s6p3: "Since Replit Inc. is based in the USA, your data may be transferred to the USA. The data transfer is based on Art. 44 et seq. GDPR. Replit Inc. is certified under the EU-U.S. Data Privacy Framework, which ensures an adequate level of data protection.",
    s7h: "7. Your Rights as a Data Subject",
    s7intro: "You have the following rights under the GDPR:",
    s7li: [
      ["Right of access", "(Art. 15 GDPR): right to information about the data stored about you"],
      ["Right to rectification", "(Art. 16 GDPR): right to correction of inaccurate data"],
      ["Right to erasure", "(Art. 17 GDPR): right to deletion of your data"],
      ["Right to restriction of processing", "(Art. 18 GDPR)"],
      ["Right to object", "(Art. 21 GDPR): right to object to the processing of your data"],
      ["Right to data portability", "(Art. 20 GDPR)"],
    ],
    s7p2: "To exercise your rights, please contact the address given above.",
    s8h: "8. Right to Lodge a Complaint with a Supervisory Authority",
    s8p: "You have the right to lodge a complaint with a data protection supervisory authority regarding the processing of your personal data. The competent authority depends on your place of residence or the location of the controller. A list of data protection authorities in Germany can be found at:",
    s9h: "9. Currency and Amendment of This Privacy Policy",
    s9p: "This privacy policy is currently valid and was last updated in March 2026. Due to the further development of the website or changes in legal or regulatory requirements, it may be necessary to amend this privacy policy.",
    updated: "Last updated: March 2026",
  },
  fr: {
    title: "Politique de confidentialité",
    s1h: "1. Responsable du traitement",
    s1intro: "Le responsable du traitement au sens du Règlement général sur la protection des données (RGPD) est :",
    s1country: "Allemagne",
    s1email: "E-mail :",
    nameHint: "Prénom Nom",
    streetHint: "Rue Numéro",
    cityHint: "Code postal Ville",
    emailHint: "votre@email.fr",
    s2h: "2. Informations générales sur le traitement des données",
    s2p1: "Nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité vous informe sur la nature, la portée et la finalité du traitement des données à caractère personnel sur ce site.",
    s2p2a: "Cette application ne traite ",
    s2p2b: "aucune donnée personnelle",
    s2p2c: " sauf lorsque vous soumettez volontairement une demande de contact. Aucun cookie n'est utilisé et aucun service de suivi ou d'analyse n'est employé.",
    s3h: "3. Stockage local des données (LocalStorage)",
    s3p: "Cette application stocke les paramètres d'entraînement et votre historique d'entraînement exclusivement localement sur votre appareil dans le LocalStorage de votre navigateur. Les données suivantes sont enregistrées :",
    s3li: ["Langue d'entraînement préférée", "Paramètres d'entraînement sélectionnés (durée, mouvements, volume)", "Historique d'entraînement local (date, durée, calories, nombre de pas)"],
    s3p2: "Ces données ne quittent pas votre appareil et ne sont pas transmises à nos serveurs. Vous pouvez supprimer ces données à tout moment via la page Historique ou en vidant le cache de votre navigateur.",
    s3legal: "Base légale : art. 6, par. 1, lit. f RGPD (intérêt légitime à fournir la fonctionnalité de l'application).",
    s4h: "4. Formulaire de contact",
    s4p: "Lorsque vous nous envoyez un message via le formulaire de contact, les données suivantes sont traitées :",
    s4li: ["Votre nom", "Votre adresse e-mail", "Votre message"],
    s4p2a: "Ces informations sont utilisées uniquement pour répondre à votre demande. Les données nous sont transmises par e-mail et ne sont ",
    s4p2b: "pas stockées de façon permanente sur nos serveurs",
    s4p2c: ".",
    s4legal: "Base légale : art. 6, par. 1, lit. b RGPD (exécution d'un contrat/mesures précontractuelles) ou art. 6, par. 1, lit. f RGPD (intérêt légitime à répondre aux demandes).",
    s5h: "5. Stockage côté serveur des sessions d'entraînement",
    s5p: "Les sessions d'entraînement terminées peuvent optionnellement être stockées sur nos serveurs (type d'entraînement, durée, calories, mouvements effectués, date). Aucune donnée personnelle telle que le nom ou l'e-mail n'est transmise. Les données stockées ne peuvent être attribuées à aucune personne.",
    s6h: "6. Hébergement et transfert de données vers des pays tiers",
    s6p1: "Cette application est hébergée par Replit Inc., 1 Hacker Way, Menlo Park, CA 94025, États-Unis.",
    s6p2: "Lors de l'accès au site, des données de connexion techniques (adresse IP, type de navigateur, horodatage) sont brièvement traitées par le fournisseur d'hébergement. Cela est techniquement nécessaire et relève de l'intérêt légitime du fonctionnement du site (art. 6, par. 1, lit. f RGPD).",
    s6p3: "Replit Inc. étant basé aux États-Unis, vos données peuvent être transférées aux États-Unis. Le transfert de données est fondé sur les art. 44 et suivants du RGPD. Replit Inc. est certifié selon le Cadre de protection des données UE-États-Unis, ce qui garantit un niveau de protection adéquat.",
    s7h: "7. Vos droits en tant que personne concernée",
    s7intro: "Vous disposez des droits suivants en vertu du RGPD :",
    s7li: [
      ["Droit d'accès", "(art. 15 RGPD) : droit d'obtenir des informations sur les données vous concernant"],
      ["Droit de rectification", "(art. 16 RGPD) : droit de corriger les données inexactes"],
      ["Droit à l'effacement", "(art. 17 RGPD) : droit à la suppression de vos données"],
      ["Droit à la limitation du traitement", "(art. 18 RGPD)"],
      ["Droit d'opposition", "(art. 21 RGPD) : droit de s'opposer au traitement de vos données"],
      ["Droit à la portabilité des données", "(art. 20 RGPD)"],
    ],
    s7p2: "Pour exercer vos droits, veuillez contacter l'adresse indiquée ci-dessus.",
    s8h: "8. Droit de réclamation auprès d'une autorité de contrôle",
    s8p: "Vous avez le droit de déposer une réclamation auprès d'une autorité de protection des données concernant le traitement de vos données personnelles. L'autorité compétente dépend de votre lieu de résidence ou du siège du responsable. Une liste des autorités de protection des données en Allemagne est disponible sur :",
    s9h: "9. Actualité et modification de cette politique de confidentialité",
    s9p: "Cette politique de confidentialité est actuellement valide et a été mise à jour en mars 2026. En raison de l'évolution du site ou de modifications des exigences légales ou réglementaires, il peut être nécessaire de modifier cette politique.",
    updated: "Dernière mise à jour : mars 2026",
  },
};

export default function Datenschutz() {
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

          <div className="space-y-8 text-zinc-300 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-white mb-3">{c.s1h}</h2>
              <p>{c.s1intro}</p>
              <address className="not-italic mt-2 text-zinc-400">
                {/* BITTE ERSETZEN / PLEASE REPLACE */}
                <strong>[{c.nameHint}]</strong><br />
                [{c.streetHint}]<br />
                [{c.cityHint}]<br />
                {c.s1country}<br />
                {c.s1email} [{c.emailHint}]
              </address>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">{c.s2h}</h2>
              <p>{c.s2p1}</p>
              <p className="mt-2">
                {c.s2p2a}<strong className="text-white">{c.s2p2b}</strong>{c.s2p2c}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">{c.s3h}</h2>
              <p>{c.s3p}</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-zinc-400">
                {c.s3li.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="mt-2">{c.s3p2}</p>
              <p className="mt-2">{c.s3legal}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">{c.s4h}</h2>
              <p>{c.s4p}</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-zinc-400">
                {c.s4li.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="mt-2">
                {c.s4p2a}<strong className="text-white">{c.s4p2b}</strong>{c.s4p2c}
              </p>
              <p className="mt-2">{c.s4legal}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">{c.s5h}</h2>
              <p>{c.s5p}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">{c.s6h}</h2>
              <p>{c.s6p1}</p>
              <p className="mt-2">{c.s6p2}</p>
              <p className="mt-2">{c.s6p3}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">{c.s7h}</h2>
              <p>{c.s7intro}</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-zinc-400">
                {c.s7li.map(([bold, rest], i) => (
                  <li key={i}><strong className="text-zinc-300">{bold}</strong> {rest}</li>
                ))}
              </ul>
              <p className="mt-2">{c.s7p2}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">{c.s8h}</h2>
              <p>{c.s8p}</p>
              <p className="mt-2">
                <a
                  href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.bfdi.bund.de
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">{c.s9h}</h2>
              <p>{c.s9p}</p>
            </section>

            <p className="text-xs text-zinc-600 pt-4 border-t border-white/8">{c.updated}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
