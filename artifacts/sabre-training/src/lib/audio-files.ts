import { translations, type Language } from "@/lib/i18n";

const AUDIO_ID_TO_SUBFOLDER: Record<string, string> = {
  vor: "training",
  zurueck: "training",
  ausfall: "training",
  quart: "training",
  terz: "training",
  quint: "training",
  riposte: "training",
  engarde: "training",
  balestra: "training",
  w_laufen: "aufwaermen",
  w_hampelmann: "aufwaermen",
  w_knieheben: "aufwaermen",
  w_armkreisen: "aufwaermen",
  w_schultern: "aufwaermen",
  w_rumpf: "aufwaermen",
  w_sprunge: "aufwaermen",
  w_hocke: "aufwaermen",
  c_atmen: "abkuehlen",
  c_schulter: "abkuehlen",
  c_wade: "abkuehlen",
  c_quad: "abkuehlen",
  c_seite: "abkuehlen",
  c_nacken: "abkuehlen",
  c_gehen: "abkuehlen",
  c_ruecken: "abkuehlen",
  motiv_1: "motivation",
  motiv_2: "motivation",
  motiv_3: "motivation",
  motiv_4: "motivation",
  motiv_5: "motivation",
  motiv_6: "motivation",
};

export function labelToFileKey(text: string): string {
  return text
    .replace(/Ä/g, "Ae")
    .replace(/Ö/g, "Oe")
    .replace(/Ü/g, "Ue")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/Ã„/g, "Ae")
    .replace(/Ã–/g, "Oe")
    .replace(/Ãœ/g, "Ue")
    .replace(/Ã¤/g, "ae")
    .replace(/Ã¶/g, "oe")
    .replace(/Ã¼/g, "ue")
    .replace(/ÃŸ/g, "ss")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

function buildAudioSubfolderMap() {
  const entries = new Map<string, string>();

  for (const [audioId, subfolder] of Object.entries(AUDIO_ID_TO_SUBFOLDER)) {
    if (audioId.startsWith("motiv_")) {
      entries.set(audioId, subfolder);
      continue;
    }

    const translationKey = `move_${audioId}`;

    for (const lang of ["de", "en", "fr"] as const) {
      const label = translations[lang][translationKey as keyof typeof translations.en];
      if (typeof label === "string" && label.trim()) {
        entries.set(labelToFileKey(label), subfolder);
      }
    }
  }

  return Object.fromEntries(entries);
}

export const AUDIO_SUBFOLDER: Record<string, string> = buildAudioSubfolderMap();

export function resolveAudioFileKey(identifier: string, language: Language, spokenText?: string): string {
  const subfolder = AUDIO_ID_TO_SUBFOLDER[identifier];
  if (!subfolder) {
    return labelToFileKey(spokenText ?? identifier);
  }

  if (identifier.startsWith("motiv_")) {
    return identifier;
  }

  const translationKey = `move_${identifier}` as keyof typeof translations.en;
  const localized = translations[language][translationKey] ?? translations.en[translationKey];
  if (typeof localized === "string" && localized.trim()) {
    return labelToFileKey(localized);
  }

  return labelToFileKey(spokenText ?? identifier);
}
